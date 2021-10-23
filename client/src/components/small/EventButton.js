import React, { useState } from "react";
import "../../styles/components/small/eventButton.css";

const EventButton = (props) => {
  let classN = "event-button-container";
  if (props.event.title == "אימון") {
    classN += " training";
  } else if (props.event.title == "פנוי") {
    classN += " available";
  }
  return (
    <div className={classN}>
      <div>{props.event.title}</div>
      {props.event.date.toString().substring(16, 21)}
    </div>
  );
};
export default EventButton;
