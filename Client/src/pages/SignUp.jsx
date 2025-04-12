import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import graphImg from '../assets/vaultt.png.png';
import googleIcon from '../assets/googleicon.png';
import logo from '../assets/Alphafinancelogo.jpeg';
import styles from './sign.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Signup failed');
      }
      navigate('/sign-in');
    } catch (error) {
      setError(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.authCard}>
          <img src={logo} alt="AlphaFinance" className={styles.logo} />

          <h2>Create an Account</h2>
          <p>Please fill in your details</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <button disabled={loading} className={styles.continueBtn}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div className={styles.orDivider}><span>Or continue with</span></div>
            <div className={`${styles.socials} ${styles.singleSocial}`}>
              <button type="button" className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={handleGoogleAuth}>
                <img src={googleIcon} alt="Google" className={styles.googleIcon} />
              </button>
            </div>

            {error && <p className={styles.signupError}>{error}</p>}
          </form>

          <p className={styles.infoText}>
            Already have an account?
            <Link to="/sign-in"><span className={styles.signupLink}> Sign In</span></Link>
          </p>
        </div>
      </div>

      <div className={styles.visualSection}>
        <img src={graphImg} alt="Vault" className={styles.vaultImage} />
      </div>
    </div>
  );
}
