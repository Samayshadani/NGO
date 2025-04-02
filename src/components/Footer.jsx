import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <span className="logo-icon">💜</span>
                    <h2>BLIND'S WELFARE ASSOCIATION</h2>
                </div>

                <hr className="footer-line" />
                <div className="ff">
                    <div className="footer-ll">
                        <p className="footer-text">
                            © 2025 BLIND'S WELFARE ASSOCIATION. • <a href="#">Privacy</a> • <a href="#">Terms</a>
                        </p>
                    </div>

                    <div className="footer-icons">
                        <FaTwitter className="social-icon" />
                        <FaFacebook className="social-icon" />
                        <FaLinkedin className="social-icon" />
                        <FaYoutube className="social-icon" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
