import React, { useCallback, useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { toast } from "react-toastify";
import {
  Card,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  makeStyles,
  Typography,
  emphasize
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

import throttle from "lodash.throttle";

import makeWeatherApiRequest from "./actions/make-weather-api-request";
// import WeatherWidgetCover from "./WeatherWidgetCover";
import WeatherWidgetCard from "./WeatherWidgetCard";
import PaginateArrows from "../PaginateControls/";
import Loader from "../Loader";

import { useGlobalState } from "../../store";
import { PrimaryBrand } from "../../jss.js";
import {
  normalizeWeatherData,
  normalizeForecastData,
  getDateFromCurrentDay
} from "../../utils";
import {
  createBarChartData,
  getTemperaturesFromForecastData,
  getCurrentTempFromWeatherData
} from "./helpers.js";

const THROTTLE_TIME_WEATHER = 100000; //10mins
const THROTTLE_TIME_FORECAST = 600000; //60 mins

const useStyles = makeStyles({
  WeatherWidget: {
    position: "relative",
    background: "#f5f6fa",
    padding: "16px",
    minHeight: "400px",
    width: "100%",
    borderRadius: "5px",
    margin: "10px auto"
  },
  TempScaleSelectionGroup: {
    marginTop: "10px",
    flexDirection: "row",
    justifyContent: "center"
  }
});

const WeatherWidget = props => {
  const classes = useStyles();
  const { coords } = props;
  const [currentDay, setCurrentDay] = useGlobalState("currentDay");
  const [currentWeatherData, setCurrentWeatherData] = useGlobalState(
    "currentWeatherData"
  );
  const [forecastData, setforecastData] = useGlobalState("forecastData");
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
          setCurrentWeatherData(normalizeWeatherData(responseData));
        } else {
          setforecastData(normalizeForecastData(responseData));
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
      if (currentDay === 1) {
        memoizedFetchWeather();
      }
      memoizedFetchForecast();
    }
  }, [currentDay, coords]);

  if (isLoading) {
    return <Loader />;
  } else if (!props.isGeolocationAvailable)
    return <div>Your browser does not support Geolocation</div>;
  else if (!props.isGeolocationEnabled)
    return <div>Geolocation is not enabled</div>;

  const barChartData = createBarChartData(forecastData, currentDay, tempScale);
  const currentTemp = getCurrentTempFromWeatherData(
    currentWeatherData,
    tempScale
  );
  const forecastTemperatures = getTemperaturesFromForecastData(
    forecastData,
    tempScale
  );
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        margin: "0 auto",
        maxWidth: 800,
        padding: 16
      }}
    >
      <Card
        classes={{
          root: classes.WeatherWidget
        }}
      >
        <RadioGroup
          classes={{
            root: classes.TempScaleSelectionGroup
          }}
          onChange={event => {
            setTempScale(event.target.value);
          }}
          defaultValue={tempScale}
          aria-label="temperature"
          name="temperature"
        >
          <FormControlLabel
            value="fahrenheit"
            control={<Radio color={PrimaryBrand} />}
            label="Fahrenheit"
          />
          <FormControlLabel
            value="celcius"
            control={<Radio color={PrimaryBrand} />}
            label="Celcius"
          />
        </RadioGroup>
        {currentWeatherData && (
          <Typography style={{ marginBottom: 8 }} align="center">
            Currently it's <span className="ft-w-500">{currentTemp}</span> and{" "}
            <span className="ft-w-500">{currentWeatherData.condition}</span>
          </Typography>
        )}
        <Grid
          direction="row"
          justify="center"
          alignItems="center"
          container
          spacing={2}
        >
          {forecastTemperatures &&
            forecastTemperatures.map((data, index) => {
              const currentSelectedDataIndex = index + 1;
              return (
                <Grid item xs={12} sm={4} md={2}>
                  <WeatherWidgetCard
                    key={index}
                    onClick={() => setCurrentDay(currentSelectedDataIndex)}
                    temp={
                      currentSelectedDataIndex === 1 ? currentTemp : data.temp
                    }
                    selected={currentDay === currentSelectedDataIndex}
                    date={getDateFromCurrentDay(index)}
                  />
                </Grid>
              );
            })}
        </Grid>
        <div style={{ height: "400px", width: "100%" }}>
          {barChartData && (
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
                <XAxis label="Time(in 24 hours)" dataKey="time" />
                <YAxis label="Temp" dataKey="temp" />
                <Tooltip />
                <Legend />
                <Bar dataKey="temp" fill={PrimaryBrand} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <PaginateArrows
          onRightArrowClick={() => setCurrentDay(Math.min(currentDay + 1, 5))}
          onLeftArrowClick={() => setCurrentDay(Math.max(currentDay - 1, 1))}
          displayLeft={currentDay !== 1}
          displayRight={currentDay !== 5}
        />
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
