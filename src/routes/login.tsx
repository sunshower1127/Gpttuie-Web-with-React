import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../components/firebase";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(true);
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {error && <Error>{error}</Error>}
        <Switcher>
          <span>Don't have an account?</span>
          <Link to="/create-account">Create one</Link>
        </Switcher>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Switcher = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  a {
    margin-left: 0.5rem;
    color: #0070f3;
  }
`;
