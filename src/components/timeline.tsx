import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import styled from "styled-components";
import PostCard from "./postcard";
import { Recipe } from "./recipe";

export interface IPost {
  id: string;
  title: string;
  body: string;
  photo?: string;
  userId: string;
  username: string;
  createdAt: number;
  recipe: Recipe;
}

export default function Timeline({
  search,
  profile,
}: {
  search?: string;
  profile?: boolean;
}) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let postsQuery;
      if (search) {
        postsQuery = query(
          collection(db, "posts"),
          where("title", ">=", search),
          where("title", "<=", search + "\uf8ff"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      } else if (profile && auth.currentUser) {
        postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      } else {
        postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      }

      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map((doc) => {
        const { title, body, photo, userId, username, createdAt, recipe } =
          doc.data();
        return {
          id: doc.id,
          title,
          body,
          photo,
          userId,
          username,
          createdAt,
          recipe,
        };
      });
      setPosts(postsData);
    };

    fetchPosts();
  }, [search]);

  return (
    <Wrapper>
      {profile && posts.length === 0 && <Text>게시물이 없습니다. </Text>}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          image={post.photo}
          title={post.title}
          author={post.username}
          body={post.body}
          rating={post.recipe.rating}
          review={post.recipe.oneLineReview}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Text = styled.div`
  font-size: 1rem;
  color: gray;
  margin: 2rem;
`;
