import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="h-15 container px-4 mt-4">
      <ul className="block sm:flex justify-between items-center">
        <li className="py-2">2023 Online Library. All rights reserved.</li>
        <li className="py-2">
          <Link to="/contacts">Contact us</Link>
        </li>
        <li className="py-2">
          <Link to="/help">Help & Support</Link>
        </li>
        <li className="py-2">
          <Link to="/about">About</Link>
        </li>
        <li>
          <img src="/footer-logo.png" alt="footer-logo" className="w-12" />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
