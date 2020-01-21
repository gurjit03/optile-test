import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import { PrimaryBrand } from "../../jss.js";

const useStyles = makeStyles({
  LoaderWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh"
  },
  Loader: {
    color: PrimaryBrand
  }
});

const Loader = ({ message = " Loading..." }) => {
  const classes = useStyles();
  return (
    <div className={classes.LoaderWrapper}>
      <CircularProgress classes={{ root: classes.Loader }} />
      <Typography variant="body1">{message}</Typography>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader;
