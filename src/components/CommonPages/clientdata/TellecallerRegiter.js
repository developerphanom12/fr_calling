import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";

export default function TelleRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    passsword: "",
    email: ""
  });

  const staffApi = async () => {
    const { confirm_password, ...data } = formData;
    try {
        const axiosConfig = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const res = await axios.post(
          `${EXCHANGE_URLS_ADMIN}/telecallereg`,
          {...data},
          axiosConfig
        );
        console.log("resr", res);
        if (res.status === 201) {
            setFormData(res?.data);
          cogoToast.success("Submit SuccessFully");
          navigate("/dashboard");
        }
      }  catch (err) {
      console.log("err", err)   ;
    }
  };

 
  const handleRegisterClick = () => {
    if (formData?.passsword === formData?.confirm_password) {
      staffApi();
    } else {
      cogoToast.error("Password and Confirm Password Does Not Match");
    }
  };

 
  console.log("formData", formData);
  return (
    <Root>
      <div>
        <h3>Tellecaller Register</h3>
        <div className="name">
          User Name
          <input
            type="name"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            placeholder="user Name"
          />
        </div>
        <div className="name">
           Email
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            placeholder="Email is  placeholder"
          />
        </div>
        
        <div className="name">
          Password*
          <input
            type="passsword"
            value={formData?.passsword}
            onChange={(e) => {
              setFormData({ ...formData, passsword: e.target.value });
            }}
            placeholder="Enter Password"
          />
        </div>
        <div className="name">
          Confirm Password*
          <input
            value={formData?.confirm_password}
            onChange={(e) => {
              setFormData({
                ...formData,
                confirm_password: e.target.value,
              });
            }}
            placeholder="Confirm Password"
          />
        </div>
        <div className="regis">
          <button
            onClick={() => {
              handleRegisterClick();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
 
  h3 {
    text-shadow: 4px 5px 5px gray;
    margin: 10px;
  }
  .name {
    display: flex;
    flex-direction: column;
    font-size: small;
    width: 80%;
    margin-right: 10px;
    padding: 10px;
    gap: 10px;
    color: black;

    select {
      background-color: white;
      color: black;
      text-decoration: none;
      border: 2px solid lightgray;
      line-height: 1.5em;
      padding: 10px;
      width: 50%;
      border-radius: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, black 50%),
        linear-gradient(135deg, black 50%, transparent 50%),
        linear-gradient(to right, dodgerblue, skyblue);
      background-position: calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px), 100% 0;
      background-size: 5px 5px, 5px 5px, 40px 45px;
      background-repeat: no-repeat;
      &:hover {
        box-shadow: 4px 4px 5px darkgray;
        transition: all 0.1s ease-in-out 0s;
      }
      @media (max-width: 555px) {
        padding: 8px;
        width: 100%;
        background-size: 5px 5px, 5px 5px, 30px 45px;
        align-items: center;
      }

      select:focus {
        background-image: linear-gradient(45deg, white 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, white 50%),
          linear-gradient(to right, gray, gray);
        background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
          100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;
        border-color: grey;
        outline: 0;
      }
    }
  }
  > div {
    .regis {
      display: flex;
      margin: 5px;
      button {
        display: flex;
        flex-direction: column;
        width: 17%;
        height: 45px;
        margin: 5px;
        padding: 5px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 10px;
        border: transparent;
        background: #000080;
        color: #fff;
        background-size: 300% 100%;
        transition: all 0.3s ease-in-out 0s;
        text-transform: uppercase;
        &:hover {
          background: #000080;
          transition: all 0.1s ease-in-out 0s;
          box-shadow: 4px 5px 5px gray;
        }
        @media (max-width:666px) {
          width:50%;
        }
      }
    }
  }
  input {
    border-radius: 10px;
    padding: 10px;
    color: #202020;
    width: 50%;
    text-decoration: none;
    border: 2px solid lightgray;
    @media (max-width: 600px) {
      min-width: 100px;
      width: 100%;
    }
  }
`;