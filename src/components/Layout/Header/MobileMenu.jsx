import React from 'react';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';
import { GrClose } from 'react-icons/gr';

const MobileMenu = ({ nav }) => {
  return (
    <div>
      <div
        className={
          !nav.nav ? 'fixed bg-white text-center md:hidden left-0 top-0 w-full h-full border-r-gray-900 z-50' : 'hidden'
        }
      >
        <ul className="p-4 font-medium">
          <li className="py-2 border-b border-b-gray-500">
            <Link onClick={nav.handleNav} to="/">
              <img src="/logo.png" className="w-20 mx-auto" alt="logo" />
            </Link>
          </li>
          <li className="py-2 border-b border-b-gray-500">
            <Link onClick={nav.handleNav} to="/books">
              Books
            </Link>
          </li>
          <li className="py-2 border-b border-b-gray-500">
            <Link onClick={nav.handleNav} to="/categories">
              Categories
            </Link>
          </li>
          <li className="py-2 border-b border-b-gray-500">
            <Link onClick={nav.handleNav} to="/about">
              About
            </Link>
          </li>
          <li className="py-2 border-b border-b-gray-500">
            <SignInButton closeNav={nav.handleNav} />
          </li>
        </ul>
        <div onClick={nav.handleNav} className="fixed right-5 top-12 md:hidden">
          <GrClose size={20} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
