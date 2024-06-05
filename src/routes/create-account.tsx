import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../components/firebase";
import myTheme from "../constants/myTheme";
import GoogleLoginBtn from "../components/google-login-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || !name || !email || !password) return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, { displayName: name });
      navigate("/profile");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>새 계정</Title>
      <HR />
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="닉네임"
          value={name}
          onChange={onChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
        {error && <Error>{error}</Error>}
      </Form>
      <Switcher>
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login">Login</Link>
      </Switcher>
      <GoogleLoginBtn />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 20px 0 10px 0;
  color: ${myTheme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 60%;
  height: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.2rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: ${myTheme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Error = styled.span`
  color: red;
`;

const Switcher = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HR = styled.hr`
  width: 80%;
  margin-bottom: 1rem;
`;
