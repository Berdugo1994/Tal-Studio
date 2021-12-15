import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

export default function InputText(props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.onChange(input);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    if (props.defaultValue) {
      setInput(props.defaultValue);
    }
  }, []);

  return (
    <div>
      <TextField
        fullWidth={true}
        label={props.label}
        variant='outlined'
        helperText={props.onlyRed ? "" : props.helper}
        onChange={(e) => setInput(e.target.value)}
        error={props.helper.length > 0}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}

/*
import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

export default function InputText(props) {
  const [input, setInput] = useState("");
  const [maxLengthError, setMaxLengthError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.onChange(input);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  useEffect(() => {
    if (props.defaultValue) {
      setInput(props.defaultValue);
    }
  }, []);
  let max_length = props.max_length || 16;
  return (
    <div>
      <TextField
        fullWidth={true}
        label={props.label}
        variant='outlined'
        helperText={
          props.onlyRed
            ? ""
            : maxLengthError
            ? "אורך מקסימלי:" + max_length
            : props.helper
        }
        onChange={(e) => {
          if (e.target.value.length <= max_length) {
            setInput(e.target.value);
            setMaxLengthError(null);
          } else {
            console.log("here");
            setMaxLengthError(e.target.value.length);
          }
        }}
        error={props.helper.length > 0 || maxLengthError}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}*/
