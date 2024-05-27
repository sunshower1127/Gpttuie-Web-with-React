import styled from "styled-components";
import { IComment } from "./comment";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useState } from "react";
import myTheme from "../constants/myTheme";

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
                Delete
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
        <Button>Send</Button>
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
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const CommentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DeleteBtn = styled.button`
  padding: 5px 10px;
  background-color: ${myTheme.colors.error};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Author = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Body = styled.span`
  font-size: 14px;
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
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${myTheme.colors.tertiary};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0079a1;
  }
`;
