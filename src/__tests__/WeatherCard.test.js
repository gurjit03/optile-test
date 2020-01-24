import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { WeatherWidget } from '../Components/WeatherWidget';
import { useGlobalState } from '../__mock__/store.mock';

afterEach(cleanup);

describe('This will test WeatherWidget Component', () => {
  test('shows the geolocation error message if no geolocation is available', async () => {
    const testMessage = 'Your browser does not support Geolocation';
    render(<WeatherWidget isGeolocationAvailable={false} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
