import styled from "styled-components";
import { IComment } from "./comment";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useState } from "react";
import myTheme from "../constants/myTheme";
import { FaComment } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

export default function CommentViewer({
  id,
  comments,
}: {
  id: string;
  comments: IComment[];
}) {
  const user = auth.currentUser;
  const [body, setBody] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>(comments || []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "comment") {
      setBody(e.target.value);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!body) return;
    // firebase에 업로드...
    // updateDoc()
    const user = auth.currentUser;
    const temp = [
      ...comments,
      {
        username: user?.displayName || "익명",
        userId: user?.uid || "",
        body,
        createdAt: Date.now(),
      },
    ];
    await updateDoc(doc(db, "posts", id), {
      comments: temp,
    });
    setBody("");
    setCommentList(temp);
  };

  const handleDeleteBtn = async (index: number) => {
    const temp = [...commentList];
    temp.splice(index, 1);
    await updateDoc(doc(db, "posts", id), {
      comments: temp,
    });
    setCommentList(temp);
  };

  return (
    <Wrapper>
      <CommentList>
        {commentList?.map((comment, index) => (
          <Comment key={index}>
            <CommentInnerWrapper>
              <Author>{comment.username}</Author>
              <Body>{comment.body}</Body>
            </CommentInnerWrapper>
            {user?.uid === comment.userId && (
              <DeleteBtn onClick={() => handleDeleteBtn(index)}>
                <TiDeleteOutline />
              </DeleteBtn>
            )}
          </Comment>
        ))}
      </CommentList>
      <CommentForm onSubmit={handleSubmit}>
        <Input
          placeholder="댓글을 써주세요!"
          name="comment"
          value={body}
          onChange={onChange}
        />
        <Button>
          <FaComment fontSize="1.5rem" />
        </Button>
      </CommentForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  padding-bottom: 0;
  padding-right: 0;
  border-radius: 5px;
`;

const CommentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  color: gray;
  border: none;
  cursor: pointer;
  font-size: 2rem;
`;

const Author = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Body = styled.span`
  font-size: 0.8rem;
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  font-family: "Pretendard";
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 8px 10px;
  padding-bottom: 5px;
  background-color: ${myTheme.colors.tertiary};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
