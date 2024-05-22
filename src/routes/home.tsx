import styled from "styled-components";
import PostCard from "../components/postcard";
import Timeline from "../components/timeline";
import { Link } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";

export default function Home() {
  const { isRefreshing, LoadingIndicator } = useRefresh();
  return (
    <Wrapper>
      {isRefreshing && <LoadingIndicator />}
      <Title>GPTTUIE</Title>
      <Menu>
        <Link to="/create-post">Create Post</Link>
        <Link to="/profile">Profile</Link>
      </Menu>
      <PostCard title="오늘의 추천 레시피" author="User 1" id="has no id" />
      <Timeline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
