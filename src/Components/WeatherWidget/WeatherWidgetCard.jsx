import React from "react";
import { Paper, Typography } from "@material-ui/core";

import "./WeatherWidgetCard.css";

const WeatherWidgetCard = ({ selected = false, date = 12, temp = 0 }) => (
  <Paper className="WeatherWidget__Card" elevation={selected ? 5 : 1}>
    <Typography className="ft-w-500">Temp:</Typography> {temp}
    <Typography className="ft-w-500">Date:</Typography> {date}
  </Paper>
);

export default WeatherWidgetCard;
