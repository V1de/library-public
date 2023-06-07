import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const Card = ({ book }) => {
  return (
    <div className="flex flex-col justify-center h-[90%] my-2">
      <div className="relative flex w-full flex-row h-[150px] space-x-5 space-y-0 rounded-xl shadow-xl p-3 mx-auto border border-2 bg-white">
        <div className="bg-white grid place-items-center">
          <img src={`http://localhost/uploads/${book.attachment.storageKey}`} alt="" className="h-28 w-24 rounded-xl" />
        </div>
        <div className="w-full bg-white flex flex-col p-3">
          <div className="flex justify-between item-center">
            <div className="flex items-center">
              <AiFillStar color="orange" size={20} />
              <p className="text-gray-600 font-bold text-sm ml-1">{parseInt(book.rating) || 0} / 5</p>
            </div>
          </div>
          <a href={`books/${book.id}`}>
            <div className="text-black text-lg text-red-900 font-bold">
              {book.title}
              <span className="absolute w-full h-full top-0 left-0"></span>
            </div>
          </a>
          <div className="flex-col justify-between">
            <p className="font-bold text-gray-800 text-base">
              Author:
              <span className="font-normal text-gray-600 text-base">
                {` ${book.author.firstName} ${book.author.lastName}`}
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

export default Card;
