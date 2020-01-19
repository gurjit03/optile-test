export const WeatherIconConstants = {
  size: 120,
  animate: true,
  getIcon: (name = "Clouds") => {
    const weatherMap = {
      Clouds: "CLOUDY",
      Clear: "CLEAR_DAY",
      Atmosphere: "SLEET",
      Snow: "SNOW",
      Rain: "RAIN",
      Drizzle: "RAIN",
      Thunderstorm: "WIND"
    };

    return weatherMap[name];
  }
};
