import React, { useEffect, useState } from 'react';
import BooksList from '../../components/BooksList';
import ApiService from '../../helpers/api-helpers';
import { AiFillStar, AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { BsFilterSquare } from 'react-icons/bs';
import { useQueryParam, StringParam } from 'use-query-params';
const genresApi = new ApiService('books/genres');
const authorsApi = new ApiService('books/authors');
const booksApi = new ApiService('books');

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);
  const [chosenGenres, setChosenGenres] = useState([]);
  const [chosenAuthors, setChosenAuthors] = useState([]);
  const [chosenRatings, setChosenRatings] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [genresParam, setGenresParam] = useQueryParam('genres', StringParam);

  useEffect(() => {
    genresApi
      .getAllItems({ sortField: 'title', sortDirection: 'asc' })
      .then((res) => {
        setGenres(res.rows);
      })
      .catch(() => {});

    authorsApi
      .getAllItems({ sortField: 'firstName', sortDirection: 'asc' })
      .then((res) => setAuthors(res.rows))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const query = {
      include: 'ratings,authors,genres,attachments',
      start: (page - 1) * 6,
      count: 6
    };

    if (genresParam && genresParam.length > 0) {
      query.genres = genresParam;
    }
    if (chosenRatings.length > 0) {
      query.ratings = chosenRatings.join(',');
    }
    if (chosenAuthors.length > 0) {
      query.authors = chosenAuthors.join(',');
    }
    if (searchText && searchText.length > 0) {
      query.search = searchText;
      query.searchKeys = 'title';
    }

    booksApi
      .getAllItems(query)
      .then((res) => {
        setBooks(res.rows);
        setCount(res.count);
      })
      .catch(() => {});
  }, [isFiltersApplied, page]);

  const manageCheckbox = (e, array, setArray) => {
    const newArray = array;
    if (array.includes(e.target.id)) {
      newArray.splice(array.indexOf(e.target.id), 1);
      setArray(newArray);
    } else {
      newArray.push(e.target.id);
      setArray(newArray);
    }
  };

  const manageGenresCheckbox = (e) => {
    const genresArray = genresParam && genresParam.length > 0 ? genresParam.split(',') : [];
    const newArray = genresArray;
    if (genresArray.includes(e.target.id.toString())) {
      newArray.splice(genresArray.indexOf(e.target.id.toString()), 1);
      setGenresParam(newArray.join(','));
    } else {
      newArray.push(e.target.id.toString());
      setGenresParam(newArray.join(','));
    }
  };

  const onClick = () => {
    if (chosenGenres && chosenGenres.length > 0) {
      setGenresParam(chosenGenres.join(','));
    }
    setPage(1);
    setIsFiltersApplied(!isFiltersApplied);
    setIsFiltersOpen(false);
  };

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const onPreviousPageClick = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const onNextPageClick = () => {
    if (page !== count / 6) {
      setPage(page + 1);
    }
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
              <h2 className="flex font-bold text-gray-500 text-xl pb-2 pl-2">Filters</h2>
              <div className="xl:hidden px-5">
                <button onClick={() => setIsFiltersOpen(false)}>
                  <GrClose />
                </button>
              </div>
            </div>
            <div className="px-2 pb-2 border-2 border-gray-300 rounded-xl">
              <div className="py-1 font-semibold">Search</div>
              <input
                type="text"
                name="search"
                onChange={onSearchChange}
                className="w-full px-2 border-2 border-gray-600 rounded-lg"
              />
              <div className="py-1 font-semibold">Genres</div>
              <ul className="px-1 max-h-[220px] overflow-y-scroll">
                {genres &&
                  genres.map((genre) => (
                    <li key={genre.id}>
                      <input
                        onClick={(e) => manageGenresCheckbox(e)}
                        type="checkbox"
                        checked={
                          genresParam && genresParam.length > 0
                            ? genresParam.split(',').includes(genre.id.toString())
                            : false
                        }
                        id={genre.id}
                        className="mr-2"
                      />
                      <label>{genre.title}</label>
                    </li>
                  ))}
              </ul>
              <div className="py-1 font-semibold">Authors</div>
              <ul className="px-1 max-h-[220px] overflow-y-scroll">
                {authors &&
                  authors.map((author) => (
                    <li key={author.id}>
                      <input
                        onClick={(e) => manageCheckbox(e, chosenAuthors, setChosenAuthors)}
                        type="checkbox"
                        id={author.id}
                        className="mr-2"
                      />
                      <label>{`${author.firstName} ${author.lastName}`}</label>
                    </li>
                  ))}
              </ul>
              <div className="py-1 font-semibold">Ratings</div>
              <ul className="px-1">
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <li key={item} className="flex">
                      <input
                        onClick={(e) => manageCheckbox(e, chosenRatings, setChosenRatings)}
                        type="checkbox"
                        id={item.toString()}
                        className="mr-2"
                      />
                      <label className="flex">{Array(item).fill(<AiFillStar fill="orange" size="15" />)}</label>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={onClick}
                className="w-full bg-gray-200 mt-2 py-1 px-auto font-semibold border-2 border-blue-200 rounded-xl hover:bg-orange-200 cursor-pointer"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
        <div className="xl:w-[75%] w-full">
          <div className="xl:hidden px-5">
            <button onClick={() => setIsFiltersOpen(true)}>
              <BsFilterSquare size={20} />
            </button>
          </div>
          <BooksList title={'All books'} books={books} />
          <div className="flex w-full justify-center py-2">
            <AiOutlineLeftCircle onClick={onPreviousPageClick} size={24} className="cursor-pointer" />
            <div className="px-2 font-bold">{page}</div>
            <AiOutlineRightCircle onClick={onNextPageClick} size={24} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
