import React, { useEffect, useState } from "react";
import "../../styles/components/small/success_animation.css";

export default function SuccessAnimation(props) {
  const [show, setShow] = useState("none");
  useEffect(() => {
    setTimeout(function () {
      setShow("block");
    }, 10);
  }, []);
  return (
    <div className='success-checkmark' key={props.key}>
      <div
        className='check-icon'
        style={{
          display: show,
        }}
      >
        <span className='icon-line line-tip'></span>
        <span className='icon-line line-long'></span>
        <div className='icon-circle'></div>
        <div className='icon-fix'></div>
      </div>
    </div>
  );
}
