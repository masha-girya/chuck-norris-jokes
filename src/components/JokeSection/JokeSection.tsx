import React from 'react';
import { LoaderJoke } from '../LoaderJoke';
import './JokeSection';

interface Props {
  joke: string;
  isLoading: boolean;
}

export const JokeSection: React.FC<Props> = ({ joke, isLoading }) => {
  return (
    <div className="Joke">
      <div className="Joke__box">
        {isLoading ? (
          <div data-testid="joke-loader">
            <LoaderJoke />
          </div>
        ) : joke.length > 0 ? (
          <p>{joke}</p>
        ) : (
          <p data-testid="before-joke-text">
            Choose a category above and grab Chuck<span>&#39;</span>s best joke!
          </p>
        )}
      </div>
    </div>
  );
};
