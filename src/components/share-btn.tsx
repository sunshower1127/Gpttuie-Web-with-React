import { FaShareAlt } from "react-icons/fa";
import styled from "styled-components";

export default function ShareBtn({ id }: { id: any }) {
  const handleClick = () => {
    if (window.ReactNativeWebView)
      window.ReactNativeWebView?.postMessage(
        "Share" + `https://gpttuie.web.app/recipes/${id}`
      );
    else if (navigator.share) {
      navigator.share({
        title: "Gpttuie AI 요리 레시피 공유",
        text: `Gpttuie에서 지금 레시피를 확인해보세요!`,
        url: `https://gpttuie.web.app/recipes/${id}`,
      });
    }
  };
  return (
    <Btn onClick={handleClick}>
      <FaShareAlt color="tomato" />
      &nbsp; 게시물 공유
    </Btn>
  );
}

const Btn = styled.button`
  padding: 0.5rem 0.2rem;
  background-color: transparent;
  border: none;
  font-family: "Pretendard";
  border-bottom: 2px solid tomato;
  font-size: 1rem;
  height: 2.7rem;
  cursor: pointer;
`;
