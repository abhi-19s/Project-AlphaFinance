import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="/">
          <img src="/Logo.png" alt="Logo" className="logo" />
        </a>
        <p className="footer-text">Stay connected with us on social media</p>
        <div className="social-icons">
          <a href="https://wa.me/9453441584" target="_blank" rel="noopener noreferrer">
            <img src="Whatsapp.png" alt="WhatsApp" className="icon" />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src="Twitter.png" alt="X" className="icon" />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src="Instagram.png" alt="Instagram" className="icon" />
          </a>
          <a href="mailto:shubhamrajvanshi60@gmail.com">
            <img src="/Email.png" alt="Email" className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
