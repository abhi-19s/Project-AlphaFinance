import React, { useEffect, useState } from "react";
import "./Nifty50.css"; // Import the CSS file
import axios from "axios";
const YOUR_API_KEY = "SmSQFxKd5Og0BQXMz1X2JE0D_4axIQaL";
const NIFTY_50_API = `https://api.polygon.io/v2/aggs/ticker/NFTY/prev?apiKey=${YOUR_API_KEY}`;


const Nifty50 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(NIFTY_50_API);
        setData(response.data);
      } catch (err) {
        setError(err.response?.statusText || "Failed to fetch Nifty 50 data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>First Trust India NIFTY 50 Equal Weight ETF (NFTY)</h2>
      <p>Market Data for previous day</p>
      {error && <p className="error">Error: {error}</p>}
      {data && data.results && (
        <ul>
          <li><span>Opening Price:</span> {data.results[0].o}</li>
          <li><span>Closing Price:</span> {data.results[0].c}</li>
          <li><span>Highest Price:</span> {data.results[0].h}</li>
          <li><span>Lowest Price:</span> {data.results[0].l}</li>
          <li><span>Trading Volume:</span> {data.results[0].v}</li>
          <li><span>Number of Trades:</span> {data.results[0].n}</li>
          <li><span>Total Change:</span> {data.results[0].c - data.results[0].o}</li>
        </ul>
      )}
    </div>
  );
};

export default Nifty50;
