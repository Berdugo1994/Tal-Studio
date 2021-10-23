import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Nav,
  NavLogo,
  NavLink,
  NavLinkFirst,
  NavMenu,
  NavBtn,
  NavBtnLink,
  StyledBurger,
} from "../../small/NavbarElement";
import RightNav from "../../small/RightNav";
// import ReactLogo from "../../../../public/assets/images/logo/instagram-2-1-logo-svgrepo-com.svg";

import "../../../styles/components/containers/bars/navbar.css";
const Navbar = ({ isLogged, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const closeButtonRef = useRef(null);
  const closeRightNavbar = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setOpen(false);
      setAnimateOut(false);
    }, 350);
  };
  return (
    <>
      <div className='top-navbar-container'>
        <Nav>
          <StyledBurger
            ref={closeButtonRef}
            open={open}
            onClick={() => {
              if (open) {
                closeRightNavbar();
              } else {
                setOpen(true);
              }
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </StyledBurger>
          {open && (
            <RightNav
              open={open}
              setOpen={setOpen}
              closeRef={closeButtonRef}
              animateOut={animateOut}
              closeRightNavbar={closeRightNavbar}
            />
          )}

          <NavMenu>
            <NavLinkFirst to='/home'>דף בית</NavLinkFirst>
            {!isLogged && (
              <>
                <NavLink to='/login'>התחברות</NavLink>
                <NavLink to='/register'>הרשמה</NavLink>
                <NavBtn>
                  <NavBtnLink to='/calendar'>אימונים</NavBtnLink>
                </NavBtn>
                <NavLink to='/gallery'>גלריה</NavLink>
              </>
            )}
            {isLogged && (
              <>
                <NavBtn>
                  <NavBtnLink to='/calendar'>אימונים</NavBtnLink>
                </NavBtn>
                <NavLink to='/profile'>פרופיל</NavLink>
                <NavLink to='/gallery'>גלריה</NavLink>
              </>
            )}
            {isAdmin && (
              <>
                <div style={{ color: "#84A59D" }}>|</div>
                <NavLink to='/admin'>מנהל</NavLink>
                <NavLink to='/admincalendar'>לוח אימונים</NavLink>
              </>
            )}
          </NavMenu>
          <div className='top-navbar-left-container '>
            <div className='instagram-container'>
              <a href='https://www.instagram.com/talfekler/'>
                <img
                  height='40'
                  width='40'
                  src={
                    "./assets/images/logo/instagram-2-1-logo-svgrepo-com.svg"
                  }
                  alt='Instagram Logo'
                />
              </a>
            </div>
            <NavLogo to='/home'>
              <img
                src='./assets/images/logo/logo_trans.png'
                alt='TAL FEKLER LOGO'
                height='40'
                width='150'
                style={{
                  marginTop: "5px",
                }}
              />
            </NavLogo>
          </div>
        </Nav>
      </div>
      <div className='empty-to-margin'></div>
    </>
  );
};
Navbar.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, {})(Navbar);
