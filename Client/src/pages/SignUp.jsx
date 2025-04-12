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
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
      navigate('/');
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
      <div className={styles['form-section']}>
        <div className={styles['auth-card']}>
          <a href="/">
            <img src={logo} alt="AlphaFinance" style={{ width: '140px', marginBottom: '1.5rem' }} />
          </a>
          <h2>Create an Account</h2>
          <p>Please fill in your details</p>

          <form onSubmit={handleSubmit}>
            <div className={styles['input-group']}>
              <label>Name</label>
              <input
                type="text"
                id="username"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles['input-group']}>
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles['input-group']}>
              <label>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <button disabled={loading} className={styles['continue-btn']}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div className={styles['or-divider']}><span>Or continue with</span></div>
            <div className={`${styles.socials} ${styles['single-social']}`}>
              <button type="button" className={`${styles['social-btn']} ${styles['google-btn']}`} onClick={handleGoogleAuth}>
                <img src={googleIcon} alt="Google" style={{ width: '22px' }} />
              </button>
            </div>
            {error && <p className={styles['signup-error']}>{error}</p>}
          </form>

          <p className={styles['info-text']}>
            Already have an account?
            <Link to="/"><span className={styles['signup-link']}> Sign In</span></Link>
          </p>
        </div>
      </div>

      <div className={styles['visual-section']}>
        <img src={graphImg} alt="Vault" className={styles['vault-image']} />
      </div>
    </div>
  );
}
