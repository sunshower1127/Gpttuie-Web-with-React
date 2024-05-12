import styled from "styled-components";
import { auth, db } from "../components/firebase";
import { IPost } from "../components/timeline";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostCard from "../components/postcard";
import { Link } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";

export default function Profile() {
  const user = auth.currentUser;
  const [posts, setPosts] = useState<IPost[]>([]);
  const { isRefreshing, LoadingIndicator } = useRefresh();

  const fetchPosts = async () => {
    if (!user) return;
    const postsQuery = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const postsSnapshot = await getDocs(postsQuery);
    const postsData = postsSnapshot.docs.map((doc) => {
      const { title, body, photo, userId, username, createdAt } = doc.data();
      return { id: doc.id, title, body, photo, userId, username, createdAt };
    });
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      {isRefreshing && <LoadingIndicator />}
      <Title>Profile</Title>
      <Link to="/">Home</Link>
      <Text>{user?.displayName}님이 쓴 글</Text>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          image={post.photo}
          title={post.title}
          author={post.username}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
