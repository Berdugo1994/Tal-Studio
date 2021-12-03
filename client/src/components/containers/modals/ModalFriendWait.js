import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentFriendWait from "./modalContent/FriendWait";
import Modal from "./Modal";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ModalFriendWait(props) {
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          <ContentFriendWait friend={props.friend} />
        </ModalContent>
      </Modal>
    </div>
  );
}
