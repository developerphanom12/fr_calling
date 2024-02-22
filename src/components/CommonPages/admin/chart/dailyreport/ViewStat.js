import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TelleReport from "./TelleReport";
import CircleChat from "./CircleChat";
import axios from "axios";
import { EXACHANGE_URLS_TELLE, EXCHANGE_URLS_ADMIN } from "../../../../URLS";
import cogoToast from "cogo-toast";

const ViewStat = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [telecallers, setTelecallers] = useState(["21"]);
  const [selectedTelecaller, setSelectedTelecaller] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [salesData, setSalesData] = useState({
    cold_count: 0,
    hot_lead_count: 0,
    ghost_client_count: 0,
    negative_client_count: 0,
    close_status_count:0,
    prospective_client_count :0
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTelecallers();
    setSelectedTelecaller("");
    setSelectedPeriod("");
  }, []);

  useEffect(() => {
    if (selectedTelecaller && telecallers) {
      fetchData();
    }
  }, [selectedTelecaller, selectedPeriod]);

  const fetchTelecallers = async () => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/getallrecv`,
        axiosConfig
      );
      if (res?.status === 201) {
        setTelecallers(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching telecallers:", err);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/tellesalescheck?selection=${selectedPeriod}&id=${selectedTelecaller}`,
        axiosConfig
      );
      if (res?.status === 200) {
        if (res.data.data) {
          setSalesData(res.data.data);
          cogoToast.success("Data Fetch SuccessFully");
        } else {
          setSalesData(null);
        }
      }
    } catch (err) {
      cogoToast.error("Please select range.");
    }
  };

  const handleTelecallerChange = (e) => {
    setSelectedTelecaller(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <Root>
      <h1 className="h1">Report snapshot :</h1>
      {error && <p>{error}</p>}
      <div className="data12">
        <div className="data">
          <div className="datatatata">
            <div className="dat1">
              <h1>select</h1>
              <select onChange={handleTelecallerChange}>
                <option>Select Telecaller</option>
                {telecallers.map((telecaller) => (
                  <option key={telecaller.id} value={telecaller.id}>
                    {telecaller.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkdate">
              <select onChange={handlePeriodChange} value={selectedPeriod}>
                <option>Select Option</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 days</option>
                <option value="last14days">Last 14 Days</option>
                <option value="last28days">Last 28 days</option>
              </select>
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <TelleReport key={JSON.stringify(salesData)} data={salesData} />
        </div>
        <div className="datass">
          <p>Report</p>
          <div className="datachild">
            <CircleChat key={JSON.stringify(salesData)} data={salesData} />
          </div>
          <h1 className="totalbyjus">Total :</h1>
          <div className="datafetch">
            <p className="negativ">
              Close <span>{salesData?.totalcount?.close_status_count}</span>
            </p>
            <p className="negativ"> 
              Negative{" "}
              <span>{salesData?.totalcount?.negative_client_count}</span>
            </p>

            <p className="negativ">
              Hot <span>{salesData?.totalcount?.hot_lead_count}</span>
            </p>
            <p className="negativ">
              Cold <span>{salesData?.totalcount?.cold_count}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="calldata">
        <div className="datamm">
          <p>Total Attend Calls </p>
          <div className="negativee">
            Number of calls :     <span>{salesData?.totalcall}</span>
          </div>

          
        </div>
        <div className="datamm">
          <p>Total Client Add </p>
          <div className="negativee">
          Number of Client Add  :     <span>{salesData?.totalclientadd}</span>
          </div>

          
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
        justify-content: space-around;
        width: 27vw;
        margin-left: 23px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
          rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        margin-top: 12px;
        .negativ {
          font-size: 15px;
          display: flex;
          flex-direction: column;
          margin: 12px;
          span {
            margin: 5px;
            font-size: 19px;
          }
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
    .datamm {
      margin-left: 72px;
    color: red;
    display: flex;
    width: 18vw;
    display: flex;
    border-radius: 11px;
    flex-direction: column;
    height: 14vh;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

      p {
    font-family: serif;
    font-weight: 600;
    background: #3f78e3;
    padding: 5px;
    display: flex;
    justify-content: center;
    color: white;
      }

      .negativee {
        display: flex;
    /* flex-direction: column; */
    margin-top: 13px;
    margin-left: 11px;
    color: black;
    font-size: 17px;
    font-weight: 400;
    gap: 8px;


      }
    }
    .datamm1 {
      color: red;
      display: flex;
      /* flex-direction: column; */
      gap: 28px;
      width: 29vw;
      height: 34vh;
      justify-content: center;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      margin-left: 67px;
    }
  }
`;

// <div className="data12">
// <div className="data">
//   <div className="datatatata">
//     <div className="dat1">
//       <h1>select</h1>
//       <select onChange={handleTelecallerChange}>
//         <option>Select Telecaller</option>
//         {telecallers.map((telecaller) => (
//           <option key={telecaller.id} value={telecaller.id}>
//             {telecaller.username}
//           </option>
//         ))}
//       </select>
//     </div>
//     <div className="checkdate">
//       <select onChange={handlePeriodChange} value={selectedPeriod}>
//         <option value="today">Today</option>
//         <option value="yesterday">Yesterday</option>
//         <option value="last7days">Last 7 days</option>
//         <option value="last14days">Last 14 Days</option>
//         <option value="last28days">Last 28 days</option>
//       </select>
//       <input
//         type="date"
//         placeholder="Start Date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="End Date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//       />
//     </div>
//     <TelleReport />
//   </div>

//   <TelleReport data={salesData} />
// </div>
// </div>
