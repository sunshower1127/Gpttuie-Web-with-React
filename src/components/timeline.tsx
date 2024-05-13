import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import styled from "styled-components";
import PostCard from "./postcard";

export interface IPost {
  id: string;
  title: string;
  body: string;
  photo?: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
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
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
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
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
