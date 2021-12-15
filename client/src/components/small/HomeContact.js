import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Styles
import "../../styles/components/small/home.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import ContactForm from "./ContactForm";
import talface from "../../res/images/homePage/talface.png";
const HomeContact = (props) => {
  return (
    <div className='card-about-container'>
      <h1>
        <div className='card-title'> צור קשר</div>
      </h1>
      <div className='card-contact-container'>
        <div style={{ width: "70%" }}>
          <ContactForm />
        </div>
        <div
          style={{
            width: "30%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* <div
            className='circletag'
            style={{ backgroundImage: `url( ${talface})` }}
          /> */}
            <a
              href='tel:+972-52-404-1231'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexFlow: "wrap",
                color: "#F28482",
                textDecoration: "none",
                marginBottom: "20px",
              }}
            >
              <FiPhoneCall style={{ marginLeft: "2px" }} />
              <div className='fittext'>052-404-1231</div>
            </a>
          </div>
          <div
            style={{
              width: "25%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a
              href='https://wa.me/972524041231'
              className='whatsapp-eden'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeContact.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(HomeContact);
