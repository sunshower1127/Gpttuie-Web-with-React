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
    <>
      <TopBar>
        <BackBtn onClick={() => navigate(-1)}>◀ 뒤로가기</BackBtn>
        <Title>{post?.title}</Title>
        <HR />
      </TopBar>
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

        {isLoading ? (
          <Text>Loading...</Text>
        ) : post === null ? (
          <Text>포스트가 없습니다.</Text>
        ) : (
          <PostWrapper>
            <Title>{post?.title}</Title>
            <Author>{post?.username}</Author>
            <HR />
            <Image src={post?.photo} alt={post?.title} />
            <Body>{post?.body}</Body>
            <HR />
            <RecipeViewer recipe={post?.recipe} />
            <HR />
            <BtnWrapper>
              <DownloadBtn recipe={post?.recipe} />
              <ShareBtn id={id} />
              {auth.currentUser?.uid === post?.userId && (
                <DeleteBtn onClick={handleDeleteBtn}>게시물 삭제</DeleteBtn>
              )}
            </BtnWrapper>
            {id && <CommentViewer id={id} comments={post?.comments} />}
          </PostWrapper>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 10px;
  flex-direction: column;
  background-color: ${myTheme.colors.background};
  padding: 10px;
  max-width: 768px;
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
  font-size: 1.3rem;
  text-align: center;
`;

const Author = styled.p`
  font-size: 1rem;
  text-align: right;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Body = styled.p`
  font-size: 1rem;
`;

const DeleteBtn = styled.button`
  background-color: ${myTheme.colors.error};
  padding: 10px 0;
  width: 6rem;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const TopBar = styled.div`
  position: fixed;
  width: 100%;
  height: fit-content;
  background-color: ${myTheme.colors.background};

  @media (min-width: 768px) {
    display: none;
  }
`;

const BackBtn = styled.button`
  padding-bottom: 0.2rem;
  background-color: transparent;
  border-radius: 4px;
  border-width: 0;
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
  margin: 10px 0 0 0;
  width: 100%;
`;
