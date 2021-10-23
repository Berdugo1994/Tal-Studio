import React, { Component } from "react";

//Styles
import "../../styles/components/small/mapPin.css";
import "../../styles/components/small/home.css";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 32.2744868,
      lng: 34.8841169,
    },
    zoom: 15,
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3373.388805891653!2d34.88205755016819!3d32.27452311665179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d3f74ca3fbb97%3A0xf52549fa82a3ae8e!2sHartsit%20St%2028%2C%20Even%20Yehuda!5e0!3m2!1sen!2sil!4v1632069888499!5m2!1sen!2sil'
          style={{ border: "0px", width: "300px", height: "300px" }}
        ></iframe>
      </div>
    );
  }
}

const Marker = (props) => {
  return (
    <>
      <div className='pin'></div>
      <div className='pulse'></div>
    </>
  );
};

export default SimpleMap;
