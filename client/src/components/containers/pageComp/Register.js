import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@material-ui/core";
//Custom Components
import CityAutoComplete from "../../small/CityAutoComplete";
import InputText from "../../small/InputText";
import SelectAutoComplete from "../../small/SelectAutoComplete";
import Birthdate from "../../small/Birthdate";
import TrainingNum from "../../small/TrainingNum";
import PasswordComp from "../../small/Password";
import { LoadingRings } from "../../small/Loading";
import ButtonMaterial from "../../small/ButtonMaterial";
const moment = require("moment");

//Actions
import { registerAction } from "../../../actions/auth";

//Styles
import "../../../styles/components/containers/form.css";
import "../../../styles/general_pages.css";
import "../../../styles/cross.css";

//Utils
import { getOptions } from "../../../utils/userUtils";
import { filterForm } from "../../../utils/formUtils";

function Register({ registerAction }) {
  // classNames conditions
  const [forming, setForming] = useState("visible");
  const [loading, setLoading] = useState("hidden");
  const [regStatus, setRegStatus] = useState(false);
  //errors text
  const [phoneHelper, setPhoneHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [pass1Helper, setPass1Helper] = useState("");
  const [pass2Helper, setPass2Helper] = useState("");
  const [firstHelper, setFirstHelper] = useState("");
  const [lastHelper, setLastHelper] = useState("");
  const [genderHelper, setGenderHelper] = useState("");
  const [cityHelper, setCityHelper] = useState("");
  const [zipHelper, setZipHelper] = useState("");
  const [favHelper, setFavHelper] = useState("");
  const [sportHelper, setSportHelper] = useState("");
  const [birthdateHelper, setBirthdateHelper] = useState("");
  const mandatory = "שדה חובה";
  const loadingStatus = (status) => {
    if (status == "loading") {
      setLoading("visible");
      setForming("hidden");
    } else if (status == "form") {
      setForming("visible");
      setLoading("hidden");
    }
  };

  const { handleSubmit, control, getValues } = useForm({
    shouldUnregister: false,
    defaultValues: {
      training_num: 2,
    },
  });

  const onSubmit = (data) => {
    loadingStatus("loading");
    const result = filterForm(data);
    registerAction(result)
      .then((e) => {
        setRegStatus(true);
      })
      .catch((err) => {
        loadingStatus("form");
      });
  };

  function validateEmail(email) {
    if (email == undefined || email.length == 0) {
      setEmailHelper(mandatory);
      return false;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      setEmailHelper("");
      return true;
    }
    setEmailHelper("מייל בפורמט לא תקין");
    return false;
  }
  function validateBirthdate(dateField) {
    if (dateField == undefined || dateField == "") {
      setBirthdateHelper(mandatory);
      return false;
    }
    let date = new Date(dateField);
    let dateString =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      setBirthdateHelper("תאריך לא תקין");
      return false;
    }
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      setBirthdateHelper("תאריך לא תקין");
      return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;
    const res = day > 0 && day <= monthLength[month - 1];
    if (!res) {
      setBirthdateHelper("תאריך לא תקין");
      return false;
    }
    // VALIDATE USER 16+
    let userDate = new Date(year, month - 1, day);
    let today = new Date();
    let sixteenYearsMin = today.setFullYear(today.getFullYear() - 16);
    if (userDate > sixteenYearsMin) {
      setBirthdateHelper("גיל 16 מינימום");
      return false;
    }
    setBirthdateHelper("");
    return true;
  }
  function validatePassword1(password) {
    password = password || "";
    if (password.length < 6) {
      setPass1Helper("אורך מינ' הוא 6");
      return false;
    } else if (password.length > 12) {
      setPass1Helper("אורך מקס' הוא 12");
      return false;
    }
    if (/^\d+$/.test(password)) {
      setPass1Helper("חובה להכיל תו שאינו ספרה");
      return false;
    }

    setPass1Helper("");
    return true;
  }
  function validatePassword2(passwordConfirm) {
    const password = getValues("password");
    if (password !== passwordConfirm) {
      setPass2Helper("הסיסמאות לא תואמות");
      return false;
    }

    setPass2Helper("");
    return true;
  }
  function validateFirstName(nameField) {
    if (nameField == undefined || nameField.length == 0) {
      setFirstHelper(mandatory);
      return false;
    }
    if (nameField.length < 2) {
      setFirstHelper("אורך מינ' 2 תוים");
      return false;
    }
    setFirstHelper("");
    return true;
  }
  function validateLastName(nameField) {
    if (nameField == undefined || nameField.length == 0) {
      setLastHelper(mandatory);
      return false;
    }
    if (nameField.length < 2) {
      setLastHelper("אורך מינ' 2 תוים");
      return false;
    }
    setLastHelper("");
    return true;
  }
  function validateGender(genderField) {
    if (genderField == undefined || genderField.length == 0) {
      setGenderHelper(mandatory);
      return false;
    }
    setGenderHelper("");
    return true;
  }
  function validatePhone(phoneField) {
    if (phoneField == undefined || phoneField.length == 0) {
      setPhoneHelper("יש להכניס מספר טלפון");
      return "יש להכניס מספר טלפון";
    }
    if (phoneField.length == 10) {
      setPhoneHelper("");
      return true;
    }
    setPhoneHelper("יש להכניס מספר טלפון באורך 10 תווים");
    return "יש להכניס מספר טלפון באורך 10 תווים";
  }
  function validateCity(cityField) {
    if (cityField == undefined || cityField.length == 0) {
      setCityHelper(mandatory);
      return false;
    }
    setCityHelper("");
    return true;
  }
  function validateZip(zipField) {
    if (zipField.length > 7) {
      setZipHelper("אורך עד 7 תוים");
      return false;
    }
    setZipHelper("");
    return true;
  }
  function validateGeneric(field, func) {
    if (field == undefined || field == 0) {
      func(mandatory);
      return false;
    }
    func("");
    return true;
  }
  return (
    <div className='container-form-center'>
      {regStatus && <Redirect to='/login' />}
      <div className={loading}>
        <LoadingRings />
      </div>
      <div className='textfit-title form-title'>הרשמה</div>
      <form
        className={forming}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='on'
      >
        <div className='form-container'>
          <div className='single-small'>
            <Controller
              control={control}
              name='phone'
              rules={{
                validate: {
                  checkPhone: (v) => validatePhone(v),
                },
              }}
              render={({ field: { onChange } }) => (
                <InputText
                  helper={phoneHelper}
                  label="טל'"
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='email'
              autoFocus='true'
              rules={{
                validate: {
                  checkEmail: (v) => validateEmail(v),
                },
              }}
              render={({ field: { onChange } }) => (
                <InputText
                  helper={emailHelper}
                  label='דואר אלקטרוני'
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='password'
              rules={{
                validate: {
                  checkPassowrd: (v) => validatePassword1(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PasswordComp
                  helper={pass1Helper}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='password_confirm'
              rules={{
                validate: {
                  checkPassowrd: (v) => validatePassword2(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PasswordComp
                  helper={pass2Helper}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              )}
            />
          </div>

          <div className='single-small'>
            <Controller
              control={control}
              name='firstname'
              rules={{
                validate: {
                  checkFirstName: (v) => validateFirstName(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  helper={firstHelper}
                  label='שם פרטי'
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='lastname'
              rules={{
                validate: {
                  checkLastName: (v) => validateLastName(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  helper={lastHelper}
                  label='שם משפחה'
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className='single-small'>
            <Controller
              control={control}
              name='gender'
              rules={{
                validate: {
                  checkGender: (v) => validateGender(v),
                },
              }}
              render={({ field: { onChange } }) => (
                <SelectAutoComplete
                  helper={genderHelper}
                  label='מין'
                  onChange={onChange}
                  options={getOptions("gender")}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='city'
              rules={{
                validate: {
                  checkCity: (v) => validateCity(v),
                },
              }}
              render={({ field: { onChange } }) => (
                <CityAutoComplete helper={cityHelper} onChange={onChange} />
              )}
            />
          </div>

          <div className='single-small'>
            <Controller
              control={control}
              name='birthdate'
              rules={{
                validate: {
                  checkBirthdate: (v) => validateBirthdate(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Birthdate
                  helper={birthdateHelper}
                  onChange={onChange}
                  value={value}
                  defaultValue={moment("01-01-1990", "DD-MM-YYYY")}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='zip'
              rules={{
                validate: {
                  checkZip: (v) => validateZip(v),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  helper={zipHelper}
                  label='מיקוד'
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className='single-small'>
            <Controller
              control={control}
              name='fav_sport'
              rules={{
                validate: {
                  checkFav: (v) => validateGeneric(v, setFavHelper),
                },
              }}
              render={({ field: { onChange } }) => (
                <SelectAutoComplete
                  helper={favHelper}
                  label='אימון מועדף'
                  onChange={onChange}
                  options={getOptions("fav_sport")}
                />
              )}
            />
          </div>
          <div className='single-small'>
            <Controller
              control={control}
              name='sport_for_me'
              rules={{
                validate: {
                  checkSport: (v) => validateGeneric(v, setSportHelper),
                },
              }}
              render={({ field: { onChange } }) => (
                <SelectAutoComplete
                  helper={sportHelper}
                  label='ספורט בשבילי'
                  onChange={onChange}
                  options={getOptions("sport_for_me")}
                />
              )}
            />
          </div>

          <div className='single-small'>
            <Controller
              control={control}
              name='training_num'
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TrainingNum defaultValues={2} onChange={onChange} />
              )}
            />
          </div>

          {/* <Button
            className='button-send'
            variant='contained'
            color='primary'
            type='submit'
          >
            שלח
          </Button> */}
          <div className='flex-single-comp-container'>
            <div style={{ width: "50%" }}>
              <ButtonMaterial
                style={{ marginBottom: "100px" }}
                isDisabled={emailHelper.length > 0 || pass1Helper.length > 0}
                type='submit'
                content={"שלח"}
                submitClicked={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  registerAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { registerAction })(Register);
