import PropTypes from "prop-types";
import { useReadingListContext } from "../contexts/ReadingListContext";

const SearchResultTable = ({ books, onViewDetails }) => {
  const { addBook, removeBook, isBookSaved } = useReadingListContext();

  const handleToggleSave = (book) => {
    if (isBookSaved(book.key)) {
      removeBook(book.key);
    } else {
      addBook(book);
    }
  };

  return (
    <div className="mx-4 rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-md">
      <h2 className="mb-4 text-lg font-semibold">Search Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto border-collapse overflow-hidden rounded-lg border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2">Cover</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Year</th>
              <th className="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.key || index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="mx-auto h-80 w-64 rounded-md shadow-md"
                    />
                  ) : (
                    <span className="text-gray-500">No Cover</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.author_name.length > 0
                    ? book.author_name.join(", ")
                    : "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.year || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => onViewDetails(book)}
                      className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleToggleSave(book)}
                      className={`w-full rounded px-4 py-2 text-white ${
                        isBookSaved(book.key)
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {isBookSaved(book.key)
                        ? "Remove from Reading List"
                        : "Add to Reading List"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SearchResultTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author_name: PropTypes.arrayOf(PropTypes.string),
      subject: PropTypes.arrayOf(PropTypes.string),
      coverUrl: PropTypes.string,
      key: PropTypes.string,
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default SearchResultTable;
