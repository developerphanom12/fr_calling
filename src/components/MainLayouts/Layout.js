import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import VerifyOtp from "../CommonPages/loginpages/VerifyOtp";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const storedOtpStatus = localStorage.getItem("isOtpVerified");
    if (storedOtpStatus) {
      setIsOtpVerified(JSON.parse(storedOtpStatus));
    }
  }, []);

  const handleOtpVerification = (status) => {
    setIsOtpVerified(status);
    localStorage.setItem("isOtpVerified", JSON.stringify(status));
  };

  const handleLogout = () => {
    localStorage.setItem("isOtpVerified", JSON.stringify(false));
    localStorage.removeItem("token");
    navigate("/login"); 
  };
  console.log('hd',handleLogout)
  return (
    <Root>
      {(userCheck && token && isOtpVerified) && (
        <div className="sideBar">
          <SideBar />
        </div>
      )}

      <div className="main_bar">
        {token && userCheck && !isOtpVerified ? (
          <VerifyOtp onVerification={handleOtpVerification} />
        ) : token && userCheck ? (
          ""
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
    width: 132px;
    margin-bottom: 2px;
    padding-bottom: 10px;
    overflow: hidden;
    background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
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
