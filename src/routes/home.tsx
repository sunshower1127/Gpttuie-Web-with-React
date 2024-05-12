import styled from "styled-components";
import PostCard from "../components/postcard";
import Timeline from "../components/timeline";
import { auth } from "../components/firebase";
import { Link } from "react-router-dom";

export default function Home() {
  const user = auth.currentUser;
  return (
    <Wrapper>
      <Title>Home</Title>
      <h2>Welcome, {user?.displayName}</h2>
      <Link to="/profile">Profile</Link>
      <Link to="/create-post">Create Post</Link>
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
