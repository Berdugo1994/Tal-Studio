import React, { useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
export default function SelectAutoComplete(props) {
  useEffect(() => {
    if (props.defaultValue) {
      props.onChange(props.defaultValue);
    }
  }, []);
  return (
    <div>
      <Autocomplete
        getOptionSelected={(element, value) => {
          if (props.defaultValue)
            return element.value === props.defaultValue.value;
          else {
            return true;
          }
        }}
        defaultValue={props.defaultValue}
        onChange={(e, data) => {
          props.onChange(data);
        }}
        getOptionLabel={(option) => option.label}
        options={props.options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant='outlined'
            error={props.helper.length > 0}
          />
        )}
      />
      {props.helper.length > 0 && (
        <FormHelperText error>{props.helper}</FormHelperText>
      )}
    </div>
  );
}
