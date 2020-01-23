import moment from "moment";
import { chunkArrayToGroups } from "./chunk-array-to-groups";

export const normalizeForecastData = (forecastData = {}) => {
  if (!Object.keys(forecastData)) return forecastData;

  return chunkArrayToGroups(forecastData.list, 5).map((forecastData, index) => {
    return forecastData.map(data => {
      return {
        date: data.dt_txt,
        time: moment(new Date(data.dt_txt)).get("hour") + "",
        temp: data.main.temp
      };
    });
  });
};

export const normalizeWeatherData = (weatherData = {}) => {
  if (!Object.keys(weatherData)) return weatherData;

  return {
    condition: weatherData.weather[0].description,
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
