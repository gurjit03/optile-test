import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { WeatherWidget } from '../Components/WeatherWidget';
import { GlobalStateProvider } from '../__mock__/store.mock';

afterEach(cleanup);
console.log(GlobalStateProvider, 'GlobalState');

describe('This will test WeatherWidget Component', () => {
  test('shows the geolocation error message when no coords given', async () => {
    const testMessage = 'Your browser does not support Geolocation';
    render(
      <GlobalStateProvider>
        <WeatherWidget />
      </GlobalStateProvider>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
