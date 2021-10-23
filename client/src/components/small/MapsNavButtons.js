import { Link } from "react-router-dom";
import MapsIcon from "../../res/images/icons/google-maps.jpg";
import WazeIcon from "../../res/images/icons/waze.png";
import "../../styles/components/small/home.css";

export default function MapsButtons(props) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Link
        to={{
          pathname:
            "https://www.google.com/maps/place/Hartsit+St+28,+Even+Yehuda/@32.2745231,34.8820629,17z",
        }}
        target='_blank'
      >
        <div
          className='home-icon'
          style={{
            backgroundImage: `url( ${MapsIcon})`,
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname:
            "https://ul.waze.com/ul?place=EiJIYXJ0c2l0IFN0IDI4LCBFdmVuIFllaHVkYSwgSXNyYWVsIjASLgoUChIJl7s_ynQ_HRUR98oCWXMsHTYQHCoUChIJW5Te1Qo_HRURxVgXicb-nuo&ll=32.27451860%2C34.88425160&navigate=yes&utm_campaign=default&utm_medium=lm_share_location",
        }}
        target='_blank'
      >
        <div
          className='home-icon'
          style={{
            backgroundImage: `url( ${WazeIcon})`,
          }}
        ></div>
      </Link>
    </div>
  );
}
