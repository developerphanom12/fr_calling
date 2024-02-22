import React, { useState } from "react";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import axios from "axios";
import cogoToast from "cogo-toast";
import styled from "styled-components";

export default function Otp() {
  const [changePass, setChangePass] = useState({
    email: "",
  });

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
        cogoToast.success("Otp verify successfully");
       
      }
    } catch (err) {
      cogoToast.error("Error");
    }
  };
  const handleChangePassword = () => {
    ChangePassApi(changePass?.email);
  };

  return (
    <Root>
      {" "}
      <div className="main_div_pass">
        <h3>Enter Email ...</h3>
        <div className="pass1">
          Enter Your Email
          <input
            type="email"
            placeholder="Enter Your Email"
            value={changePass?.id}
            onChange={(e) =>
              setChangePass({ ...changePass, email: e.target.value })
            }
          />
        </div>

        <div className="box1">
          <button
            onClick={() => {
              handleChangePassword();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  align-items: center;
  font-family: "Roboto", "sans-serif";
  h3 {
    font-weight: 500;
    font-family: "Roboto", "sans-serif";
    display: flex;
    justify-content: center;
  }
  .main_div_pass {
    background-color: red;

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
`;
