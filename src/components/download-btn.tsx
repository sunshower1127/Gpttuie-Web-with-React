import styled from "styled-components";
import { Recipe } from "./recipe";
import myTheme from "../constants/myTheme";

export default function DownloadBtn({
  recipe,
}: {
  recipe: Recipe | null | undefined;
}) {
  const handleClick = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ name: "Recipe", data: recipe })
    );
  };
  return <Btn onClick={handleClick}>레시피 저장</Btn>;
}

const Btn = styled.button`
  padding: 10px 0;
  width: 6rem;
  background-color: ${myTheme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
