export const WeatherIconConstants = {
  size: 180,
  animate: true,
  color: "#353b48",
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
