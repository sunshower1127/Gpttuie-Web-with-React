import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import myTheme from "../constants/myTheme";
import defaultImg from "../assets/images/default.png";

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
      {image ? <Image src={image} /> : <Image src={defaultImg} />}
      <Content>
        <Title>{title}</Title>
        <Author>· {author}</Author>
        <Body>{body}</Body>

        <Review>
          {rating !== undefined && rating !== null && `⭐${rating}`}
          &nbsp;
          {review !== undefined && review !== null && ` ${review}`}
        </Review>
      </Content>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${myTheme.colors.surface};
  border-radius: 10px;
  overflow: hidden;
  width: 312px;
  padding-right: 0.5rem;
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
  background-color: white;
  border-radius: 10px;
`;

const Content = styled.div`
  padding: 10px 0;
  align-self: center;
`;

const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${myTheme.colors.primary};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 텍스트를 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Author = styled.div`
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: ${myTheme.colors.secondary};
`;

const Body = styled.p`
  font-size: 0.9rem;
  color: ${myTheme.colors.onSecondaryContainer};
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 텍스트를 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Review = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${myTheme.colors.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 텍스트를 3줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
