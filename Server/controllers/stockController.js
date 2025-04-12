import yahooFinance from "yahoo-finance2";

export const getStockPrice = async (req, res) => {
    try{
        const data = await yahooFinance.quoteSummary(req.params.symbol,{modules: ['price']});
        res.json(data.price);
    }
    catch(err){
        console.error('Backend error:',err);
        res.status(500).json({ error: err.tostring() });
    }
};