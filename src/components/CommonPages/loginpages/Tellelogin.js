import React, { useState } from "react";
import styled from "styled-components";
import logpage from "../../images/5092143.jpg";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { userCheckAction, userDataAction } from "../../../redux/users/action";
import cogoToast from "cogo-toast";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("username is required."),
  passsword: yup
    .string()
    .required("Password is required.")
});

export default function EmployLogin() {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${EXCHANGE_URLS_ADMIN}/telecallerlogin`, data);
      console.log("resres", res?.data?.data);
      if (res?.status === 201) {
        localStorage.setItem("token", res?.data?.data?.token);
        dispatch(userDataAction(res?.data?.data));
        dispatch(userCheckAction(true));
        navigate("/dashboard");
        cogoToast.success("Login Successfully");
      }
    } catch (err) {
      console.log("err", err);
      cogoToast.error("An error occurred during login");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePassword = () => {
    if (passwordType === "passsword") {
      setPasswordType("text");
      return;
    }
    setPasswordType("passsword");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  const handleClick = () => { };
  return (
    <Root>
      <div className="main1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome To Tellecallerr Professional Community</h1>
          <div className="child">
            <div className="child_box">
              <p className="lable1">
                {" "}
                <label className="lable1">Username or Phone</label>
              </p>

              <input
                onKeyDown={handleKeyDown}
                type="text"
                {...register("username")}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="child_box1">
              <p className="lable2">
                <label className='' htmlFor="passsword">Password</label>
              </p>
              <div className="passsword_div">
                <div>
                  <input
                    onKeyDown={handleKeyDown}
                    type={passwordType}
                    {...register("passsword")}
                  />
                  <button
                    className="btn_outline_primary"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <i className="eye_slash">
                        <IoEyeOffSharp />
                      </i>
                    ) : (
                      <i className="eye">
                        <IoEyeSharp />
                      </i>
                    )}
                  </button>
                </div>
                {errors.passsword && <p>{errors.passsword.message}</p>}
              </div>
            </div>
            <div className="child_box">
              <button className="forget">Forget password?</button>
            </div>
            <div className="child_box">
              <button className="sign">Sign in</button>
            </div>
          
          
          
           
          </div>
        </form>
      </div>
      <div className="main2">
        <img src={logpage} alt="img" />
      </div>
    </Root>
  );
}
const Root = styled.section`
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell,
    "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  /* padding: 20px 0px 40px 0px; */
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
  height: 100%;
  /* width: 100%; */
  @media (max-width: 989px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  p {
    margin: 0px;
  }
  .main1 {
    width: 60%;
    text-align: center;
    /* padding: 30px 60px; */
    @media (max-width: 789px) {
      width: 100%;
      padding: 0px;
    }
    h1 {
      margin: 25px;
      /* font-size: 3.3em; */
      color: #b24020;
      font-weight: 600;
      display: flex;
      justify-content: center;
      @media (max-width: 789px) {
        font-size: 32px;
        font-weight: 300;
      }
    }
    .child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
      .child_box {
        padding: 0px 0px 10px;
        p {
          font-size: 14px;
          margin: 0px 0px 8px;
          color: #000000bf;
          font-weight: 700;
        }
        input {
          border: 1px solid black;
          height: 48px;
          width: 45%;
          font-size: 16px;
          color: #000000e6;
          border-radius: 5px;
          &:hover {
            /* border: 2px solid black; */
            background-color: #d3d3d347;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }

        .forget {
          color: #0a66c2;
          font-size: 16px;
          font-weight: 600;
          margin: 8px 0px 24px;
          border: none;
          background-color: white;
          @media (max-width: 789px) {
            width: 58%;
          }
        }
        .sign {
          background-color: #0a66c2;
          padding: 12px 24px;
          border: none;
          color: #ffffff;
          height: 48px;
          font-size: 16px;
          width: 23%;
          border-radius: 30px;
          font-weight: 600;
          font: 16px;
          &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 1px;
            background-color: #043669;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .linked {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border: 1px solid #dadce0;
          background-color: #ffffff;
          height: 40px;
          width: 80%;
          border-radius: 30px;
          gap: 5px;
          p {
            margin: 0;
            font-family: "Google Sans", arial, sans-serif;
            letter-spacing: 0.25px;
            color: #3c4043;
            font-size: 14px;
            font-weight: 600;
            font: 16px;
          }
          svg {
            color: #0a66c2;
            width: 22px;
            height: 22px;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .join_now {
          box-shadow: 0 0 0 1px var(--color-button-container-secondary-border);
          background-color: var(--color-button-container-secondary);
          color: #000000bf;
          border: 1px solid black;
          width: 80%;
          padding: 10px;
          border-radius: 24px;
          height: 48px;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.25;
          &:hover {
            border: 2px solid black;
            background-color: #d3d3d347;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .password_div {
          display: flex;
          flex-direction: column;
          @media (max-width: 766px) {
            width: 107%;
          }
          @media (max-width: 789px) {
            width: 103%;
          }
          @media (max-width: 550px) {
            width: 87%;
          }
          @media (max-width: 909px) {
            width: 107%;
          }
          @media (max-width: 910px) {
            width: 112%;
          }
          input {
            border: 1px solid black;
            height: 48px;
            width: 80%;
            font-size: 16px;
            color: #000000e6;
            border-radius: 5px;
            position: relative;
            &:hover {
              /* border: 2px solid black; */
              background-color: #d3d3d347;
            }
            @media (max-width: 789px) {
              width: 105%;
            }
            @media (max-width: 789px) {
              width: 87%;
            }
          }
          .btn_outline_primary {
            text-align: center;
            height: 45px;
            position: relative;
            top: 3px;
            left: -44px;
            border: none;
            background-color: white;
            @media (max-width: 450px) {
              position: relative;
              left: -35px;
            }
            svg {
              width: 20px;
              height: 20px;
              color: #0a66c2;
              &:hover {
                cursor: pointer;
                color: green;
                background-color: #d3d3d347;
              }
            }
          }
        }
      }

      .orr {
        padding: 16px 0px 24px;
        color: #000000e6;
        display: flex;
        width: 80%;
        align-items: center;
        justify-content: center;
        .line-1 {
          height: 1px;
          background-color: rgb(0 0 0 / 0.35);
          width: 50%;
        }

        P {
          text-align: center;
          padding: 0px 10px;
          width: 15px;
        }
        @media (max-width: 789px) {
          width: 98%;
        }
      }
      .policy_box {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 0px 16px;
        width: 80%;
        font-size: 12px;
        margin: 0;
        color: #00000099;
        h6 {
          font-size: 12px;
          margin: 0;
          color: #0a66c2;
        }
        @media (max-width: 789px) {
          width: 98%;
        }
      }
    }
  }
  .main2 {
    width: 50%;
    height: 100%;
    display: flex;
    margin-right: 45px;
    /* padding: 40px 0px; */
    justify-content: center;
    align-items: center;
    /* margin: 20px 0px; */
    @media (max-width: 789px) {
      width: 95%;
      padding: 0px;
      margin: 0;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 70%;
      height: 85%;
    }
   
  }
  .lable1{
    font-weight: 900;
     /* color:red; */
     font-size: 16px;
    justify-content: center;
    text-align: center;
    width: 60%;
    margin-left: 100px;
    }
    .lable2{
     color:red;
    justify-content: center;
    text-align: center;
    width: 60%;

    }
    .child_box1 {    margin-left: 21px;

        padding: 0px 0px 10px;
        p {
          font-size: 14px;
          margin: 0px 0px 8px;
          color: #000000bf;
          font-weight: 700;
        }
        input {
          border: 1px solid black;
          margin-left: 11px;
          height: 48px;
          width: 47%;
          font-size: 16px;
          color: #000000e6;
          border-radius: 5px;
          &:hover {
            /* border: 2px solid black; */
            background-color: #d3d3d347;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }

        .forget {
          color: #0a66c2;
          font-size: 16px;
          font-weight: 600;
          margin: 8px 0px 24px;
          border: none;
          background-color: white;
          @media (max-width: 789px) {
            width: 58%;
          }
        }
        .sign {
          background-color: #0a66c2;
          padding: 12px 24px;
          border: none;
          color: #ffffff;
          height: 48px;
          font-size: 16px;
          width: 23%;
          border-radius: 30px;
          font-weight: 600;
          font: 16px;
          &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 1px;
            background-color: #043669;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .linked {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border: 1px solid #dadce0;
          background-color: #ffffff;
          height: 40px;
          width: 80%;
          border-radius: 30px;
          gap: 5px;
          p {
            margin: 0;
            font-family: "Google Sans", arial, sans-serif;
            letter-spacing: 0.25px;
            color: #3c4043;
            font-size: 14px;
            font-weight: 600;
            font: 16px;
          }
          svg {
            color: #0a66c2;
            width: 22px;
            height: 22px;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .join_now {
          box-shadow: 0 0 0 1px var(--color-button-container-secondary-border);
          background-color: var(--color-button-container-secondary);
          color: #000000bf;
          border: 1px solid black;
          width: 80%;
          padding: 10px;
          border-radius: 24px;
          height: 48px;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.25;
          &:hover {
            border: 2px solid black;
            background-color: #d3d3d347;
          }
          @media (max-width: 789px) {
            width: 98%;
          }
        }
        .password_div {
          display: flex;
          flex-direction: column;
          @media (max-width: 766px) {
            width: 107%;
          }
          @media (max-width: 789px) {
            width: 103%;
          }
          @media (max-width: 550px) {
            width: 87%;
          }
          @media (max-width: 909px) {
            width: 107%;
          }
          @media (max-width: 910px) {
            width: 112%;
          }
          input {
            border: 1px solid black;
            height: 48px;
            width: 80%;
            font-size: 16px;
            color: #000000e6;
            border-radius: 5px;
            position: relative;
            &:hover {
              /* border: 2px solid black; */
              background-color: #d3d3d347;
            }
            @media (max-width: 789px) {
              width: 105%;
            }
            @media (max-width: 789px) {
              width: 87%;
            }
          }
          .btn_outline_primary {
            text-align: center;
            height: 45px;
            position: relative;
            top: 3px;
            left: -44px;
            border: none;
            background-color: white;
            @media (max-width: 450px) {
              position: relative;
              left: -35px;
            }
            svg {
              width: 20px;
              height: 20px;
              color: #0a66c2;
              &:hover {
                cursor: pointer;
                color: green;
                background-color: #d3d3d347;
              }
            }
          }
        }
      }

  `;
