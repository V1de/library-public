import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalState = (value) => {
    setIsModalOpen(value);
  };

  return (
    <>
      <Header setModalOpen={setModalState} />
      <div className="min-h-[750px]">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
