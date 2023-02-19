import React from 'react';
import './Category';

interface Props {
  category: string;
  onHandleClick: (category: string) => void;
}

export const Category: React.FC<Props> = ({ category, onHandleClick }) => {
  return (
    <button
      type="button"
      className="Category"
      onClick={() => onHandleClick(category)}
    >
      {category}
    </button>
  );
};
