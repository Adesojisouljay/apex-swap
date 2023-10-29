import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";
import { getSingleCoinData, getMarketChartData } from "../../api/coingecko";
import moment from "moment";
import "./chart.scss";

// Register the required Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale
);

const CoinChart = (props) => {
  const { userWallets } = props;
  const [coinData, setCoinData] = useState();
  const [historyData, setHistoryData] = useState([]);
  const [value, setValue] = useState("tether");

  useEffect(() => {
    // Fetch chart data when component mounts and when the selected coin changes
    chartData();
  }, [value]); // Watch for changes in the 'value' state

  const chartData = async () => {
    const chartData = await getMarketChartData(value);
    const prices = chartData?.data?.prices;
    const coinChartData = prices?.map((price) => ({
      x: price[0],
      y: price[1].toFixed(2),
    }));
    setHistoryData(coinChartData);
  };

  useEffect(() => {
    // Fetch coin data when component mounts and when the selected coin changes
    marketData(value);
  }, [value]); // Watch for changes in the 'value' state

  const marketData = async (coin) => {
    const data = await getSingleCoinData(coin);
    setCoinData(data);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20, // Adjust left padding
        right: 20, // Adjust right padding
        top: 20, // Adjust top padding
        bottom: 20, // Adjust bottom padding
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM DD",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  const data = {
    labels: historyData?.map((value) => moment(value?.x)),
    datasets: [
      {
        // fill: true,
        tension: 0.4,
        backgroundColor: "#581329",
        borderColor: "#581329",
        borderWidth: 2,
        pointRadius: 0,
        label: value === "hive_dollar" ? "Hbd" : value.toUpperCase(),
        data: historyData?.map((val) => val.y),
      },
    ],
  };

  return (
    <div className="chart">
      <div className="chart-container">
        <div className="chart-left">
          <div className="chart-heading">
            <h2>Coin Chart</h2>
          </div>
          <div className="info">
            <div className="coin">
              <img src={coinData?.image} alt={coinData?.name} />
              <select
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                value={value}
              >
                <option value="hive">Hive</option>
                <option value="hive_dollar">Hbd</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="tether">Usdt</option>
              </select>
            </div>
            <div className="detail">
              <div className="each-detail">
                <span>Current Price:</span>
                <span>
                  ${coinData?.current_price ? coinData?.current_price : 0.00}
                </span>
              </div>
              <div className="each-detail">
                <span>Change:</span>
                <span
                  style={{
                    color:
                      coinData?.price_change_percentage_24h < 0
                        ? "red"
                        : "green",
                  }}
                >
                  {`${coinData?.price_change_percentage_24h ? coinData?.price_change_percentage_24h : 0.00}%`}
                </span>
              </div>
              <div className="each-detail">
                <span>Market Cap:</span>
                <span>
                  ${coinData?.market_cap ? coinData?.market_cap : 0.00}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          <div className="chart-detail">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinChart;
