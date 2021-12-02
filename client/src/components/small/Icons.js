import { BsPencil } from "react-icons/bs";
import { MdDone, MdCancel, MdDelete } from "react-icons/md";
import { ImUserPlus } from "react-icons/im";
import { BsPlusLg } from "react-icons/bs";
import styled from "styled-components";
// export const IconPencil = styled.div`
export const IconPencil = styled(BsPencil)`
  height: 2.5rem;
  width: 2.5rem;
  align-self: flex-end;
  margin-bottom: 5px;
  color: #f28482;
  &:hover {
    weight: bold;
    color: #f6bd60;
    cursor: pointer;
  }
`;
export const VIcon = styled(MdDone)`
  height: 2.5rem;
  width: 2.5rem;
  align-self: flex-end;
  &:hover {
    weight: bold;
    color: green;
    cursor: pointer;
  }
`;
export const DeleteIcon = styled(MdDelete)`
  height: 2.5rem;
  width: 2.5rem;
  align-self: flex-end;
  &:hover {
    weight: bold;
    color: red;
    cursor: pointer;
  }
  margin-bottom: 0px;
`;
export const XIcon = styled(MdCancel)`
  height: 2.5rem;
  width: 2.5rem;
  align-self: flex-end;
  &:hover {
    weight: bold;
    color: red;
    cursor: pointer;
  }
  margin-bottom: 0px;
`;

export const PlusIcon = styled(ImUserPlus)`
  margin-top: 3px;
  align-self: center;
  justify-self: center;
  color: green;
  &:hover {
    weight: bold;
    color: green;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  margin-bottom: 0px;
`;

export const PlusIconControlled = styled(BsPlusLg)`
  margin-top: 2%;
  align-self: center;
  justify-self: center;
  &:hover {
    weight: bold;
    cursor: pointer;
  }
  margin-bottom: 0px;
`;
