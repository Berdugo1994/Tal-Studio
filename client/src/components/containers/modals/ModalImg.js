import React, { useState } from "react";
import styled from "styled-components";
import ContentEvent from "./modalContent/Image";
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

export default function ModalImg(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentEvent image={props.image} />
        </ModalContent>
      </Modal>
    </div>
  );
}
