import { getCelciusFromKelvin, getFahrenheitFromKelvin } from "../../utils";

import moment from "moment";

export const createBarChartData = (weatherData, currentDay, tempScale) => {
  if (!Object.keys(weatherData).length) return weatherData;

  console.log(weatherData, currentDay, "..");
  return weatherData[currentDay - 1].map((data, index) => {
    return {
      time: moment(new Date(data.dt_txt)).get("hour") + "",
      temp:
        tempScale === "celcius"
          ? getCelciusFromKelvin(data.main.temp)
          : getFahrenheitFromKelvin(data.main.temp)
    };
  });
};

export const getCurrentTempFromWeatherData = (
  currentWeatherData,
  tempScale
) => {
  if (!Object.keys(currentWeatherData).length) return currentWeatherData;

  console.log(currentWeatherData, "curentWeatherData");
  return tempScale === "celcius"
    ? getCelciusFromKelvin(currentWeatherData.main.temp)
    : getFahrenheitFromKelvin(currentWeatherData.main.temp);
};
