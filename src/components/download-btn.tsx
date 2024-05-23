import styled from "styled-components";
import { Recipe } from "./recipe";

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
  return <Btn onClick={handleClick}>Download</Btn>;
}

const Btn = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
