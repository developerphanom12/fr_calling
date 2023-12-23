import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appDetailsAction } from "../../../redux/users/action";

export default function ListAllTellecaller({ popUser = () => {} }) {
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
    const isUnique = uniqueArray.some((item) => item?.id === currentItem?.id);

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
          <button
            className=""
            onClick={() => {
              navigate("/telleRegister");
            }}
          >
            Add Tellecaller
          </button>
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
            uniqueApplications.map((i) => {
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

                  <div className="email">{i?.email}</div>
                  <div>{i?.role}</div>
                  <div className="iconn">
                    <button> Block </button>
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
    justify-content: center;
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
    }
  }

  .app_table {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 10px;
    width: 98%;
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
      flex: 1;
      font-family: "Roboto", sans-serif;
      .email{
        font-size: 10px;
      }
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

        button {
          color: white;
          border: 2px solid white;
          border-radius: 14px;
          background-color: #ff0000a3;
          height: 45px;
          padding: 10px;
          font-weight: 600;
        }
      }
      > div {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        border: 0.3px solid #fbfbfd;
        text-transform: capitalize;
        background-color: #e7e7e8;
        text-align: center;
        padding: 15px 5px;
        .person {
          color: #8995ad;
          font-size: 14px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
        h6 {
          font-weight: 600;
          text-align: left;
          font-size: small;
          @media (max-width: 789px) {
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
          flex: 1;
          font-size: smaller;
        }
      }
    }
  }

  .addtelle {
    justify-content: right;
    display: flex;
    text-align: left;
    align-items: center;
    padding: 13px;
    margin-right: 12px;
    button {
      width: 170px;
      height: 40px;
      border-radius: 10px;
      border: none;
      background: #57be1f;
      color: #ffffff;
      &:hover {
        box-shadow: 5px 5px 7px gray;
      }
      @media (max-width: 566px) {
        width: 100%;
        height: 30px;
      }
    }
  }
`;
