import styled from "styled-components";
import { IComment } from "./comment";
import { updateDoc } from "firebase/firestore";

export default function CommentViewer({ comments }: { comments?: IComment[] }) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // firebase에 업로드...
    // updateDoc()
  };

  return (
    <Wrapper>
      <CommentList>
        {comments?.map((comment, index) => (
          <Comment key={index}>
            <Author>{comment.username}</Author>
            <Body>{comment.body}</Body>
          </Comment>
        ))}
      </CommentList>
      <CommentForm onSubmit={handleSubmit}>
        <Input placeholder="Write a comment" />
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
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
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
  background-color: #008cba;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0079a1;
  }
`;
