import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShareBtn from "../components/share-btn";
import { Helmet } from "react-helmet";
import DownloadBtn from "../components/download-btn";

export default function RecipeViewer() {
  const navigate = useNavigate();
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

  const handleDeleteBtn = async () => {
    if (!id) return;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", id));
      navigate(-1);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <meta property="og:title" content="Gpttuie AI Recipe" />
        <meta
          property="og:description"
          content="AI에 의해 생성된 레시피입니다."
        />
        <meta
          property="og:image"
          content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTzYCcyDc3f0J6j3KVFhOFgoU9OxvIWH5gvQ&usqp=CAU"
        />
      </Helmet>
      <BackBtn onClick={() => navigate(-1)}>Back</BackBtn>
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

const DeleteBtn = styled.button`
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const BackBtn = styled.button`
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
