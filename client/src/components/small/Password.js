import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { FormHelperText } from "@material-ui/core";
export default function Password(props) {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  useEffect(() => {
    if (props.defaultValue) {
      setValues({ ...values, password: props.defaultValue });
      props.onChange(props.defaultValue);
    }
  }, [props.defaultValue]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    props.onChange(event);
  };

  return (
    <div>
      <OutlinedInput
        fullWidth={true}
        error={props.helper.length > 0}
        type={values.showPassword ? "text" : "password"}
        onChange={handlePasswordChange("password")}
        onBlur={handlePasswordChange("password")}
        value={values.password}
        variant='outlined'
        placeholder='סיסמה'
        endAdornment={
          <InputAdornment position='start'>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.helper.length > 0 && (
        <FormHelperText error>{props.helper}</FormHelperText>
      )}
    </div>
  );
}
