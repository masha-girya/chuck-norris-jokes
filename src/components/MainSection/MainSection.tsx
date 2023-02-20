/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  getCategories,
  getRandomJoke,
  getRandomJokeByCategory,
} from '../../api/fetchData';
import { Category } from '../Category';
import { JokeLoader } from '../Loader';
import { JokeSection } from '../JokeSection';
import './MainSection';
import { Joke } from '../../types/Joke';

export const MainSection: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [joke, setJoke] = useState(JSON.parse(localStorage.getItem('joke') || ''));
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(JSON.parse(localStorage.getItem('category') || ''));

  const loadCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    console.log(activeCategory);
  }, [activeCategory, joke]);

  const handleClick = async (category: string) => {
    handleAction(getRandomJokeByCategory(category), category);
  };

  const handleRandomClick = async () => {
    handleAction(getRandomJoke(), 'random');
  };

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

  return (
    <div className="Main">
      <div className="Main__title-box">
        <h1 className="Main__title">Categories</h1>
      </div>

      {categories.length === 0 ? (
        <div className="Main__categories Main__loader">
          <JokeLoader />
        </div>
      ) : (
        <>
          <div className="Main__categories">
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
