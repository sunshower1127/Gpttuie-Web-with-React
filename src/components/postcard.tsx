import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function PostCard({
  image,
  title,
  author,
  id,
}: {
  image?: string;
  title: string;
  author: string;
  id: string;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Author>By {author}</Author>
      </Content>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  width: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #666;
`;
