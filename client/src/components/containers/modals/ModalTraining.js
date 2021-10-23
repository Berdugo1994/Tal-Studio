import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentEventTraining from "./modalContent/CreatedTraining";
import ContentEventEditTraining from "./modalContent/EditEvent";
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

export default function ModalTraining(props) {
  const [editMode, setEditMode] = useState(false);
  function editModeFunction(status) {
    setEditMode(status);
  }
  return (
    <div>
      <Modal isOpen={props.open} handleClose={props.close}>
        <ModalContent>
          {!editMode ? (
            <ContentEventTraining
              event={props.event}
              handleClose={props.close}
              changeToEditMode={editModeFunction}
            />
          ) : (
            <ContentEventEditTraining
              event={props.event}
              handleClose={props.close}
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
