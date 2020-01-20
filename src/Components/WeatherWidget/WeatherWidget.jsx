import React, { useCallback, useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { toast } from "react-toastify";
import {
  Card,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import makeWeatherApiRequest from "./actions/make-weather-api-request";
import WeatherWidgetCover from "./WeatherWidgetCover";
import WeatherWidgetCard from "./WeatherWidgetCard";
import Loader from "../Loader";

import throttle from "lodash.throttle";
import "./WeatherWidget.css";

import { useGlobalState } from "../../store";
import {
  getTemperaturesFromWeatherData,
  getCelciusFromKelvin,
  getFahrenheitFromKelvin,
  normalizeWeatherData,
  getDateFromCurrentDay
} from "../../utils";
import {
  createBarChartData,
  getCurrentTempFromWeatherData
} from "./helpers.js";

const THROTTLE_TIME_WEATHER = 100000; //10mins
const THROTTLE_TIME_FORECAST = 600000; //60 mins

const useStyles = makeStyles({
  WeatherWidget: {
    background: "#f5f6fa",
    padding: "16px",
    minHeight: "400px",
    width: "100%",
    borderRadius: "5px",
    margin: "10px auto"
  }
});

const WeatherWidget = props => {
  const classes = useStyles();
  const { coords } = props;
  const [currentDay, setCurrentDay] = useGlobalState("currentDay");
  const [currentWeatherData, setCurrentWeatherData] = useGlobalState(
    "currentWeatherData"
  );
  const [weatherData, setWeatherData] = useGlobalState("weatherData");
  const [isLoading, setIsLoading] = useGlobalState("isLoading");
  const [tempScale, setTempScale] = useState("fahrenheit");

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
        if (type === "weather") {
          setCurrentWeatherData(responseData);
        } else {
          setWeatherData(normalizeWeatherData(responseData, tempScale)); // pick up the last forecast data among the all
        }
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
    [query, coords]
  );

  useEffect(() => {
    if (coords && coords.latitude && coords.longitude) {
      memoizedFetchWeather();
      memoizedFetchForecast();
    }
  }, [coords]);

  if (isLoading) {
    return <Loader />;
  } else if (!props.isGeolocationAvailable)
    return <div>Your browser does not support Geolocation</div>;
  else if (!props.isGeolocationEnabled)
    return <div>Geolocation is not enabled</div>;

  const barChartData = createBarChartData(weatherData, currentDay, tempScale);
  const currentTemp = getCurrentTempFromWeatherData(
    currentWeatherData,
    tempScale
  );
  return (
    <div style={{ display: "flex", maxWidth: 800, padding: 16 }}>
      <Card
        classes={{
          root: classes.WeatherWidget
        }}
      >
        <RadioGroup
          onChange={event => {
            setTempScale(event.target.value);
          }}
          defaultValue={tempScale}
          aria-label="temperature"
          name="temperature"
        >
          <FormControlLabel
            value="fahrenheit"
            control={<Radio color="primary" />}
            label="Fahrenheit"
          />
          <FormControlLabel
            value="celcius"
            control={<Radio color="primary" />}
            label="Celcius"
          />
        </RadioGroup>
        <WeatherWidgetCover
          onArrowClick={setCurrentDay}
          currentDay={currentDay}
        />
        <Grid
          direction="row"
          justify="center"
          alignItems="center"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={4} md={2}>
            <WeatherWidgetCard
              temp={currentTemp}
              selected={currentDay === 1}
              date={getDateFromCurrentDay(1)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <WeatherWidgetCard
              selected={currentDay === 2}
              date={getDateFromCurrentDay(2)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <WeatherWidgetCard
              selected={currentDay === 3}
              date={getDateFromCurrentDay(3)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <WeatherWidgetCard
              selected={currentDay === 4}
              date={getDateFromCurrentDay(4)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <WeatherWidgetCard
              selected={currentDay === 5}
              date={getDateFromCurrentDay(5)}
            />
          </Grid>
        </Grid>
        <div style={{ height: "400px", width: "100%" }}>
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={barChartData}
              margin={{
                top: 20,
                bottom: 20,
                left: 0
              }}
            >
              <XAxis dataKey="time" />
              <YAxis label="Temp" dataKey="temp" />
              <Tooltip />
              <Legend />
              <Bar dataKey="temp" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(WeatherWidget);
