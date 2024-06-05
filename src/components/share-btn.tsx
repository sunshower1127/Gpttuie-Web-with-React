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
  return <Btn onClick={handleClick}>포스트 공유</Btn>;
}

const Btn = styled.button`
  background-color: tomato;
  border: none;
  color: white;
  padding: 10px 0;
  border-radius: 5px;
  width: 6rem;
  cursor: pointer;
`;
