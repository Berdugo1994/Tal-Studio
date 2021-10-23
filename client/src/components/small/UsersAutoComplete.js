import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { requestAllUsers } from "../../services/user.service";
import { FormHelperText } from "@material-ui/core";

function UsersAutoComplete({ onChange, helper, label, defaultValue }) {
  const usersStatic = [{ value: "טל פקלר", label: "טל פקלר", ...defaultValue }];
  const [users, setUsers] = useState(usersStatic);
  useEffect(() => {
    let promiseUsers = requestAllUsers();
    promiseUsers.then((data) => {
      if (defaultValue) data.push(defaultValue);
      setUsers(data);
    });
    if (defaultValue) onChange(defaultValue);
  }, []);

  return (
    <div>
      <Autocomplete
        fullWidth={true}
        options={users}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option) => {
          if (defaultValue) return option.value === defaultValue.value;
          else {
            return true;
          }
        }}
        defaultValue={defaultValue}
        onChange={(e, data) => onChange(data)}
        renderInput={(params) => (
          <TextField
            error={helper.length > 0}
            {...params}
            label={label}
            variant='outlined'
          />
        )}
      />
      {helper.length > 0 && <FormHelperText error>{helper}</FormHelperText>}
    </div>
  );
}

UsersAutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  helper: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  label: ownProps.label,
  helper: ownProps.helper,
  onChange: ownProps.onChange,
  defaultValue: ownProps.defaultValue,
});
export default connect(mapStateToProps, {})(UsersAutoComplete);
