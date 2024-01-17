import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Download from "../DownloadData";
import { appDetailsAction } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";

export default function ClientHistory({ popUser = () => {} }) {
  const [applications, setApplications] = useState([]);
  const [uniqueClientNames, setUniqueClientNames] = useState([]);
  const [selectedTele, setSelectedTele] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { cd } = useParams;
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

  const filteredApplications = applications.reduce(
    (filteredArray, currentItem) => {
      const isUnique = filteredArray.some(
        (item) => item?.cd === currentItem?.cd
      );
      const matchesSelectedTele = currentItem?.user?.username === selectedTele;

      if (!isUnique && (!selectedTele || matchesSelectedTele)) {
        filteredArray.push(currentItem);
      }

      return filteredArray;
    },
    []
  );

  useEffect(() => {
    const uniqueNames = Array.from(
      new Set(applications.map((item) => item?.user?.username))
    );
    setUniqueClientNames(uniqueNames);
  }, [applications]);
  return (
    <Root>
      <div className="header">
        <h2>Client History</h2>
        <select
          value={selectedTele}
          onChange={(e) => setSelectedTele(e.target.value)}
        >
          <option value="">All Client</option>
          {uniqueClientNames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
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
        {filteredApplications &&
          filteredApplications.map((i) => {
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

                <div>
                  <p>{i?.ca?.ca_name}</p>
                </div>
                <div>
                  <p>{i?.call_status}</p>
                </div>
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
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 10px;
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
      font-weight: 700;
      margin: 0px 10px;
    }
    button {
      color: white;
      background-color: #0088ff;
      font-size: 16px;
      padding: 5px 7px;
      border: none;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
    }
  }
  .h11 {
    text-align: right;
    margin-right: 10px;
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
        svg {
          color: #0088ff;
          width: 20px;
          height: 20px;

          &:hover {
            color: green;
          }
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
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
        p {
          font-weight: 500;
          text-align: left;
          font-size: 13px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
          span {
            font-size: 13px;
            font-weight: 500;
          }
        }

        &:nth-child(odd) {
          background-color: #0088ff2b;
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
        > div {
          padding: 5px;
          font-size: smaller;
        }
      }
      .app_body {
        min-width: 105px;
        width: 100%;
        > div {
          font-size: 12px;
        }
      }
    }
  }
`;
