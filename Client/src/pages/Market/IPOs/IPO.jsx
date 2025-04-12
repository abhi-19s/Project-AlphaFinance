import React, { useState } from "react";
import "../IPOs/IPO.css";
import axios from "axios";

const IPO = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    const fetchData = async () => {
        if (!query) return;

        try {
            const response = await axios.get(
                `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NSE&apikey=Bplj7Z2cMYJx3amgnhHw9ZKLc2PylUhM`,
                // {
                //     params: {
                //         query: query,
                //         limit: 10,
                //         exchange: "NASDAQ",
                //     },
                // }
            );
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.statusText || "Failed to fetch data");
            setData(null);
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="financial-container">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Search IPOs by Ticker Symbol"
                    value={query}
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Search</button>
            </div>
            <div>
                <h2>Financial Data</h2>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {data ? (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                {item.symbol} - {item.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Enter a ticker symbol to fetch results.</p>
                )}
            </div>
        </div>
    );
};

export default IPO;
