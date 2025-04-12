# 📰 React News Web App

This is a responsive React-based News Web Application that displays trending and categorized news fetched using the [NewsAPI](https://newsapi.org). The application features a live auto-scrolling carousel, a section for older news, and a dedicated page for finance-related news in India.

---

## 📌 Features

### 🔥 Trending News Carousel
- Displays the **latest 5–6 trending news headlines**.
- Auto-scrolls using a carousel component (`react-bootstrap` or `react-slick`).
- Updates **automatically every 50 minutes**.
- Fetched via `top-headlines` endpoint with filtering by country or category.

### 🕰️ Older News Section
- Shows **older but relevant news**.
- Updated **every 4 to 6 hours**.
- Presented in a card/grid layout for easy readability.
- Uses `/everything` endpoint with optional `from` and `to` date filters.

### 💰 Finance News Page
- A separate route (`/finance-news`) that displays **Indian finance and stock-related news**.
- Queries topics such as `finance`, `stock`, `business`, etc., with a focus on India.
- Refreshes content every 2–3 hours.

---

## 🧰 Tech Stack

- **React**
- **React Router DOM** – for page routing
- **Axios** – for making API requests
- **React-Bootstrap / React-Slick** – for carousel and UI components
- **CSS Modules or Tailwind CSS** – for styling (flexible)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-web-app.git
cd news-web-app
