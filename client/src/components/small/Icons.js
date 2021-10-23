import { BsPencil } from "react-icons/bs";
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
  }
`;
