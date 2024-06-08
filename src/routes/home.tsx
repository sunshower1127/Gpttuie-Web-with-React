import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCard from "../components/postcard";
import RefreshBtn from "../components/refresh-btn";
import Timeline from "../components/timeline";
import myTheme from "../constants/myTheme";
import useRefresh from "../hooks/useRefresh";

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
      <PostCard
        title="순두부 신라면"
        author="에디터"
        id="has no id"
        body="한 층 업그레이드 된 순두부 신라면 레시피!"
        rating={5}
        review={"강력추천!"}
        image="https://i.ytimg.com/vi/4mEb8ELpahw/maxresdefault.jpg"
      />
      <HR />
      <SubTitle>최신 요리 후기</SubTitle>
      <Timeline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${myTheme.colors.background};
  padding: 0.5rem;
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
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${myTheme.colors.onSecondaryContainer};
`;

const Menu = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HR = styled.hr`
  width: 90%;
`;
