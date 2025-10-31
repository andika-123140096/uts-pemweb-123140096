import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useBookDetails from "../hooks/useBookDetails";
import LoadingSpinner from "../components/LoadingSpinner";

const BookDetails = () => {
  const { workKey } = useParams();
  const { bookDetails, loading, error } = useBookDetails(workKey);
  const [authorsNames, setAuthorsNames] = useState([]);

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

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!bookDetails) return <p>No details found.</p>;

  const coverUrl =
    bookDetails.covers && bookDetails.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`
      : "https://placehold.co/600x400";

  const authors = authorsNames.join(", ") || "Unknown";
  const description = (
    typeof bookDetails.description === "string"
      ? bookDetails.description
      : bookDetails.description?.value || "No description available."
  ).replace(/\s*\(\[source\]\[1\]\)\s*----------.*$/s, "");

  const readLink = `https://openlibrary.org/works/${workKey}`;

  return (
    <div className="mx-auto max-w-4xl p-4 pb-24">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex justify-center md:w-1/2">
          <img
            src={coverUrl}
            alt={bookDetails.title}
            className="h-[432px] w-72 rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="flex-1 p-4">
          <h1 className="mb-4 text-3xl font-bold">{bookDetails.title}</h1>
          <p className="mb-2 text-lg">
            <strong>Author(s):</strong> {authors}
          </p>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="mb-4 text-gray-700">{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Subjects</h2>
            <div className="flex flex-wrap gap-2">
              {bookDetails.subjects?.slice(0, 5).map((subject, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                >
                  {subject}
                </span>
              ))}
              {bookDetails.subjects && bookDetails.subjects.length > 5 && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  +{bookDetails.subjects.length - 5}
                </span>
              )}
              {(!bookDetails.subjects || bookDetails.subjects.length === 0) && (
                <span className="text-gray-500">None</span>
              )}
            </div>
          </div>
          <a
            href={readLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Read Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
