import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PasswordComp from "../../small/Password";
import InputText from "../../small/InputText";
import { LoadingRings } from "../../small/Loading";
import ButtonMaterial from "../../small/ButtonMaterial";
import { Link } from "react-router-dom";

//Actions
import { loginAction } from "../../../actions/auth";

//Styles
import "../../../styles/components/containers/form.css";
import "../../../styles/components/containers/login_comp.css";
import "../../../styles/general_pages.css";
import "../../../styles/cross.css";

function LoginComp({ loginAction }) {
  // classNames conditions
  const [forming, setForming] = useState("visible login-box-container");
  const [loading, setLoading] = useState("hidden");
  //errors text
  const [emailHelper, setEmailHelper] = useState("");
  const [pass1Helper, setPass1Helper] = useState("");
  const mandatory = "שדה חובה";
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const { handleSubmit, control } = useForm({
    shouldUnregister: false,
  });

  const onSubmit = (data) => {
    loadingStatus("loading");
    let res = filterData(data);
    loginAction(res).catch((err) => {
      loadingStatus("form");
    });
  };
  const loadingStatus = (status) => {
    if (status == "loading") {
      setLoading("visible");
      setForming("hidden");
    } else if (status == "form") {
      setForming("visible login-box-container");
      setLoading("hidden");
    }
  };
  function filterData(data) {
    let result = { ...data };
    result.email = result.email.toLowerCase();
    return result;
  }

  function validateEmail(email) {
    if (email == undefined || email.length == 0) {
      setEmailHelper(mandatory);
      return false;
    }
    if (email.length > 24) {
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
  function validatePassword1(password) {
    password = password || "";
    if (password.length < 6) {
      setPass1Helper("אורך מינ' הוא 6");
      return false;
    } else if (password.length > 12) {
      setPass1Helper("אורך מקס' הוא 12");
      return false;
    }
    setPass1Helper("");
    return true;
  }
  return (
    <div id='login-comp-container' className='form-container-login'>
      <div className='textfit-title form-title'>התחברות</div>
      <div className={loading} style={{ marginTop: "10%" }}>
        <LoadingRings />
      </div>
      <div className={forming}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='login-box'>
            <div className='single-small'>
              <Controller
                control={control}
                name='email'
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
            <div className='login-forgot-pass-container'>
              <Link to='/forgotpassword' style={{ textDecoration: "none" }}>
                <button type=''>שכחת סיסמה?</button>
              </Link>
            </div>
            <div className='login-box-save-button'>
              <ButtonMaterial
                isDisabled={emailHelper.length > 0 || pass1Helper.length > 0}
                type='submit'
                content={"שלח"}
                submitClicked={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginComp.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { loginAction })(LoginComp);
