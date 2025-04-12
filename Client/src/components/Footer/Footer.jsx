import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href="/">
          <img src="/Logo.png" alt="Logo" className={styles.logo} />
        </a>
        <p className={styles.footerText}>Stay connected with us on social media</p>
        <div className={styles.socialIcons}>
          <a href="https://wa.me/9453441584" target="_blank" rel="noopener noreferrer">
            <img src="Whatsapp.png" alt="WhatsApp" className={styles.icon} />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src="Twitter.png" alt="X" className={styles.icon} />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src="Instagram.png" alt="Instagram" className={styles.icon} />
          </a>
          <a href="mailto:shubhamrajvanshi60@gmail.com">
            <img src="/Email.png" alt="Email" className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  );
};
