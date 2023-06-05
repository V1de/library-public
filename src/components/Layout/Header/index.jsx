import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';
import MobileMenu from './MobileMenu';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="w-full container px-4">
      <div className="flex justify-between items-center h-full my-5">
        <a href="/">
          <img src="/logo.png" alt="logo" className={'w-20'} />
        </a>
        <ul className="hidden px-5 md:flex">
          <li className="px-5 py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-5 py-2">
            <Link to="/books">Books</Link>
          </li>
          <li className="px-5 py-2">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <div className="hidden md:flex">
          <SignInButton />
        </div>

        <div onClick={handleNav} className="fixed right-5 top-12 md:hidden">
          {nav && <GiHamburgerMenu size={20} />}
        </div>
      </div>
      <MobileMenu nav={{ nav, handleNav }} />
    </header>
  );
};

export default Header;
