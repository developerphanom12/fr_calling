import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { appDetailsAction } from "../../../redux/users/action";
import ClientHistory from "../clientdata/ClientHistory";
import TelleRegister from "../clientdata/TellecallerRegiter";

export default function Telledata({ popUser = () => { } }) {
  const [applications, setApplications] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getHistory = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/getalltelle`,
        axiosConfig
      );
      if (res.status === 201) {

        setApplications(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(() => {
    getHistory();
  }, []);




  const handlePassData = (i) => {
    console.log("getDetails1", i);
    dispatch(appDetailsAction(i));
    popUser(true);
  };

  const uniqueApplications = applications.reduce((uniqueArray, currentItem) => {
    const isUnique = uniqueArray.some(item => item?.id === currentItem?.id);

    if (!isUnique) {
      uniqueArray.push(currentItem);
    }

    return uniqueArray;
  }, []);

  return (
    <Root>

      <>

        <div className="header">
          <h1>Tellecaller Data</h1>
        </div>
        <div className="addtelle">
          <button className="" onClick={() => { navigate("/telleRegister") }}>Add Tellecaller</button>
        </div>
        <div className="app_table">
          <div className="app_header">
            <div> Id</div>
            <div>Tellecaller Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Action</div>
          </div>
          {uniqueApplications &&
            uniqueApplications.map(i => {
              return (
                <div
                  className="app_body"
                  onClick={() => {
                    handlePassData(i);
                  }}
                >
                  <div className="cams">#{i?.id}</div>
                  <div>
                    <p>
                      <span>{i?.username}</span>
                    </p>

                  </div>


                  <div>{i?.email}</div>
                  <div>{i?.role}</div>
                  <div
                    className="iconn"
                  >
                    <button>  Block </button>
                  </div>
                </div>
              );
            })}
        </div>
      </>

    </Root>
  );
}
const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8f8f8;
  color: #202020;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: normal;
  vertical-align: middle;
  height: 100%;
 
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    @media (max-width: 566px) {
      padding: 10px;
      flex-direction: column;
      h1 {
        font-size: small;
      }
    }
    h1 {
      color: #202020;
      font-family: "Roboto", sans-serif;
      font-size: 32px;
      font-weight: 700;
      /* text-shadow: 4px 5px 5px gray; */
    }
    button {
      width: 170px;
      height: 40px;
      margin: 5px;
      border-radius: 10px;
      border: none;
      background: #57be1f;
      color: #ffffff;
      &:hover{
        box-shadow: 5px 5px 7px gray;
      }
      @media (max-width: 566px) {
        width: 100%;
        height: 30px;
      }
    }
  }
  .search_box {
    display: flex;
    margin-left: 10px;
    width: 50%;
    height: 60px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 4px 5px 6px gray;
    @media (max-width: 566px) {
        width: 90%;
      }
    input {
      border: 1px solid gray;
      width: 100%;
      border-radius: 8px;
      margin: 10px;
    }
    button {
      width: 80px;
      background: #1e33f2;
      padding:5px;
      border: none;
      border-radius: 10px;
      float: none;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 700;
      margin: 15px;
      color: #ffffff;
    }
  }

  p {
    padding: 0;
    margin: 0;
    text-transform: capitalize;
    text-align: left;
    font-family: "open-sans", "sana-serif";
  }

  .app_table {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 98%;
    padding: 5px 5px 5px 10px;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background-color: green;
      text-align: center;
      color: white;

      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        padding: 15px;
      }
    }
    .app_body {
      display: flex;
      font-family: "Roboto", sans-serif;

      .cams {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .iconn {
        display: flex;
        align-items: center;
        justify-content: center;

        button{
          color: white;
    border: 2px solid white;
    border-radius: 14px;
    width: 39%;
    background-color: #ff0000a3;
    height: 45px;
    padding: 0px;
    font-weight: 600;
        }
      }
      > div {
        flex: 1;
        border: 0.3px solid #fbfbfd;
        text-transform: capitalize;
        background-color: #e7e7e8;
        text-align: center;
        padding: 15px 5px;
        .person {
          color: #8995ad;
          font-size: 14px;
          @media (max-width:789px){
            font-size: 10px;
          }
        }
        h6 {
          font-weight: 600;
          text-align: left;
          font-size: small;
          @media (max-width:789px){
            font-size: 12px;
          }
        }

        span {
          font-weight: 600;
        }
        &:nth-child(odd) {
          background-color: #e7e7e8;
        }

        &:nth-child(even) {
          background-color: white;
        }
      }
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
  svg {
    height: 25px;
    width: 25px;
    color: blue;
    &:hover {
      color: green;
    }
  }
  @media (max-width: 568px) {
    .app_table {
      font-size: smaller;
      margin: 0px;
      overflow-x: scroll;
      .app_header {
        min-width: 135px;
        /* width: 100%; */
        > div {
          padding: 5px;
          font-size: smaller;
        }
      }
      .app_body {
        min-width: 105px;
        width: 100%;
        > div {
          /* flex: 1; */
          font-size: smaller;
        }
      }
    }

  }
  .h11{
   
    justify-content: right;
    text-align: right;

  }

button{
    margin: 0px;
    color: white;
    background-color: green;
    font-size: 21px;
    border: 12px solid white;
    border-radius: 22px;
    width: 15vw;
    height: 10vh;
    cursor: pointer;
    margin-right: 12px;
  }
 .addtelle{
  justify-content: right;
  display: flex;
  text-align: left;
  align-items: center;
  padding: 13px;
  margin-right: 12px;
 }
 button{
  color: white;
    border: 2px solid white;
    border-radius: 43px;
    width: 15%;
    background-color: #ff0000a3;
    height: 50px;
    padding: 0px;
    font-weight: 600;

 }
 .divbtn{
  color: white;
    border: 2px solid white;
    border-radius: 43px;
    width: 15%;
    background-color: red;
    height: 50px;
    padding: 0px;

 }
`;