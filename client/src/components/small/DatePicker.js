import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { FormHelperText } from "@material-ui/core";

function SingleDatePicker(props) {
  function handleDateChange(date) {
    if (date != null) props.onChange(date._d);
    else props.onChange(null);
  }
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container>
          <DatePicker
            fullWidth
            label='יום'
            format={"DD/MM/YYYY"}
            value={props.value}
            onChange={handleDateChange}
            animateYearScrolling={false}
            autoOk={true}
            clearable
            error={props.helper.length > 0}
            maxDate={maxDate}
            inputVariant='outlined'
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {props.helper.length > 0 && (
        <FormHelperText error>{props.helper}</FormHelperText>
      )}
    </div>
  );
}

export default SingleDatePicker;
