import styled from "styled-components";

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
  return <Btn onClick={handleClick}>Share</Btn>;
}

const Btn = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
