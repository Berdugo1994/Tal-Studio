import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  timePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function SingleTimePicker(props) {
  const classes = useStyles();

  function handleDateChange(hour) {
    props.onChange(hour);
  }
  let maxDate = new Date();
  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container>
          <KeyboardTimePicker
            showTodayButton
            clearable
            id='time'
            label={props.label}
            className={classes.textField}
            onChange={handleDateChange}
            disabled={props.disabled}
            helperText={null}
            minutesStep={5}
            ampm={false}
            value={props.value}
            error={props.helper.length === 0 ? false : true}
            id={props.id}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {props.helper.length > 0 && (
        <FormHelperText error>{props.helper}</FormHelperText>
      )}
    </div>
  );
}

export default SingleTimePicker;
