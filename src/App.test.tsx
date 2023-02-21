import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from './App';
import { MainSection } from './components/MainSection';
import {
  getCategories,
  getRandomJoke,
  getRandomJokeByCategory,
} from './api/fetchData';
import { JokeSection } from './components/JokeSection';

describe('Components rendering', () => {
  test('should render the page', () => {
    expect(render(<App />)).toBeTruthy();
  });

  test('should render App Bar component', () => {
    const component = render(<App />);
    const childElement = component.getByText('Chuck Norris');
    expect(childElement).toBeInTheDocument();
  });

  test('should render Main Section component', () => {
    const component = render(<App />);
    const childElement = component.getByText('Categories');
    expect(childElement).toBeInTheDocument();
  });
});

describe('Fetch data', () => {
  test('should fetch categories', async () => {
    const categories = await getCategories();
    expect(categories).toHaveLength(16);
  });

  test('should fetch categories alphabetically', async () => {
    const categories = await getCategories();
    expect(categories).toEqual(categories.sort((a, b) => a.localeCompare(b)));
  });

  test('should fetch joke by category', async () => {
    const joke = await getRandomJokeByCategory('dev');

    expect(joke).toHaveProperty('value');
  });

  test('should fetch random joke', async () => {
    const joke = await getRandomJoke();

    expect(joke).toHaveProperty('value');
  });
});

describe('Category', () => {
  test('should render all categories and random category as buttons', async () => {
    render(<MainSection />);

    await act(async () => {
      await getCategories();
    });

    const categoryElements = await screen.getAllByRole('button');

    expect(categoryElements).toHaveLength(17);
  });

  test('should be white by default', async () => {
    render(<MainSection />);

    await act(async () => {
      await getCategories();
    });

    const category = await screen.getByText('dev');

    expect(category).not.toHaveClass('Category--active');
  });

  test('should be blue color after choosing category', async () => {
    render(<MainSection />);

    await act(async () => {
      await getCategories();
    });

    const category = await screen.getByText('dev');

    fireEvent.click(category);

    expect(category).toHaveClass('Category--active');
  });
});

describe('Joke', () => {
  test('should place text if the page is loading for the first time', async () => {
    const element = render(<JokeSection joke="" isLoading={false} />);

    const text = element.getByTestId('before-joke-text');

    await act(() => {
      localStorage.clear();
    });

    expect(text).toBeInTheDocument();
  });

  test('should not be text if joke is loaded', async () => {
    const joke = await getRandomJoke();
    const element = render(<JokeSection joke={joke.value} isLoading={false} />);

    const text = element.queryByTestId('before-joke-text');

    expect(text).toBeNull();
  });

  test('should show loader after clicking on category', async () => {
    render(<MainSection />);

    await act(async () => {
      await getCategories();
    });

    const category = await screen.getByText('dev');

    fireEvent.click(category);

    const loader = screen.getByTestId('joke-loader');

    expect(loader).toBeInTheDocument();
  });
});
