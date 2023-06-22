import React, { useEffect, useState } from 'react';
import ApiService from '../../../helpers/api-helpers';
import { GrClose } from 'react-icons/gr';
import { BsPlusCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';
const booksApi = new ApiService('books');
const collectionsApi = new ApiService('collections/book/add');

const AddToCollectionModal = ({ updateBooks, setUpdateCollection, collection, onClose }) => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [searchChanged, setSearchChanged] = useState(null);

  useEffect(() => {
    const options = { start: 0, count: 5 };
    if (collection.books && collection.books.length > 0) {
      options.exclude = collection.books.map((book) => book.id).join(',');
    }

    if (searchText) {
      options.search = searchText;
      options.searchKeys = 'title';
    }

    booksApi
      .getAllItems(options)
      .then((res) => {
        setBooks(res.rows);
      })
      .catch();
  }, [updateBooks, searchChanged]);

  const onSearchClick = () => {
    setSearchChanged(searchText);
  };

  const onAddToCollection = (id) => {
    collectionsApi
      .createItem({ bookId: id, collectionId: collection.id })
      .then((res) => {
        toast.success(`Book was added to ${collection.title}`);
        setUpdateCollection();
      })
      .catch();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity before:h-full before:inline-block before:align-middle text-[0] text-center"
    >
      <div className="inline-block align-middle text-left text-base">
        <div className="flex w-[220px] sm:w-[350px] justify-between mb-4 font-bold text-lg underline">
          <div>{collection.title}</div>
          <GrClose onClick={onClose} size={20} className="cursor-pointer" />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="min-h-[200px] p-4 border-white border-2 rounded-2xl bg-white"
        >
          <div className="flex">
            <input
              type="text"
              key="search"
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-1 mr-1 rounded border-2 border-gray-400"
            />
            <button onClick={onSearchClick} className="px-1 rounded border-2 border-gray-500">
              Search
            </button>
          </div>
          <div className="pt-1">
            {books &&
              books.length > 0 &&
              books.map((book) => {
                return (
                  <div className="flex">
                    <div className="w-full">{book.title}</div>
                    <div onClick={() => onAddToCollection(book.id)}>
                      <button>
                        <BsPlusCircle size={20} className="mx-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCollectionModal;
