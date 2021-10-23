import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LoadingRings } from "../../../small/Loading";

//Styles
import "../../../../styles/components/containers/modals/modalContent/event.css";

function ModalReserveTraining({ image }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [image]);

  return (
    <div className='modal-event-container'>
      {loading ? (
        <LoadingRings />
      ) : (
        <div
          key={1}
          style={{
            backgroundImage: `url( ${image.target.currentSrc})`,
            color: "white",
          }}
          className='background-gallery-photo'
        >
          {image.target.title}
        </div>
      )}
    </div>
  );
}

ModalReserveTraining.propTypes = {};

const mapStateToProps = (state, props) => {
  return {
    image: props.image,
  };
};
export default connect(mapStateToProps, {})(ModalReserveTraining);
