import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import SearchResultTable from "../components/SearchResultTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchContext } from "../contexts/SearchContext";

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
      : "",
    key: book.key || "",
  }));
};

const Search = () => {
  const {
    searchCriteria,
    setSearchCriteria,
    limit,
    setLimit,
    searchTriggered,
    setSearchTriggered,
    localBooks,
    setLocalBooks,
    loading,
    setLoading,
  } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTriggered || localBooks.length > 0) return;

    const fetchBooks = async () => {
      setLoading(true);
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
          `&lang=en&limit=${limit}&offset=0&fields=title,author_name,isbn,publisher,subject,first_publish_year,cover_i,key`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const result = await response.json();
        const normalizedBooks = normalizeBooks(result.docs);
        setLocalBooks(normalizedBooks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [
    searchTriggered,
    searchCriteria,
    limit,
    localBooks.length,
    setLocalBooks,
    setLoading,
  ]);

  const handleSearch = () => {
    setSearchTriggered(true);
    setLocalBooks([]); // Clear previous results
  };

  const handleViewDetails = (book) => {
    const workKey = book.key.split("/").pop();
    navigate(`/book/${workKey}`);
  };

  return (
    <div className="p-4">
      <InputSearch
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        limit={limit}
        setLimit={setLimit}
        onSearch={handleSearch}
      />
      {loading && <LoadingSpinner />}
      {localBooks.length > 0 && (
        <SearchResultTable
          books={localBooks}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

export default Search;
