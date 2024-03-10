import React, { useState } from "react";
import axios from "axios";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtpVerified } from "../../../redux/users/action";

export default function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const userDetails = useSelector((state) => state?.users.user);

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
        dispatch(setOtpVerified(true));
        cogoToast.success("OTP Verified");
        if (userDetails?.role === "admin") {
          navigate("/dashboard");
        } else if (userDetails?.role === "telecaller") {
          navigate("/studash");
        }
      } else {
        cogoToast.error("Error verifying OTP");
      }
    } catch (error) {
      cogoToast.error("Error verifying OTP");
      console.error("Error verifying OTP:", error);
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const resendOtp = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `${EXCHANGE_URLS_ADMIN}/otpsend`,
        { email: userDetails.email },
        axiosConfig
      );
      if (response.status === 200) {
        cogoToast.success("OTP Resent successfully");
      }
    } catch (error) {
      cogoToast.error("Error resending OTP");
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <Root>
      <div className="otptable">
        <h3>Enter OTP</h3>
        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
        />
        <p className="links" onClick={resendOtp}>
          Resend OTP
        </p>
        <button className="thatones" onClick={verifyOtp}>
          Verify OTP
        </button>


        <p className="otpsend">OTP has been sent to Admin. Please check. </p>
      </div>
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
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(130deg, #231a6f, #0f054c);


  .otptable {
    display: flex;
    margin: 0px;
    width: 100%;
    flex-direction: column;
    width: 32%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;    align-items: center;
    border-radius: 9px;
    border: 1px solid white;
   
    .otpsend{
      color: white;
    font-size: 13px;
    font-weight: 500;
    font-style: oblique;
    font-family: 'Roboto';
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

    input {
      margin-left: 11px;
      justify-content: center;
      display: flex;
      border: none;
      align-items: center;
      border-radius: 6px;
      padding: 11px;
      margin-top: 24px;

      @media (max-width: 768px) {
        padding: 5px;
        margin-top: 16px;
        width: 138px;
      }
      }
   
   
    .thatones {
      margin: 7px;
      padding: 5px;
      font-size: 16px;
      padding: 7px;
      border-radius: 16px;
      background: #28a745;
      border: 1px;
      color: white;
      width: 119px;
      font-weight: 600;
      cursor: pointer;
    }

  
    .links {
      background: none;
      color: #ffef01;
      border: none;
      padding: 0;
      font: inherit;
      overflow: hidden;
      cursor: pointer;
      width: 49%;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      justify-content: right;
      font-size: 12px;
      margin-top: 8px;
  
    }

  }
   
`;
