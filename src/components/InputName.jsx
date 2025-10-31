import PropTypes from "prop-types";

const InputName = ({ inputName, setInputName, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full max-w-md">
      <p className="mb-4 text-center">
        Welcome to the Books Library! Please enter your name to continue.
      </p>
      <div className="mx-4 mb-4 rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

InputName.propTypes = {
  inputName: PropTypes.string.isRequired,
  setInputName: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InputName;
