import styled from "styled-components";
import PostCard from "../components/postcard";
import Timeline from "../components/timeline";

export default function Home() {
  return (
    <Wrapper>
      <Title>Home</Title>
      <PostCard title="Post 1" author="User 1" />
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
