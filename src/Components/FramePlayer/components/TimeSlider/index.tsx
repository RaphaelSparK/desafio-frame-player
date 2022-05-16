import React from "react";
import { Slider } from "antd";

export default function TimeSlider(props) {
  const { currentTime, totalTime, handleRange, disabled } = props;
  return (
    <Slider
      disabled={disabled}
      value={currentTime}
      min={1}
      max={totalTime}
      onChange={(value) => {
        handleRange(value);
      }}
    />
  );
}
