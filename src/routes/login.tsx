import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../components/firebase";
import GoogleLoginBtn from "../components/google-login-btn";
import myTheme from "../constants/myTheme";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const from = location.search.split("=")[1] || "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || !email || !password) return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      const from = location.search.split("=")[1] || "";
      navigate("/" + from, { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(true);
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <HR />
      <Form onSubmit={onSubmit}>
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
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {error && <Error>{error}</Error>}
        <Switcher>
          <span>계정이 없나요?</span>
          <Link to={`/create-account?from=${from}`}>Sign up</Link>
        </Switcher>
      </Form>
      <GoogleLoginBtn from={from} />
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
  text-align: center;
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
  padding: 0.5rem 2rem;
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
