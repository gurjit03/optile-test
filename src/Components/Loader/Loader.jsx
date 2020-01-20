import React from "react";
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

export default Loader;
