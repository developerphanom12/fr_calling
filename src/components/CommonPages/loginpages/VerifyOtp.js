import React, { useState } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VerifyOtp({ onVerification }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verificationFailed, setVerificationFailed] = useState(false);
  const userDetails = useSelector((state) => state?.users.user);

  const [otpintial, setChangePass] = useState({
    email: "karan.sharma111@yahoo.co.in",
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
        if (userDetails?.role === "admin") {
          navigate("/dashboard");
        } else if (userDetails?.role === "telecaller") {
          navigate("/studash");
        }
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
            <div>
            <h3>Enter OTP</h3>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
            />
            <p className="links" onClick={handleChangePassword}>
              Resend OTP
            </p>
            <button className="thatones" onClick={verifyOtp}>
              Verify OTP
            </button>
              </div>
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
  min-height: 100vh;
  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
  margin: auto;
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
  .otptable {
    display: flex;
    margin: 0px;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    align-items: center;
    border-radius: 9px;
   
     >div{
      display: flex;
      flex-direction: column;
      padding: 30px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      button {
      margin: 10px;
      padding: 5px;
    }
    .thatones {
      margin: 10px;
      padding: 5px;
      font-size: 17px;
      padding: 9px;
      border-radius: 16px;
      background: #ff121247;
      border: 1px;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }

    input {
    margin-left: 11px;
    justify-content: center;
    display: flex;
    border: none;
    align-items: center;
    border-radius: 6px;
    padding: 11px;
    margin-top: 24px;
    }
    .links {
      background: none;
      color: #ffef01;
      border: none;
      padding: 0;
      font: inherit;
      overflow: hidden;
      cursor: pointer;
      text-decoration: none;
      font-weight: 900;
      display: flex;
      justify-content: right;
    }

    h3 {
      font-weight: 500;
      font-family: "Roboto", "sans-serif";
      display: flex;
      justify-content: center;
      margin: 0px;
      width: 100%;
      height: 22%;
      text-align: center;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: white;
      border-radius: 7px;
      color: yellow;
      text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
        0px -4px 10px rgba(255, 255, 255, 0.3);
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
  }
`;
