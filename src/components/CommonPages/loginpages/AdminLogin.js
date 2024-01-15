import React, { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import background from "../../images/backkk.avif";
import { useForm } from "react-hook-form";
import axios from "axios";
import cogoToast from "cogo-toast";
import { userCheckAction, userDataAction } from "../../../redux/users/action";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),
});

export default function Employerlogin() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${EXCHANGE_URLS_ADMIN}/login`, data);
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

  
  return (
    <Root>
      <div className="main1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome To Employer Professional Community</h1>
          <div className="child">
            <div className="child_box">
              <p>Email or Phone</p>

              <input type="text" {...register("username")} />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="child_box">
              <p>Password</p>
              <div className="passsword_div">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  className="btn_outline_primary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </button>

                {errors.passsword && <p>{errors.passsword.message}</p>}
              </div>
            </div>

            <div className="child_box2">
              <button className="sign" type="submit">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </Root>
  );
}
const Root = styled.section`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  align-items: center;
  height: 100%;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 989px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  p {
    margin: 0px;
  }
  .main1 {
    margin: 10px;
    border: 2px solid #fff;
    border-radius: 10px;
    height: fit-content;
    backdrop-filter: blur(3px);
    text-align: center;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      h1 {
        margin: 25px;
        color: #f468e9;
        font-weight: 600;
        display: flex;
        justify-content: center;
      }
      .child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
        .child_box {
          padding: 10px 0px;
          width: 100%;
          margin-left: 20px;
          text-align: left;
          .passsword_div {
            display: flex;
            width: 100%;
            .btn_outline_primary {
              position: relative;
              top: 0px;
              left: -28px;
              border: none;
              background-color: transparent;
              svg {
                width: 16px;
                height: 16px;
                cursor: pointer;
              }
            }
          }
          p {
            font-size: 14px;
            margin: 0px 0px 8px;
            color: #fff;
            text-align: left;
            font-weight: 700;
          }
          input {
            border: 1px solid black;
            font-size: 16px;
            color: #000000e6;
            padding: 5px 10px;
            border-radius: 10px;
            &:hover {
              background-color: #d3d3d347;
            }
          }
        }

        .child_box2 {
          text-align: left;
          padding: 10px 0px;
          margin-left: 20px;
          width: 100%;
          .sign {
            background-color: #fff;
            color: #3a1864;
            padding: 6px;
            width: 80%;
            border: 1px solid black;
            font-size: 14px;
            border-radius: 10px;
            font-weight: 600;
            &:hover {
              cursor: pointer;
              color: #fff;
              background-color: #d3d3d347;
            }
          }
        }
      }
    }
  }
`;
