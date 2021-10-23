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
