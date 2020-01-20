import { chunkArrayToGroups } from "./chunk-array-to-groups";

export const normalizeWeatherData = (weatherData = {}, tempScale) => {
  if (!Object.keys(weatherData)) return weatherData;

  return chunkArrayToGroups(weatherData.list, 5);
};

export const getTemperaturesFromWeatherData = (
  weatherData = {},
  currentDay = 1
) => {
  // console.log(weatherData);
  if (!Object.keys(weatherData)) return weatherData;

  return weatherData.list.filter(
    (weatherData, index) => index < currentDay * 7
  );
};
