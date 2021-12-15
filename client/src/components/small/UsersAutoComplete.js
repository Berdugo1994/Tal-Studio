import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { requestAllUsers } from "../../services/user.service";
import { FormHelperText } from "@material-ui/core";

function UsersAutoComplete({
  onChange,
  helper,
  label,
  defaultValue,
  friends,
  isAdmin,
}) {
  const usersStatic = [{ value: "טל פקלר", label: "טל פקלר", ...defaultValue }];
  const [users, setUsers] = useState(usersStatic);
  useEffect(() => {
    if (isAdmin) {
      requestAllUsers().then((allUsers) => {
        setUsers(allUsers);
      });
    } else {
      let friends_to_select = [];
      friends.map((f) => {
        friends_to_select.push({
          label: f.firstname + " " + f.lastname,
          value: f.id,
        });
      });
      setUsers(friends_to_select);
    }
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
  friends: state.auth.friendships.friends_approved,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {})(UsersAutoComplete);
