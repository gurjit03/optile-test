import { createGlobalState } from 'react-hooks-global-state';

export const initialState = {
  currentDay: 1,
  isLoading: false,
  currentWeatherData: {},
  forecastData: [] // a 2D array with each entry of 1rst level array gives us the entry into each day
};
export const { useGlobalState } = createGlobalState(initialState);
