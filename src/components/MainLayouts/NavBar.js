import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoCall } from "react-icons/io5";
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
          <h3>
            {" "}
            <IoCall />
            Telecaller
          </h3>
        </div>
      </div>

      <div className="main2">
        <div
          className="login"
          onClick={() => {
            navigate("/tellelogin");
          }}
        >
          TELE LOGIN
        </div>
        {/* <div
          className="login"
          onClick={() => {
            navigate("/adminlogin");
          }}
        >
          ADMIN LOGIN
        </div> */}
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
            navigate("/tellelogin");
          }}
        >
          Telle LOGIN
        </div>
        {/* <div
          className="login"
          onClick={() => {
            navigate("/adminlogin");
          }}
        >
          Admin LOGIN
        </div> */}
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
    h3 {
      color: #461c6c;
      margin: 10px;
      padding-left: 50px;
      cursor: pointer;
      font-size: 30px;
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }

  .main2 {
    display: flex;
    gap: 10px;
    margin-right: 20px;
    .login {
      padding: 7px;
      border-radius: 10px;
      background-color: #461c6c;
      color: #ffffff;
      font-size: 11px;
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
    svg{
      width: 20px;
      height: 20px;
    }
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
    border: 2px solid #461c6c;
    border-radius: 10px ;
    margin-right: 20px;
    height: 60px;
    width: 200px;
    padding: 20px 0px;
    gap: 10px;
    color: #461c6c;
    background: #fff;
    cursor: pointer;
     z-index: 2;
  }
  .pop_off {
    display: none;
  }
`;
