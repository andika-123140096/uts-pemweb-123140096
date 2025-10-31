import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "w-8 h-8", message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${size} animate-spin rounded-full border-4 border-blue-500 border-t-transparent`}
      ></div>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  message: PropTypes.string,
};

export default LoadingSpinner;
