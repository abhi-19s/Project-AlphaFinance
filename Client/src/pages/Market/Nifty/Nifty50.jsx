import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "./Nifty50.css";

const API_KEY = "SmSQFxKd5Og0BQXMz1X2JE0D_4axIQaL";
const NIFTY_50_API = `https://api.polygon.io/v2/aggs/ticker/NFTY/prev?apiKey=${API_KEY}`;

const Nifty50 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(NIFTY_50_API);
        setData(res.data.results[0]);
      } catch (err) {
        setError("Failed to fetch Nifty 50 data");
      }
    };
    fetchData();
  }, []);

  const change = data ? (data.c - data.o).toFixed(2) : 0;
  const changeColor = change >= 0 ? "#2ecc71" : "#e74c3c";

  return (
    <div className="nifty-wrapper">
      <motion.div
        className="nifty-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>NIFTY 50 ETF (NFTY)</h2>
        <p className="subtext">Previous day market summary</p>
        {error && <p className="error">{error}</p>}
        {data && (
          <div className="data-grid">
            <div>
              <span>Open:</span>
              <CountUp end={data.o} decimals={2} duration={1.2} />
            </div>
            <div>
              <span>Close:</span>
              <CountUp end={data.c} decimals={2} duration={1.2} />
            </div>
            <div>
              <span>High:</span>
              <CountUp end={data.h} decimals={2} duration={1.2} />
            </div>
            <div>
              <span>Low:</span>
              <CountUp end={data.l} decimals={2} duration={1.2} />
            </div>
            <div>
              <span>Volume:</span>
              <CountUp end={data.v} separator="," duration={1.2} />
            </div>
            <div>
              <span>Trades:</span>
              <CountUp end={data.n} separator="," duration={1.2} />
            </div>
            <div>
              <span>Total Change:</span>
              <CountUp
                end={change}
                decimals={2}
                duration={1.2}
                style={{ color: changeColor }}
              />
              <span className="change-icon" style={{ color: changeColor }}>
                {change >= 0 ? " 🔼" : " 🔽"}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Nifty50;
