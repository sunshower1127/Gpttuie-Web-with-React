import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import { Recipe } from "../components/recipe";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [log, setLog] = useState<string>("");

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.data) return;
      const { name, data }: { name: string; data: Recipe } = JSON.parse(
        event.data
      );
      const recipe = data;
      if (name !== "Recipe") return;

      const user = auth.currentUser;
      if (!user) return;
      try {
        setIsLoading(true);
        /*const doc = */ await addDoc(collection(db, "posts"), {
          title,
          body,
          photo: recipe?.steps[recipe.steps.length - 1].image || "",
          userId: user.uid,
          username: user.displayName,
          createdAt: Date.now(),
          recipe,
          comments: [],
        });
        window.ReactNativeWebView.postMessage("posted");
      } catch (error: any) {
        setLog((cur) => cur + "\n" + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [title, body]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
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
    ) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    window.ReactNativeWebView.postMessage("submit");
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Post"}
        </Button>
      </Form>
      <Log>{log}</Log>
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

const Log = styled.div`
  width: 200px;
`;
