import React from 'react';
import { Hhome } from './Hstock/Hhome';
import Sensex from './Sensex/Sensex';
import News from './Hnews/News';
import './Hnews/Edu.css';

export const Home = () => {
  return (
    <>
      <Hhome />
      <Sensex />
      <Edu />
    </>
  );
};

const Edu = () => {
  return (
    <div className="edu-container">
      <div className="edu-header">
        <span className="edu-icon">📚</span>
        <h2 className="edu-heading">Finance Related Issues</h2>
      </div>
      <div className="edu-content">
        <div className="edu-item">
          <div className="edu-item-header">
            <span className="edu-item-icon">💥</span>
            <h3>Financial Crisis</h3>
          </div>
          <a
            href="https://en.wikipedia.org/wiki/Financial_crisis"
            target="_blank"
            rel="noopener noreferrer"
          >
            More about finance issues...
          </a>
        </div>

        <div className="edu-item">
          <div className="edu-item-header">
            <img src="./REUTERS.jpg" alt="Reuters Icon" className="edu-img-icon" />
            <h3>Refer to News Website</h3>
          </div>
          <a
            href="https://www.reuters.com/business/finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reuters...
          </a>
        </div>

        <div className="edu-item">
          <div className="edu-item-header">
            <img src="./BLOOMBERG.png" alt="Bloomberg Icon" className="edu-img-icon" />
            <h3>Bloomberg Economics</h3>
          </div>
          <a
            href="https://www.bloomberg.com/economics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Economic Effect...
          </a>
        </div>
      </div>
    </div>
  );
};

export default Edu;