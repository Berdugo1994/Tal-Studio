import React from "react";
import styled from "styled-components";
import ModalBig from "./ModalBig";
import EditUser from "./modalContent/EditUser";

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

export default function ModalEditField(props) {
  return (
    <div>
      <ModalBig isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          {<EditUser id='edit_profile' user={props.user} />}
        </ModalContent>
      </ModalBig>
    </div>
  );
}
