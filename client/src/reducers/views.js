import {
  CALENDAR_MONTH,
  CALENDAR_DAY,
  MODAL_RESERVE_TRAINING,
} from "../constants/viewsTypes";
const initialState = {
  calendar: "month",
  modal_day_reserve: null,
}; // different views for calendar: month,day,modal-reserve

export default function viewFunc(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CALENDAR_MONTH:
      return {
        ...state,
        calendar: "month",
      };
    case CALENDAR_DAY:
      return {
        ...state,
        calendar: "day",
      };
    case MODAL_RESERVE_TRAINING:
      return {
        ...state,
        calendar: "modal-reserve",
        modal_day_reserve: { ...payload.modal_day_reserve },
      };
    default:
      return state;
  }
}
