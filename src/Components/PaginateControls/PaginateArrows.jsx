import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

import "./PaginateArrows.css";

const PaginateArrows = ({
  displayLeft,
  displayRight,
  onLeftArrowClick,
  onRightArrowClick
}) => {
  return (
    <div className="PaginateArrows">
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
