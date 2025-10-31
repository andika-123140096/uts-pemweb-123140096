import { useState, useEffect } from "react";

const useBookDetails = (workKey) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return { bookDetails, loading, error };
};

export default useBookDetails;
