import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import "./App.css";

import {About} from "./pages/About/About";
import {Home} from "./pages/Home/Home";
import {Market} from "./pages/Market/Market";
import { News } from "./pages/News/News";
import {AppLayout} from "./components/AppLayout";
import {Portfolio} from "./pages/Portfolio/Portfolio";
import { ErrorPage } from "./pages/ErrorPage";
import StockExchanges from "./pages/Market/StockExchanges/StockExchanges"
import IPO from "./pages/Market/IPOs/IPO";
import Crypto from './pages/Market/Crypto/Crypto'
import {DefaultMarket} from "./pages/Market/DefaultMarket.jsx";
import StockChart from "./components/StockChart/StockChart.jsx"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const router = createBrowserRouter([
    {
        path: "/",
        element : <AppLayout/>,
        errorElement : <ErrorPage/>,
        children:[
            {
                path: "/",
                element:<Home />,
            },
            {
                path: "/about",
                element:<About />,
            },
            {
                path: "/news",
                element:<News/>,
            },
            {
                path: "/portfolio",
                element:<Portfolio/>,
            },
            {
                path: "/market",
                element:<Market/>,
                children : [
                    {
                        path: "crypto",
                        element:<Crypto/>,
                    },
                    {
                        path: "ipo",
                        element:<IPO/>,
                    },
                    {
                        path: "stock-exchange",
                        element:<StockExchanges/>,
                    }, { index: true, element: <DefaultMarket /> },
                ]
            },
            {
                path:"/stock-result",
                element:<StockChart/>
            }
        ],
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },    
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;