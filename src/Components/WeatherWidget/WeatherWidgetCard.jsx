import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import { WbSunny, AccessTime } from "@material-ui/icons";
import { PrimaryBrand } from "../../jss.js";

const useStyles = makeStyles({
  WeatherWidgetCard: {
    minWidth: 100,
    minHeight: 100,
    padding: 8
  },
  headings: {
    fontWeight: 500
  },
  iconStyles: {
    fontSize: 12,
    color: PrimaryBrand,
    marginRight: 8
  },
  text: {
    marginBottom: 8
  }
});

const WeatherWidgetCard = ({
  onClick,
  selected = false,
  date = "",
  temp = ""
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
        <WbSunny className={classes.iconStyles} />
        Temp:
      </Typography>{" "}
      <Typography classes={{ root: classes.text }}>{temp}</Typography>
      <Typography
        classes={{
          root: classes.headings
        }}
      >
        <AccessTime className={classes.iconStyles} />
        Date:
      </Typography>{" "}
      <Typography classes={{ root: classes.text }}>{date}</Typography>
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
