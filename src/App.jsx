import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './UserContext';
import Main from './pages/Main';
import BookPage from './pages/BookPage';
import Books from './pages/Books';
import About from './pages/About';
import HelpAndSupport from './pages/HelpAndSupport';
import Profile from './pages/Profile';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from './helpers/api-helpers';
const authApi = new ApiService('auth/profile');

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      authApi
        .createItem()
        .then((res) => setUser(res))
        .catch(() => {});
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<HelpAndSupport />} />
            </Routes>
          </Layout>
        </UserContext.Provider>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover theme="light" />
    </div>
  );
}

export default App;
