import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core";

import "./WeatherWidgetCard.css";
import { booleanLiteral } from "@babel/types";

const WeatherWidgetCard = ({ selected = false, date = 12, temp = 0 }) => {
  return (
    <Paper className="WeatherWidget__Card" elevation={selected ? 5 : 1}>
      <Typography className="ft-w-500">Temp:</Typography> {temp}
      <Typography className="ft-w-500">Date:</Typography> {date}
    </Paper>
  );
};

WeatherWidgetCard.propTypes = {
  selected: PropTypes.bool,
  date: PropTypes.string,
  temp: PropTypes.string
};

export default WeatherWidgetCard;
