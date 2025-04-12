import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import { OtherNews } from "../APIs/OtherNews";

export const NewsCards = () => {
    const [articles, setArticles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10); // Show 5 initially

    useEffect(() => {
        const fetchOtherNews = async () => {
            const newsData = await OtherNews();
            setArticles(newsData || []);
        };
        fetchOtherNews();
    }, []);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Load 5 more on each click
    };

    return (
        <div className="news-list">
            {articles.slice(0, visibleCount).map((news, index) => (
                <div className="news-card" key={index}>
                    <div className="news-image-container">
                        {news.urlToImage && (
                            <img
                                src={news.urlToImage}
                                alt="News"
                                className="news-image"
                            />
                        )}
                    </div>
                    <div className="news-content">
                        <h2 className="news-title">{news.title}</h2>
                        <p className="news-desc">{news.description}</p>
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more"
                        >
                            Read More →
                        </a>
                    </div>
                </div>
            ))}

            {visibleCount < articles.length && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={loadMore}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};
