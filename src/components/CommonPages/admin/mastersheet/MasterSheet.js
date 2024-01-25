import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import { appDetailsAction } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";




const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


export default function MasterSheet({ popUser = () => {} }) {
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
        `${EXCHANGE_URLS_ADMIN}/getmastersheetdata`,
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
          <h1>MasterSheet Data</h1>
        </div>
        <div className="addtelle">
          <button
            className=""
            onClick={() => {
              navigate("/adddata");
            }}
          >
            Add ExcelSheet Data
          </button>
        </div>
        <div className="app_table">
          <div className="app_header">
            <div> Id</div>
            <div>Client Name</div>
            <div>Company Name</div>
            <div>Call Scheduled ate</div>
            <div>Date</div>
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
                      <span>{i?.client_name}</span>
                    </p>
                  </div>

                  <div className="email">{i?.company_name}</div>
                  <div>{formatDate(i?.call_schedule_date)}</div>
                  <div>{formatDate(i?.update_date)}</div>

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
      background-color: #0088ff;
      text-align: center;
      color: white;
      height: 7vh;

      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        padding: 15px;
      }
    }
    .app_body {
      display: flex;
      height: 8vh;
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
          background: #2372d3;          padding: 10px;
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
    margin-right: 12px;
    button {
      width: 170px;
      height: 40px;
      border-radius: 10px;
      border: none;
      background: #2372d3;
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
