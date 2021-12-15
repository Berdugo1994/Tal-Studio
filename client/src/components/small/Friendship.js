import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconPencil, VIcon, DeleteIcon, PlusIcon } from "./Icons";
import TrainerSmall from "./TrainerSmall";
import ModalConfirmation from "../containers/modals/ModalConfirmation";
import ModalAddFriend from "../containers/modals/ModalAddFriend";
import { LoadingRings } from "./Loading";
import {
  friendshipRespondAction,
  friendshipDeleteAction,
  friendshipsLoadAction,
} from "../../actions/auth";
import "../../styles/cross.css";
export const Field = styled.div`
  border: 2px solid green;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  margin-top: 1%;
`;

export const LabelField = styled.div`
  width: max-content;
  margin-left: 2%;
  display: flex;
`;
export const ValuelField = styled.div`
  width: max-content;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #f7ede2;
  border-radius: 25px;
  width: 55%;
  padding: 2%;
  font-size: 1.5rem;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    width: 75%;
  }
  @media screen and (max-width: 450px) {
    font-size: 1rem;
    width: 85%;
  }
  @media screen and (max-width: 340px) {
    font-size: 0.85rem;
    width: 90%;
  }
  @media screen and (max-width: 275px) {
    font-size: 0.7rem;
    width: 95%;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1%;
  flex-wrap: wrap;
  background: #f6bd603b;
  border-radius: 25px;
`;
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  flex-wrap: wrap;
  background: #f6bd603b;
`;
export const Values = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  padding-right: 25px;
`;

const Friendship = ({
  friendships,
  friendshipsLoadAction,
  friendshipRespondAction,
  friendshipDeleteAction,
}) => {
  const [friend, setFriend] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const friendDelete = "friend-delete";
  const waitApprove = "wait-approve";
  const waitDelete = "wait-delete";
  useEffect(() => {
    if (modalStatus) return;
    let timeout;
    if (!firstRender) {
      timeout = setTimeout(() => {
        friendshipsLoadAction();
      }, 2000);
    } else {
      setFirstRender(false);
      friendshipsLoadAction();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [modalStatus]);
  function displayModal(friend, status) {
    setFriend(friend);
    setModalStatus(status);
  }
  let approved = (
    <div>אינך מקושר לאף מתאמן. להוספה יש ללחוץ על הכפתור הירוק</div>
  );
  if (friendships && friendships.friends_approved.length > 0) {
    approved = [];
    friendships.friends_approved.map((friend, i) => {
      approved.push(
        <div key={i}>
          <TrainerSmall friend={friend} />
          <DeleteIcon
            onClick={() => {
              displayModal(friend, friendDelete);
            }}
          />
        </div>
      );
    });
  }
  let waitForMe;
  if (friendships && friendships.friends_wait_for_me.length > 0) {
    waitForMe = [];
    friendships.friends_wait_for_me.map((friend, i) => {
      waitForMe.push(
        <div key={100 + i}>
          <div>
            <TrainerSmall friend={friend} />
          </div>
          <div>
            <VIcon
              onClick={() => {
                displayModal(friend, waitApprove);
              }}
            />
            <DeleteIcon
              onClick={() => {
                displayModal(friend, waitDelete);
              }}
            />
          </div>
        </div>
      );
    });
  }
  let waitForThem;
  if (friendships && friendships.friends_wait_for_them.length > 0) {
    waitForThem = [];
    friendships.friends_wait_for_them.map((friend, i) => {
      waitForThem.push(<div key={200 + i}>{friend.phone}</div>);
    });
  }

  return (
    <>
      {friendships == null && <LoadingRings />}
      {friendships != null && (
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <div className='text-fit-medium'>חברים</div>
            <PlusIcon
              onClick={() => {
                setModalStatus("friend-add");
              }}
            />
          </div>

          <CategoryContainer>{approved}</CategoryContainer>
          <div className='text-fit-medium'>בקשות חברות</div>
          <CategoryContainer>{waitForMe}</CategoryContainer>
          <div className='text-fit-medium'>טרם השיבו</div>
          <ListContainer>{waitForThem}</ListContainer>
        </Container>
      )}
      {modalStatus && modalStatus != "friend-add" && (
        <ModalConfirmation
          open={modalStatus != false}
          close={() => {
            setModalStatus(false);
          }}
          confirmFunc={() => {
            modalStatus == "friend-delete"
              ? friendshipDeleteAction({
                  friend_id: friend.id,
                })
              : modalStatus == "wait-approve"
              ? friendshipRespondAction({
                  friend_id: friend.id,
                  status: "approve",
                })
              : modalStatus == "wait-delete"
              ? friendshipRespondAction({
                  friend_id: friend.id,
                  status: "reject",
                })
              : "";
            setModalStatus(false);
          }}
          discardFunc={() => {
            setModalStatus(false);
          }}
        />
      )}
      {modalStatus && modalStatus == "friend-add" && (
        <ModalAddFriend
          open={modalStatus != false}
          close={() => {
            setModalStatus(false);
          }}
        />
      )}
    </>
  );
};

Friendship.propTypes = {
  friendships: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  friendships: state.auth.friendships,
});

export default connect(mapStateToProps, {
  friendshipsLoadAction,
  friendshipRespondAction,
  friendshipDeleteAction,
})(Friendship);
