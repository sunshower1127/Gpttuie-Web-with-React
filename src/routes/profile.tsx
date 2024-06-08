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
import { Link, useNavigate } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";
import RefreshBtn from "../components/refresh-btn";
import myTheme from "../constants/myTheme";

export default function Profile() {
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/profile");
    }
  };

  return (
    <Wrapper>
      {isRefreshing && <LoadingIndicator />}
      <RefreshBtn />
      <OnlyMobile>
        <Title>Profile</Title>
        <Link to="/">Home</Link>
      </OnlyMobile>
      <Text>{user?.displayName}님이 쓴 글</Text>
      {posts.length === 0 && <Error>아직 작성한 글이 없어요.</Error>}
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
      <HR />
      <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  background-color: ${myTheme.colors.background};
`;

const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.9rem;
  font-family: "Pretendard";
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const OnlyMobile = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const HR = styled.hr`
  width: 90%;
`;

const Error = styled.div`
  text-align: center;
  margin-top: 1rem;
`;
