import { chunkArrayToGroups } from "./chunk-array-to-groups";

export const normalizeForecastData = (forecastData = {}) => {
  if (!Object.keys(forecastData)) return forecastData;

  return chunkArrayToGroups(forecastData.list, 5);
};

export const normalizeWeatherData = (weatherData = {}) => {
  if (!Object.keys(weatherData)) return weatherData;

  return {
    weatherType: weatherData.weather[0].main,
    temp: weatherData.main.temp
  };
};

export const getTemperaturesFromforecastData = (
  forecastData = {},
  currentDay = 1
) => {
  // console.log(forecastData);
  if (!Object.keys(forecastData)) return forecastData;

  return forecastData.list.filter(
    (forecastData, index) => index < currentDay * 7
  );
};
