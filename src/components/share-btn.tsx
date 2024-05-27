import styled from "styled-components";
import myTheme from "../constants/myTheme";

export default function ShareBtn({
  id,
  title,
  username,
}: {
  id: any;
  title: any;
  username: any;
}) {
  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Gpttuie AI 요리 레시피 공유",
        text: `지금 Gpttuie에서 "${username}"님이 만든 "${title}" 레시피를 확인해보세요!`,
        url: `https://gpttuie.web.app/recipes/${id}`,
      });
    } else {
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
