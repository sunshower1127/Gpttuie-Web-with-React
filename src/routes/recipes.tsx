import styled from "styled-components";
import Timeline from "../components/timeline";
import SearchBar from "../components/search-bar";
import { useState } from "react";

export default function Recipes() {
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <SearchBar onSearch={(s) => setSearch(s)} />
      <Timeline search={search} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;
