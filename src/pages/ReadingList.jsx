import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useReadingListContext } from "../contexts/ReadingListContext";

const ReadingList = () => {
  const { savedBooks, removeBook } = useReadingListContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredBooks = useMemo(() => {
    return savedBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [savedBooks, searchTerm]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (book) => {
    const workKey = book.key.split("/").pop();
    navigate(`/book/${workKey}`);
  };

  const handleRemove = (bookKey) => {
    removeBook(bookKey);
  };

  return (
    <div className="p-4 pb-24">
      {savedBooks.length === 0 ? (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-center text-4xl">
            No books in your reading list yet.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search books by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {paginatedBooks.map((book) => (
              <BookCard
                key={book.key}
                cover={book.coverUrl || "https://placehold.co/400x600"}
                title={book.title}
                onViewDetails={() => handleViewDetails(book)}
                onRemove={() => handleRemove(book.key)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`rounded px-3 py-1 ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="rounded bg-gray-300 px-3 py-1 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReadingList;
