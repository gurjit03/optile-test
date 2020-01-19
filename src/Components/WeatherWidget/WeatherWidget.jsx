import React, { useCallback, useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { WiRaindrop, WiWindy, WiDaySunny } from "weather-icons-react";
import makeWeatherApiRequest from "./actions/make-weather-api-request";
import WeatherWidgetCover from "./WeatherWidgetCover";
import throttle from "lodash.throttle";
import "./WeatherWidget.css";

const THROTTLE_TIME_FORECAST = 600000; //60 mins
const THROTTLE_TIME_WEATHER = 100; //10 mins

const WeatherWidget = props => {
  const { coords } = props;
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecaseData] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather(query, coords, type = "weather") {
    setIsLoading(true);
    try {
      const requestUrl = makeWeatherApiRequest(type, query);
      const response = await fetch(requestUrl, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        const responseData = await response.json();
        if (type === "weather") setWeatherData(responseData);
        else
          setForecaseData(
            responseData.list.filter((elem, index) => index % 8 === 7)
          ); // pick up the last forecast data among the all
        // console.log(responseData, "responseData");
        setIsLoading(false);
      }

      setIsLoading(false);
    } catch (err) {
      toast("Woops due to some reason we failed to fetch weather");
      setIsLoading(false);
    }
  }

  const query =
    coords &&
    coords.latitude &&
    coords.longitude &&
    `lat=${coords.latitude}&lon=${coords.longitude}`;

  const memoizedFetchWeather = useCallback(
    throttle(() => fetchWeather(query, coords), THROTTLE_TIME_WEATHER),
    [query, coords]
  );

  const memoizedFetchForecast = useCallback(
    throttle(
      () => fetchWeather(query, coords, "forecast"),
      THROTTLE_TIME_FORECAST
    ),
    [query, coords, "forecast"]
  );

  useEffect(() => {
    if (coords && coords.latitude && coords.longitude) {
      // console.log(query, coords, "coords... ");
      if (currentDay === 1) {
        debugger;
        memoizedFetchWeather();
      } else {
        memoizedFetchForecast();
      }
    }
  }, [currentDay, coords]);

  if (isLoading) {
    return (
      <div className="loader">
        <Spin />;
      </div>
    );
  } else if (!props.isGeolocationAvailable)
    return <div>Your browser does not support Geolocation</div>;
  else if (!props.isGeolocationEnabled)
    return <div>Geolocation is not enabled</div>;

  const weatherDetails =
    currentDay === 1 ? weatherData : forecastData[currentDay];
  let wind, temp;
  if (weatherDetails && weatherDetails.weather) {
    temp = parseInt(weatherData.main.temp);
    wind = weatherDetails.wind.speed;
  }

  return (
    <article className="WeatherWidget">
      <WeatherWidgetCover
        onArrowClick={setCurrentDay}
        currentDay={currentDay}
        data={weatherDetails}
      />

      <div className="WeatherWidget__footer">
        {/* <p className="WeatherWidget__footer-icon">
          <WiDaySunny size={32} color="#485460" />2 MPH
        </p> */}
        <p className="WeatherWidget__footer-icon">
          <WiWindy size={32} color="#485460" />
          {wind}MPH
        </p>
        <p className="WeatherWidget__footer-icon">
          <WiRaindrop size={32} color="#485460" />
          33%
        </p>
      </div>
    </article>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(WeatherWidget);
