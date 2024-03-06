import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appDetailsAction } from "../../../redux/users/action";
import cogoToast from "cogo-toast";

export default function ListAllTellecaller({ popUser = () => {} }) {
  const [applications, setApplications] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    id: "",
    is_deleted: "",
  });

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

  const statusApi = async () => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.post(
        `${EXCHANGE_URLS_ADMIN}/deleteuser`,
        status,       
        axiosConfig
      );

      if (response?.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error", error);
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

  const handleClick = (id, isApproved) => {
    const currentUser = applications.find((caller) => caller.id === id);
    if (currentUser) {
      setStatus({
        id,
        is_deleted: isApproved ? 1 : 0,
      });
      if (status.is_deleted === 1) {
        cogoToast.warn("Caller Blocked");
      }
      statusApi();
    } else {
      cogoToast.error("User not found");
    }
  };
  

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
                    <button
                      className="wrong"
                      onClick={() => handleClick(i.id, 1)}
                    >
                      Block
                    </button>
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
  background: #e4e6ec;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;    @media (max-width: 566px) {
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
      background: #5d05abb8;      text-align: center;
      color: white;

      > div {
        flex: 1;
    border: 1px solid #dee2e6;
    padding: 4px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
      }
    }
    .app_body {
      display: flex;
      flex: 1;
      font-family: "Roboto", sans-serif;
      .email {
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
          border-radius: 10px;
          background-color: #0088ff;
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
    display: flex;
    font-size: 14px;
    justify-content: center;
    color: black;
    font-weight: 500;
        }

        &:nth-child(even) {
          background-color: #e7e7e8;
    display: flex;
    font-size: 14px;
    justify-content: center;
    color: black;
    font-weight: 500;
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
    margin-right: 12px;
    button {
      width: 170px;
      height: 40px;
      border-radius: 10px;
      border: none;
      background: #2372d3;      color: #ffffff;
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
