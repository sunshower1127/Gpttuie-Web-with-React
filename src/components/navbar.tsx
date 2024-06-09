import { Link } from "react-router-dom";
import styled from "styled-components";

export function NavigationBar() {
  if (window.ReactNativeWebView) return <></>;
  return (
    <Navbar>
      <Title>GPTTUIE</Title>
      <Wrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </Wrapper>
    </Navbar>
  );
}

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  position: absolute;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding-top: 10px;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 400;
  color: black;
  color: #303030;
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 10px;
  gap: 10px;
`;

const Title = styled.h1`
  font-family: "Pretendard";
  font-size: 2rem;
  font-weight: 400;
  margin-left: 10px;
  color: #303030;
`;
