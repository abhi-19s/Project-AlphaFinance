import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice.js";
import graphImg from "../assets/vaultt.png.png";
import logo from "../assets/Alphafinancelogo.jpeg";
import styles from "./sign.module.css";
import googleIcon from '../assets/googleicon.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(signInFailure(null));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }

            dispatch(signInSuccess(data));
            if (data && data.user && data.user.username) {
                localStorage.setItem('username', data.user.username);
            } else {
                console.error('Username not found in the login response.');
            }

            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("handleGoogleSignIn called");

        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        try {
            console.log("trying to sign in withh google");

            const result = await signInWithPopup(auth, provider);
            console.log("singin successfull");

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            };

            dispatch(signInSuccess(userData));
            localStorage.setItem('username', result.user.displayName); // Save name to local storage.
            navigate("/");

        } catch (error) {
            console.error("Google sign-in error:", error);
            dispatch(signInFailure(error.message || 'Google sign-in failed'));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-section"]}>
                <div className={styles['auth-card']}>
                    <a href="/">
                        <img src={logo} alt="AlphaFinance" style={{ width: '140px', marginBottom: '1.5rem' }} />
                    </a>
                    <h2>Sign In</h2>
                    <p>Please enter your credentials</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles["input-group"]}>
                            <label>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={formData.email || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles["input-group"]}>
                            <label>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button disabled={loading} className={styles['continue-btn']}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className={styles['or-divider']}><span>Or continue with</span></div>
                        <div className={`${styles.socials} ${styles['single-social']}`}>
                            <button type="button" className={`${styles['social-btn']} ${styles['google-btn']}`} onClick={handleGoogleSignIn}>
                                <img src={googleIcon} alt="Google" style={{ width: '22px' }} />
                            </button>
                        </div>
                        {error && <p className={styles['signup-error']}>{error}</p>}
                    </form>

                    <p className={styles['info-text']}>
                        Don't have an account?
                        <Link to="/sign-up"><span className={styles['signup-link']}> Sign Up</span></Link>
                    </p>
                </div>
            </div>

            <div className={styles["visual-section"]}>
                <img src={graphImg} alt="Vault" className={styles["vault-image"]} />
            </div>
        </div>
    );
}