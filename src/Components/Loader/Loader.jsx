import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  Loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh"
  }
});

const Loader = ({ message = " Loading..." }) => {
  const classes = useStyles();
  return (
    <div className={classes.Loader}>
      <CircularProgress />
      <Typography variant="body1">{message}</Typography>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader;
