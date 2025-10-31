import React from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useReadingListContext } from "../contexts/ReadingListContext";

const ReadingList = () => {
  const { savedBooks, removeBook } = useReadingListContext();
  const navigate = useNavigate();

  const handleViewDetails = (book) => {
    const workKey = book.key.split("/").pop();
    navigate(`/book/${workKey}`);
  };

  const handleRemove = (bookKey) => {
    removeBook(bookKey);
  };

  return (
    <div className="p-4">
      {savedBooks.length === 0 ? (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="text-center text-4xl">
            No books in your reading list yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {savedBooks.map((book) => (
            <BookCard
              key={book.key}
              cover={book.coverUrl || "https://via.placeholder.com/150"}
              title={book.title}
              onViewDetails={() => handleViewDetails(book)}
              onRemove={() => handleRemove(book.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
