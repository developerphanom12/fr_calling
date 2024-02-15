// VerifyOtp.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp({ onVerification }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verificationFailed, setVerificationFailed] = useState(false);

  const [otpintial, setChangePass] = useState({
    email: "ashimavineet2729@gmail.com",
  });

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `${EXCHANGE_URLS_ADMIN}/otpverify`,
        { otp },
        axiosConfig
      );
      if (response.status === 200) {
        onVerification(true);
        cogoToast.success("OTP Verified");
        navigate("/studash");
      } else {
        setVerificationFailed(true);
      }
    } catch (error) {
      setVerificationFailed(true);
      cogoToast.error("Error verifying OTP");
      console.error("Error verifying OTP:", error);
    }
  };

  const ChangePassApi = async (newP) => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const data = {
        email: newP,
      };
      const res = await axios.post(
        `${EXCHANGE_URLS_ADMIN}/otpsend`,
        data,
        axiosConfig
      );

      if (res.status === 200) {
        setChangePass({ email: "" });
        cogoToast.success("Otp send successfully");
      }
    } catch (err) {
      cogoToast.error("Error");
    }
  };
  const handleChangePassword = () => {
    ChangePassApi(otpintial?.email);
  };

  return (
    <Root>
      {!verificationFailed ? (
        <>
          <div className="otptable">
            <h3>Enter OTP</h3>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
            />
            <p className="links" onClick={handleChangePassword}>
              Send OTP
            </p>
            <button className="thatones" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        </>
      ) : null}
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", "sans-serif";
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;

  .otptable {
    display: flex;
    flex-direction: column;
    width: 35%;
    /* border: 1px solid; */
    height: 74%;
    top: 41%;
    border-radius: 23px;
    padding: 20px;
    position: absolute;
    align-items: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    input,
    button {
      margin: 10px;
      padding: 5px;
    }
    .thatones {
      margin: 10px;
      padding: 5px;
      width: 24%;
      font-size: 17px;
      padding: 9px;
      border-radius: 16px;
      background: #de7187;
      border: 1px;
      color: white;
    }

    
    input {
      width: 49%;
      margin-left: 11px;
      justify-content: center;
      display: flex;
      border: 1px solid;
      align-items: center;
      border-radius: 6px;
      padding: 11px;
    }
    .links {
      background: none;
      color: #007bff; /* Blue color for links */
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      text-decoration: underline;
    }

    h3 {
      font-weight: 500;
      font-family: "Roboto", "sans-serif";
      display: flex;
      justify-content: center;
    }
    .main_div_pass {
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      border-radius: 20px;
      padding: 20px;
      .pass1 {
        display: flex;
        margin: 15px;
        font-size: 13px;
        flex-direction: column;
        input {
          text-align: center;
          border-radius: 20px;
          padding: 5px 10px;
          color: #202020;
          width: 240px;
          text-decoration: none;
          border: 1px solid black;
          @media (max-width: 600px) {
            min-width: 100px;
            width: 100%;
          }
        }
      }
      .box1 {
        text-align: center;
        button {
          background: #8656ec;
          color: #ffffff;
          padding: 5px 10px;
          border-color: transparent;
          font-size: 13px;
          text-align: center;
          margin: 5px;
          cursor: pointer;
          border-radius: 20px;
          background-size: 300% 100%;
          transition: all 0.2s ease-in-out 0s;
          text-transform: uppercase;
          &:hover {
            box-shadow: 1px 1px 4px 1px gray;
          }
        }
      }
    }
  }
`;
