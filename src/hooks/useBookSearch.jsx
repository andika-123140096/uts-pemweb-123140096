import { useState, useEffect } from "react";

const normalizeBooks = (docs) => {
  return docs.map((book) => ({
    title: book.title || "",
    author_name: Array.isArray(book.author_name) ? book.author_name : [],
    isbn: Array.isArray(book.isbn) ? book.isbn[0] : "",
    publisher: Array.isArray(book.publisher) ? book.publisher[0] : "",
    subject: Array.isArray(book.subject) ? book.subject : [],
    year: book.first_publish_year || "",
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://placehold.co/400x600",
    key: book.key || "",
  }));
};

const useBookSearch = (
  searchCriteria,
  limit = 10,
  offset = 0,
  searchTriggered = false
) => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTriggered) {
      setLoading(false);
      setError(null);
      return;
    }

    const hasCriteria = Object.values(searchCriteria).some(
      (value) => value.trim() !== ""
    );
    if (!hasCriteria) {
      setBooks([]);
      setTotal(0);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "https://openlibrary.org/search.json?";
        const params = [];
        if (searchCriteria.title)
          params.push(`title=${encodeURIComponent(searchCriteria.title)}`);
        if (searchCriteria.author_name)
          params.push(
            `author=${encodeURIComponent(searchCriteria.author_name)}`
          );
        if (searchCriteria.isbn)
          params.push(`isbn=${encodeURIComponent(searchCriteria.isbn)}`);

        let qParts = [];
        if (searchCriteria.publisher)
          qParts.push(`publisher:${searchCriteria.publisher}`);
        if (searchCriteria.subject)
          qParts.push(`subject:${searchCriteria.subject}`);
        if (qParts.length > 0)
          params.push(`q=${encodeURIComponent(qParts.join(" "))}`);
        url +=
          params.join("&") +
          `&lang=en&limit=${limit}&offset=${offset}&fields=title,author_name,isbn,publisher,subject,first_publish_year,cover_i,key`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const result = await response.json();
        const normalizedBooks = normalizeBooks(result.docs);
        setBooks(normalizedBooks);
        setTotal(result.numFound || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchCriteria, limit, offset, searchTriggered]);

  return { books, total, loading, error };
};

export default useBookSearch;
