import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import "./Loader.css";

const Loader = ({ message = " Loading..." }) => {
  return (
    <div className="Loader">
      <CircularProgress />
      <Typography variant="body1">{message}</Typography>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader;
