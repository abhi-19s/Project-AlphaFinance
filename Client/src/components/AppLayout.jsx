import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import { Outlet } from "react-router";



export const AppLayout = () => {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}

