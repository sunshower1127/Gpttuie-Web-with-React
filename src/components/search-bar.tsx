import { useState } from "react";
import styled from "styled-components";
import myTheme from "../constants/myTheme";
import { GoSearch } from "react-icons/go";

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
      <Button type="submit">
        <GoSearch size={"1.5rem"} color={myTheme.colors.primary} />
      </Button>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  background-color: transparent;
  width: 80%;
  margin-left: 6%;
`;

const Input = styled.input`
  padding: 5px 10px;
  background-color: #f5f5f5;
  flex: 1;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  border-bottom: 1px solid ${myTheme.colors.primary};
  font-family: "Pretendard";
  font-size: 0.8rem;
`;

const Button = styled.button`
  flex: 0;
  background-color: transparent;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  margin-top: 3px;
`;
