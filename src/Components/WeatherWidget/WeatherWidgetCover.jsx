import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

import { Typography, makeStyles } from "@material-ui/core";
import { WeatherIconConstants } from "./constants";
import { getDateFromCurrentDay } from "../../utils";
import "./WeatherWidgetCover.css";

const useStyles = makeStyles({
  WeatherType: {
    fontStyle: "italic",
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    fontWeight: 500
  }
});

const WeatherWidgetCover = props => {
  const { currentDay, onArrowClick, data } = props;
  const classes = useStyles();
  // console.log(currentDay, "current day...");
  let weatherDetails = data;
  let weatherType, temp, cityName;
  if (weatherDetails && weatherDetails.weather) {
    weatherType = weatherDetails.weather[0].main;
    temp = parseInt(weatherDetails.main.temp);
  }

  return (
    <div key={currentDay} className="WeatherWidgetCover">
      <div className="WeatherWidgetCover__Icon">
        <ReactAnimatedWeather
          icon={WeatherIconConstants.getIcon(weatherType)}
          color={WeatherIconConstants.color}
          size={WeatherIconConstants.size}
          animate={true}
        />
        <Typography
          classes={{
            root: classes.WeatherType
          }}
        >
          {weatherType}
        </Typography>
      </div>
      <div className="WeatherWidgetCover__Panel"></div>

      <div className="WeatherWidgetCover__Nav">
        <span
          className="WeatherWidgetCover__Nav__MoveBack"
          onClick={current => onArrowClick(Math.max(currentDay - 1, 1))}
        >
          {"<"}
        </span>
        <span
          className="WeatherWidgetCover__Nav__MoveForward"
          onClick={current => onArrowClick(Math.min(currentDay + 1, 5))}
        >
          {">"}
        </span>
      </div>
    </div>
  );
};

export default WeatherWidgetCover;
