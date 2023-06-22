import React, { useEffect, useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Card from '../Card';
import AddToCollectionModal from './AddToCollectionModal';
import ApiService from '../../../helpers/api-helpers';
const collectionsApi = new ApiService('collections');
const removeCollectionApi = new ApiService('collections/book/remove');

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [coll, setColl] = useState(null);
  const [updateCollection, setUpdateCollection] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateBooks, setUpdateBooks] = useState(false);

  const onCloseModal = () => {
    setAddModalOpen(false);
  };

  const changeCollection = () => {
    setUpdateCollection(!updateCollection);
  };

  const openAddModal = (col) => {
    setColl(col);
    setAddModalOpen(true);
  };

  const removeFromCollection = (collectionId, bookId) => {
    removeCollectionApi
      .createItem({ collectionId: collectionId, bookId: bookId })
      .then((res) => {
        toast.success('Book was successfully removed from collection!');
        setUpdateCollection(!updateCollection);
      })
      .catch();
  };

  useEffect(() => {
    collectionsApi.getAllItems({ include: 'books' }).then((res) => {
      setCollections(res.rows);
      if (coll) {
        setColl(res.rows.find((row) => row.id === coll.id));
      }
      setUpdateBooks(!updateBooks);
    });
  }, [updateCollection]);

  return (
    <div className="px-5">
      <h2 className="flex font-bold text-gray-500 text-xl pb-2">Collections</h2>
      {collections &&
        collections.map((collection) => {
          return (
            <>
              <div className="flex flex-col max-h-[375px] overflow-y-scroll scroll py-2 px-2 mb-2 border border-2 border-gray-300 rounded rounded-lg">
                <div className="flex items-center">
                  <div className="font-semibold">{collection.title}</div>
                  <div className="px-2">
                    <BsPlusSquare
                      onClick={() => openAddModal(collection)}
                      size={20}
                      color="gray"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                {collection.books && collection.books.length > 0 ? (
                  collection.books.map((book) => (
                    <Card key={book.id} book={book}>
                      <button
                        onClick={() => removeFromCollection(collection.id, book.id)}
                        className="text-red-400 px-2 my-2 max-h-[30px] z-50 border-2 border-red-400 rounded"
                      >
                        Remove
                      </button>
                    </Card>
                  ))
                ) : (
                  <div className="w-full text-2xl text-center py-2">Collection is empty</div>
                )}
              </div>
              {addModalOpen && (
                <AddToCollectionModal
                  updateBooks={updateBooks}
                  setUpdateCollection={changeCollection}
                  collection={coll}
                  onClose={onCloseModal}
                />
              )}
            </>
          );
        })}
    </div>
  );
};

export default Collections;
