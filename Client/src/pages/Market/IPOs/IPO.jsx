import React, { useState } from 'react';
import "./IPO.css";
import axios from "axios";

const IPO = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [activeFAQ, setActiveFAQ] = useState(null);

    const fetchData = async () => {
        if (!query) return;

        try {
            const response = await axios.get(
                `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NSE&apikey=Bplj7Z2cMYJx3amgnhHw9ZKLc2PylUhM`
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            fetchData();
        }
    };

   const toggleFAQ = (index) => {
        setActiveFAQ((prevActiveFAQ) => (prevActiveFAQ === index ? null : index));
    };

    return (
        <div className="financial-container">
            <h1>IPO - Initial Public Offering</h1>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter symbol to get listings"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
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
                    <p>Enter a symbol to fetch results.</p>
                )}
            </div>

            <div className="faq-section">
                <h2>FAQ</h2>
                
                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleFAQ(0)}>
                        <span>What is IPO?</span>
                        <button className={`arrow ${activeFAQ === 0 ? "up" : "down"}`}>&#8595;</button>
                    </div>
                    {activeFAQ === 0 && (
                        <p className="faq-answer open">
                            An IPO, or Initial Public Offering, is a significant financial event where a privately-owned company offers its shares to the public for the first time, thereby becoming a publicly traded company. When a company decides to go public through an IPO, it typically works with investment banks and underwriters to determine the offering price and the number of shares to be issued. IPOs are often used by companies to raise capital for growth and expansion. They also provide an opportunity for early investors and company insiders to sell their shares and realize a return on their investments. However, going public comes with increased regulatory and reporting requirements, as the company is now accountable to its shareholders and the broader investing public. While an IPO can be a significant milestone for a company, providing access to capital and liquidity for its early investors, it also comes with substantial regulatory and market-related responsibilities that can impact the company's operations and long-term growth prospects. Therefore, the decision to go public is a complex one that involves careful consideration of the company's financial position, growth strategy, and readiness for public ownership.
                        </p>
                    )}
                </div>

                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleFAQ(1)}>
                        <span>How does an IPO work?</span>
                        <button className={`arrow ${activeFAQ === 1 ? "up" : "down"}`}>&#8595;</button>
                    </div>
                    {activeFAQ === 1 && (
                        <p className="faq-answer open">
                            During an IPO, the company typically hires investment banks to underwrite the offering. They help determine the initial share price, handle regulatory requirements, and market the shares to potential investors.
                        </p>
                    )}
                </div>

                <div className="faq-item">
                    <div className="faq-question" onClick={() => toggleFAQ(2)}>
                        <span>What are the key stages of an IPO?</span>
                        <button className={`arrow ${activeFAQ === 2 ? "up" : "down"}`}>&#8595;</button>
                    </div>
                    {activeFAQ === 2 && (
                        <p className="faq-answer open">
                            The key stages include preparation (due diligence, financial disclosures), filing (submitting registration documents to regulators), marketing (roadshows to attract investors), pricing (setting the initial share price), and trading (shares listed and traded on a stock exchange).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IPO;

