import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { GiBookshelf } from 'react-icons/gi';
import { FaBookReader, FaUsers } from 'react-icons/fa';
import { RiFileList2Fill, RiLogoutBoxRFill } from 'react-icons/ri';
import Card from './Card';
import ApiService from '../../helpers/api-helpers';
import { useNavigate } from 'react-router-dom';
const likedBooksApi = new ApiService('books/liked');
const readBooksApi = new ApiService('books/read');
const pagesApi = new ApiService('books/pages/read');

const Profile = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [readBooksNumber, setReadBooksNumber] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    likedBooksApi
      .getAllItems({ include: 'ratings,authors,genres,attachments' })
      .then((res) => {
        setLikedBooks(res.rows);
      })
      .catch();
    readBooksApi
      .getAllItems({ include: 'ratings,authors,genres,attachments' })
      .then((res) => {
        setReadBooks(res.rows);
        setReadBooksNumber(res.count);
      })
      .catch();
    pagesApi
      .getAllItems({})
      .then((res) => {
        setPagesRead(res.pagesRead);
      })
      .catch();
  }, []);

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="xl:w-[20%] xl:px-4">
          <div
            className={`fixed xl:static left-0 inset-y-0 z-20 p-6 xl:p-0 bg-zinc-300 xl:bg-transparent ${
              isFiltersOpen ? '' : 'xl:translate-x-0 -translate-x-full'
            } transition-transform`}
          >
            <div className="flex justify-between items-center">
              <h2 className="flex font-bold text-gray-500 text-xl pb-2 pl-2">My Stats</h2>
              <div className="xl:hidden px-5">
                <button onClick={() => setIsFiltersOpen(false)}>
                  <GrClose />
                </button>
              </div>
            </div>
            <div className="px-2 pb-2 border-2 border-gray-300 rounded-xl">
              <div className="flex py-1">
                <FaBookReader size={24} />
                <div className="w-full pl-2">Books finished</div>
                <div className="px-2">{readBooksNumber}</div>
              </div>
              <div className="flex py-1">
                <RiFileList2Fill size={24} />
                <div className="w-full pl-2">Pages read</div>
                <div className="px-2">{pagesRead}</div>
              </div>
              <div className="flex py-1 cursor-pointer">
                <GiBookshelf size={24} />
                <div className="w-full pl-2 underline">Collections</div>
                <div className="px-2">1</div>
              </div>
              <div className="flex py-1 cursor-pointer">
                <FaUsers size={24} />
                <div className="w-full pl-2 underline">Friends</div>
                <div className="px-2">1</div>
              </div>
            </div>
            <div
              onClick={onLogoutClick}
              className="flex px-2 py-2 my-2 border-2 border-gray-300 rounded-xl cursor-pointer"
            >
              <RiLogoutBoxRFill size={24} />
              <div className="w-full pl-2 underline">Logout</div>
            </div>
          </div>
        </div>
        <div className="xl:w-[75%] w-full">
          <div className="xl:hidden px-5">
            <button onClick={() => setIsFiltersOpen(true)}>
              <AiOutlineMenuUnfold size={20} />
            </button>
          </div>
          <div className="px-5">
            <h2 className="flex font-bold text-gray-500 text-xl pb-2">Liked books</h2>
            <div className="flex flex-col max-h-[350px] overflow-y-scroll scroll py-2 px-2 border border-2 border-gray-300 rounded rounded-lg">
              {likedBooks && likedBooks.length > 0 ? (
                likedBooks.map((book) => <Card key={book.id} book={book} />)
              ) : (
                <div className="w-full text-2xl text-center py-2">No books found</div>
              )}
            </div>

            <h2 className="flex font-bold text-gray-500 text-xl pt-6 pb-2">Read books</h2>
            <div className="flex flex-col max-h-[350px] overflow-y-scroll scroll py-2 px-2 border border-2 border-gray-300 rounded rounded-lg">
              {readBooks && readBooks.length > 0 ? (
                readBooks.map((book) => <Card key={book.id} book={book} />)
              ) : (
                <div className="w-full text-2xl text-center py-2">No books found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
