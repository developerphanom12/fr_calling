import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdStarOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

export default function NavBar() {
  const [activePop, setActivePop] = useState(false);
  const navigate = useNavigate();
  return (
    <Root>
      <div className="main1">
        <div
          onClick={() => {
            navigate("/allpages");
          }}
        >
          <h2>
            {" "}
            <IoMdStarOutline />
            Tellecallerr.
          </h2>
        </div>
      </div>

      <div className="main2">
        <div
          className="login"
          onClick={() => {
            navigate("/employlogin");
          }}
        >
          Telle LOGIN
        </div>
        <div
          className="login"
          onClick={() => {
            navigate("/employerlogin");
          }}
        >
          Admin LOGIN
        </div>
      </div>
      <div
        className="menu"
        onClick={() => {
          setActivePop(true);
        }}
      >
        <IoMenu />
      </div>
      <div className={activePop ? "pop_up" : "pop_off"}
      onClick={() => {
        setActivePop(false);
      }}
      >
        <div
          className="login"
          onClick={() => {
            navigate("/employlogin");
          }}
        >
          EMPLOYEE LOGIN
        </div>
        <div
          className="login"
          onClick={() => {
            navigate("/employerlogin");
          }}
        >
          EMPLOYER LOGIN
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  .main1 {
    h2 {
      color: dodgerblue;
      margin: 10px;
      padding-left: 50px;
      cursor: pointer;
      font-size: 35px;
      svg {
        width: 35px;
        height: 35px;
      }
    }
  }

  .main2 {
    display: flex;
    gap: 10px;
    .login {
      padding: 10px;
      height: 325x;
      border-radius: 25px;
      background-color: dodgerblue;
      color: #ffffff;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        box-shadow: 3px 2px 2px gray;
      }
    }
    @media (max-width:887px){
      display: none;
    }
  }
  .menu {
    @media (max-width: 887px) {
      display: block;
      padding-right: 10px;

    }
  }
  .menu {
    @media (min-width: 888px) {
      display: none;
    }
  }
  .pop_up {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50px;
    right: 0px;
    border: 4px solid darkgrey;
    border-radius: 20px ;
    height: 100px;
    width: 30%;
    padding: 20px 0px;
    gap: 10px;
    color: white;
    background: dodgerblue;
    .login{
      border-bottom: 2px solid darkgray;
    }
  }
  .pop_off {
    display: none;
  }
`;
