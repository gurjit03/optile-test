import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  WeatherWidgetCard: {
    minWidth: 100,
    minHeight: 100,
    padding: 8
  },
  headings: {
    fontWeight: 500
  }
});

const WeatherWidgetCard = ({
  onClick,
  selected = false,
  date = 12,
  temp = 0
}) => {
  const classes = useStyles();
  return (
    <Paper
      onClick={onClick}
      classes={{
        root: classes.WeatherWidgetCard
      }}
      elevation={selected ? 5 : 1}
    >
      <Typography
        classes={{
          root: classes.headings
        }}
      >
        Temp:
      </Typography>{" "}
      {temp}
      <Typography
        classes={{
          root: classes.headings
        }}
      >
        Date:
      </Typography>{" "}
      {date}
    </Paper>
  );
};

WeatherWidgetCard.propTypes = {
  selected: PropTypes.bool,
  date: PropTypes.string,
  temp: PropTypes.string,
  onClick: PropTypes.func
};

export default WeatherWidgetCard;
