import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DailyStockData } from "../types/stock";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  historyData: DailyStockData[];
}

const StockChart: React.FC<StockChartProps> = ({ historyData }) => {
  const chartData = {
    labels: historyData.map((day) => day.date),
    datasets: [
      {
        label: "Closing Price",
        data: historyData.map((day) => day.close),
        borderColor: "rgb(75, 192, 192)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default StockChart;
