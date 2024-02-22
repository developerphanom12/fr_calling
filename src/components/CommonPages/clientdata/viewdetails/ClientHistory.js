import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate} from "react-router-dom";
import { appDetailsAction } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";

export default function ClientHistory({ popUser = () => {} }) {
  const [applications, setApplications] = useState([]);
  const [uniqueClientNames, setUniqueClientNames] = useState([]);
  const [selectedTele, setSelectedTele] = useState("");
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
    h2 {
      color: #202020;
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      margin: 0px 10px;
    }
    select {
      background-color: white;
      color: gray;
      text-decoration: none;
      border: 1px solid #623084;
      line-height: 1.5em;
      width: 250px;
      padding: 5px;
      margin: 10px 0px;
      border-radius: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: linear-gradient(45deg, transparent 50%, #1e0945 50%),
        linear-gradient(135deg, #1e0945 50%, transparent 50%),
        linear-gradient(to right, #63276f, #f064e7, #a74fad);
      background-position: calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px), 100% 0;
      background-size: 5px 5px, 5px 5px, 40px 45px;
      background-repeat: no-repeat;
    }
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

 

   button {
     padding: 5px;
     border-radius: 20px;
     font-size: 13px;
     border: none;
     color: #ffffff;
     background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
     transition: all 0.3s ease-in-out 0s;
     text-transform: uppercase;
     &:hover {
      cursor: pointer;
       transition: all 0.2s ease-in-out 0s;
       background: linear-gradient(
         -25deg,
         #3a1864 20%,
         #461c6c 49%,
         #471f75 100%
       );
     }
   }
 }
 
  
  .app_table {
    display: flex;
    flex-direction: column;
    width: 88%;
    margin-left: 60px;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background:#5d05abb8;
      text-align: center;
      color: white;     
      border-bottom: 4px solid #4b217b;
      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        padding: 10px;
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
          color: #63276f;
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
        padding: 10px 5px;
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
          background-color: #a061ef26;
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
