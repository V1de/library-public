import React, { useState } from 'react';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ApiService from '../../helpers/api-helpers';
const booksApi = new ApiService('books/liked');

const BookCard = ({ book }) => {
  const [bookIsLiked, setBookIsLiked] = useState(book?.isLiked);
  const addToLiked = () => {
    const token = localStorage.getItem('token');
    if (token) {
      if (bookIsLiked) {
        booksApi
          .deleteItem(book.id)
          .then(() => {
            setBookIsLiked(false);
            toast.success('Book removed from liked!');
          })
          .catch();
      } else {
        booksApi
          .createItem({ id: book.id })
          .then(() => {
            setBookIsLiked(true);
            toast.success('Book added to liked!');
          })
          .catch();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center h-[90%] my-5">
      <div className="relative flex flex-col w-[250px] lg:w-[400px] lg:flex-row h-[400px] lg:h-[200px] lg:space-x-5 space-y-3 lg:space-y-0 rounded-xl shadow-xl p-3 max-w-xs lg:max-w-[400px] mx-auto border border-2 bg-white">
        <div className="w-full lg:w-1/3 bg-white grid place-items-center">
          <img src={`http://localhost/uploads/${book.attachment.storageKey}`} alt="" className="h-44 w-32 rounded-xl" />
        </div>
        <div className="w-full lg:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <div className="flex items-center">
              <AiFillStar color="orange" size={20} />
              <p className="text-gray-600 font-bold text-sm ml-1">{parseInt(book.rating) || 0} / 5</p>
            </div>
            <button
              onClick={addToLiked}
              className="relative z-10 bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-800"
            >
              <div className="inline-block ps-2 py-auto">Like</div>
              {bookIsLiked ? (
                <AiFillHeart size={20} color="red" className="inline-block my-1 mx-2" />
              ) : (
                <AiOutlineHeart size={20} className="inline-block my-1 mx-2" />
              )}
            </button>
          </div>
          <a href={`books/${book.id}`}>
            <div className="text-black text-lg text-red-900 font-bold">
              {book.title}
              <span className="absolute w-full h-full top-0 left-0"></span>
            </div>
          </a>
          <div className="flex-col justify-between">
            <p className="font-bold text-gray-800 text-base">
              Author:{' '}
              <span className="font-normal text-gray-600 text-base">
                {`${book.author.firstName} ${book.author.lastName}`}
              </span>
            </p>
            <p className="font-bold text-gray-800 text-base">
              Genre: <span className="font-normal text-gray-600 text-base">{book.genre?.title}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
