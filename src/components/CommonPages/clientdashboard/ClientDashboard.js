import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ClientMainchart from "./ClientMainchart";
import ClientMainchart2 from "./ClientMainchart2";
import CLientMainchart2 from "./ClientMainchart2";
import { TfiMenu } from "react-icons/tfi";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReactDatePicker, { Data } from "react-datepicker";
import TelleData from "../../TelleData/TelleData";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ClientDashboard() {
  const [week, weekCount] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const getUpcomingMeeetingtelle = async () => {
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
    getUpcomingMeeetingtelle();
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
          <div className="apex">
            <ClientMainchart />
          </div>
        </div>
        <div className="char">
          <CLientMainchart2 />
        </div>
      </div>
      
      <div className="chart1">
        <div className="upcoming">
          <div className="div1">
            <p className="none">Recent Activity</p>
            <div className="datapicker">
              <DatePicker
                className="p1"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
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
          <div className="upcomming_child1">
            <div>
              {UniqueIdea &&
                UniqueIdea.map((i) => {
                  return (
                    <div className="data">
                      <div>
                        <img
                          src={
                            "https://cdn.pixabay.com/photo/2016/03/31/20/37/client-1295901_1280.png"
                          }
                          alt="hloo"
                        />
                        <h5>
                          {i.client_name}{" "}
                          <p>{formatDate(i?.call_schedule_date)}</p>
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
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}


const Root = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 16px;
  flex-wrap: wrap;
  justify-content: space-between;

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
      padding:7px;
      width: 38%;
      border-radius: 1px;
      background-color: #f8f9fa!important;      box-shadow: 0 0px 2px 0px rgba(0,0,0,0.45) inset;      height: 56vh;
      .curent {
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      border-radius: -1px -1px 0 0;
      .price {
        letter-spacing: 2.1px;
        color: #112b4a;
        text-align: center;
        margin-right: 63px;
      }
      p {
        margin-top: 5px;
        margin: 4px;
        margin-right: 12px;
        font-size: 19px;
        text-align: center;
        color: rgba(55, 77, 103, 0.54) !important;
      }
    }
    .char1:hover {
    }

    .char {
      width: 50%;
      margin-right  : 34px;
      background-color: #f8f9fa!important;
      box-shadow: 0 0px 2px 0px rgba(0,0,0,0.45) inset;     
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
      margin-top: 35px;
      padding: 9px;
      background-color: #f8f9fa!important;
      box-shadow: 0 0px 2px 0px rgba(0,0,0,0.45) inset;      .div1 {
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

          .p1 {
            border: 2px solid #0088ff;
            border-radius: 8px;
            text-align: center;
            color: white;
            cursor: pointer;
            font-weight: 500;
            font-size: 18px;
            width: 91px;
            height: 9px;
            margin-top: 18px;
            padding: 12px;
            margin-right: 15px;
            background: #0088ff;
          }
        }
      }
    }

    .upcoming1 {
      display: flex;
      flex-direction: column;
      margin-top: 35px;
      padding: 11.5px;
      width: 36%;
      background-color: #f8f9fa!important;      box-shadow: 0 0px 2px 0px rgba(0,0,0,0.45) inset;
      h1 {
        font-size: 1.125rem;
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
      .upcomming_child1 {
        display: flex;
        flex-direction: column;
        margin-right: 14px;

        .cams {
          display: flex;
          flex-direction: row;
        }
        h1 {
          display: flex;
          margin: 0;
        }
        > div {
          display: flex;
          flex-direction: column;
          align-items: left;

          .child11 {
            display: flex;
            width: 90%;
            align-items: center;
            justify-content: right;
            margin-right: 12px;
            align-items: center;
            cursor: pointer;
            color: #0088ff;
          }
          .data {
            display: flex;
            margin-top: 12px;
            width: 100%;
            padding: 6px;
            background: #e1cdcdb5;
            border-radius: 12px;
            margin-bottom: 7px;

            > div {
              font-size: 1.125rem;
              font-weight: 600;
              font-family: Roboto, sans-serif;
              margin: 0;
              width: 60%;
              display: flex;
              gap: 10px;
              color: rgba(61, 78, 101, 0.84);
              margin-right: 12px;
              h5 {
                margin: 0;
                margin-top: 5px;
                font-size: 18px;
                font-family: Arial, Helvetica, sans-serif;
              }

              img {
                width: 46px;
                display: flex;
                height: 46px;
                justify-content: center;
                text-align: center;
                align-items: center;
              }
              p {
                font-size: 17px;
                font-weight: 400;
                margin: -1px;
                font-family: Arial, Helvetica, sans-serif;
                padding: 0px;
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
  }

  .char:hover {
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
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    height: 18vh;
    .cold {
      padding: 12px;
      width: 25%;
      margin: 9px;
      border-radius: 13px;
      background-color: #bce0ff6b;
      border: 2px solid #bce0ff6b;
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
    .hot {
      padding: 12px;
      width: 25%;
      margin: 9px;
      border-radius: 13px;
      background-color: #bce0ff6b;
      border: 2px solid #bce0ff6b;
      h1 {
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      p {
        font-size: 30px;
        letter-spacing: 2.1px;
        margin: 4px;
        color: #112b4a;
        line-height: 2.1875rem;
      }
    }
    .negative {
      padding: 12px;
      width: 25%;
      margin: 9px;
      border-radius: 13px;
      background-color: #bce0ff6b;
      border: 2px solid #bce0ff6b;
      h1 {
        font-size: 1.125rem;
        font-weight: 600;
        font-family: Roboto, sans-serif;
        letter-spacing: 0;
        color: rgba(61, 78, 101, 0.84);
      }
      p {
        font-size: 30px;
        letter-spacing: 2.1px;
        margin: 4px;
        color: #112b4a;
        line-height: 2.1875rem;
      }
    }
    .Ghost {
      padding: 12px;
      width: 25%;
      margin: 9px;
      border-radius: 13px;
      background-color: #bce0ff6b;
      border: 2px solid #bce0ff6b;
      color: white;
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
  .upcoming1 {
      display: flex;
      flex-direction: column;
      margin-top: 35px;
      padding: 11.5px;
      width: 36%;
      background-color: #f8f9fa!important;  
          box-shadow: 0 0px 2px 0px rgba(0,0,0,0.45) inset;
      h1 {
        font-size: 1.125rem;
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
      .upcomming_child1 {
        display: flex;
        flex-direction: column;
        margin-right: 14px;

        .cams {
          display: flex;
          flex-direction: row;
        }
        h1 {
          display: flex;
          margin: 0;
        }
        > div {
          display: flex;
          flex-direction: column;
          align-items: left;

          .child11 {
            display: flex;
            width: 90%;
            align-items: center;
            justify-content: right;
            margin-right: 12px;
            align-items: center;
            cursor: pointer;
          }
          .data {
            display: flex;
            margin-top: 12px;
            width: 100%;
            padding: 6px;
            background: #e1cdcdb5;
            border-radius: 12px;
            margin-bottom: 7px;

            > div {
              font-size: 1.125rem;
              font-weight: 600;
              font-family: Roboto, sans-serif;
              margin: 0;
              width: 60%;
              display: flex;
              gap: 10px;
              color: rgba(61, 78, 101, 0.84);
              margin-right: 12px;
              h5 {
                margin: 0;
                margin-top: 5px;
                font-size: 18px;
                font-family: Arial, Helvetica, sans-serif;
              }

              img {
                width: 46px;
                display: flex;
                height: 46px;
                justify-content: center;
                text-align: center;
                align-items: center;
              }
              p {
                font-size: 17px;
                font-weight: 400;
                margin: -1px;
                font-family: Arial, Helvetica, sans-serif;
                padding: 0px;
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
`;

