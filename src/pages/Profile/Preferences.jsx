import React from 'react';
import Card from './Card';

const Preferences = ({ likedBooks, readBooks }) => {
  return (
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
  );
};

export default Preferences;
