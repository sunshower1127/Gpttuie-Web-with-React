import styled from "styled-components";
import googleBtn from "../assets/images/web_light_rd_ctn.svg";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginBtn() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await updateProfile(result.user, {
        displayName: result.user.displayName,
      });
      navigate("/profile");
    } catch (error) {
      alert("구글 로그인에 실패했습니다.");
    }
  };
  return <Img src={googleBtn} alt="Google 로그인" onClick={handleClick} />;
}

const Img = styled.img`
  margin-top: 20px;
`;
