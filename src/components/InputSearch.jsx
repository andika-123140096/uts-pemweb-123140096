import PropTypes from "prop-types";

const InputSearch = ({
  searchCriteria,
  setSearchCriteria,
  limit,
  setLimit,
  onSearch,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mx-4 mb-4 rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={searchCriteria.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label
            htmlFor="author_name"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            value={searchCriteria.author_name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter author name"
          />
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={searchCriteria.isbn}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter ISBN"
          />
        </div>
        <div>
          <label
            htmlFor="publisher"
            className="block text-sm font-medium text-gray-700"
          >
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={searchCriteria.publisher}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter publisher"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={searchCriteria.subject}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700"
          >
            Limit
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter limit"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

InputSearch.propTypes = {
  searchCriteria: PropTypes.shape({
    title: PropTypes.string,
    author_name: PropTypes.string,
    isbn: PropTypes.string,
    publisher: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
  setSearchCriteria: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default InputSearch;
