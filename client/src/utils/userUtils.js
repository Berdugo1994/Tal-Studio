import { userConstants } from "../constants/user";
const moment = require("moment");
export function getDefaultUserField(user, value, typeOfInput) {
  //Built for EditUser components, for extracting defaultValues from user fields.
  if (typeOfInput == "SelectAutoComplete") {
    let label = userConstants[value][user[value]];
    if (label) {
      return { label, value: user[value] };
    } else {
      return undefined;
    }
  }
  if (typeOfInput == "city") {
    let label = user[value];
    if (label) {
      return { label, value: label };
    }
  }
  if (typeOfInput == "birthdate") {
    return moment(user[value], "DD-MM-YYYY");
  }
}
export function getOptions(field) {
  return userConstants[field].options;
}
export function getDefaultEventField(participant_ids, participant_names) {
  let defaultParticipants = [];
  participant_ids.map((id, i) => {
    defaultParticipants.push({ value: id, label: participant_names[i] });
  });
  return defaultParticipants;
}
