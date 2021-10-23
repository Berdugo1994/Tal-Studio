import React, { useState } from "react";
import styled from "styled-components";
import ContentEvent from "./modalContent/Event";
import Modal from "./Modal";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;

export default function ModalEvent(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentEvent event={props.event} handleClose={props.close} />
        </ModalContent>
      </Modal>
    </div>
  );
}
