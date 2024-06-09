import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../components/firebase";
import RefreshBtn from "../components/refresh-btn";
import Timeline from "../components/timeline";
import myTheme from "../constants/myTheme";
import useRefresh from "../hooks/useRefresh";

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { isRefreshing, LoadingIndicator } = useRefresh();

  const handleLogout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/profile");
    }
  };

  return (
    <Wrapper>
      {isRefreshing && <LoadingIndicator />}
      <RefreshBtn />
      <Text>{user?.displayName}님이 쓴 글</Text>
      <Timeline profile />
      <HR />
      <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  background-color: ${myTheme.colors.background};
  margin-top: 20px;
`;

const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.9rem;
  font-family: "Pretendard";
`;

const Text = styled.p`
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const HR = styled.hr`
  width: 90%;
`;
