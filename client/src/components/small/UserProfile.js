import React, { useState } from "react";
import styled from "styled-components";
import { userConstants } from "../../constants/user";
import { IconPencil } from "./Icons";
import ModalEditFields from "../containers/modals/ModalFields";
export const Name = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 4rem;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

export function UserProfile(props) {
  return (
    <Name>
      <div style={{ paddingLeft: "1vw" }}>{props.user.firstname}</div>
      <div>{props.user.lastname}</div>
    </Name>
  );
}

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
  flex-direction: row;
  background: white;
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

export const Labels = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;
export const Values = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  padding-right: 25px;
  flex-wrap: wrap;
`;
export function UserProfileFull(props) {
  const [modalOpen, setModalOpen] = useState(false);
  let userBirthdate =
    props.user.birthdate.split("-")[2] +
    "/" +
    props.user.birthdate.split("-")[1] +
    "/" +
    props.user.birthdate.split("-")[0];
  return (
    <Container>
      <Labels>
        <LabelField>שם פרטי:</LabelField>
        <LabelField>שם משפחה:</LabelField>
        <LabelField>דוא"ל:</LabelField>
        <LabelField>פלאפון:</LabelField>
        <LabelField>תאריך לידה:</LabelField>
        <LabelField>מין:</LabelField>
        <LabelField>עיר:</LabelField>
        <LabelField>מיקוד:</LabelField>
        <LabelField>ספורט מועדף:</LabelField>
      </Labels>
      <Values>
        <LabelField>{props.user.firstname}</LabelField>
        <LabelField>{props.user.lastname}</LabelField>
        <LabelField>{props.user.email}</LabelField>
        <LabelField>{props.user.phone}</LabelField>
        <LabelField>{userBirthdate}</LabelField>
        <LabelField>{userConstants.gender[props.user.gender]}</LabelField>
        <LabelField>{props.user.city}</LabelField>
        <LabelField>{props.user.zip || "-"}</LabelField>
        <LabelField>{userConstants.fav_sport[props.user.fav_sport]}</LabelField>
      </Values>
      <IconPencil
        onClick={() => {
          setModalOpen(true);
        }}
      ></IconPencil>
      <ModalEditFields
        user={props.user}
        open={modalOpen}
        close={() => {
          setModalOpen(false);
        }}
      />
    </Container>
  );
}
