import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputText from "../../small/InputText";
import ButtonMaterial from "../../small/ButtonMaterial";
import PasswordComp from "../../small/Password";
import SuccessAnimation from "../../small/SuccessAnimation";
import "../../../styles/cross.css";
import "../../../styles/general_pages.css";
import { Redirect } from "react-router";

import { LoadingRings } from "../../small/Loading";

//Actions
import { setMessageAction } from "../../../actions/message";

//
import { ERROR } from "../../../constants/materialTypes";

//Utils
import {
  forgotPassword_EmailApi,
  forgotPassword_CodeApi,
  forgotPassword_PassApi,
} from "../../../services/auth.service";

function ForgotComp({ setMessageAction }) {
  const mandatory = "שדה חובה";
  const [stage, setStage] = useState("start");
  //first - start
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  //second - code
  const [code, setCode] = useState("");
  const [codeHelper, setCodeHelper] = useState("");
  //third - change
  const [pass1, setPass1] = useState("");
  const [pass1Helper, setPass1Helper] = useState("");
  const [pass2, setPass2] = useState("");
  //fourth - finish

  function emailSubmit() {
    if (validateEmail()) {
      setStage("loading");
      forgotPassword_EmailApi({ email })
        .then(() => {
          setStage("code");
        })
        .catch((err) => {
          setStage("start");
          setMessageAction({
            status: ERROR,
            message: err.response.data,
          });
        });
    }
  }
  function codeSubmit() {
    setStage("loading");
    forgotPassword_CodeApi({ email, code })
      .then(() => {
        setStage("change");
      })
      .catch((err) => {
        setStage("code");
        setMessageAction({
          status: ERROR,
          message: err.response.data,
        });
      });
  }
  function passSubmit() {
    if (validatePass1() && validatePass2()) {
      setStage("loading");
      forgotPassword_PassApi({ email, code, password: pass1 })
        .then(() => {
          setStage("finish");
        })
        .catch((err) => {
          setStage("change");
          setMessageAction({
            status: ERROR,
            message: err.response.data,
          });
        });
    }
  }
  //Validations
  function validateEmail() {
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

  function validatePass1() {
    if (pass1.length < 6) {
      setPass1Helper("אורך מינ' הוא 6");
      return false;
    } else if (pass1.length > 12) {
      setPass1Helper("אורך מקס' הוא 12");
      return false;
    }
    if (/^\d+$/.test(pass1)) {
      setPass1Helper("חובה להכיל תו שאינו ספרה");
      return false;
    }
    setPass1Helper("");
    return true;
  }
  function validatePass2() {
    if (pass1Helper != "") return false;
    if (pass1 !== pass2) {
      setPass1Helper("הסיסמאות לא תואמות");
      return false;
    }
    setPass1Helper("");
    return true;
  }

  function emailChanged(change) {
    change ? setEmail(change) : setEmail("");
    setEmailHelper("");
  }
  function codeChanged(change) {
    change ? setCode(change) : setCode("");
    setCodeHelper("");
  }
  function pass1Changed(change) {
    change.target.value ? setPass1(change.target.value) : setPass1("");
    setPass1Helper("");
  }
  function pass2Changed(change) {
    change.target.value ? setPass2(change.target.value) : setPass2("");
    setPass1Helper("");
  }
  return (
    <div className='full-page-flex-container'>
      <div className='textfit-title'>שחזור סיסמה</div>
      {stage == "loading" && <LoadingRings />}
      {stage == "start" && (
        <>
          <div className='textfit-medium'>יש להכניס מייל עימו נרשמת</div>
          <div className='input-container-responsive'>
            <InputText
              label='מייל'
              helper={""}
              onChange={emailChanged}
              helper={emailHelper.length == 0 ? "" : emailHelper}
            />
            <div style={{ width: "50%", marginRight: "25%" }}>
              <ButtonMaterial
                type='submit'
                content={"שלח"}
                submitClicked={emailSubmit}
              />
            </div>
          </div>
        </>
      )}
      {stage == "code" && (
        <>
          <div className='textfit-medium'> מייל נשלח ל {email}</div>
          <div className='textfit-medium'>
            {" "}
            יש לבדוק את התיבה (כולל בדואר-זבל) ולהזין את הקוד
          </div>
          <div className='input-container-responsive'>
            <InputText
              label='קוד'
              helper={""}
              onChange={codeChanged}
              helper={codeHelper.length == 0 ? "" : codeHelper}
            />
            <div style={{ width: "50%", marginRight: "25%" }}>
              <ButtonMaterial
                type='submit'
                content={"שלח"}
                submitClicked={codeSubmit}
              />
            </div>
          </div>
        </>
      )}
      {stage == "change" && (
        <>
          <div className='textfit-medium'>הקוד שהוזן נכון.</div>
          <div className='textfit-medium'>
            יש לבחור סיסמה חדשה, שאורכה לפחות 6
          </div>
          <div className='input-container-responsive'>
            <PasswordComp helper={pass1Helper} onChange={pass1Changed} />
            <PasswordComp helper={""} onChange={pass2Changed} />
          </div>
          <div style={{ width: "50%" }}>
            <ButtonMaterial
              type='submit'
              content={"שלח"}
              submitClicked={passSubmit}
            />
          </div>
        </>
      )}
      {stage == "finish" && (
        <>
          <SuccessAnimation />
          <div className='textfit-title'> סיסמה שונתה בהצלחה</div>
        </>
      )}
    </div>
  );
}

ForgotComp.propTypes = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setMessageAction })(ForgotComp);
