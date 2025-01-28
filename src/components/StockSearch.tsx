interface StockSearchProps {
  onSearch: (symbol: string) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ onSearch }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="text"
        className="p-2 border border-gray-500 rounded"
        placeholder="Enter stock symbol (e.g. AAPL)"
        id="symbolInput"
      />
      <button
        onClick={() =>
          onSearch(
            (document.getElementById("symbolInput") as HTMLInputElement).value
          )
        }
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default StockSearch;
