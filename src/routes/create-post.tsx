import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import { Recipe } from "../components/recipe";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      const { type, data }: { type: string; data: Recipe } = JSON.parse(
        event.data
      );
      if (type !== "Recipe") return;
      setTitle(data.title);
      setRecipe(data);
    };

    window.addEventListener("message", handleMessage);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
    )
      return;

    try {
      setIsLoading(true);
      /*const doc = */ await addDoc(collection(db, "posts"), {
        title,
        body,
        photo: recipe?.steps[recipe.steps.length - 1].image,
        userId: user.uid,
        username: user.displayName,
        createdAt: Date.now(),
        recipe,
      });
      setTitle("");
      setBody("");
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
