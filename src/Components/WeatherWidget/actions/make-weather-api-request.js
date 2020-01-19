const makeWeatherApiRequest = (type, query) => {
  return `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/${type}?appid=aa836fe11c1c94e60f802b4bfa205713&${query}`;
};

export default makeWeatherApiRequest;
