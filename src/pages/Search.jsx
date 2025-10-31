import { useNavigate } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import SearchResultTable from "../components/SearchResultTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchContext } from "../contexts/SearchContext";

const Search = () => {
  const {
    searchCriteria,
    setSearchCriteria,
    limit,
    setLimit,
    setSearchTriggered,
    books,
    loading,
    error,
  } = useSearchContext();
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const handleViewDetails = (book) => {
    const workKey = book.key.split("/").pop();
    navigate(`/book/${workKey}`);
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
      {error && <p className="text-red-500">{error}</p>}
      {books.length > 0 && (
        <SearchResultTable books={books} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default Search;
