import classNames from 'classnames';
import React from 'react';
import './Category';

interface Props {
  category: string;
  onHandleClick: (category: string) => void;
  activeCategory: string;
}

export const Category: React.FC<Props> = ({
  category,
  onHandleClick,
  activeCategory,
}) => {
  return (
    <button
      type="button"
      className={classNames('Category', {
        'Category--active': activeCategory === category,
      })}
      onClick={() => onHandleClick(category)}
    >
      {category}
    </button>
  );
};
