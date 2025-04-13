import React from 'react';
import styles from '../pages/sign.module.css';
import googleIcon from '../assets/googleicon.png';

export default function AuthCard({ title, subtitle, onSubmit, children, error, footer }) {
  return (
    <div className={styles['auth-card']}>
      <h2>{title}</h2>
      <p>{subtitle}</p>

      <form onSubmit={onSubmit}>
        {children}

        <button type="submit" className={styles['continue-btn']}>
          Continue
        </button>

        <div className={styles['or-divider']}><span>Or continue with</span></div>

        <div className={`${styles.socials} ${styles['single-social']}`}>
          <button type="button" className={`${styles['social-btn']} ${styles['google-btn']}`}>
            <img src={googleIcon} alt="Google" style={{ width: '22px' }} />
          </button>
        </div>

        {error && <p className={styles['signup-error']}>{error}</p>}
      </form>

      {footer && <p className={styles['info-text']}>{footer}</p>}
    </div>
  );
}
