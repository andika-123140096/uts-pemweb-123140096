import { useState } from "react";

const Search = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    author_name: "",
    isbn: "",
    publisher: "",
    subject: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search criteria:", searchCriteria);
    // TODO: Implement search logic
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">Search Books</h1>
      <div className="mx-4 mb-4 rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-md">
        <form onSubmit={handleSearch} className="space-y-4">
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
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
