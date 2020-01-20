// @Note: Accept temp in Fahrenheit
// results will be in celcius
export const getCelciusFromFahrenheit = tempF => {
  return (tempF - 32) / (5 / 9);
};

export const getCelciusFromKelvin = tempK => {
  return tempK - 273.15;
};

export const getFahrenheitFromKelvin = tempK => {
  return tempK * 1.8 - 459.67;
};
