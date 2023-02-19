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

export const MainSection: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [joke, setJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleClick = async (category: string) => {
    try {
      setIsLoading(true);
      const data = await getRandomJokeByCategory(category);
      setJoke(data.value);
    } catch {
      setJoke('Oops, try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomClick = async () => {
    try {
      setIsLoading(true);
      const data = await getRandomJoke();
      setJoke(data.value);
    } catch {
      setJoke('Oops, try again');
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
              />
            ))}
            <Category
              key="random"
              category="random"
              onHandleClick={handleRandomClick}
            />
          </div>

          <JokeSection joke={joke} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};
