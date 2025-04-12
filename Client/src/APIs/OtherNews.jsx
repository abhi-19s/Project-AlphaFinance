import axios from "axios";

const OtherNewsUrl = "https://newsapi.org/v2/everything?q=finance&sortBy=popularity&apiKey=4d480d2a13bf4d6e9c4816e5f74e9dc9";

export const OtherNews = async() => {
  try {
    const response = await axios.get(OtherNewsUrl);
    return response.data.articles || [];
  } catch (error) {
    console.error("Error fetching other news:", error);
    return [];
  }
}