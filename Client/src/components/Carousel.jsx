
import React, { useState, useEffect, useRef } from "react";
// 1. Import the CSS module file
import styles from "./Carousel.module.css";
import { TopHeadlines } from "../APIs/TopHeadlines"; // Assuming you might use this later

import { ChevronLeft, ChevronRight } from "lucide-react";

// const data =  [
//     {
//         "title": "Donald Trump says 'time to get rich' as Dow Jones crash sparks recession fears",
//         "description": "Following President Trump's tariffs, US markets plummet, with a $6 trillion loss affecting investments by Americans.",
//         "content": "The United States markets are reeling from the shock of the reciprocal tariffs announced by President Trump on April 2. The markets are reportedly going through their worst crash since Covid, with Wall Street going into a free fall for the second day... [3375 chars]",
//         "url": "https://www.hindustantimes.com/world-news/us-news/donald-trump-time-to-get-rich-dow-jones-crash-recession-fears-us-market-wall-street-crash-101743820709690.html",
//         "image": "https://www.hindustantimes.com/ht-img/img/2025/04/05/1600x900/Donald_Trump_1743587280239_1743821130935.jpg",
//         "publishedAt": "2025-04-05T03:13:06Z",
//         "source": {
//             "name": "Hindustan Times",
//             "url": "https://www.hindustantimes.com"
//         }
//     },
//     {
//         "title": "Trump's 'Liberation Day' tariffs wipe $5 trillion off Wall Street",
//         "description": "This past week witnessed severe turmoil in the global economy, driven by escalating trade tensions between the U.S. and China. Significant losses in U.S. stock markets, the highest tariffs in over a century, and rising recession fears characterized this pivotal period, prompting investors and policymakers to brace for further volatility.",
//         "content": "Live Events\n(You can now subscribe to our\n(You can now subscribe to our ETMarkets WhatsApp channel\nBears, fears and tearsOne of the most pivotal weeks in years - even decades - for the global economy closed on Friday to the sound of the Nasdaq crashi... [4703 chars]",
//         "url": "https://economictimes.indiatimes.com/markets/stocks/news/trumps-liberation-day-tariffs-wipe-5-trillion-off-wall-street/articleshow/119998014.cms?from=mdr",
//         "image": "https://img.etimg.com/thumb/msid-119998104,width-1200,height-630,imgsize-137776,overlay-etmarkets/articleshow.jpg",
//         "publishedAt": "2025-04-05T00:56:51Z",
//         "source": {
//             "name": "The Economic Times",
//             "url": "https://m.economictimes.com"
//         }
//     },
//     {
//         "title": "‘Tariffs here to stay’: Trump says 'big business' not worried as markets lose $5 trillion",
//         "description": "US News: President Donald Trump disregarded market turmoil caused by new tariffs and reassured the public that his trade policies would ultimately benefit the",
//         "content": "(File photo)\nUS President Donald Trump brushed off market chaos on Friday and doubled down on his aggressive trade stance, claiming it will ultimately supercharge the American economy.Writing on Truth Social, Trump said: “Big business is not worried ... [2107 chars]",
//         "url": "https://timesofindia.indiatimes.com/world/us/tariffs-here-to-stay-trump-says-big-business-not-worried-as-markets-lose-5-trillion/articleshow/119996500.cms",
//         "image": "https://static.toiimg.com/thumb/msid-119996462,width-1070,height-580,imgsize-26586,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
//         "publishedAt": "2025-04-04T23:56:00Z",
//         "source": {
//             "name": "Times of India",
//             "url": "https://timesofindia.indiatimes.com"
//         }
//     },
//     {
//         "title": "Dow sinks 2000 points on Friday - List of biggest crashes in US history",
//         "description": "The Dow Jones dropped 2,231.07 points, or 5.5%, to 38,314.86 - its biggest decline since June 2020",
//         "content": "The stock market tanked for a second consecutive day Friday after China retaliated to President Donald Trump's reciprocal tariff announcement. The Dow Jones dropped 2,231.07 points, or 5.5%, to 38,314.86 - its biggest decline since June 2020. The ind... [1920 chars]",
//         "url": "https://www.hindustantimes.com/world-news/us-news/dow-sinks-2000-points-on-friday-list-of-largest-crashes-in-us-history-101743797402880.html",
//         "image": "https://www.hindustantimes.com/ht-img/img/2025/04/04/1600x900/Dow_jones_crash_1743800331575_1743800331845.jpg",
//         "publishedAt": "2025-04-04T21:00:44Z",
//         "source": {
//             "name": "Hindustan Times",
//             "url": "https://www.hindustantimes.com"
//         }
//     },
//     {
//         "title": "Donald Trump ‘purposely crashing the stock market’? POTUS shares viral video",
//         "description": "President Donald Trump on Friday shared a video link on Truth Social, which claimed that he was ‘Purposely CRASHING The Market’",
//         "content": "President Donald Trump on Friday shared a video link on Truth Social, which claimed that he was ‘Purposely CRASHING The Market’. The partially AI-generated clip was posted on X by a user named @AmericaPapaBear. Trump did not say why he was sharing th... [2429 chars]",
//         "url": "https://www.hindustantimes.com/world-news/us-news/donald-trump-purposely-crashing-the-stock-market-potus-shares-viral-video-101743795792902.html",
//         "image": "https://www.hindustantimes.com/ht-img/img/2025/04/04/1600x900/Trump_crashing_stock_market_1743797056559_1743797056806.jpg",
//         "publishedAt": "2025-04-04T20:05:05Z",
//         "source": {
//             "name": "Hindustan Times",
//             "url": "https://www.hindustantimes.com"
//         }
//     },
//     {
//         "title": "Electric Bicycle Market Sees Hopeful Future with Juiced Bikes Acquisition",
//         "description": "In a significant development for the electric bicycle industry, Lectric Ebikes has announced its acquisition of Juiced Bikes, a pioneering brand that",
//         "content": "In a significant development for the electric bicycle industry, Lectric Ebikes has announced its acquisition of Juiced Bikes, a pioneering brand that played a crucial role in shaping the e-bike market in the United States.\nFounded in 2009, Juiced Bik... [1815 chars]",
//         "url": "https://en.softonic.com/articles/electric-bicycle-market-sees-hopeful-future-with-juiced-bikes-acquisition",
//         "image": "https://articles-img.sftcdn.net/t_article_cover_xl/auto-mapping-folder/sites/3/2025/04/Juiced-Bikes-Acquisition.jpg",
//         "publishedAt": "2025-04-04T19:27:14Z",
//         "source": {
//             "name": "Softonic",
//             "url": "https://en.softonic.com"
//         }
//     },
//     {
//         "title": "575% dividend per share: IT company announces FIRST-EVER cash reward - Check record date, payout timeline",
//         "description": "Dividend stock: An IT stock will soon trade ex-date for a 575 per cent dividend payout for its shareholders. This is the first interim dividend by the company for FY25 that debuted on the stock exchanges in February. The IT company has also announced the record date for its first ever dividend post listing.",
//         "content": "Dividend stock : An IT stock will soon trade ex-date for a 575 per cent dividend payout for its shareholders. This is the first interim dividend by the company for FY25 that debuted on the stock exchanges in February. Also, the company has set the pa... [2280 chars]",
//         "url": "https://www.etnownews.com/markets/575-dividend-per-share-it-company-announces-first-ever-cash-reward-record-date-on-article-151350052",
//         "image": "https://images.etnownews.com/thumb/msid-151350052,updatedat-1743788357889,width-1280,height-720,resizemode-75/151350052.jpg",
//         "publishedAt": "2025-04-04T17:27:30Z",
//         "source": {
//             "name": "ET Now",
//             "url": "https://www.etnownews.com"
//         }
//     },
//     {
//         "title": "Pi Network Price Crash: Generational Opportunity After Banxa Integration",
//         "description": "Find out why the Pi Network price may be a generational buying opportunity as integrations start and after forming a falling wedge pattern.",
//         "content": "Pi Network price has plummeted by 82% from its February highs, leaving pioneers poorer and disappointed. Buyers have avoided the coin amid major challenges, including heightened dilution fears and a lack of exchange listings. However, this Pi coin pr... [3573 chars]",
//         "url": "https://coingape.com/markets/pi-network-price-crash-generational-opportunity-after-banxa-integration/",
//         "image": "https://coingape.com/wp-content/uploads/2025/04/Pi-Network-Price-Crash-Generational-Buying-Opportunity-After-Banxa-Integration.webp",
//         "publishedAt": "2025-04-04T16:22:18Z",
//         "source": {
//             "name": "CoinGape",
//             "url": "https://coingape.com"
//         }
//     },
//     {
//         "title": "Piyush Goyal slams Congress after startup remark triggered row: 'Manufacturing controversy'",
//         "description": "Goyal asked the Indian startup community to shift their focus from grocery delivery to high tech sector like semiconductor, machine learning, robotics, and AI | Latest News India",
//         "content": "Union commerce and industry minister Piyush Goyal on Friday accused the Congress of misleading Indian startups by “misinterpreting” his message at the Startup Mahakumbh. Union Commerce and Industry Minister Piyush Goyal attends the inauguration of 2n... [1997 chars]",
//         "url": "https://www.hindustantimes.com/india-news/piyush-goyal-slams-congress-after-startup-remark-triggered-row-manufacturing-controversy-101743780817083.html",
//         "image": "https://www.hindustantimes.com/ht-img/img/2025/04/04/1600x900/Piyush_Goyal_1743780812237_1743780812560.jpg",
//         "publishedAt": "2025-04-04T16:08:15Z",
//         "source": {
//             "name": "Hindustan Times",
//             "url": "https://www.hindustantimes.com"
//         }
//     },
//     {
//         "title": "Vietnam first to fall in face of Trump tariffs. Will other countries follow?",
//         "description": "World: US president Donald Trump said that Lam said that Vietnam wants to cut their tariffs to zero if they are able to make an agreement with the US.",
//         "content": "Days after US President Donald Trump announced tariffs, Vietnam surrendered on Friday (April 4) and asked the US to cut their tariffs down to ZERO, during Trump's call with General Secretary of the Communist Party of Vietnam, To Lam.\nAdvertisment\nThe... [1970 chars]",
//         "url": "https://www.wionews.com/world/vietnam-first-to-fall-in-face-off-trump-tariffs-will-other-countries-follow-8926949",
//         "image": "https://img-cdn.thepublive.com/fit-in/1200x675/wion/media/media_files/2025/04/04/wnVTa3f7SJzgazCyikrD.png",
//         "publishedAt": "2025-04-04T15:49:39Z",
//         "source": {
//             "name": "Wion",
//             "url": "https://www.wionews.com"
//         }
//     }
// ]

export const Carousel = () => {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideInterval = useRef(null);

    // Fetch articles on mount (using static data for now)
    useEffect(() => {
        // Simulating API fetch delay if needed, otherwise just set
        const fetchNews = async () => {
            const apiData = await TopHeadlines();
            setArticles(apiData ? apiData.slice(0, 5) : []); // show top 5 articles from API
        };
        setArticles(articles.slice(0, 5)); // Use static data
        fetchNews();
    }, []);

    // Auto-slide logic
    const startAutoSlide = () => {
        // Clear any existing interval before starting a new one
        stopAutoSlide();
        slideInterval.current = setInterval(() => {
            nextSlide();
        }, 4000); // Slide every 4 seconds
    };

     const stopAutoSlide = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
            slideInterval.current = null; // Clear ref after interval is cleared
        }
    };

    useEffect(() => {
        // Start sliding only if there are articles and more than one slide
        if (articles.length > 1) {
            startAutoSlide();
        }
        // Cleanup function to stop interval when component unmounts or articles change
        return () => stopAutoSlide();
         // Rerun effect if articles change
         // Note: Since articles are set once, this primarily handles cleanup on unmount
    }, [articles.length]); // Depend on articles.length to restart if it changes


    const nextSlide = () => {
        if (articles.length > 0) {
             setCurrentIndex((prev) => (prev + 1) % articles.length);
        }
    };
    const prevSlide = () => {
         if (articles.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
         }
    };

     const goToSlide = (index) => {
        setCurrentIndex(index);
        // Optional: Reset auto-slide timer when manually changing slide
        // startAutoSlide();
    };

    // Handle loading state
    if (articles.length === 0) {
        // Note: These utility classes might be from Tailwind or similar.
        // CSS Modules won't scope these unless defined within the module.
        // Keep as is if using a global utility CSS framework.
        return <p className="text-center p-4">Loading news...</p>;
    }

    const current = articles[currentIndex];

    return (
        // 2. Use the imported styles object for class names
        <div
            className={styles.carouselContainer} // Use styles.carouselContainer
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
        >
            <button
                className={`${styles.carouselArrow} ${styles.left}`} // Combine classes using template literal
                onClick={prevSlide}
                aria-label="Previous slide" // Accessibility
            >
                <ChevronLeft size={32} />
            </button>

            {/* Preload next image for smoother transition (optional but good practice) */}
            {articles.length > 1 && (
                <link rel="preload" as="image" href={articles[(currentIndex + 1) % articles.length].image} />
            )}

            {/* Render only the current slide */}
            <div className={styles.carouselSlide} key={currentIndex}> {/* Add key for transitions if needed */}
                {current.image ? (
                    <img src={current.image} alt={current.title || 'News image'} className={styles.carouselImage} /> // Use styles.carouselImage
                ) : (
                    <div className={styles.imagePlaceholder}>No Image</div> // Optional: Add placeholder style
                )}
                <div className={styles.carouselText}> {/* Use styles.carouselText */}
                    <h2>{current.title || "No Title"}</h2>
                    {/* Note: These utility classes might be global. Keep as is or create module equivalents */}
                    <p className="text-sm text-gray-200 mb-2">{new Date(current.publishedAt).toLocaleString()}</p>
                    <p>{current.description || "No description available."}</p>
                    {current.url && (
                        <a
                           href={current.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           // Note: These utility classes might be global. Keep as is or create module equivalents
                           className="text-yellow-300 underline mt-2 inline-block"
                        >
                            Read more
                        </a>
                    )}
                </div>
            </div>


            <button
                className={`${styles.carouselArrow} ${styles.right}`} // Combine classes
                onClick={nextSlide}
                aria-label="Next slide" // Accessibility
            >
                <ChevronRight size={32} />
            </button>

            <div className={styles.carouselDots}> {/* Use styles.carouselDots */}
                {articles.map((_, idx) => (
                    <button // Use button for better accessibility
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`${styles.dot} ${idx === currentIndex ? styles.active : ""}`} // Combine base and conditional active class
                        onClick={() => goToSlide(idx)} // Use specific function
                    ></button> // Self-closing span changed to button for semantics
                ))}
            </div>
        </div>
    );
};