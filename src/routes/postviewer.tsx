import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ShareBtn from "../components/share-btn";
import { Helmet } from "react-helmet";
import DownloadBtn from "../components/download-btn";
import RecipeViewer from "../components/recipeviewer";
import CommentViewer from "../components/comment-viewer";
import myTheme from "../constants/myTheme";

export default function PostViewer() {
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
      <BackBtn onClick={() => navigate(-1)}>🔙</BackBtn>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : post === null ? (
        <Text>포스트가 없습니다.</Text>
      ) : (
        <PostWrapper>
          <Title>{post?.title}</Title>
          <Author>By {post?.username}</Author>
          <HR />
          <Image src={post?.photo} alt={post?.title} />
          <Body>{post?.body}</Body>
          <HR />
          <RecipeViewer recipe={post?.recipe} />
          <HR />
          <BtnWrapper>
            <DownloadBtn recipe={post?.recipe} />
            <ShareBtn title={post?.title} id={id} username={post?.username} />
            {auth.currentUser?.uid === post?.userId && (
              <DeleteBtn onClick={handleDeleteBtn}>Delete</DeleteBtn>
            )}
          </BtnWrapper>
          {id && <CommentViewer id={id} comments={post?.comments} />}
        </PostWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: ${myTheme.colors.background};
  padding: 10px;
`;

const PostWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Author = styled.p`
  font-size: 1rem;
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
  font-size: 1rem;
  padding-bottom: 0.2rem;
  color: white;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  width: fit-content;
  height: fit-content;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const HR = styled.hr`
  border: 1px solid ${myTheme.colors.outline};
  margin: 10px 0;
  width: 100%;
`;
