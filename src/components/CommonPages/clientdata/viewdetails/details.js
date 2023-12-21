import React, { useState } from "react";
import styled from "styled-components";
import Student from "./Student";
import Course from "./Course";
import Upload from "./Upload";
import AppHistory from "./AppHistory";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { EXCHANGE_URLS_APPLICATION } from "../../../URLS";

export default function DetailView() {
  const [val,setVal] = useState(false);
  const [value,setValue] = useState (false ,true);
  const [active, setActive] = useState("student");
  const [user, setUser] = useState();
  let { id } = useParams();
  console.log("checkdata", id);

  const getDetail = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXCHANGE_URLS_APPLICATION}/getbyid/${id}`,
        axiosConfig
      );
      if (res.status === 201) {
        setUser(res?.data?.data[0]);
      }
      console.log("resres", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id ,val ,value]);

  console.log("userr", user);
  return (
    <Root>
      <div></div>
      <h2>Application History</h2>
      <div className="nav_tab">
        <button
          className={active === "student" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("student");
          }}
        >
          Student Detail
        </button>
        <button
          className={active === "course" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("course");
          }}
        >
          Course Detail
        </button>
        <button
          className={active === "upload" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("upload");
          }}
        >
          Upload / Download
        </button>
        <button
          className={active === "apphistory" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("apphistory");
          }}
        >
          Application History
        </button>
        <button
          className={active === "comment" ? "btn_1 active" : "btn_1"}
          onClick={() => {
            setActive("comment");
          }}
        >
          Comment
        </button>
      </div>

      <div className="table">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {active === "student" ? (
                <Student detail={user} />
              ) : active === "course" ? (
                <Course detail={user} />
              ) : active === "upload" ? (
                <Upload detail={user} val = {((e)=>{setVal(e)})}/>
              ) : active === "apphistory" ? (
                <AppHistory detail={user} />
              ) : active === "comment" ? (
                <Comment value = {((e)=>{setValue(e)})}/>
              ) : (
                <Student />
              )}
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  font-family: "Roboto", sans-serif;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 25px;
  padding-left: 80px;
    @media (max-width:788px){
      padding-left: 70px;
    }
  @media (max-width: 800px) {

    h2 {
      margin: 4px;
    }
  }
  h2 {
    margin: 10px;
    font-size: 30px;
    text-shadow: 4px 5px 5px gray;
    font-weight: 600;
    @media (max-width: 786px) {
      margin: 0;
      font-size: small;
      align-items: center;
    } 
  }
  .nav_tab {
    display: flex;
    gap: 10px;
    align-items: center;
    background: #ffffff;
    width: 80%;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    @media (max-width: 786px) {
      flex-direction: column;
    }

    .btn_1 {
      background-color: transparent;
      border: none;
      width: fit-content;
      padding: 10px;
      background-color: #000080;
      border-radius: 10px;
      color: white;
      &:hover {
        box-shadow: 4px 5px 5px #A1A2A5;
      }
      @media (max-width: 566px) {
        min-width: 80px;
        width: 100%;
        padding: 5px;
        font-size: small;
        &:hover {
          background-color: transparent;
          color: black;
        }
      }
    }
    .active {
      background: #57be1f;
      color: #ffffff;
      @media (max-width: 400px) {
        .active {
          background-color: transparent;
          color: black;
        }
      }
    }
  }
  .table {
    border-top: 1px solid lightgray;
    width: 100%;
    height: 100%;
    @media (max-width: 600px) {
      padding: 0;
    }
  }
`;