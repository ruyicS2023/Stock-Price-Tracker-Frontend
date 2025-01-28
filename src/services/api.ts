import axios from "axios";
import { mockStockData, mockStockHistory } from "../sampleData/sampleData";
import {
  StockDataResponse,
  StockHistoryResponse,
  DailyStockData,
} from "../types/stock";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const USE_MOCK = true;

export const fetchStockPrice = async (
  symbol: string
): Promise<StockDataResponse | null> => {
  if (USE_MOCK) {
    console.log("Using mock data for stock price");
    return mockStockData as StockDataResponse;
  }

  try {
    const response = await axios.get<StockDataResponse>(`${BASE_URL}/stock`, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stock price:", error);
    return null;
  }
};

export const fetchStockHistory = async (
  symbol: string
): Promise<DailyStockData[]> => {
  if (USE_MOCK) {
    console.log("Using mock data for stock history");

    return Object.entries(mockStockHistory["Time Series (Daily)"])
      .map(
        ([date, values]: [
          string,
          {
            "1. open": string;
            "2. high": string;
            "3. low": string;
            "4. close": string;
            "5. volume": string;
          }
        ]) => ({
          date,
          open: parseFloat(values["1. open"]),
          high: parseFloat(values["2. high"]),
          low: parseFloat(values["3. low"]),
          close: parseFloat(values["4. close"]),
          volume: parseInt(values["5. volume"]),
        })
      )
      .reverse();
  }

  try {
    const response = await axios.get<StockHistoryResponse>(
      `${BASE_URL}/stock/daily`,
      { params: { symbol } }
    );

    return Object.entries(response.data["Time Series (Daily)"])
      .map(
        ([date, values]: [
          string,
          {
            "1. open": string;
            "2. high": string;
            "3. low": string;
            "4. close": string;
            "5. volume": string;
          }
        ]) => ({
          date,
          open: parseFloat(values["1. open"]),
          high: parseFloat(values["2. high"]),
          low: parseFloat(values["3. low"]),
          close: parseFloat(values["4. close"]),
          volume: parseInt(values["5. volume"]),
        })
      )
      .reverse();
  } catch (error) {
    console.error("Error fetching stock history:", error);
    return [];
  }
};
