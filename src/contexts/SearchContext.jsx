/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import useBookSearch from "../hooks/useBookSearch";

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
  const [offset, setOffset] = useState(0);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { books, total, loading, error } = useBookSearch(
    searchCriteria,
    limit,
    offset,
    searchTriggered
  );

  return (
    <SearchContext.Provider
      value={{
        searchCriteria,
        setSearchCriteria,
        limit,
        setLimit,
        offset,
        setOffset,
        searchTriggered,
        setSearchTriggered,
        books,
        total,
        loading,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
