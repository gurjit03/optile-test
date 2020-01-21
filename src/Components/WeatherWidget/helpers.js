import { getCelciusFromKelvin, getFahrenheitFromKelvin } from "../../utils";

export const createBarChartData = (forecastData, currentDay, tempScale) => {
  if (!Object.keys(forecastData).length) return forecastData;

  return forecastData[currentDay - 1].map((data, index) => {
    return {
      time: data.time,
      temp:
        tempScale === "celcius"
          ? getCelciusFromKelvin(data.temp)
          : getFahrenheitFromKelvin(data.temp)
    };
  });
};

export const getCurrentTempFromWeatherData = (
  currentWeatherData,
  tempScale
) => {
  if (!Object.keys(currentWeatherData).length) return 1;

  return tempScale === "celcius"
    ? getCelciusFromKelvin(currentWeatherData.temp).toFixed(2)
    : getFahrenheitFromKelvin(currentWeatherData.temp).toFixed(2);
};

export const getTemperaturesFromForecastData = (forecastData, tempScale) => {
  if (!forecastData.length) return [];
  else {
    return forecastData.map((data, index) => {
      const tempTotal = data.reduce(getTotal, 0);
      const tempAvg = tempTotal / 8;
      return {
        temp:
          tempScale === "celcius"
            ? getCelciusFromKelvin(tempAvg).toFixed(2)
            : getFahrenheitFromKelvin(tempAvg).toFixed(2)
      };
    });
  }
};

const getTotal = (initialValue, currentData) => {
  return initialValue + currentData.temp;
};
