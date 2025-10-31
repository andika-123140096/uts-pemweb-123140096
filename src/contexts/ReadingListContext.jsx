/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import useBookSave from "../hooks/useBookSave";

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
  const { savedBooks, addBook, removeBook, isBookSaved } = useBookSave();

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
