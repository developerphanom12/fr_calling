import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import VerifyOtp from "../CommonPages/loginpages/VerifyOtp";
import { setOtpVerified } from "../../redux/users/action";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const isOtpVerified = useSelector((state) => state?.users?.isOtpVerified);
  console.log("dt",isOtpVerified)
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOtpStatus = localStorage.getItem("isOtpVerified");
    if (storedOtpStatus) {
      dispatch(setOtpVerified(JSON.parse(storedOtpStatus)));
    }
  }, [dispatch]);

  
  return (
    <Root>
      {userCheck && isOtpVerified && token && (
        <div className="sideBar">
          <SideBar />
        </div>
      )}
  
      <div className="main_bar">
        {userCheck && !isOtpVerified ? (
          <VerifyOtp />
        ) : (
          
          <>
           
            <div className="main_body">{children}</div>
          </>
        )}
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
    width: 132px;
    margin-bottom: 2px;
    padding-bottom: 10px;
    overflow: hidden;
    background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
    cursor: pointer;
    box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);

    background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);

    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: auto;
    background: linear-gradient(
      315deg,
      rgba(101, 0, 94, 1) 3%,
      rgba(60, 132, 206, 1) 38%,
      rgba(48, 238, 226, 1) 68%,
      rgba(255, 25, 25, 1) 98%
    );
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;

    @keyframes gradient {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 100% 100%;
      }
      100% {
        background-position: 0% 0%;
      }
    }

    .wave {
      background: rgb(255 255 255 / 25%);
      border-radius: 1000% 1000% 0 0;
      position: fixed;
      width: 200%;
      height: 12em;
      animation: wave 10s -3s linear infinite;
      transform: translate3d(0, 0, 0);
      opacity: 0.8;
      bottom: 0;
      left: 0;
      z-index: -1;
    }

    .wave:nth-of-type(2) {
      bottom: -1.25em;
      animation: wave 18s linear reverse infinite;
      opacity: 0.8;
    }

    .wave:nth-of-type(3) {
      bottom: -2.5em;
      animation: wave 20s -1s reverse infinite;
      opacity: 0.9;
    }

    @keyframes wave {
      2% {
        transform: translateX(1);
      }

      25% {
        transform: translateX(-25%);
      }

      50% {
        transform: translateX(-50%);
      }

      75% {
        transform: translateX(-25%);
      }

      100% {
        transform: translateX(1);
      }
    }
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
