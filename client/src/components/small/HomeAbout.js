import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Styles
import "../../styles/components/small/home.css";

const HomeAbout = (props) => {
  return (
    <div className='card-about-container'>
      <div className='card-title'> אודות Tal Studio</div>
      <div className='card-body'>
        סטודיו בוטיקי, לאימונים פונקציונליים בקבוצות קטנות, אימונים אישיים,
        זוגיים ומשולשים, ברמה הגבוהה ביותר! הסטודיו מאובזר בציוד החדשני ביותר.
      </div>
      <div className='card-body'>
        באימונים תקבלו את מלואה תשומת הלב והטכניקה המדויקת. האימונים מתמקדים בכל
        מרכיבי הכושר: כוח, אירובי, שרירי ליבה, יציבות, קורדינאציה, גמישות ועוד.
      </div>
      <div className='card-body'>
        אני מבטיחה באופן אישי- שאני אקח אתכם לביצועים ולרמת כושר שלא האמנתם או
        חשבתם שתוכלו להגיע.  
      </div>
      <div className='card-body' style={{ paddingBottom: "2%" }}>
        תתכוננו להתמכרות הבריאה החדשה שלכם! אני מזמינה אתכם להגיע ולחוות אימונים
        באווירה שעוד לא הכרתם!
      </div>
    </div>
  );
};

HomeAbout.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(HomeAbout);
