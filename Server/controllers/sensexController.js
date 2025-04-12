import { default as yahooFinance } from "yahoo-finance2";

export const getSensex = async (req, res) => {
  try {
    const symbol = '^BSESN'; // Sensex symbol
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const data = await yahooFinance.historical(symbol, {
      period1: formatDate(oneYearAgo), // 1 year ago from today
      period2: formatDate(today), // today's date
      interval: "1d", // Daily data
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
};
