import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {
  getCategories,
  getRandomJoke,
  getRandomJokeByCategory,
} from './api/fetchData';

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
  test('should fetch categories', async() => {
    const categories = await getCategories();
    expect(categories).toHaveLength(16);
  });

  test('should fetch categories alphabetically', async () => {
    const categories = await getCategories();
    expect(categories).toEqual(categories.sort((a, b) => a.localeCompare(b)));
  });

  test('should fetch joke by category', async() => {
    const joke = await getRandomJokeByCategory('dev');

    expect(joke).toHaveProperty('value');
  });

  test('should fetch random joke', async() => {
    const joke = await getRandomJoke();

    expect(joke).toHaveProperty('value');
  });
});
