import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function useRefresh() {
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handleTouchEnd = () => {
      if (window.scrollY < -50) {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener("touchend", handleTouchEnd);

    return () => window.removeEventListener("touchend", handleTouchEnd);
  }, []);

  return { isRefreshing, LoadingIndicator };
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIndicator = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #000000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;
