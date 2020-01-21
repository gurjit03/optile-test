import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  PaginateArrows: {
    left: 0,
    right: 0,
    justifyContent: "space-between",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 20,
    padding: "0 8px",
    transition: "opacity 0.2s",
    transform: "translateY(-50%)",
    zIndex: 2,
    cursor: "pointer"
  }
});

const PaginateArrows = ({
  displayLeft,
  displayRight,
  onLeftArrowClick,
  onRightArrowClick
}) => {
  const classes = useStyles();
  return (
    <div className={classes.PaginateArrows}>
      <ArrowLeft
        style={{ opacity: displayLeft ? 1 : 0, fontSize: 40 }}
        onClick={onLeftArrowClick}
      />
      <ArrowRight
        style={{ opacity: displayRight ? 1 : 0, fontSize: 40 }}
        onClick={onRightArrowClick}
      />
    </div>
  );
};

PaginateArrows.propTypes = {
  displayLeft: PropTypes.bool,
  displayRight: PropTypes.bool,
  onLeftArrowClick: PropTypes.func,
  onRightArrowClick: PropTypes.func
};

export default PaginateArrows;
