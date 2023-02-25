import React from "react";
import "./style.scss";

const LoadingPulse = () => {
  return (
    <div className="loading-pulse">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="circle three"></div>
    </div>
  );
};

export default LoadingPulse;
