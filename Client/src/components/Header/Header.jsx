import './header.css';
import { Routes, Route, Link } from 'react-router-dom';
import {Market} from '../../pages/Market/Market';
import { NavLink,useNavigate } from 'react-router-dom';
import { About } from '../../pages/About/About';
import { News } from '../../pages/News/News';
import { Home } from '../../pages/Home/Home';
import {useState} from 'react'


export const Header = () => {
    const [data,setData]=useState('');
    const navigate=useNavigate();
    const handleClick=()=>{
        if(data.trim()){
            navigate(`/stock-result`,{state:{name:data.trim().toUpperCase()}});
        }
    }
    const handleChange=(e)=>{
        setData(e.target.value);
    }
    const handleKeyDown = (e)=>{
        if(e.key === 'Enter' && data.trim()){
            navigate(`/stock-result`,{state:{name:data.trim().toUpperCase()}});
        }
    }
    return (
        <>
            {/* Top Header */}
            <div className="top-header">
                <div className="logo">
                    <NavLink to="/">
                        <img src="./Logo.png" alt="AlphaFinance Logo" className="logo-img" />
                    </NavLink>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Search..." onChange={handleChange} onKeyDown={handleKeyDown}/>
                    <button onClick={handleClick}>Search</button>
                </div>

                <div className="auth-links">
                    <NavLink to="/sign-in">Sign In</NavLink>
                    <NavLink to="/sign-up" className="signup-btn">
                        Sign Up
                    </NavLink>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/portfolio">
                    Portfolio
                </NavLink>
                <NavLink to="/market">
                    Market
                </NavLink>
                <NavLink to="/news">
                    News
                </NavLink>
                <NavLink to="/about">
                    About
                </NavLink>
            </nav>
        </>
    );

}
