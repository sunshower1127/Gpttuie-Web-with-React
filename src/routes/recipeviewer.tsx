import { DocumentData, doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function RecipeViewer() {
  const { id } = useParams();
  const [post, setPost] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Link to="/">Home</Link>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : post === null ? (
        <Text>포스트가 없습니다.</Text>
      ) : (
        <PostWrapper>
          <Title>{post?.title}</Title>
          <Author>By {post?.username}</Author>
          <Image src={post?.photo} alt={post?.title} />
          <Body>{post?.body}</Body>
        </PostWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const PostWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const Author = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Body = styled.p`
  font-size: 18px;
  font-weight: normal;
`;
