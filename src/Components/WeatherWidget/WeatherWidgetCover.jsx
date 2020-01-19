import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

import { WeatherIconConstants } from "./constants";
import { getDateFromCurrentDay } from "../../utils";
import "./WeatherWidgetCover.css";

const WeatherWidgetCover = props => {
  const { currentDay, onArrowClick, data } = props;
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
      </div>
      <div className="WeatherWidgetCover__Panel">
        <p className="WeatherWidgetCover__Temp">{temp}F</p>
        <div className="WeatherWidgetCover__City">
          <p className="WeatherWidgetCover__CityWeather">{weatherType}</p>
        </div>

        <div onClick={() => new Date()} className="WeatherWidgetCover__Date">
          <span>{getDateFromCurrentDay(currentDay)}</span>
        </div>
      </div>

      <div className="WeatherWidgetCover__Nav">
        <span
          className="WeatherWidgetCover__Nav__MoveBack"
          onClick={current => onArrowClick(Math.max(currentDay - 1, 1))}
        >
          {"<"}
        </span>
        <span
          className="WeatherWidgetCover__Nav__MoveForward"
          onClick={current => onArrowClick(Math.min(currentDay + 1, 4))}
        >
          {">"}
        </span>
      </div>
    </div>
  );
};

export default WeatherWidgetCover;
