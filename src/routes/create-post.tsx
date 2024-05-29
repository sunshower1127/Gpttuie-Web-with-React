import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import { Recipe } from "../components/recipe";
import myTheme from "../constants/myTheme";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    const handleMessage = async (event: any) => {
      if (!event.data) return;
      const { name, data }: { name: string; data: Recipe } = JSON.parse(
        event.data
      );

      if (name !== "Recipe") return;
      const recipe = data;

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
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    receiver.addEventListener("message", handleMessage);
    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      receiver.removeEventListener("message", handleMessage);
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
      <Title>게시물 작성</Title>
      <HR />
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={onChange}
        />
        <TextArea
          name="body"
          placeholder="글 내용을 입력해주세요."
          value={body}
          rows={20}
          maxLength={600}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Post"}
        </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 20px 0 10px 0;
  color: ${myTheme.colors.primary};
  text-align: center;
`;

const HR = styled.hr`
  width: 80%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  height: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.2rem;
`;

const Button = styled.button`
  padding: 0.5rem 2rem;
  background-color: ${myTheme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const TextArea = styled.textarea`
  border: 1px solid gray;
  padding: 0.5rem;
  border-radius: 2px;
  color: black;
  background-color: white;
  width: 100%;
  resize: none;
`;
