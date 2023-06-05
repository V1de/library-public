import React from 'react';
import BookCard from './BookCard';

const BooksList = ({ title, books }) => {
  return (
    <div className="px-5">
      <h2 className="flex font-bold text-gray-500 text-xl pb-2">{title}</h2>
      <div className="flex flex-wrap justify-center sm:justify-between px-auto md:px-14 xl:px-2 2xl:px-12 sm:px-5 border border-2 rounded rounded-lg">
        {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};

export default BooksList;
