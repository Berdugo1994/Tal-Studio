import React from "react";
import styled from "styled-components";
import ContentAddFriend from "./modalContent/AddFriend";
import Modal from "./Modal";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ModalAddFriend(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentAddFriend />
        </ModalContent>
      </Modal>
    </div>
  );
}
