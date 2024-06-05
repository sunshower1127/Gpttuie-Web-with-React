import styled from "styled-components";
import myTheme from "../constants/myTheme";

export default function RefreshBtn() {
  return <Btn onClick={() => window.location.reload()}>⟳</Btn>;
}

const Btn = styled.button`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${myTheme.colors.primary};
  opacity: 0.7;
  border-radius: 6px;
  border-width: 0;
  padding: 3px 6px 0 9px;

  @media (min-width: 768px) {
    display: none;
  }
`;
