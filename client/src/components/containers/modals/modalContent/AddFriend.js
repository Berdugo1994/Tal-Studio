import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PlusIconControlled } from "../../../small/Icons";
import { friendshipAddAction } from "../../../../actions/auth";
import InputText from "../../../small/InputText";
import { setMessageAction } from "../../../../actions/message";
import { ERROR } from "../../../../constants/materialTypes";
import { LoadingRings } from "../../../small/Loading";
import SuccessAnimation from "../../../small/SuccessAnimation";

//Styles
import "../../../../styles/cross.css";

function AddFriend({ friendshipAddAction, setMessageAction }) {
  const [status, setStatus] = useState("form");
  const [timer, setTimer] = useState(null);
  function addFriend() {
    if (plusColor != "green") {
      setMessageAction({
        status: ERROR,
        message: "מספר הפלאפון שהוקש לא תקין",
      });
    } else {
      setStatus("loading");
      friendshipAddAction({ invited_phone: phoneField })
        .then(() => {
          setStatus("success");
        })
        .catch(() => {
          setStatus("form");
        });
    }
  }
  const [phoneHelper, setPhoneHelper] = useState("");
  const [phoneField, setPhoneField] = useState("");
  const [plusColor, setPlusColor] = useState("red");
  useEffect(() => {
    if (status == "success") {
      setTimer(
        setTimeout(() => {
          setStatus("form"); // count is 0 here
        }, 3000)
      );
    }
    return clearTimeout(timer);
  }, [status]);

  function validatePhone(phoneNumber) {
    setPlusColor("red");
    if (phoneNumber == undefined || phoneNumber.length == 0) {
      setPhoneHelper("יש להכניס מספר טלפון");
      return "יש להכניס מספר טלפון";
    }
    if (phoneNumber.length == 10) {
      setPhoneHelper("");
      setPlusColor("green");
      return true;
    }
    setPhoneHelper("יש להכניס מספר טלפון באורך 10 תווים");
    return "יש להכניס מספר טלפון באורך 10 תווים";
  }
  return (
    <>
      {status == "form" ? (
        <div style={{ minWidth: "30%" }}>
          <div className='text-fit-medium'>
            מס' פלאפון של החבר(הרשום) אותו אתם מעוניינים להוסיף
          </div>
          <InputText
            helper={phoneHelper}
            label="טל'"
            onChange={(change) => {
              setPhoneField(change);
              validatePhone(change);
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "5%",
            }}
          >
            <PlusIconControlled
              onClick={addFriend}
              style={{ color: plusColor }}
            />
          </div>
        </div>
      ) : status == "loading" ? (
        <LoadingRings />
      ) : (
        //else is success case
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SuccessAnimation />
          <div>הבקשה נשלחה בהצלחה</div>
        </div>
      )}
    </>
  );
}

AddFriend.propTypes = {};

const mapStateToProps = (state, props) => {
  return {};
};
export default connect(mapStateToProps, {
  friendshipAddAction,
  setMessageAction,
})(AddFriend);
