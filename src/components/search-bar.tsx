import { useState } from "react";
import styled from "styled-components";

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
        placeholder="Search..."
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
