import { useState } from "react";
import { auth, db } from "../components/firebase";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    } else if (e.target.name === "photo") {
      setPhoto(e.target.value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (
      !user ||
      isLoading ||
      !title.trim() ||
      !body.trim() ||
      body.length > 200
    )
      return;

    try {
      setIsLoading(true);
      /*const doc = */ await addDoc(collection(db, "posts"), {
        title,
        body,
        photo,
        userId: user.uid,
        username: user.displayName,
        createdAt: Date.now(),
      });
      setTitle("");
      setBody("");
      setPhoto("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Create Post</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
        <Input
          type="text"
          name="body"
          placeholder="Body"
          value={body}
          onChange={onChange}
        />
        <Input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={photo}
          onChange={onChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Post"}
        </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;
