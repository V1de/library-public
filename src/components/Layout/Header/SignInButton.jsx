import React, { useContext, useState } from 'react';
import { UserContext } from '../../../UserContext';
import { FaUserCircle } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import AuthModal from '../../Auth/AuthModal';
import { useNavigate } from 'react-router-dom';

const SignInButton = ({ closeNav }) => {
  const { user } = useContext(UserContext);
  const [isAuthShown, setIsAuthShown] = useState(false);
  const navigate = useNavigate();

  const onOpenAuthModalClick = () => {
    setIsAuthShown(true);
  };

  const onProfileClick = () => {
    if (closeNav) closeNav();
    navigate('/profile');
  };

  return user ? (
    <div
      onClick={onProfileClick}
      className="flex justify-center items-center px-3 border-2 rounded-2xl border-gray-500 shadow cursor-pointer"
    >
      <div className="pr-3 text-lg">{user.username}</div>
      <FaUserCircle size={20} />
    </div>
  ) : (
    <>
      <button
        onClick={onOpenAuthModalClick}
        className="px-5 py-2 bg-orange-300 outline-gray-300 rounded-2xl border-gray-200 shadow"
      >
        <div>SignIn</div>
      </button>
      {isAuthShown && createPortal(<AuthModal onClose={() => setIsAuthShown(false)} />, document.body)}
    </>
  );
};

export default SignInButton;
