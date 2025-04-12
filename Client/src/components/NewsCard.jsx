// import React, { useState, useEffect } from "react";
// import "./NewsCard.css";
// import { OtherNews } from "../APIs/OtherNews";

// export const NewsCards = () => {
//     const [articles, setArticles] = useState([]);
//     const [visibleCount, setVisibleCount] = useState(10); // Show 5 initially

//     useEffect(() => {
//         const fetchOtherNews = async () => {
//             const newsData = await OtherNews();
//             setArticles(newsData || []);
//         };
//         fetchOtherNews();
//     }, []);

//     const loadMore = () => {
//         setVisibleCount((prevCount) => prevCount + 5); // Load 5 more on each click
//     };

//     return (
//         <div className="news-list">
//             {articles.slice(0, visibleCount).map((news, index) => (
//                 <div className="news-card" key={index}>
//                     <div className="news-image-container">
//                         {news.urlToImage && (
//                             <img
//                                 src={news.urlToImage}
//                                 alt="News"
//                                 className="news-image"
//                             />
//                         )}
//                     </div>
//                     <div className="news-content">
//                         <h2 className="news-title">{news.title}</h2>
//                         <p className="news-desc">{news.description}</p>
//                         <a
//                             href={news.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="read-more"
//                         >
//                             Read More →
//                         </a>
//                     </div>
//                 </div>
//             ))}

//             {visibleCount < articles.length && (
//                 <div className="load-more-container">
//                     <button className="load-more-btn" onClick={loadMore}>
//                         Load More
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useState, useEffect } from "react";
import styles from "./NewsCard.module.css"; // Ensure this path is correct
import { OtherNews } from "../APIs/OtherNews";

export const NewsCards = () => {
    const [articles, setArticles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        const fetchOtherNews = async () => {
            try {
                const newsData = await OtherNews();
                setArticles(newsData || []);
            } catch (error) {
                console.error("Error fetching other news:", error);
                setArticles([]);
            }
        };
        fetchOtherNews();
    }, []);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    return (
        <div className={styles.newsList}> {/* Use styles.newsList */}
            {articles.slice(0, visibleCount).map((news, index) => (
                <div className={styles.newsCard} key={news.url || index}> {/* Use styles.newsCard */}
                    <div className={styles.newsImageContainer}> {/* Use styles.newsImageContainer */}
                        {news.urlToImage ? (
                            <img
                                src={news.urlToImage}
                                alt={news.title || "News image"}
                                className={styles.newsImage} // Use styles.newsImage
                                onError={(e) => {
                                    // Optionally replace with placeholder div on error
                                    const parent = e.target.parentNode;
                                    e.target.style.display = 'none';
                                    const placeholder = document.createElement('div');
                                    placeholder.className = styles.imagePlaceholder; // Use styles.imagePlaceholder
                                    placeholder.innerText = 'Image not available';
                                    if(parent.getElementsByClassName(styles.imagePlaceholder).length === 0) {
                                        parent.appendChild(placeholder);
                                    }
                                }}
                            />
                        ) : (
                           <div className={styles.imagePlaceholder}>No Image Available</div> // Use styles.imagePlaceholder
                        )}
                    </div>
                    <div className={styles.newsContent}> {/* Use styles.newsContent */}
                        <h2 className={styles.newsTitle}>{news.title || "No Title Available"}</h2> {/* Use styles.newsTitle */}
                        {/* ADD AUTHOR HERE */}
                        {news.author && ( // Check if author exists
                           <p className={styles.newsAuthor}>By: {news.author}</p> // Use styles.newsAuthor
                        )}
                        <p className={styles.newsDesc}>{news.description || "No Description Available"}</p> {/* Use styles.newsDesc */}
                        {news.url && (
                            <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.readMore} // Use styles.readMore
                            >
                                Read More →
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {visibleCount < articles.length && (
                <div className={styles.loadMoreContainer}> {/* Use styles.loadMoreContainer */}
                    <button className={styles.loadMoreBtn} onClick={loadMore}> {/* Use styles.loadMoreBtn */}
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};