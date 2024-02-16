import React, { useEffect } from "react";
import styled from "styled-components";
import { TfiMenu } from "react-icons/tfi";
import TelleData from "./TelleData/TelleData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Mainchart from "./CommonPages/admin/chart/Mainchart";
import Mainchart2 from "./CommonPages/admin/chart/Mainchart2";
import { EXCHANGE_URLS_ADMIN } from "./URLS";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ApexChart3 from "./CommonPages/admin/chart/ApexChart3";
import "./Dashboard.css";
import data from "../components/images/nodatra.png";
import Mainchart3 from "./CommonPages/admin/chart/Mainchart3";
import TelleReport from "./CommonPages/admin/chart/dailyreport/TelleReport";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [applications, Setcount] = useState([]);
  const [week, weekCount] = useState([]);

  const navigate = useNavigate();

  const getTotalCount = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/callcount`,
        axiosConfig
      );
      console.log("res13", res);
      if (res.status === 201) {
        Setcount(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUpcomingMeeeting = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/getweekdata`,
        axiosConfig
      );
      console.log("res123", res);
      if (res.status === 200) {
        weekCount(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTotalCount();
    getUpcomingMeeeting();
  }, []);

  const UniqueIdea = week.reduce((uniqueArray, currentItem) => {
    const isUnique = uniqueArray.some((item) => item?.id === currentItem?.id);

    if (!isUnique) {
      uniqueArray.push(currentItem);
    }

    return uniqueArray;
  }, []);

  return (
    <Root>
      <div className="chartmain">
        <div className="char1">
          <Mainchart />
        </div>
        <div className="char2">
          <h1>Total Client</h1>
          <Mainchart3 />
          <div
                className="viewstat"
                onClick={() => {
                  navigate("/viewstat");
                }}
              >
                <p>View Stats</p>
              </div>
        </div>
        <div className="char">
          <Mainchart2 />
        </div>
      </div>
      <div className="telledata">
        <div></div>

        
      </div>

      <p>Current Month</p>
      <div className="hotlead">
        <div className="cold">
          <h1>Close Client</h1>
          <p>
            <span>{applications?.close_status}</span>
          </p>
        </div>
        <div className="cold">
          <h1>Hot Client</h1>
          <p>
            <span>{applications?.hot_lead}</span>
          </p>{" "}
        </div>
        <div className="cold">
          <h1>Negative Client</h1>
          <p>
            <span>{applications?.negative_client}</span>
          </p>{" "}
        </div>
        <div className="cold">
          <h1>Ghost Client</h1>
          <p>
            <span>{applications?.ghost_client}</span>
          </p>{" "}
        </div>
      </div>
      <div className="chart1">
        <div className="upcoming">
          <div className="div1">
            <p className="none">Total Activity</p>
          
          </div>
          <TelleData />
        </div>
        <div className="upcoming1">
          <div className="upcomming_child">
            <div className="child1">
              <h1>Upcoming Appointments</h1>

              <TfiMenu />
            </div>
          </div>
          <div className="upcomming_child1_div">
            {UniqueIdea && UniqueIdea.length > 0 ? (
              UniqueIdea.map((i) => (
                <div className="data_div" key={i.id}>
                  <div className="img_text">
                    <img
                      width="40px"
                      src={
                        "https://cdn.pixabay.com/photo/2016/03/31/20/37/client-1295901_1280.png"
                      }
                      alt="img"
                    />
                    <h5>
                      {i.client_name}{" "}
                      <p className="p_tag">
                        {formatDate(i?.call_schedule_date)}
                      </p>
                    </h5>
                  </div>

                  <div
                    className="child11"
                    onClick={() => {
                      navigate(`/upcomingdata/${i?.id}`);
                    }}
                  >
                    <BsFillEyeFill />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <img src={data} alt="img" />
                <p className="data22">No Upcoming Appointment This week</p>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  /* margin-top: 12px; */
  padding: 16px;

  p {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    letter-spacing: 0;
    color: rgba(61, 78, 101, 0.84);
    margin-top: 50px;
    margin-left: 13px;
  }

  .chartmain {
    display: flex;
    margin-top: 23px;
    justify-content: space-between;

    .char1 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      /* background-color: #efefef !important; */
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      width: 28%;
      border-radius: 1px;
      height: 54vh;
      .curent {
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      .price {
        letter-spacing: 2.1px;
        color: #112b4a;
        text-align: center;
        margin-right: 63px;
      }
      p {
        margin-top: 5px;
        margin-right: 12px;
        font-size: 17px;
        padding: 0px;
        text-align: center;
        color: rgba(55, 77, 103, 0.54) !important;
      }
    }
    .char1:hover {
    }

    .char {
      width: 38%;
      /* margin-right: 34px; */
      /* background-color: #efefef !important; */
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }
  .chart1 {
    display: flex;
    justify-content: space-around;
    margin-top: 23px;

    .upcoming {
      display: flex;
      flex-direction: column;
      width: 49%;
      padding: 9px;
      background-color: #f8f9fa !important;
      box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.45) inset;
      .div1 {
        display: flex;
        justify-content: space-between;
        .none {
          text-align: center;
        }
        p {
          font-size: 1.2rem;
          font-weight: 600;
          font-family: Roboto, sans-serif;
          letter-spacing: 0;
          color: rgba(61, 78, 101, 0.84);
          margin: 20px;
        }
        .datapicker {
          display: flex;
          align-items: center;
          .p1 {
            border: 1px solid #0088ff;
            border-radius: 8px;
            text-align: center;
            color: white;
            width: 80px;
            cursor: pointer;
            padding: 5px;
            font-weight: 500;
            font-size: 16px;
            background: #0088ff;
          }
        }
      }
    }

    .upcoming1 {
      display: flex;
      flex-direction: column;
      padding: 10px;
      overflow-y: scroll;

      width: 36%;
      background-color: #f8f9fa !important;
      box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.45) inset;
      h1 {
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      .upcomming_child {
        .child1 {
          display: flex;
          align-items: center;
          text-align: center;
          padding: 10px;
          justify-content: space-between;
          cursor: pointer;
          p {
            font-size: 25px;
            display: flex;
            margin: 0;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
      .upcomming_child1_div {
        display: flex;
        flex-direction: column;
        margin-right: 14px;
        overflow-y: scroll;
        .data22 {
          margin: 12px;
        }

        .data_div {
          display: flex;
          margin-top: 12px;
          padding: 6px;
          border-radius: 12px;
          margin-bottom: 7px;
          justify-content: space-between;
          .img_text {
            display: flex;
            font-size: 1.125rem;
            font-weight: 600;
            font-family: Roboto, sans-serif;
            gap: 10px;
            color: rgba(61, 78, 101, 0.84);
            margin-right: 12px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 33px;
              margin-top: 5px;
            }
            h5 {
              display: flex;
              margin: 0;
              align-items: center;
              justify-content: center;
              margin-top: 5px;
              font-size: 18px;
              font-family: Arial, Helvetica, sans-serif;
              padding: 10px;
              gap: 40px;
              .p_tag {
                font-size: 17px;
                font-weight: 400;
                margin: 0px;
                font-family: Arial, Helvetica, sans-serif;
                padding: 0px;
              }
            }
          }
          .child11 {
            display: flex;
            align-items: center;
            justify-content: right;
            cursor: pointer;
            color: #0088ff;
          }
        }
      }
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    letter-spacing: 0;
    color: rgba(61, 78, 101, 0.84);
    margin-top: 50px;
  }
  .hotlead {
    display: flex;
    flex-wrap: wrap;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    .cold {
      padding: 12px;
      width: 16%;
      margin: 9px;
      border-radius: 13px;
      background-color: #bce0ff6b;
      border: 1px solid #bce0ff6b;
      h1 {
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      p {
        font-size: 30px;
        margin: 4px;
        letter-spacing: 2.1px;
        color: #112b4a;
        line-height: 2.1875rem;
      }
    }
  }
  .char2 {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    width: 31%;
   
    .viewstat{
      display: flex;
    margin: 0px;
    justify-content: right;
     text-align: center;
    p{
      background: rebeccapurple;
    font-size: 20px;
    color: white;
    border: 1px solid;
    margin: 4px;
    margin-top: 20px;
    margin-right: 11px;
    width: 8vw;
    display: flex;
    font-family: auto;
    padding: 2px;
    border-radius: 7px;
    height: 4vh;
    justify-content: center;
    padding: 5px;
    align-items: center;
    cursor: pointer;
    }
    }
    > div {
      margin-top: 64px;
      margin-right: 48px;
    }
    h1 {
      margin-top: 11px;
      display: flex;
      justify-content: center;
      font-family: serif;
      font-weight: 600;
      font-size: 23px;
    }
  }

  .telledata {
    width: 100%;
    margin-top: 25px;
    .data12 {
      display: flex;
      justify-content: space-around;
      margin: 0px;
      padding: 43px;
      .datass {
        width: 30vw;
        justify-content: center;
        display: flex;
        margin: 0px;

        p {
          margin: 0px;
          font-size: 20px;
          margin-top: 12px;
        }
      }

      .data {
        width: 50vw;
        border: 1px solid #dbcccc;
        margin-right: 10px;
        border-radius: 11px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
          rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
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
    .datassqaaqs {
      width: 30vw;
    }
  }
`;
