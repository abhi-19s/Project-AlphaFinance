import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import News from '../Hnews/News';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './Sensex.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const Sensex = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/sensex")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map(item => new Date(item.date).toLocaleDateString());
        const closePrices = data.map(item => item.close);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sensex Close Price',
              data: closePrices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
      })
      .catch((err) => console.error("Failed to load data", err));
  }, []);

  const options = {
    responsive: true,
    animation: {
      duration: 3000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Close Price',
        },
      },
    },
  };

  return (
    <div className="sensex-container">
      <div className="chart-section">
        <h2 className="chart-title">📈 BSE Sensex Chart</h2>
        {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
      </div>
      <div className="news-section">
        <News/>
      </div>
    </div>
  );
};

export default Sensex;
