import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TelleReport from "./TelleReport";
import Mainchart3 from "../Mainchart3";
import CircleChat from "./CircleChat";
import { EXCHANGE_URLS_ADMIN } from "../../../../URLS";
import axios from "axios";

const ViewStat = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [telle , settelle] = useState([]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };



  const teleldata = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/getallrecv`,
        axiosConfig
      );
      if (res?.status === 201) {
        settelle(res?.data.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect (() =>{
    teleldata()
  },[])

  return (
    <Root>
      <h1 className="h1">Report snapshot :</h1>
      <div className="data12">
        <div className="data">
          <div className="datatatata">
            <div className="dat1">
              <h1>select</h1>
              <select>
                <option>Select Telecaller</option>
                {telle &&
                    telle.map((i) => {
                      return <option value={i?.id}>{i.username}</option>;
                    })}
              </select>
            </div>
            <div className="checkdate">
              <select>
                <option>select date</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Last 14 Days</option>
                <option>Last 28 days</option>
              </select>
              <input
                type="date"
                placeholder="data"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>

          <TelleReport />
        </div>
        <div className="datass">
          <p>Daily Report</p>
          <div className="datachild">
            <CircleChat />
          </div>
          <h1 className="totalbyjus">Total :</h1>
          <div className="datafetch">
            <p className="negativ"> Close</p>
            <p className="negativ"> Negative</p>
            <p className="negativ"> Hot</p>
            <p className="negativ">Cold</p>
          </div>
        </div>
      </div>

      <div className="calldata">
        <div className="datamm">
          <p>Daily Call data</p>
        </div>
        <div className="datamm1">
          <p>call data</p>
        </div>
      </div>

      <p>end</p>
    </Root>
  );
};

export default ViewStat;

const Root = styled.section`
  display: flex;
  flex-direction: column;

  .h1 {
    font-size: 24px;
    margin-top: 31px;
    margin-left: 62px;
    font-family: serif;
  }
  .data12 {
    display: flex;
    justify-content: space-around;
    margin: 0px;
    margin-top: 5px;
    padding: 17px;

    .datatatata {
      justify-content: space-between;
      display: flex;
      .checkdate {
        gap: 11px;
        justify-content: space-around;
        display: flex;
        text-align: center;
        align-items: center;
        margin: 14px;
        padding: 4px;
        border-radius: 8px;
        text-decoration: none;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        background-color: #fff4f4;
        input {
          border: none;
          cursor: pointer;
        }
        select {
        }
      }

      .dat1 {
        display: flex;
        width: 13vw;
        height: 8vh;
        gap: 11px;
        margin-top: 14px;

        h1 {
          font-family: sans-serif;
          color: black;
          font-size: 20px;
          font-weight: 500;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          margin-left: 16px;
          margin-bottom: 14px;
        }

        select {
          display: flex;
          width: 10vw;
          height: 4vh;
          margin-top: 9px;
          font-size: 14px;
          border-radius: 5px;
          box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        }

        option {
        }
      }
    }

    .datass {
      border-radius: 8px;
      width: 30vw;
      justify-content: center;
      margin: 0px;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      margin-left: 15px;
      p {
        margin: 0px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        margin-top: 12px;
      }
      .datachild {
        width: 28vw;
        margin-top: 32px;
        margin-left: 42px;
      }
      .datafetch {
        display: flex;
        /* gap: initial; */
        justify-content: space-around;
        .negativ {
          font-size: 15px;
        }
      }

      .totalbyjus {
        margin-left: 12px;
      }
    }

    .data {
      width: 50vw;
      border: 1px solid #dbcccc;
      margin-right: 10px;
      border-radius: 11px;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      .activity {
        display: flex;
        gap: 0px;
        p {
          margin: 8px;
        }
        h1 {
          color: #888484;
        }
        .cold1 {
          margin: 10px;
          p {
            color: black;
          }
        }

        .viewstat {
          display: flex;
          width: 9vw;
          margin-left: 90px;
          justify-content: center;
          height: 5vh;
          border-radius: 8px;
          margin-top: 8px;
          background: #0088ff;
          cursor: pointer;
        }
        p {
          color: #e8dbdb;
          font-weight: 500;
          font-family: "Roboto";
        }
      }
    }
  }
  .calldata {
    display: flex;
    justify-content: space-around;
    .datamm {
      margin-left: 72px;
      color: red;
      display: flex;
      /* gap: 28px; */
      width: 40vw;
      height: 34vh;
      justify-content: center;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      p {
        font-size: 23px;
      }
    }
    .datamm1 {
      color: red;
      display: flex;
      gap: 28px;
      width: 29vw;
      height: 34vh;
      justify-content: center;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      margin-left: 67px;
      p {
        font-size: 23px;
      }
    }
  }
`;
