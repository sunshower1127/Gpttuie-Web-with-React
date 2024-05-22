import styled from "styled-components";

export default function DownloadBtn({ id }: { id: any }) {
  const handleClick = () => {
    window.ReactNativeWebView?.postMessage(`this message is from web : ${id}`);
  };
  return <Btn onClick={handleClick}>Download</Btn>;
}

const Btn = styled.button`
  background-color: #008cba;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
