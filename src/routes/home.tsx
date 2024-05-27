import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCard from "../components/postcard";
import Timeline from "../components/timeline";
import myTheme from "../constants/myTheme";
import useRefresh from "../hooks/useRefresh";
import RefreshBtn from "../components/refresh-btn";

export default function Home() {
  const { isRefreshing, LoadingIndicator } = useRefresh();
  return (
    <Wrapper>
      {isRefreshing && <LoadingIndicator />}
      <RefreshBtn />
      <Title>GPTTUIE</Title>
      <Menu>
        <Link to="/profile">Profile</Link>
      </Menu>
      <SubTitle>에디터가 직접고른! 오늘의 레시피</SubTitle>
      <PostCard title="김치찌개" author="에디터" id="has no id" />
      <SubTitle>최신 요리 후기</SubTitle>
      <Timeline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${myTheme.colors.background};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SubTitle = styled.h2`
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${myTheme.colors.primary};
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
