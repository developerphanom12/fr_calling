import React, { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { IoApps, IoHome, IoNotifications } from "react-icons/io5";
import { FaBagShopping, FaUserGroup } from "react-icons/fa6";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { FcList } from "react-icons/fc";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdOutlineClear } from "react-icons/md";
import { userCheckAction } from "../../redux/users/action";
import { useDispatch, useSelector } from "react-redux";
export default function PostNav() {
  const [active, setActive] = useState("Home");
  const [activePop, setActivePop] = useState(false);
  const userDetails = useSelector((state) => state?.users.user);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogoutClick = () => {
    localStorage.setItem("token", "");
    dispatch(userCheckAction(false));
    navigate("/");
  };
  return (
    <Root>
      <div className="logo"
        onClick={() => {
          handleLogoutClick();
        }}
      >
        <IoMdStarOutline />
        TeleCaller
      </div>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Search" />
      </div>
      <div className="main_nav">
        <button
          className={active === "home" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("home")
            navigate("/home");

          }}
        >
          <IoHome />
          Home
        </button>



 

          <button
            className={active === "profile" ? " active" : "btn_1"}
            onClick={() => {
              setActive("profile")
              navigate("/employeeprofile");
            }}
          >
            <FaUserCircle />
            Profile
          </button>
   

 
 
      </div>
      <div
        className="menu"
        onClick={() => {
          setActivePop(true);
        }}
      >
        <FcList />
      </div>
      <div
        className={activePop ? "pop_nav" : "no_pop"}
        onClick={() => {
          setActivePop(false);
        }}
      >
        <button>
          <MdOutlineClear />
        </button>
        <div
          className="opt_btn"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </div>
       
        <div
          className="opt_btn"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </div>
         
      </div>
    </Root>
  );
}
const Root = styled.section`
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* padding-left: 30px; */
  border-bottom: 1px solid lightgray;
  gap: 40px;
  .logo {
    background-color: dodgerblue;
    border-radius: 4px;
    padding: 5px;
    font-weight: 500;
    cursor: pointer;
    color: #ffffff;
    font-size: 22px;
    svg {
      color: #ffffff;
      font-weight: 600;
      width: 25px;
      height: 25px;
    }
    @media (max-width: 999px) {
      font-size: 18px;
      svg {
        color: #ffffff;
        font-weight: 600;
        width: 20px;
        height: 20px;
      }
    }
  }
  .search_bar {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 8px;
    width: 27%;
    gap: 5px;
    background-color: rgb(120 144 156 / 26%);
    input {
      border: none;
      padding: 5px;
      background-color: rgb(120 144 156 / 0%);
    }
    input:focus {
      border: none;
    }
  }
  .main_nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 13px;
    gap: 10px;
    @media (max-width: 950px) {
      display: none;
    }
    &:hover {
      color: black;
      transition: all 0.1s ease-in-out 0s;
    }
    button {
      background-color: #ffffff;
      color: grey;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: pointer;
        color: black;
        transition: all 0.1s ease-in-out 0s;
        svg {
          color: black;
        }
      }
      svg {
        width: 25px;
        height: 25px;
        color: rgb(120, 144, 156);
      }
      .btn_1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: transparent;
        color: #fff;
        background-size: 300% 100%;
        transition: all 0.3s ease-in-out 0s;
        &:hover {
          color: black;
          transition: all 0.1s ease-in-out 0s;
        }
      }
    }
    .active {
      border-bottom: 2px solid black;
      color: black;
      svg {
        color: black;
      }
    }

    .business {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      align-items: center;
      justify-content: center;
      padding: 10px;
      gap: 10px;
      border-left: 1px solid lightgray;

      button {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        color: grey;
        border: none;
        &:hover {
          cursor: pointer;
          color: black;
          transition: all 0.1s ease-in-out 0s;
          svg {
            color: black;
          }
        }
        svg {
          width: 25px;
          height: 25px;
          color: rgb(120, 144, 156);
        }
      }
      .active {
        border-bottom: 2px solid black;
        color: black;
        svg {
          color: black;
        }
      }
    }
  }

  .menu {
    svg {
      width: 20px;
      height: 20px;
    }
    @media (max-width: 950px) {
      display: block;
      padding-right: 10px;
    }
  }
  .menu {
    @media (min-width: 951px) {
      display: none;
    }
  }

  .pop_nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: 10;
    height: 440px;
    width: 30%;
    padding: 10px;
    gap: 10px;
    color: white;
    cursor: pointer;
    background: dodgerblue;
    button {
      border: none;
      color: white;
      text-align: right;
      background: none;
      svg {
        width: 20px;
        height: 20px;
      }
    }

    .opt_btn{
      padding: 10px;
      border-bottom: 1px solid white;
      &:hover{
        background-color: #fff;
        color:dodgerblue ;
      }
    }
    @media (min-width: 951px) {
      display: none;
    }
  }
  .no_pop {
    display: none;
  }
`;
