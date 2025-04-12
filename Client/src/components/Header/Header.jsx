import styles from './header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        if (data.trim()) {
            navigate(`/stock-result`, { state: { name: data.trim().toUpperCase() } });
        }
    };

    const handleChange = (e) => {
        setData(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && data.trim()) {
            navigate(`/stock-result`, { state: { name: data.trim().toUpperCase() } });
        }
    };

    return (
        <>
            {/* Top Header */}
            <div className={styles['top-header']}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <img src="./Logo.png" alt="AlphaFinance Logo" className={styles['logo-img']} />
                    </NavLink>
                </div>

                <div className={styles['search-bar']}>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleClick}>Search</button>
                </div>

                <div className={styles['auth-links']}>
                    <NavLink
                        to="/sign-in"
                        className={({ isActive }) =>
                            isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                        }
                    >
                        Sign In
                    </NavLink>
                    <NavLink
                        to="/sign-up"
                        className={({ isActive }) =>
                            isActive ? `${styles.navlink} ${styles.active} ${styles['signup-btn']}` : `${styles.navlink} ${styles['signup-btn']}`
                        }
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>

            {/* Navbar */}
            <nav className={styles.navbar}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/portfolio"
                    className={({ isActive }) =>
                        isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                    }
                >
                    Portfolio
                </NavLink>
                <NavLink
                    to="/market"
                    className={({ isActive }) =>
                        isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                    }
                >
                    Market
                </NavLink>
                <NavLink
                    to="/news"
                    className={({ isActive }) =>
                        isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                    }
                >
                    News
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
                    }
                >
                    About
                </NavLink>
            </nav>
        </>
    );
};
