// //Not in Use.
// // import CityCall_Hebrew from "./api_calls/CityCall_Hebrew";
// import React, { useState } from "react";
// import AsyncSelect from "react-select/async";
// export default function City(props) {
//   const cities = [
//     { value: "תל אביב-יפו", label: "תל אביב-יפו" },
//     { value: "אבן יהודה", label: "אבן יהודה" },
//     { value: "באר שבע", label: "באר שבע" },
//   ];
//   const [timeOut, timeOutSetter] = useState(undefined);
//   function textChanged() {
//     clearTimeout(timeOut);
//   }
//   const promiseOptions = (inputValue) => {
//     return new Promise((resolve) => {
//       let tOut = setTimeout(() => {
//         resolve(CityCall_Hebrew(inputValue));
//       }, 500);
//       timeOutSetter(tOut);
//     });
//   };

//   return (
//     <AsyncSelect
//       noOptionsMessage={() => "לא נמצאה אף עיר"}
//       loadingMessage={() => "מחפש.."}
//       placeholder='עיר'
//       cacheOptions
//       defaultOptions={cities}
//       loadOptions={promiseOptions}
//       onInputChange={(e) => {
//         textChanged();
//       }}
//       onChange={props.onChange}
//       value={props.value}
//     />
//   );
// }
