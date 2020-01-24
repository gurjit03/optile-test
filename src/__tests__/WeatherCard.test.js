import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import WeatherWidget from '../Components/WeatherWidget';

afterEach(cleanup);

describe('This will test WeatherWidget Component', () => {
  test('shows the geolocation error message when no coords given', () => {
    const testMessage = 'Your browser does not support Geolocation';
    render(<WeatherWidget />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
