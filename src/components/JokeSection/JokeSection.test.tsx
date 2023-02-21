import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainSection } from '../MainSection';
import { getCategories, getRandomJoke } from '../../api/fetchData';
import { JokeSection } from '../JokeSection';

describe('Joke', () => {
  beforeAll(() => {
    render(<MainSection />);
  });

  test('should place text if the page is loading for the first time', async () => {
    const element = render(<JokeSection joke="" isLoading={false} />);

    const text = element.getByTestId('before-joke-text');

    expect(text).toBeInTheDocument();
  });

  test('should not be text if joke is loaded', async () => {
    const joke = await getRandomJoke();
    const element = render(<JokeSection joke={joke.value} isLoading={false} />);

    const text = element.queryByTestId('before-joke-text');

    expect(text).toBeNull();
  });

  test('should show loader after clicking on category', async () => {
    getCategories().then(() => {
      const category = screen.getByText('dev');

      fireEvent.click(category);

      const loader = screen.getByTestId('joke-loader');

      expect(loader).toBeInTheDocument();
    });
  });
});
