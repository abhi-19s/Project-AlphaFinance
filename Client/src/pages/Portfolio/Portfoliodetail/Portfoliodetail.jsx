import React from "react";
import "./Portfoliodetail.css";

const Portfoliodetail = () => {
  return (
    <>
    <div className="portfolio-container">
      <div className="portfolio-title">Demo PortFolio</div>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Portfolio</th>
            <th>Quantity</th>
            <th>Invest Date</th>
            <th>Invest Price</th>
            <th>Invested Amount</th>
            <th>Current Price</th>
            <th>Overall Gain</th>
            <th>Overall Gain (%)</th>
            <th>Current Value</th>
            <th>CAGR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demo Imported</td>
            <td>50</td>
            <td>16 Feb 2017</td>
            <td>1,458</td>
            <td>₹72,900</td>
            <td>1,986.7</td>
            <td className="green">₹26,435</td>
            <td className="green">36.3%</td>
            <td>₹99,335</td>
            <td>3.9%</td>
          </tr>
          <tr>
            <td>Demo Imported</td>
            <td>200</td>
            <td>02 Feb 2016</td>
            <td>1,255.1</td>
            <td>₹2,51,020</td>
            <td>1,986.7</td>
            <td className="green">₹1,46,320</td>
            <td className="green">58.3%</td>
            <td>₹3,97,340</td>
            <td>5.1%</td>
          </tr>
        </tbody>
      </table>

      <div className="range-buttons">
        <button className="add">+ ADD TO PORTFOLIO</button>
        <button className="sell">- SELL FIFO</button>
      </div>

      <div className="ranges">
        <div className="range-item">
          <h3>1 Week Range</h3>
          <p className="green">↑ 22.85 (1.2%)</p>
          <div className="progress green-progress"><div style={{ width: "90%" }}></div></div>
          <p>1874.05 - 1999.00</p>
        </div>
        <div className="range-item">
          <h3>1 Month Range</h3>
          <p className="green">↑ 100.95 (5.4%)</p>
          <div className="progress green-progress"><div style={{ width: "95%" }}></div></div>
          <p>1826.00 - 1999.00</p>
        </div>
        <div className="range-item">
          <h3>3 Month Range</h3>
          <p className="green">↑ 12.9 (0.7%)</p>
          <div className="progress green-progress"><div style={{ width: "70%" }}></div></div>
          <p>1778.45 - 2079.85</p>
        </div>
        <div className="range-item">
          <h3>1 Year Range</h3>
          <p className="red">↓ -537.6 (-21.3%)</p>
          <div className="progress red-progress"><div style={{ width: "35%" }}></div></div>
          <p>1778.45 - 2844.00</p>
        </div>
      </div>

      <div className="events">
        <div className="event-box">
          <span className="label">PAST EVENT</span> <span className="date">JANUARY 27, 2025</span>
          <h4>Board Meeting - Quarterly Results</h4>
          <p>The latest board meeting for ACC Ltd. took place on 27 Jan 2025, for the purpose of Quarterly Results</p>
        </div>
        <div className="event-box">
          <span className="label">PAST ANNOUNCEMENT</span> <span className="date">MARCH 31, 2025</span>
          <h4>ACC Ltd - 500410 - Shareholder Meeting / Postal Ballot-Scrutinizer's Report</h4>
          <p>
            ACC adani Cement 31st March 2025 National Stock Exchange of India Limited Scrip Code: ACC BSE Limited Scrip
            Code: 500410 Subject: Voting Results and scrutinizer ..
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Portfoliodetail;
