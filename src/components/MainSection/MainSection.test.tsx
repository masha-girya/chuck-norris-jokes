import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainSection } from '../MainSection';

describe('Main Section', () => {
  beforeAll(() => {
    render(<MainSection />);
  });

  test('should be loader first', async() => {
    const loader = screen.getByTestId('main-loader');

    expect(loader).toBeInTheDocument();
  });
});
