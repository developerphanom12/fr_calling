import React from "react";
import styled from "styled-components";
import Page1 from "./Page1";
import Page4 from "./Page4";
import Page5 from "./Page5";

export default function AllPages() {
  return (
    <Root>
      <div>
        <Page1 />
      </div>
      
      <div>
        <Page4 />
      </div>
      <div>
        <Page5 />
      </div>
     
    </Root>
  );
}
const Root = styled.section``;
