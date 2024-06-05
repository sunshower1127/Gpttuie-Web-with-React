import { useState } from "react";
import styled from "styled-components";
import myTheme from "../constants/myTheme";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    event.preventDefault();
    onSearch(search);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Input
        type="text"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder="검색어를 입력해주세요!"
      />
      <Button type="submit">검색</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  background-color: transparent;
`;

const Input = styled.input`
  padding: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`;

const Button = styled.button`
  padding: 0 10px;
  height: 2rem;
  margin-left: 10px;
  background-color: ${myTheme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
