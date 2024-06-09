import styled from "styled-components";
import { Recipe } from "./recipe";
import myTheme from "../constants/myTheme";
import { FaFileDownload } from "react-icons/fa";

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
  return (
    <Btn onClick={handleClick}>
      <FaFileDownload color={myTheme.colors.primary} />
      &nbsp; 레시피 저장
    </Btn>
  );
}

const Btn = styled.button`
  padding: 0.5rem 0.2rem;
  background-color: transparent;
  border: none;
  font-family: "Pretendard";
  border-bottom: 2px solid ${myTheme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  height: 2.7rem;
  color: black;
`;
