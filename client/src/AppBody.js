import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import TestPage from "./pages/TestPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import GalleryPage from "./pages/GalleryPage";
import AdminCalendarPage from "./pages/AdminCalendarPage";
import ForgotPage from "./pages/ForgotPage";

//Components
import MessageBar from "./components/containers/bars/MessageBar";
import NavigationBar from "./components/containers/bars/Navbar";

//Actions
import { validateLoggedAction } from "./actions/auth";

function AppBody({ messageStatus, validateLoggedAction, isLogged }) {
  useEffect(() => {
    if (isLogged) validateLoggedAction();
  }, [isLogged]);
  return (
    <Router>
      <NavigationBar />
      {messageStatus != "" && <MessageBar />}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/calendar' component={CalendarPage} />
        <Route exact path='/test' component={TestPage} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route exact path='/admincalendar' component={AdminCalendarPage} />
        <Route exact path='/forgotpassword' component={ForgotPage} />
      </Switch>
    </Router>
  );
}

AppBody.propTypes = {
  messageStatus: PropTypes.string,
  validateLoggedAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  messageStatus: state.message.messageStatus,
  isLogged: state.auth.isLoggedIn,
});
export default connect(mapStateToProps, { validateLoggedAction })(AppBody);
