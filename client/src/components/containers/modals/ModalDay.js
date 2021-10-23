import React, { useState } from "react";
import styled from "styled-components";
import ContentDay from "./modalContent/Day";
import Modal from "./Modal";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  h1 {
    color: #5c3aff;
  }
`;

export default function ModalDay(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentDay
            day={props.day}
            closeDayOpenEvent={props.closeDayOpenEvent}
            updateData={props.updateData}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
