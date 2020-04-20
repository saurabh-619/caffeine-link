import React, { Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  return (
    <Fragment>
      <div
        style={{
          height: "70vh",
          margin: "auto",
          display: "block",
        }}
      >
        <CircularProgress
          color="secondary"
          style={{ margin: "auto", marginTop: "auto", display: "block" }}
        />
      </div>
    </Fragment>
  );
};

export default Spinner;
