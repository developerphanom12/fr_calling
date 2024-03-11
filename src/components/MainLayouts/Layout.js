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
  position: relative;

  .sideBar {
    position: fixed;
    overflow: hidden;
    height: 100vh;
    width: 10%;
    margin-bottom: 2px;
    padding-bottom: 10px;
    background: linear-gradient(130deg, #231a6f, #0f054c);
    cursor: pointer;
    box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .main_bar {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 82%;
    overflow: hidden;
    
    .main_body {
      margin-left: 10%;
      height: 100%;
      /* width: 100%; */
      
    }
  }
`;
