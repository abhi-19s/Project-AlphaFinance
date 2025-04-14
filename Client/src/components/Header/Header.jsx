import styles from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";

export const Header = () => {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // NEW

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.error("Username not found in local storage.");
    }
  }, []);

  const handleClick = () => {
    if (data.trim()) {
      navigate(`/stock-result`, { state: { name: data.trim().toUpperCase() } });
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && data.trim()) {
      navigate(`/stock-result`, { state: { name: data.trim().toUpperCase() } });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("username");
    setUsername("");
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <>
      {/* Top Header */}
      <div className={styles["top-header"]}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img
              src="./Logo.png"
              alt="AlphaFinance Logo"
              className={styles["logo-img"]}
            />
          </NavLink>
        </div>

        <div className={styles["search-bar"]}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleClick}>Search</button>
        </div>

        <div className={styles["auth-links"]}>
          {username ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Hey, {username}
              </NavLink>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className={styles.navlink}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active}`
                    : styles.navlink
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navlink} ${styles.active} ${styles["signup-btn"]}`
                    : `${styles.navlink} ${styles["signup-btn"]}`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
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
      {showLogoutConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to logout?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

