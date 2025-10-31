import { useState, useEffect } from "react";

const useBookDetails = (workKey) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorsNames, setAuthorsNames] = useState([]);
  const [parsedDescription, setParsedDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    if (!workKey) return;

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${workKey}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [workKey]);

  useEffect(() => {
    if (bookDetails?.authors) {
      const fetchAuthors = async () => {
        const names = await Promise.all(
          bookDetails.authors.map(async (author) => {
            if (author.author?.key) {
              const authorKey = author.author.key.split("/").pop();
              try {
                const response = await fetch(
                  `https://openlibrary.org/authors/${authorKey}.json`
                );
                const data = await response.json();
                return data.name || "Unknown";
              } catch {
                return "Unknown";
              }
            }
            return "Unknown";
          })
        );
        setAuthorsNames(names);
      };
      fetchAuthors();
    }
  }, [bookDetails]);

  useEffect(() => {
    if (bookDetails) {
      const description = (
        typeof bookDetails.description === "string"
          ? bookDetails.description
          : bookDetails.description?.value || "No description available."
      ).replace(/\s*\(\[source\]\[1\]\)\s*----------.*$/s, "");
      setParsedDescription(description);

      const url =
        bookDetails.covers && bookDetails.covers.length > 0
          ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`
          : "https://placehold.co/600x400";
      setCoverUrl(url);
    }
  }, [bookDetails]);

  return { bookDetails, loading, error, authorsNames, parsedDescription, coverUrl };
};

export default useBookDetails;
