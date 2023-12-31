import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Download from "../DownloadData";
import { appDetailsAction } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";

export default function ClientHistory({ popUser = () => {} }) {
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
        `${EXCHANGE_URLS_ADMIN}/getalldataclient`,
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
    const isUnique = uniqueArray.some((item) => item?.cd === currentItem?.cd);

    if (!isUnique) {
      uniqueArray.push(currentItem);
    }

    return uniqueArray;
  }, []);

  return (
    <Root>
      
        <div className="header">
          <h2>Client History</h2>
        </div>
        <div className="h11">
          <button className="h1down">
            <Download />{" "}
          </button>
        </div>
        <div className="app_table">
          <div className="app_header">
            <div> Id</div>
            <div>Client Details</div>
            <div>Tellecaller Name</div>
            <div>CA Name</div>
            <div>Status</div>
            <div>View</div>
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
                  <div className="cams">#{i?.cd}</div>
                  <div>
                    <p>
                      Client Name <span>{i?.client_name}</span>
                    </p>
                    <p>
                      Company Name: <span>{i?.company_name}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Tellecaller name : <span>{i?.user?.username}</span>
                    </p>
                  </div>

                  <div>{i?.ca?.ca_name}</div>
                  <div>{i?.call_status}</div>
                  <div
                    className="iconn"
                    onClick={() => {
                      navigate(`/detailview/${i?.cd}`);
                    }}
                  >
                    <BsFillEyeFill />
                  </div>
                </div>
              );
            })}
        </div>
  
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
    align-items: center;
    @media (max-width: 566px) {
      padding: 10px;
      flex-direction: column;
      h2 {
        color: #202020;
        font-family: "Roboto", sans-serif;
        font-size: 32px;
        font-weight: 900;
        font-size: 33px;
        margin: 0;
      }
    }
    h2 {
      color: #202020;
      font-family: "Roboto", sans-serif;
      font-size: 32px;
      font-weight: 700;
      /* text-shadow: 4px 5px 5px gray; */
    }
    
  }
  .h11 {
    text-align: right;
    margin-right: 10px;
    button {
      color: white;
      background-color: #0088ff;
      font-size: 18px;
      padding: 5px;
      border: none;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
    }
  }

  .app_table {
    display: flex;
    flex-direction: column;
    width: 98%;
    margin: 10px;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background-color: #0088ff;
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
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
        p {
          font-weight: 600;
          text-align: left;
          font-size: small;
          @media (max-width: 789px) {
            font-size: 10px;
          }
          span {
            font-weight: 500;
          }
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
          /* flex: 1; */
          font-size: smaller;
        }
      }
    }
  }
 
`;
