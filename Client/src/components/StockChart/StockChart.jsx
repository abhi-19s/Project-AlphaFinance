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
  CategoryScale, // Keeping CategoryScale as it was in the original code
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
// Removed old CSS import: import './StockChart.css';
// Added CSS Module import
import styles from './StockChart.module.css';
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
  CategoryScale // Keeping CategoryScale registration
);

const StockChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const { state } = useLocation();
  const name = state?.name || ''; // Original logic for name

  // Original useEffect logic
  useEffect(() => {
    if (!name) return;

    const fetchStockData = async () => {
      setError(null);
      setChartData(null);
      setLatestPrice(null);
      setPrevPrice(null);

      try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&interval=5min&apikey=1T217SKMSA9A7F00`; // Original URL

        const response = await axios.get(url);
        const timeSeries = response.data['Time Series (5min)'];

        if (!timeSeries) {
          throw new Error('Invalid stock symbol or API error.');
        }

        // Original data processing logic
        const labels = Object.keys(timeSeries).reverse();
        const closePrices = labels.map(t => parseFloat(timeSeries[t]['4. close']));
        const volumes = labels.map(t => parseInt(timeSeries[t]['5. volume']));

        const len = closePrices.length;
        // Original price setting logic
        if (len > 0) {
            setLatestPrice(closePrices[len - 1]);
        }
        if (len > 1) {
            setPrevPrice(closePrices[len - 2]);
        }


        setChartData({
          labels, // Using original string labels
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

  // Original price change calculation
  const priceChangePercent =
    latestPrice !== null && prevPrice !== null && prevPrice !== 0 // Added check for prevPrice not being 0
      ? (((latestPrice - prevPrice) / prevPrice) * 100).toFixed(2)
      : null;

  // Note: priceColor variable wasn't used in the original JSX, so keeping it as is
  const priceColor =
    priceChangePercent > 0 ? 'green' : priceChangePercent < 0 ? 'red' : 'gray';

  // Original chart options
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
        type: 'time', // Keeping time scale as it's registered
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
    // Apply styles.chartWrapper to the main container
    <div className={styles.chartWrapper}>
      {error ? (
        // Apply styles.errorMessage
        <div className={styles.errorMessage}>⚠️ {error}</div>
      ) : !chartData ? (
        // Apply styles.loadingMessage
        <div className={styles.loadingMessage}>⏳ Loading chart data...</div>
      ) : (
        <>
          {/* Apply styles.stockInfo */}
          <div className={styles.stockInfo}>
            <h2>{name.toUpperCase()}</h2>
            <p>
              Latest Price: <strong>${latestPrice?.toFixed(2) ?? 'N/A'}</strong>{' '}
              {/* Apply styles.priceChangeBox and conditional up/down/same styles */}
              {priceChangePercent !== null && ( // Render span only if percent is calculated
                 <span
                    className={
                      `${styles.priceChangeBox} ${ // Base class
                         priceChangePercent > 0
                           ? styles.up // Up class from module
                           : priceChangePercent < 0
                             ? styles.down // Down class from module
                             : styles.same}` // Same class from module
                     }
                 >
                    {priceChangePercent > 0 ? '+' : ''}
                    {priceChangePercent}%
                </span>
              )}
            </p>
          </div>
          {/* Apply styles.chartCard */}
          <div className={styles.chartCard}>
            <Line data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default StockChart;