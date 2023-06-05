import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getResourceFromApi, methods } from '../../helpers/api-helpers';

const StarRating = ({ bookId, userRating, setBook }) => {
  const [rating, setRating] = useState(userRating ? userRating.rating : null);
  const rateBook = ({ id, ...other }) =>
    getResourceFromApi('books/:id/rate'.replace(':id', id), null, methods.patch, other);

  const onClick = (e, newRating) => {
    e.preventDefault();
    rateBook({ id: bookId, rating: newRating }).then((res) => {
      setBook(res);
      setRating(newRating);
      toast.success('Rating has been updated!');
    });
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((item) => (
        <button>
          <AiFillStar
            onClick={(e) => onClick(e, item)}
            key={item}
            fill={!rating || item > rating ? 'gray' : 'orange'}
            size="100%"
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
