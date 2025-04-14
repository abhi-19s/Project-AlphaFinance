import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Crypto.css";

const Crypto = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const prevPrices = useRef({});

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
            },
          }
        );

        const updatedCoins = response.data.slice(0, 20).map((coin) => {
          const prev = prevPrices.current[coin.id];
          const flashClass =
            prev !== undefined
              ? coin.current_price > prev
                ? "flash-green"
                : coin.current_price < prev
                ? "flash-red"
                : ""
              : "";

          prevPrices.current[coin.id] = coin.current_price;

          return { ...coin, flashClass };
        });

        setCoins(updatedCoins);
      } catch (err) {
        setError("Failed to fetch crypto data");
      }
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 6000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crypto-container">
      <h1>Live Crypto Prices</h1>
      {error && <p className="error">{error}</p>}
      <div className="crypto-table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className={coin.flashClass}>
                <td>
                  <img src={coin.image} alt={coin.name} width="25" />
                </td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>{coin.name}</td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  style={{
                    color: coin.price_change_24h < 0 ? "red" : "lime",
                  }}
                >
                  {coin.price_change_24h?.toFixed(4)}
                </td>
                <td
                  style={{
                    color:
                      coin.price_change_percentage_24h < 0 ? "red" : "lime",
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crypto;

