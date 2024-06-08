import styled from "styled-components";
import Timeline from "../components/timeline";
import SearchBar from "../components/search-bar";
import { useState } from "react";
import myTheme from "../constants/myTheme";
import RefreshBtn from "../components/refresh-btn";

export default function Recipes() {
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <RefreshBtn />
      <SearchBar onSearch={(s) => setSearch(s)} />
      <Timeline search={search} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${myTheme.colors.background};
  padding: 0.5rem;
`;
