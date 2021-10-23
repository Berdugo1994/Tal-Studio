import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import { dates } from "../../constants/dates";
import { LoadingRings } from "./Loading";
import { Link } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

//Actions
import { requestEvents } from "../../actions/calendar";
import {
  getMyNextTraining,
  getThisMonthTrainingsNumber,
} from "../../services/calendar.service";

//Styles
import "../../styles/components/small/home.css";
import "../../styles/cross.css";

const HomeMyTrainings = ({ requestEvents }) => {
  let [nextTraining, setNextTraining] = useState(null);
  let [trainingsThisMonth, setTrainingsThisMonth] = useState(0);
  var items = [
    {
      name: "TAL STUDIO",
      description: "healthy addiction",
      img: "./assets/images/homePage/1000/talstudio.png",
    },
    {
      name: "Tal Studio",
      description: "healthy addiction",
      img: "./assets/images/homePage/1000/kick.png",
    },
  ];
  useEffect(() => {
    getMyNextTraining().then((res) => {
      if (res.data.length == 0) setNextTraining(false);
      else {
        setNextTraining(res.data);
      }
    });
    getThisMonthTrainingsNumber().then((res) => {
      setTrainingsThisMonth(res.data.count);
    });
    requestEvents();
  }, []);

  return (
    <Item
      item={items[0]}
      nextTraining={nextTraining}
      trainingsThisMonth={trainingsThisMonth}
    />
  );
};

function Item(props) {
  let date, dateStr, day, hour, minutes;
  if (props.nextTraining) {
    date = new Date(props.nextTraining.date);
    dateStr = date.getDate() + "/" + date.getMonth();
    day = dates[date.getDay()];
    hour = date.getHours().toString();
    minutes =
      date.getMinutes() < 10
        ? "0" + date.getMinutes().toString()
        : date.getMinutes().toString();
  }
  let [firstCounterRender, setFirstCounterRender] = useState(true);

  return (
    <div
      className='card-my-trainings-container'
      style={{
        backgroundImage: 'url("./assets/images/homePage/1000/clock.jpg")',
      }}
    >
      <div style={{ width: "35%", marginRight: "2%" }}>
        <Card>
          {/* <CardMedia
            component='img'
            height='250'
            image={"./assets/images/homePage/1000/clock.jpg"}
            alt='green iguana'
          /> */}
          <CardContent>
            <div className='text-fit-medium'>האימון הבא</div>
            {props.nextTraining && (
              <>
                <div className='text-fit-small'>
                  {day}
                  {" - "}
                  {"("}
                  {dateStr}
                  {")"}
                  {" - "}
                  {hour}:{minutes}
                </div>
              </>
            )}
            {props.nextTraining === null && <LoadingRings />}
            {props.nextTraining === false && (
              <div className='card-body'>טרם נקבע</div>
            )}
          </CardContent>
          <CardActions>
            <Link to='/calendar' style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "140px",
                  marginRight: "0",
                }}
              >
                {/* <ButtonMaterial
                  type='submit'
                  content={"לוח אימונים"}
                  submitClicked={() => {}}
                  isDisabled={false}
                /> */}
              </div>
            </Link>
          </CardActions>
        </Card>
      </div>
      <div style={{ width: "35%", marginLeft: "2%" }}>
        <Card>
          <CardContent>
            <div className='count-up-container'>
              <div className='text-fit-medium'>אימונים החודש</div>
              <CountUp start={0} duration={1} end={props.trainingsThisMonth}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor
                    onChange={(isVisible) => {
                      if (isVisible && firstCounterRender) {
                        start();
                        setFirstCounterRender(false);
                      }
                    }}
                  >
                    <div className='text-fit-medium'>
                      <span ref={countUpRef} />
                    </div>
                  </VisibilitySensor>
                )}
              </CountUp>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

HomeMyTrainings.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { requestEvents })(HomeMyTrainings);
