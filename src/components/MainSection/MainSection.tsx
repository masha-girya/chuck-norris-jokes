/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  getCategories,
  getRandomJoke,
  getRandomJokeByCategory,
} from '../../api/fetchData';
import { Category } from '../Category';
import { Loader } from '../Loader';
import { JokeSection } from '../JokeSection';
import './MainSection';
import { Joke } from '../../types/Joke';

export const MainSection: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [joke, setJoke] = useState(
    JSON.parse(localStorage.getItem('joke') || JSON.stringify(''))
  );
  const [activeCategory, setActiveCategory] = useState(
    JSON.parse(localStorage.getItem('category') || JSON.stringify(''))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const loadCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    try {
      loadCategories();
    } catch {
      setCategories([]);
    } finally {
      setIsPageLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(activeCategory);
  }, [activeCategory, joke]);

  const handleAction = async(f: Promise<Joke>, category: string) => {
    try {
      setActiveCategory(category);
      setIsLoading(true);

      const data = await f;
      setJoke(data.value);

      localStorage.setItem('joke', JSON.stringify(data.value));
      localStorage.setItem('category', JSON.stringify(category));
    } catch {
      setJoke('Oops, try again');
      setActiveCategory('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (category: string) => {
    handleAction(getRandomJokeByCategory(category), category);
  };

  const handleRandomClick = async () => {
    handleAction(getRandomJoke(), 'random');
  };

  return (
    <div className="Main">
      <div className="Main__title-box">
        <h1 className="Main__title">Categories</h1>
      </div>

      {isPageLoading ? (
        <div
          className="Main__categories Main__loader"
          data-testid="main-loader"
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="Main__categories" data-testid="categories-list" >
            {categories.map((category) => (
              <Category
                key={category}
                category={category}
                onHandleClick={handleClick}
                activeCategory={activeCategory}
              />
            ))}
            <Category
              key="random"
              category="random"
              onHandleClick={handleRandomClick}
              activeCategory={activeCategory}
            />
          </div>

          <JokeSection joke={joke} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};
