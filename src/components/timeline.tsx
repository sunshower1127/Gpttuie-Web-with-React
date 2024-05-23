import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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

export default function Timeline({ search }: { search?: string }) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = search
        ? query(
            collection(db, "posts"),
            where("title", ">=", search),
            where("title", "<=", search + "\uf8ff"),
            orderBy("createdAt", "desc"),
            limit(20)
          )
        : query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            limit(20)
          );

      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map((doc) => {
        const { title, body, photo, userId, username, createdAt } = doc.data();
        return { id: doc.id, title, body, photo, userId, username, createdAt };
      });
      setPosts(postsData);
    };

    fetchPosts();
  }, [search]);

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
