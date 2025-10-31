import { useState, useEffect } from "react";

const useBookSave = () => {
  const getInitialBooks = () => {
    const storedBooks = localStorage.getItem("savedBooks");
    if (storedBooks) {
      try {
        return JSON.parse(storedBooks);
      } catch (error) {
        console.error("Error parsing savedBooks from localStorage:", error);
        return [];
      }
    }
    return [];
  };

  const [savedBooks, setSavedBooks] = useState(getInitialBooks);

  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  const addBook = (book) => {
    console.log("Adding book:", book);
    if (!book.key) {
      console.log("Book has no key, cannot add");
      return;
    }
    setSavedBooks((prev) => {
      if (prev.some((b) => b.key === book.key)) {
        console.log("Book already saved");
        return prev;
      }
      console.log("Book added");
      return [...prev, book];
    });
  };

  const removeBook = (bookKey) => {
    setSavedBooks((prev) => prev.filter((book) => book.key !== bookKey));
  };

  const isBookSaved = (bookKey) => {
    return savedBooks.some((book) => book.key === bookKey);
  };

  return {
    savedBooks,
    addBook,
    removeBook,
    isBookSaved,
  };
};

export default useBookSave;
