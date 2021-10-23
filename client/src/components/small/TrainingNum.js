import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const muiTheme = createTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#84a59d",
      },
      track: {
        color: "#84a59d",
      },
      rail: {
        color: "#F28482",
      },
    },
  },
});

export default function TrainingNum(props) {
  let defaultVal = parseInt(props.defaultValue) || 2;
  return (
    <div>
      <Typography
        style={{ textAlign: "center" }}
        id='discrete-slider-custom'
        gutterBottom
      >
        מס' אימונים שבועיים
      </Typography>
      <ThemeProvider theme={muiTheme}>
        <Slider
          defaultValue={defaultVal}
          valueLabelDisplay='auto'
          step={1}
          marks
          min={0}
          max={7}
          onChange={(_, value) => {
            props.onChange(value);
          }}
        />
      </ThemeProvider>
    </div>
  );
}
