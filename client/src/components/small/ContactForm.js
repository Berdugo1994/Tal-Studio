import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
//Custom Components
import InputText from "./InputText";
import { LoadingRings } from "./Loading";
import ButtonMaterial from "./ButtonMaterial";
import SuccessAnimation from "./SuccessAnimation";
//Actions
import { contactAction } from "../../actions/auth";

//Styles
import "../../styles/components/small/home.css";
import "../../styles/cross.css";

function ContactForm({ contactAction }) {
  // classNames conditions
  const [forming, setForming] = useState("visible");
  const [loading, setLoading] = useState("hidden");
  const [display, setDisplay] = useState("form");
  //errors text
  const [phoneHelper, setPhoneHelper] = useState("");
  const [nameHelper, setNameHelper] = useState("");
  const [messageHelper, setMessageHelper] = useState("");
  const mandatory = "שדה חובה";
  const onSubmit = (result) => {
    setDisplay("loading");
    contactAction(result)
      .then((e) => {
        setDisplay("success");
      })
      .catch((err) => {
        setDisplay("form");
      });
  };

  const { handleSubmit, control, getValues } = useForm({
    shouldUnregister: false,
  });

  function validateName(nameField) {
    if (nameField == undefined || nameField.length == 0) {
      setNameHelper(mandatory);
      return false;
    }
    if (nameField.length < 2) {
      setNameHelper("אורך מינ' 2 תוים");
      return false;
    }
    setNameHelper("");
    return true;
  }
  function validateMessageName(nameField) {
    if (nameField == undefined || nameField.length == 0) {
      setMessageHelper(mandatory);
      return false;
    }
    if (nameField.length < 2) {
      setMessageHelper("אורך מינ' 2 תוים");
      return false;
    }
    setMessageHelper("");
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

  return (
    <div>
      {display == "loading" ? (
        <LoadingRings />
      ) : display == "success" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <SuccessAnimation />
          <div>ההודעה נשלחה</div>
        </div>
      ) : (
        <form
          className={forming}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='on'
        >
          <div className='form-container-contact'>
            <div style={{ fontSize: "large" }}> השאירו פרטים </div>
            <div className='single-small' style={{ width: "100%" }}>
              <Controller
                control={control}
                name='name'
                rules={{
                  validate: {
                    checkName: (v) => validateName(v),
                  },
                }}
                render={({ field: { onChange } }) => (
                  <InputText
                    helper={nameHelper}
                    label='שם'
                    onChange={onChange}
                    onlyRed={true}
                    // defaultValue={"עדן ברדוגו"}
                  />
                )}
              />
            </div>
            <div className='single-small' style={{ width: "100%" }}>
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
                    // defaultValue={"0547585528"}
                    onlyRed={true}
                  />
                )}
              />
            </div>

            <div className='single-small' style={{ width: "100%" }}>
              <Controller
                control={control}
                name='message'
                rules={{
                  validate: {
                    checkMessageName: (v) => validateMessageName(v),
                  },
                }}
                render={({ field: { onChange } }) => (
                  <InputText
                    helper={messageHelper}
                    label='הודעה'
                    onChange={onChange}
                    onlyRed={true}
                    // defaultValue={"היי, אני רוצה להתחיל להתאמן בסטודיו"}
                  />
                )}
              />
            </div>
            <div
              className='flex-single-comp-container'
              style={{ marginTop: "1%", width: "60%" }}
            >
              <ButtonMaterial
                isDisabled={
                  nameHelper.length > 0 ||
                  phoneHelper.length > 0 ||
                  messageHelper.length > 0
                }
                type='submit'
                content={"שלח"}
                submitClicked={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

ContactForm.propTypes = {
  contactAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { contactAction })(ContactForm);
