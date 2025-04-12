import './Portfolio.css';
import illustration from '../Portfolio/mg.png'
import Portfoliodetail from './Portfoliodetail/Portfoliodetail'

export const Portfolio = () => {
  return (
    <div className="portfolio-section">
      <div className="portfolio-text">
        <h2>Your personal <span>Portfolio Manager</span></h2>
        <ul>
          <li>Hassle-free & automated transaction imports</li>
          <li>Powerful performance analytics and comparisons</li>
          <li>Detailed & ready to file tax statement</li>
          <li>Automated capturing of all dividends, bonuses, rights, and splits</li>
          <li>Manage and track your and your family's investments in one place</li>
        </ul>
        <p>
          This undoubtedly makes it India's best portfolio management system. <br />
          Experience the magic yourself!
        </p>
      </div>
      <div className="portfolio-image">
        <img src={illustration} alt="Portfolio Illustration" />
      </div>
      <div>
        <h2>
        </h2>
      </div>
      <Portfoliodetail/>
    </div>
  );
};

