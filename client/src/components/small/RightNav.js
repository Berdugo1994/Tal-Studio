import React, { useEffect, useState, useRef } from "react";
import * as Styles from "../small/NavbarElement";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BsCalendar, BsPencil, BsPersonSquare } from "react-icons/bs";
import { CgLogIn } from "react-icons/cg";
import { FaRunning } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import "../../styles/cross.css";

function RightNav({
  open,
  animateOut,
  closeRef,
  closeRightNavbar,
  isLogged,
  isAdmin,
}) {
  const [animateIn, setAnimateIn] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !closeRef.current.contains(event.target)
      ) {
        closeRightNavbar();
      }
    };
    if (!animateOut) {
      // in this moment rightNav comes in.
      setAnimateIn(true);
      document.addEventListener("mouseup", handleClickOutside, false);
    } else {
      // rightNav comes out , 300ms after open will be false and comp is not render
      setAnimateIn(false);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside, false);
    };
  }, [animateOut, open]);
  return (
    <Styles.Ul open={open} animateIn={animateIn} ref={wrapperRef}>
      <Styles.RightNavLink
        to='/home'
        onClick={() => {
          closeRightNavbar();
        }}
      >
        <FaRunning />
        <li>דף הבית</li>
      </Styles.RightNavLink>
      {!isLogged && (
        <>
          <Styles.RightNavLink
            to='/login'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <CgLogIn />
            <li>התחברות</li>
          </Styles.RightNavLink>
          <Styles.RightNavLink
            to='/register'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <BsPencil />
            <li>הרשמה</li>
          </Styles.RightNavLink>
          <Styles.RightNavLink
            to='/gallery'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <RiGalleryFill />
            <li>גלריה</li>
          </Styles.RightNavLink>
        </>
      )}
      {isLogged && !isAdmin && (
        <>
          <Styles.RightNavLink
            to='/calendar'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <BsCalendar />
            <li>אימונים</li>
          </Styles.RightNavLink>
        </>
      )}
      {isLogged && (
        <>
          <Styles.RightNavLink
            to='/profile'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <BsPersonSquare />
            <li>פרופיל</li>
          </Styles.RightNavLink>
          <Styles.RightNavLink
            to='/gallery'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <RiGalleryFill />
            <li>גלריה</li>
          </Styles.RightNavLink>
        </>
      )}
      {isAdmin && (
        <>
          <hr style={{ marginRight: "12px" }} className='rounded' />
          <Styles.RightNavLink
            to='/admin'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <RiGalleryFill />
            <li>מנהל</li>
          </Styles.RightNavLink>
          <Styles.RightNavLink
            to='/admincalendar'
            onClick={() => {
              closeRightNavbar();
            }}
          >
            <RiGalleryFill />
            <li>לוח אימונים</li>
          </Styles.RightNavLink>
        </>
      )}
    </Styles.Ul>
  );
}
RightNav.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
const mapStateToProps = (state, props) => {
  return {
    isLogged: state.auth.isLoggedIn,
    open: props.open,
    setOpen: props.setOpen,
    animateOut: props.animateOut,
    closeRef: props.closeRef,
    closeRightNavbar: props.closeRightNavbar,
    isAdmin: state.auth.isAdmin,
  };
};
export default connect(mapStateToProps, {})(RightNav);
