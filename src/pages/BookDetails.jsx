import { useParams } from "react-router-dom";
import useBookDetails from "../hooks/useBookDetails";
import LoadingSpinner from "../components/LoadingSpinner";

const BookDetails = () => {
  const { workKey } = useParams();
  const { bookDetails, loading, error, authorsNames, parsedDescription, coverUrl } = useBookDetails(workKey);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!bookDetails) return <p>No details found.</p>;

  const authors = authorsNames.join(", ") || "Unknown";

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
            <p className="mb-4 text-gray-700">{parsedDescription}</p>
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
