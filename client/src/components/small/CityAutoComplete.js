import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { fetchCities } from "../../actions/cities";
import { FormHelperText } from "@material-ui/core";
import { setMessageAction } from "../../actions/message";
import { ERROR } from "../../constants/materialTypes";

function CityAutoComplete({
  fetchCities,
  setMessageAction,
  onChange,
  helper,
  defaultValue,
}) {
  const citiesStatic = [
    { value: "תל אביב - יפו", label: "תל אביב - יפו" },
    { value: "אבן יהודה", label: "אבן יהודה" },
    { value: "באר שבע", label: "באר שבע" },
    { value: "חיפה", label: "חיפה" },
  ];
  const [cities, setCities] = useState(citiesStatic);
  useEffect(() => {
    let promiseCities = fetchCities();
    promiseCities.then((data) => {
      if (data.length == 0) {
        setMessageAction({
          status: ERROR,
          message: "אין ערים להציג. יש לבחור ולשנות בעתיד",
        });
      } else {
        setCities(data);
        if (defaultValue) {
          onChange(defaultValue);
        }
      }
    });
  }, []);

  return (
    <div>
      <Autocomplete
        options={cities}
        getOptionSelected={(option) => {
          if (defaultValue) return option.value === defaultValue.value;
          else {
            return true;
          }
        }}
        defaultValue={defaultValue}
        getOptionLabel={(option) => option.label}
        onChange={(e, data) => onChange(data)}
        renderInput={(params) => (
          <TextField
            error={helper.length > 0}
            {...params}
            label='עיר'
            variant='outlined'
          />
        )}
      />
      {helper.length > 0 && <FormHelperText error>{helper}</FormHelperText>}
    </div>
  );
}

CityAutoComplete.propTypes = {
  fetchCities: PropTypes.func.isRequired,
  setMessageAction: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  helper: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  defaultValue: ownProps.defaultValue,
});
export default connect(mapStateToProps, { fetchCities, setMessageAction })(
  CityAutoComplete
);
