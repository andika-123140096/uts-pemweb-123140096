import { useState, useEffect } from "react";
import useBookSearch from "../hooks/useBookSearch";
import InputSearch from "../components/InputSearch";
import SearchResultTable from "../components/SearchResultTable";
import LoadingSpinner from "../components/LoadingSpinner";

const Search = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    author_name: "",
    isbn: "",
    publisher: "",
    subject: "",
  });
  const [limit, setLimit] = useState(10);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { books, loading, error } = useBookSearch(
    searchCriteria,
    limit,
    0,
    searchTriggered
  );

  useEffect(() => {
    setSearchTriggered(false);
  }, [searchCriteria]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleViewDetails = (book) => {
    console.log("View details for:", book);
    // TODO: Implement view details
  };

  const handleAddToFavorite = (book) => {
    console.log("Add to favorite:", book);
    // TODO: Implement add to favorite
  };

  return (
    <div className="p-4">
      <InputSearch
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        limit={limit}
        setLimit={setLimit}
        onSearch={handleSearch}
      />
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && (
        <SearchResultTable
          books={books}
          onViewDetails={handleViewDetails}
          onAddToFavorite={handleAddToFavorite}
        />
      )}
    </div>
  );
};

export default Search;
