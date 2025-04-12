import React, { useEffect, useState } from 'react';
import './News.css';

function News() {
  const [data, setData] = useState([]);
  const apiKey = 'YOUR_GUARDIAN_API_KEY'; // Replace with your actual API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://content.guardianapis.com/search?api-key=2d0a8caa-d7f5-4b46-afe7-c1c12e99ba28`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        if (jsonResponse.response && jsonResponse.response.results) {
          setData(jsonResponse.response.results.slice(0, 4));
        } else {
          console.error('Invalid JSON response structure:', jsonResponse);
          setData([]);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setData([]);
      }
    };

    fetchNews();
  }, [apiKey]);

  return (
    <div className="news-section">
      <h3 className="latest-news-header">Latest</h3>
      {data.length > 0 ? (
        data.map((item, idx) => (
          <div key={idx} className={`news-item slide-in-right delay-${idx}`}>
            <p className="news-headline">
              <a href={item.webUrl} target="_blank" rel="noopener noreferrer">
                {item.webTitle}
              </a>
            </p>
            <p className="news-type">{item.sectionName}</p>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default News;