const BookCard = ({ cover, title, onViewDetails, onRemove }) => {
  return (
    <div className="m-1 rounded-lg bg-white p-2 shadow-md">
      <img
        src={cover}
        alt={title}
        className="mb-1 h-96 w-full rounded-t-md object-fill"
      />
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex flex-col space-y-2">
        <button
          onClick={onViewDetails}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          View Details
        </button>
        <button
          onClick={onRemove}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default BookCard;
