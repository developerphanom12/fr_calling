import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { appDetailsAction } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ClientHistory({ detail }, { popUser = () => {} }) {
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

          <div>Client Detail</div>
          <div>CA detail</div>
          <div>Date</div>
          <div>Status</div>
          <div>Tellecaller</div>
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

                <div className="statusdata">

                <p>
                    <h4> Name: </h4>
                    <p>
                    {i?.client_name}
                    </p>
                  </p>
                  <p>
                    <h4> Email: </h4>
                    <p>
                    {i?.client_email}
                    </p>
                  </p>
                  <p>
                    <h4> Phone Number: </h4>
                    <p>
                    {i?.client_phonenumber}
                    </p>
                  </p>
                  <p>
                    <h4> Company Address: </h4>
                    <p>
                    {i?.client_companyaddress}
                    </p>
                  </p>
                 
                  <p>
                    <h4> Company Name: </h4>
                    <p>
                    {i?.company_name}
                    </p>
                  </p>

                  <p>
                    <h4> Company Constitution: </h4>
                    <p>
                    {i?.company_constitution}
                    </p>
                  </p>
                 
                  <p>
                    <h4> Industry Type: </h4>
                    <p>
                    {i?.industry_type}
                    </p>
                  </p>
                 
                 

                 
                
                </div>
                <div className="statusdata">

                <p>
                    <h4> CA Name: </h4>
                    <p>
                    {i?.ca?.ca_name}
                    </p>
                  </p>
                  <p>
                    <h4> CA PhoneNumber: </h4>
                    <p>
                    {i?.ca?.ca_number}
                    </p>
                  </p>

                  <p>
                    <h4> CA Accountant Name: </h4>
                    <p>
                    {i?.ca?.ca_accountant_name}
                    </p>
                  </p>
                 
                  <p>
                    <h4>CA Accountant Number: </h4>
                    <p>
                    {i?.ca?.ca_accountant_number}
                    </p>
                  </p>
                 
                  <p>
                    <h4>CA Company Name: </h4>
                    <p>
                    {i?.ca?.ca_company_name}
                    </p>
                  </p>
                  <p>
                    <h4> Company Address: </h4>
                    <p>
                    {i?.ca?.company_address}
                    </p>
                  </p>
                
                </div>

                <div className="statusdata">
                  <p>
                    <h4>Client addon: </h4>
                    <p>
                      {i?.created_at ? formatDate(i?.created_at) : "No Date"}
                    </p>
                  </p>
                  <p>
                    <h4> Appointment Date: </h4>
                    <p>
                      {i?.appointment ? formatDate(i?.appointment) : "No Date"}
                    </p>
                  </p>
                  <p>
                    <h4>Call Date: </h4>
                    <p>{i?.call_date ? formatDate(i?.call_date) : "No Date"}</p>
                  </p>
                </div>
                <div className="statusdata">
                  <p>
                    <h4>First Status: </h4>
                    <p>{i?.call_status}</p>
                  </p>

                  <p>
                    <h4>Second Status: </h4>{" "}
                    <p>{i?.statuss[0]?.call_status || "No Data"}</p>
                  </p>
                  <p>
                    <h4>Third Status:</h4>{" "}
                    <p>{i?.statuss[1]?.call_status || "NO Data"}</p>
                  </p>
                </div>

                
                <div className="statusdata11">

                <p>
                    <h4>Tellecaller Name:</h4>{" "}
                    <p>{i?.user?.username}</p>
                  </p>
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
  color: #202020;
  font-family: "Roboto", sans-serif;
  height: 100%;
  overflow: auto;
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
    width: 150%;
    /* margin-left: 60px; */
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background: #5d05abb8;
      text-align: center;
      color: white;
      /* border-bottom: 4px solid #4b217b; */
      width: 135vw;
      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        padding: 10px;
      }
    }
    .app_body {
      display: flex;
      font-family: "Roboto", sans-serif;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
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

      .statusdata {
        p {
          display: flex;
          justify-content: space-between;
          width: 80%;
          align-items: center;
          font-size: 14px;
          h4{
           
            margin: 9px 0px;
    color: #000;
    width: 100%;
          }
        }
        
      }

      .statusdata11 {
        p {
          display: flex;
          justify-content: space-between;
          width: 80%;
          align-items: center;
          font-size: 14px;
          h4{
          
            margin: 9px 0px;
    color: #000;
    width: 100%;
          }
        }
        
      }
      .statusdata1 {
        p {
          display: flex;
          justify-content: space-between;
          width: 80%;
          align-items: center;
          font-size: 14px;
        padding:5px;
          h4{
            margin: 5px 0px;
            color: #000;
          }
        }
        
      }
      .clientname {
        flex: 1;
        border: 0.3px solid #7352d07d;
        text-transform: capitalize;
        background-color: #fff;
        text-align: center;
        padding: 26px 5px;

        p {
          display: flex;
          gap: 10px;
        }
      }

      > div {
        flex: 1;
        border: 0.3px solid #7352d07d;
        text-transform: capitalize;
        background-color: #fff;
        text-align: center;
        padding: 26px 5px;
      }
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
        /* background-color: #a061ef26; */
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
