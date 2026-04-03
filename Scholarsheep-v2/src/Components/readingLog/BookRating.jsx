import React, { useState } from 'react';

const BookRating = ({ rating, onRate, size = 'text-2xl', readonly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRate(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`${size} transition-transform ${
            !readonly ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
          }`}
        >
          <span className={
            (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
          }>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default BookRating;
