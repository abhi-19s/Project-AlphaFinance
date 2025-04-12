import axios from "axios";


const HeadlineUrl = "https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=in&max=10&apikey=ed022c0d600384cd8357a3fa8db56d70";

export const TopHeadlines = async() => {
  try {
    const response = await axios.get(HeadlineUrl);
    return response.data.articles || [];
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
};



