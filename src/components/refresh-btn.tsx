import styled from "styled-components";
import myTheme from "../constants/myTheme";

export default function RefreshBtn() {
  return <Btn onClick={() => window.location.reload()}>⟳</Btn>;
}

const Btn = styled.button`
  position: fixed;
  bottom: 2px;
  left: 2px;
  font-size: 3rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${myTheme.colors.primary};
  border-radius: 16px;
  border-width: 0;
  padding: 0 0 10px 5px;

  @media (min-width: 768px) {
    display: none;
  }
`;
