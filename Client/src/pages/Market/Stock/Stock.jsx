import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Stock.css"; // Import CSS file for styling

const API_KEY = "cvmoi69r01ql90pv93b0cvmoi69r01ql90pv93bg";  // 🔑 Replace with your API key
const BASE_URL = "https://finnhub.io/api/v1/quote";


const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc. (Google)" },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "NFLX", name: "Netflix, Inc." },
    { symbol: "TEAM", name: "Atlassian Corporation" },
    { symbol: "TSLA", name: "Tesla, Inc." }
];

function Stock() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    stocks.map(stock =>
                        axios.get(BASE_URL, {
                            params: { symbol: stock.symbol, token: API_KEY }
                        })
                    )
                );

                // Store data in an object {symbol: stockData}
                const stockData = {};
                responses.forEach((response, index) => {
                    stockData[stocks[index].symbol] = response.data;
                });

                setData(stockData);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch stock data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <h1>Market Trends</h1>
        <h2>Stock of some various listed companies</h2>

        <div className="market-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <div className="stock-list">
                    {stocks.map(({ symbol, name }) => (
                        <div className="stock-item" key={symbol}>
                            <div className="stock-info">
                                <span className="stock-symbol">{symbol}</span>
                                <span className="stock-name">{name}</span>
                            </div>
                            <div className="stock-price">
                                <span className="price">${data[symbol]?.c.toFixed(2)}</span>
                                <span className={`change ${data[symbol]?.dp > 0 ? "green" : "red"}`}>
                                    {data[symbol]?.dp > 0 ? "+" : ""}
                                    {data[symbol]?.d?.toFixed(2)} ({data[symbol]?.dp?.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}

export default Stock;
