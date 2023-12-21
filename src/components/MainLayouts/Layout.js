import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import PostNav from "./PostNav";
import Footer from "../CommonPages/Footer";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  return (
    <Root>
    {userCheck && token ? (
      <div className="sideBar">
        <SideBar/>
      </div>
    ) : (
      ""
    )}

    <div className="main_bar">
      {token && userCheck ? (
        <div className="top_bar">
          <PostNav />
        </div>
      ) : (
        <div className="pre_nav">
          <NavBar />
        </div>
      )}
      <div className="main_body">{children}</div>

      {!token && !userCheck ? (
        <div className="footer">
          <Footer />
        </div>
      ) : (
        ""
      )}
    </div>
  </Root>
);
}

const Root = styled.section`
display: flex;
min-height: 100vh;
height: 100%;
gap: 10px;
.sideBar {
  position: sticky;
  width: 15%;
  overflow: hidden;
  background-color: #0088ff;
  cursor: pointer;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
}

.main_bar {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 75%;
  overflow: hidden;
  
  .top_bar {
    background: #ffffff;
    display: flex;
    height: 80px;
    /* padding-left: 90px; */
    width: 100%;
  }
  .main_body {
    height: 90%;
    width: 100%;
  }
}
`;