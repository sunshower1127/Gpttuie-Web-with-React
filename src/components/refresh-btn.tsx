import styled from "styled-components";
import myTheme from "../constants/myTheme";

export default function RefreshBtn() {
  return <Btn onClick={() => window.location.reload()}>⟳</Btn>;
}

const Btn = styled.button`
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${myTheme.colors.primary};

  @media (min-width: 768px) {
    display: none;
  }
`;
