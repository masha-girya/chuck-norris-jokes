import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainSection } from '../MainSection';
import { getCategories } from '../../api/fetchData';

describe('Category', () => {
  beforeAll(() => {
    render(<MainSection />);
  });

  test('should render all categories and random category as buttons', async () => {
    getCategories().then(() => {
      const button = screen.getAllByRole('button');
      expect(button).toHaveLength(17);
    });
  });

  test('should be white by default', async () => {
    getCategories().then(() => {
      const category = screen.getByText('dev');

      expect(category).not.toHaveClass('Category--active');
    });
  });

  test('should be blue color after choosing category', async () => {
    getCategories().then(() => {
      const category = screen.getByText('dev');

      fireEvent.click(category);

      expect(category).toHaveClass('Category--active');
    });
  });
});
