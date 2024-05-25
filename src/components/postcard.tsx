import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import myTheme from "../constants/myTheme";
import logo from "../assets/images/logo.png";

export default function PostCard({
  image,
  title,
  author,
  id,
  body,
  rating,
  review,
}: {
  image?: string;
  title: string;
  author: string;
  id: string;
  body?: string;
  rating?: number | null;
  review?: string | null;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${id}`);
  };

  return (
    <CardWrapper onClick={handleClick}>
      {image ? <Image src={image} /> : <Image src={logo} />}
      <Content>
        <Title>{title}</Title>
        <Author>By {author}</Author>
        <Body>{body}</Body>

        {review && (
          <Review>
            {rating && <Rating>⭐ {rating.toFixed(1)}</Rating>}
            {review}
          </Review>
        )}
      </Content>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${myTheme.colors.outline};
  background-color: ${myTheme.colors.surface};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin: 6px 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 10px;
  background-color: ${myTheme.colors.surface};
  border-radius: 10px;
`;

const Content = styled.div`
  padding: 10px 0;
`;

const Title = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Author = styled.span`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${myTheme.colors.secondary};
`;

const Body = styled.p`
  font-size: 0.8rem;
  color: ${myTheme.colors.secondary};
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 텍스트를 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Rating = styled.span`
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const Review = styled.div`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  color: ${myTheme.colors.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 텍스트를 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
