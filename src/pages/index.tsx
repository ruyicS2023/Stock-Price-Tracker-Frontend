import { useState } from "react";
import { fetchStockPrice, fetchStockHistory } from "../services/api";
import StockChart from "../components/StockChart";
import StockSearch from "../components/StockSearch";
import { StockDataResponse, DailyStockData } from "../types/stock";

const Home = () => {
  const [stockData, setStockData] = useState<StockDataResponse | null>(null);
  const [historyData, setHistoryData] = useState<DailyStockData[]>([]);

  const handleSearch = async (symbol: string) => {
    const stock = await fetchStockPrice(symbol);
    const history = await fetchStockHistory(symbol);
    setStockData(stock);
    setHistoryData(history);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">📈 Stock Price Tracker</h1>
      <StockSearch onSearch={handleSearch} />

      {stockData && (
        <div>
          <h2 className="text-2xl font-semibold">
            Stock: {stockData["Global Quote"]["01. symbol"]}
          </h2>
          <p>📌 Price: ${stockData["Global Quote"]["05. price"]}</p>
        </div>
      )}

      {historyData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl">📈 Historical Trends</h3>
          <StockChart historyData={historyData} />
        </div>
      )}
    </div>
  );
};

export default Home;
