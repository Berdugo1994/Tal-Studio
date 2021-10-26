import "date-fns";
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormHelperText } from "@material-ui/core";
const moment = require("moment");

function Birthdate(props) {
  const [selectedDate, setSelectedDate] = useState(
    props.defaultValue ? props.defaultValue : null
  );
  useEffect(() => {
    handleDateChange(props.defaultValue);
  }, []);

  function handleDateChange(date) {
    if (!date) {
      props.onChange(null);
      return;
    }
    setSelectedDate(date);
    props.onChange(date._d);
  }
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 16);

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container>
          <KeyboardDatePicker
            fullWidth
            placeholder='תאריך לידה'
            format={"DD/MM/YYYY"}
            value={selectedDate}
            onChange={handleDateChange}
            animateYearScrolling={false}
            autoOk={true}
            clearable
            error={props.helper.length > 0}
            maxDate={maxDate}
            maxDateMessage={""}
            invalidDateMessage={""}
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

export default Birthdate;
