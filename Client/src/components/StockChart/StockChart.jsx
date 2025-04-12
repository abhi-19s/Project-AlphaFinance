import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
import './StockChart.css';
import { useLocation } from 'react-router';

ChartJS.register(
  LineElement,
  BarElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const StockChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const { state } = useLocation();
  const name = state?.name || '';

  useEffect(() => {
    if (!name) return;

    const fetchStockData = async () => {
      setError(null);
      setChartData(null);
      setLatestPrice(null);
      setPrevPrice(null);

      try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=5min&apikey=1T217SKMSA9A7F00`;

        const response = await axios.get(url);
        const timeSeries = response.data['Time Series (5min)'];

        if (!timeSeries) {
          throw new Error('Invalid stock symbol or API error.');
        }

        const labels = Object.keys(timeSeries).reverse();
        const closePrices = labels.map(t => parseFloat(timeSeries[t]['4. close']));
        const volumes = labels.map(t => parseInt(timeSeries[t]['5. volume']));

        const len = closePrices.length;
        setLatestPrice(closePrices[len - 1]);
        setPrevPrice(closePrices[len - 2]);

        setChartData({
          labels,
          datasets: [
            {
              type: 'line',
              label: 'Close Price (USD)',
              data: closePrices,
              borderColor: '#00c853',
              backgroundColor: 'rgba(0, 200, 83, 0.1)',
              tension: 0.3,
              yAxisID: 'y',
            },
            {
              type: 'bar',
              label: 'Volume',
              data: volumes,
              backgroundColor: 'rgba(33, 150, 243, 0.3)',
              borderColor: '#2196f3',
              borderWidth: 1,
              yAxisID: 'y1',
            },
          ],
        });
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    };

    fetchStockData();
  }, [name]);

  const priceChangePercent =
    latestPrice && prevPrice
      ? (((latestPrice - prevPrice) / prevPrice) * 100).toFixed(2)
      : null;

  const priceColor =
    priceChangePercent > 0 ? 'green' : priceChangePercent < 0 ? 'red' : 'gray';

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        labels: {
          color: 'white', // Make legend text white
        },
      },
      title: {
        display: true,
        text: `${name.toUpperCase()} Intraday Stock Chart (5min)`,
        color: 'white', // Chart title color
      },
      tooltip: {
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: '#333',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Time',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Volume',
          color: 'white',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      {error ? (
        <div className="error-message">⚠️ {error}</div>
      ) : !chartData ? (
        <div className="loading-message">⏳ Loading chart data...</div>
      ) : (
        <>
          <div className="stock-info">
            <h2>{name.toUpperCase()}</h2>
            <p>
              Latest Price: <strong>${latestPrice?.toFixed(2)}</strong>{' '}
              <span
                className={
                  priceChangePercent > 0
                    ? 'price-change-box up'
                    : priceChangePercent < 0
                      ? 'price-change-box down'
                      : 'price-change-box same'
                }
              >
                {priceChangePercent > 0 ? '+' : ''}
                {priceChangePercent}%
              </span>
            </p>
          </div>
          <div className="chart-card">
            <Line data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default StockChart;
