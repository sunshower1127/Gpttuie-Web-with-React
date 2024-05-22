import styled from "styled-components";
import { Recipe } from "./recipe";

export default function RecipeViewer({
  recipe,
}: {
  recipe: Recipe | null | undefined;
}) {
  if (!recipe) return null;
  return (
    <Wrapper>
      <Title>레시피</Title>
      <Text>{recipe.title}</Text>
      <Text>{recipe.servingSize}인분 기준</Text>
      <Text>{recipe.country}</Text>
      <Title>재료</Title>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <Item key={index}>{ingredient}</Item>
        ))}
      </List>
      <Title>요리과정</Title>
      <List>
        {recipe.steps.map((step, index) => (
          <Item key={index}>
            {step.image && <Image src={step.image} alt="No Image" />}
            {step.description && <Text>{step.description}</Text>}
            {step.timer && <Text>시간 : {step.timer}</Text>}
          </Item>
        ))}
      </List>
      {recipe.rating && <Text>별점 : {recipe.rating}</Text>}
      {recipe.oneLineReview && <Text>한줄 평가 : {recipe.oneLineReview}</Text>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const Item = styled.li`
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
