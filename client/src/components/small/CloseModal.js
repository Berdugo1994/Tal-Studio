import React from "react";
import "../../styles/components/small/closeModal.css";

const CloseModal = (props) => {
  const { setShowModal } = props;

  return (
    <div onClick={() => setShowModal((prev) => !prev)} className='close-button'>
      <div className='close-icon'></div>
    </div>
  );
};

export default CloseModal;
