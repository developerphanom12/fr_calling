import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import PostNav from "./PostNav";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  return (
    <Root>
      {userCheck && token ? (
        <div className="sideBar">
          <SideBar />
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

        
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  min-height: 100vh;
  height: 100%;
  .sideBar {
    position: sticky;
    width: 13%;
    margin-bottom: 2px;
    overflow: hidden;
    background-color: #0088ff;
    cursor: pointer;
    box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
    @media (max-width: 699px) {
      width: 50px;
    }
  }

  .main_bar {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 87%;
    overflow: hidden;

    .top_bar {
      background: #ffffff;
      display: flex;
      height: 80px;
      width: 100%;
    }
    .main_body {
      height: 100%;
      width: 100%;
    }
  }
`;
