import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import * as COLORS from "../../styles/pallete";

export const Nav = styled.nav`
  background: ${COLORS.C1};
  font-weight: 700;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
  height: 100%;
  @media screen and (max-width: 768px) {
    margin-right: auto;
  }
`;

export const NavLink = styled(Link)`
  color: ${COLORS.MOUNTBATTEN_PINK};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: ${COLORS.C4};
    font-size: 1.2rem;
  }
  &:hover {
    color: ${COLORS.C3};
  }
`;

export const NavLinkFirst = styled(NavLink)`
  margin-right: 2rem;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: ${COLORS.MOUNTBATTEN_PINK};
  outline: none;
  border: 1px solid ${COLORS.MOUNTBATTEN_PINK};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${COLORS.WHITE};
    opacity: 0.9;
    color: ${COLORS.C3};
    border: 1px solid ${COLORS.C3};
  }
  &.active {
    color: ${COLORS.C4};
    font-size: 1.1rem;
    border: 1px solid ${COLORS.C4};
  }
`;

///////////////////// RightNav Styles ///////////////////////////

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  color: #fff;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => (props.open ? "#000" : "#000")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${(props) =>
        props.open ? "translateX(100%)" : "translateX(0%)"};
      opacity: ${(props) => (props.open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${(props) => (props.open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const RightNavLink = styled(Link)`
  display: flex;
  align-items: center;
  &.active {
    weight: bold;
    backround: white;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  display: none;
  color: #fff;
  flex-flow: row nowrap;
  position: absolute;
  width: 90%;
  top: 0;
  justify-content: flex-start;
  margin-top: 0px;
  align-items: center;
  font-size: 18px;
  height: 110px;
  margin-left: 20px;

  a {
    text-decoration: none;
    text-transform: none;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #0dadea;
    }
  }

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    background: ${COLORS.C0};
    position: fixed;
    transform: ${(props) =>
      props.animateIn ? "translateX(0)" : "translateX(100%)"};
    top: -16px;
    right: 0;
    height: 100%;
    width: 180px;
    padding-top: 7rem;
    transition: transform 0.3s ease-in-out;
    z-index: 9;

    align-items: start;
    li {
      color: white;

      &:hover {
        color: white;
      }
    }
  }
`;
