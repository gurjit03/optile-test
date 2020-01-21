import moment from "moment";
import { getCelciusFromKelvin, getFahrenheitFromKelvin } from "../../utils";

export const createBarChartData = (forecastData, currentDay, tempScale) => {
  if (!Object.keys(forecastData).length) return forecastData;

  return forecastData[currentDay - 1].map((data, index) => {
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
  if (!Object.keys(currentWeatherData).length) return 1;

  return tempScale === "celcius"
    ? getCelciusFromKelvin(currentWeatherData.temp).toFixed(2)
    : getFahrenheitFromKelvin(currentWeatherData.temp).toFixed(2);
};

export const getTemperaturesFromForecastData = (forecastData, tempScale) => {
  if (!forecastData[0].length) return [];
  else {
    console.log(forecastData, "forecastData");
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
  return initialValue + currentData.main.temp;
};
