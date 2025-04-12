// DefaultMarket.jsx
import React from "react";
import Stock from "../Market/Stock/Stock.jsx";
import Nifty50 from "../Market/Nifty/Nifty50.jsx";

export const DefaultMarket = () => {
    return (
        <>
            <Stock />
            <Nifty50 />
        </>
    );
};
