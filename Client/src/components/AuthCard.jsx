import React from 'react';
import googleIcon from '../assets/googleicon.png'
export default function AuthCard({ title, subtitle, onSubmit, children, error, footer }) {
  return (
    <div className="auth-card">
      <h2>{title}</h2>
      <p>{subtitle}</p>

      <form onSubmit={onSubmit}>
        {children}

        <button type="submit" className="continue-btn">
          Continue
        </button>

        <div className="or-divider"><span>Or continue with</span></div>

        <div className="socials single-social">
          <button type="button" className="social-btn google-btn">
            <img src={googleIcon} alt="Google" style={{ width: '22px' }} />
          </button>
        </div>

        {error && <p className="signup-error">{error}</p>}
      </form>

      {footer && <p className="info-text">{footer}</p>}
    </div>
  );
}
