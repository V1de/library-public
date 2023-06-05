import React from 'react';
import SignInForm from '../SignInForm';

const AuthModal = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity before:h-full before:inline-block before:align-middle text-[0] text-center"
    >
      <div className="inline-block align-middle text-left text-base">
        <div onClick={(e) => e.stopPropagation()} className="p-4 border-white border-2 rounded-2xl bg-white">
          <SignInForm handleClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
