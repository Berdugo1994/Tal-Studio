import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import * as COLORS from "../../../styles/pallete";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;
`;
const ModalContainer = styled(motion.div)`
  width: 80%;
  height: 80%;
  background-color: ${COLORS.C2};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  font-size: large;
  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
    font-size: medium;
  }
`;
const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-50%" },
};
const ModalBig = ({ handleClose, children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={handleClose}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20.39 20.39'
            >
              <title>close</title>
              <line
                x1='19.39'
                y1='19.39'
                x2='1'
                y2='1'
                fill='none'
                stroke={COLORS.C3}
                strokeLinecap='round'
                strokeMiterlimit='10'
                strokeWidth='2'
              />
              <line
                x1='1'
                y1='19.39'
                x2='19.39'
                y2='1'
                fill='none'
                stroke={COLORS.C3}
                strokeLinecap='round'
                strokeMiterlimit='10'
                strokeWidth='2'
              />
            </CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ModalBig;
