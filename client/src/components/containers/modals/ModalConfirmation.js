import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentConfirm from "./modalContent/Confirm";
import Modal from "./Modal";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ModalConfirmation(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentConfirm
            confirmFunc={props.confirmFunc}
            discardFunc={props.discardFunc}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
