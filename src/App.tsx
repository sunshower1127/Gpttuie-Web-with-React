import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Home from "./routes/home";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import ProtectedRoute from "./components/protected-route";
import CreatePost from "./routes/create-post";
import Profile from "./routes/profile";
import Recipes from "./routes/recipes";
import PostViewer from "./routes/postviewer";
import myTheme from "./constants/myTheme";
import "./assets/fonts/pretendard/static/pretendard.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },

  {
    path: "/create-post",
    element: (
      <ProtectedRoute path="create-post">
        <CreatePost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute path="profile">
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/recipes/:id",
    element: <PostViewer />,
  },
]);

export default function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

const GlobalStyles = createGlobalStyle`
  ${reset}
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${myTheme.colors.background};
  font-family: "Pretendard";
`;
