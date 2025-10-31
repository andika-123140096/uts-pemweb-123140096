/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const ReadingListContext = createContext();

export const useReadingListContext = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error(
      "useReadingListContext must be used within a ReadingListProvider"
    );
  }
  return context;
};

export const ReadingListProvider = ({ children }) => {
  const getInitialBooks = () => {
    const storedBooks = localStorage.getItem("savedBooks");
    if (storedBooks) {
      try {
        return JSON.parse(storedBooks);
      } catch (e) {
        console.error("Error parsing savedBooks:", e);
        return [];
      }
    }
    return [];
  };

  const [savedBooks, setSavedBooks] = useState(getInitialBooks);

  // Save to localStorage whenever savedBooks changes
  useEffect(() => {
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  }, [savedBooks]);

  const addBook = (book) => {
    if (!book.key || book.key === "") {
      console.log("Book has no key, cannot add");
      return;
    }
    setSavedBooks((prev) => {
      // Check if book already exists
      if (prev.some((b) => b.key === book.key)) {
        return prev; // Already saved
      }
      return [...prev, book];
    });
  };

  const removeBook = (bookKey) => {
    setSavedBooks((prev) => prev.filter((book) => book.key !== bookKey));
  };

  const isBookSaved = (bookKey) => {
    return savedBooks.some((book) => book.key === bookKey);
  };

  return (
    <ReadingListContext.Provider
      value={{
        savedBooks,
        addBook,
        removeBook,
        isBookSaved,
      }}
    >
      {children}
    </ReadingListContext.Provider>
  );
};
