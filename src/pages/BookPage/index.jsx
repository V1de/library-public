import React, { useEffect, useState } from 'react';
import ApiService from '../../helpers/api-helpers';
import StarRating from '../../components/common/StarRating';
import { useParams } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const booksApi = new ApiService('books');

const BookPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState({});
  const [isRead, setIsRead] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState(false);

  const onReadButtonClick = () => {
    setIsRead(!isRead);
    toast.success(`${isRead ? 'Book has been added to read list!' : 'Book has been removed from read list!'}`);
  };

  const onDropdownClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onAddToLikedClick = () => {
    setIsLiked(!isLiked);
    toast.success(`${isLiked ? 'Book has been added to read list!' : 'Book has been removed from read list!'}`);
  };

  const onOpenCollectionsClick = () => {
    setIsCollectionsModalOpen(true);
  };

  useEffect(() => {
    const payload = {
      include: 'genres,authors,ratings'
    };
    booksApi.getItemById(params.id, payload).then((res) => {
      setBook(res);
      setIsRead(res?.isRead);
      setIsLiked(res?.isLiked);
      setIsLoading(false);
    });
  }, []);

  return (
    book &&
    !isLoading && (
      <div className="container px-5">
        <div className="flex w-full px-5 py-5 md:py-10 lg:py-10 xl:py-24 border-solid border-2 rounded-xl">
          <div className="flex-shrink-0 w-[100px] sm:w-[35%] lg:w-[20%] md:mx-16 lg:mx-24 xl:mx-32">
            <img src="../Harry-Potter.jpg" alt="book-cover" className="w-full rounded-xl" />
            <div className="flex mx-1 mt-8 h-6 md:h-10">
              <button
                onClick={onReadButtonClick}
                className="w-[80%] flex items-center bg-gray-300 border-2 border-gray-500 rounded-l-full"
              >
                <BsFillCheckCircleFill fill={isRead ? 'green' : 'gray'} className="w-[25%] h-[80%] ml-auto" />
                <div className="font-bold mr-auto text-sm sm:text-base md:text-xl">Read</div>
              </button>
              <button
                onClick={onDropdownClick}
                className="w-[20%] py-1 bg-gray-300 border-2 border-l-0 border-gray-500 rounded-r-full"
              >
                <IoMdArrowDropdown size={'80%'} />
              </button>
            </div>
            {isMenuOpen && (
              <div className="mx-2 my-1 bg-gray-200 border border-gray-400 rounded-lg text-xs sm:text-base font-semibold drop-shadow-xl">
                <button onClick={onAddToLikedClick} className="w-full rounded-t-lg hover:bg-gray-300">
                  {isLiked ? 'Remove from liked' : 'Add to liked'}
                </button>
                <button onClick={onOpenCollectionsClick} className="w-full rounded-b-lg hover:bg-gray-300">
                  Add to collection
                </button>
              </div>
            )}
            <div className="my-4 mx-6">
              <StarRating bookId={params.id} userRating={book.userRating} setBook={setBook} />
            </div>
          </div>

          <div className="block pl-5 md:pr-10 lg:px-24 xl:px-32">
            <div className="text-2xl sm:text-4xl font-bold">{book.title}</div>
            <div className="flex lg:py-2 text-lg sm:text-xl font-bold">
              <div className="text-gray-600">by</div>
              <div className="pl-2">{`${book.author?.firstName} ${book.author?.lastName}`}</div>
            </div>
            <div className="py-1 lg:py-4 text-lg sm:text-xl">{book.description}</div>
            <div className="text-base break-all sm:text-lg">
              Genre:
              <a href={`/genres/${book.genre?.id}`} className="pl-2 underline">
                {book.genre?.title}
              </a>
            </div>
            <div className="sm:text-base">{book.pagesNumber} pages</div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookPage;
