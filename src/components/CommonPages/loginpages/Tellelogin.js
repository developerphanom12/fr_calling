import React, { useState } from "react";
import styled from "styled-components";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import background from "../../images/backkk.avif";
import axios from "axios";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { userCheckAction, userDataAction } from "../../../redux/users/action";
import cogoToast from "cogo-toast";

const schema = yup.object().shape({
  username: yup.string().required("username is required."),
  passsword: yup.string().required("Password is required."),
});

export default function Tellelogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${EXCHANGE_URLS_ADMIN}/telecallerlogin`,
        data
      );
      console.log("resres", res?.data?.data);
      if (res?.status === 201) {
        localStorage.setItem("token", res?.data?.data?.token);
        dispatch(userDataAction(res?.data?.data));
        dispatch(userCheckAction(true));
        navigate("/otpverify");
        cogoToast.success("Login Successfully");
      }
    } catch (err) {
      console.log("err", err);
      cogoToast.error("Invalid User");
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
          <h1>Welcome To Tellecallerr Professional Community</h1>
          <div className="child">
            <div className="child_box">
              <p> Username or Phone</p>

              <input type="text" {...register("username")} />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="child_box">
              <p>Password</p>
              <div className="passsword_div">
                <input
                  type={showPassword ? "text" : "passsword"}
                  {...register("passsword")}
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
            <div className="child_box1">
              <button className="forget">Forget password?</button>
            </div>
            <div className="child_box2">
              <button type="submit" className="sign">Sign in</button>
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
    border-radius: 20px;
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
        width: 66%;
        .child_box {
          padding: 10px 0px;
          width: 100%;
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
            width: 85%;
            padding: 5px 10px;
            border-radius: 10px;
            &:hover {
              background-color: #d3d3d347;
            }
          }
        }
        .child_box1 {
          text-align: right;
          padding-right: 30px;
          .forget {
            background-color: transparent;
            color: #fff;
            text-decoration: dashed;
            font-size: 12px;
            font-weight: 600;
            border: none;
            border-bottom: 1px solid #fff;
          }
        }
        .child_box2 {
          text-align: center;
          padding: 10px 0px;
          width: 100%;
          .sign {
            background-color: #fff;
            color: #3a1864;
            padding: 6px;
            width: 200px;
            border: none;
            font-size: 14px;
            border-radius: 50px;
            margin: 10px;
            font-weight: 600;
            &:hover {
              cursor: pointer;
              color: #fff;
              background-color: #3a1864;
            }
          }
        }
      }
    }
  }
`;
