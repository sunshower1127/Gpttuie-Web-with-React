import styled from "styled-components";
import { Recipe } from "./recipe";
import ReactMarkdown from "react-markdown";

export default function RecipeViewer({
  recipe,
}: {
  recipe: Recipe | null | undefined;
}) {
  if (!recipe) return null;
  return (
    <Wrapper>
      <Title style={{ marginTop: 0 }}>레시피</Title>
      <Text>
        {recipe.title} {recipe.servingSize}인분
      </Text>
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
            {step.description && (
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <Text {...props} />,
                  strong: ({ node, ...props }) => (
                    <strong {...props} style={{ fontWeight: "bold" }} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} style={{ listStyleType: "decimal" }} />
                  ),
                }}
              >
                {step.description}
              </ReactMarkdown>
            )}
            {step.image && <Image src={step.image} alt="No Image" />}
            {step.timer && <Text>시간 : {step.timer}</Text>}
          </Item>
        ))}
      </List>
      {recipe.rating !== undefined && recipe.rating !== null && (
        <Text>별점 : {recipe.rating}</Text>
      )}
      {recipe.oneLineReview !== undefined && recipe.oneLineReview !== null && (
        <Text>한줄 평가 : {recipe.oneLineReview}</Text>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 3rem;
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 1px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const Item = styled.li`
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
