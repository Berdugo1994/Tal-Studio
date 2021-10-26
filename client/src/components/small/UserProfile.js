import React, { useState } from "react";
import styled from "styled-components";
import { userConstants } from "../../constants/user";
import { IconPencil } from "./Icons";
import ModalEditFields from "../containers/modals/ModalFields";
export const Name = styled.nav`
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

export const Field = styled.nav`
  border: 2px solid green;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  margin-top: 1%;
`;

export const LabelField = styled.nav`
  width: max-content;
  margin-left: 2%;
  display: flex;
`;
export const ValuelField = styled.nav`
  width: max-content;
`;

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 25px;
  width: max-content;
  padding: 2%;
  font-size: 1.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 270px) {
    font-size: 0.7rem;
  }
`;

export const Labels = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
`;
export const Values = styled.nav`
  background: white;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  padding-right: 25px;
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
