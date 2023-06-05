import React, { useEffect, useState } from 'react';
import BooksList from '../../components/BooksList';
import GenresSwiper from '../../components/GenresSwiper';
import ApiService from '../../helpers/api-helpers';

const booksApi = new ApiService('books');

const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const payload = {
      include: 'genres,authors,ratings',
      count: 6,
      sortField: 'id',
      sortDirection: 'asc',
      start: 0
    };
    booksApi.getAllItems(payload).then((res) => {
      setBooks(res.rows);
    });
  }, []);

  return (
    <div className="container">
      <GenresSwiper />
      <BooksList title={'Top rated books'} books={books} />
    </div>
  );
};

export default Main;
