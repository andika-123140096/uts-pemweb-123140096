/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    author_name: "",
    isbn: "",
    publisher: "",
    subject: "",
  });
  const [limit, setLimit] = useState(10);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [localBooks, setLocalBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchCriteria,
        setSearchCriteria,
        limit,
        setLimit,
        searchTriggered,
        setSearchTriggered,
        localBooks,
        setLocalBooks,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
