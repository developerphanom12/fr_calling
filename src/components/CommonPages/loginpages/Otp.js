import React, { useState } from "react";
import { EXACHANGE_URLS_TELLE } from "../../URLS";
import axios from "axios";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const navigate = useNavigate();
  const [changePass, setChangePass] = useState({
    id: "",
    otp: "",
  });

  const ChangePassApi = async (old, newP) => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const data = {
        id: old,
        otp: newP,
      };
      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/change-password`,
        data,
        axiosConfig
      );
      setChangePass({ id: "", otp: "" });
      navigate("/studash");
      cogoToast.success("Otp verify successfully");
    } catch (err) {
      cogoToast.error("Error");
    }
  };
  const handleChangePassword = () => {
    ChangePassApi(changePass?.id, changePass?.otp);
  };

  return (
    <Root>
      {" "}
      <h3>Verify Otp ...</h3>
      <div className="main_div_pass">
        <div className="pass1">
          Enter Your ID
          <input
            type="text"
            placeholder="---id---"
            value={changePass?.id}
            onChange={(e) =>
              setChangePass({ ...changePass, id: e.target.value })
            }
          />
        </div>
        <div className="pass1">
          Enter Your OTP
          <input
            type="text"
            placeholder="---Enter Otp---"
            value={changePass?.otp}
            onChange={(e) =>
              setChangePass({ ...changePass, otp: e.target.value })
            }
          />
        </div>
        <div className="box1">
          <button
            onClick={() => {
              handleChangePassword();
            }}
          >
           Verify Otp
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
`;