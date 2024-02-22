import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import ClientMainchart from "./ClientMainchart";
import CLientMainchart2 from "./ClientMainchart2";
import { TfiMenu } from "react-icons/tfi";
import { EXCHANGE_URLS_ADMIN } from "../../URLS";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TelleData from "../../TelleData/TelleData";
import data from "../../images/nodatra.png";
import imgofshilpa from "../../images/client-1295901_1280.webp";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ClientDashboard() {
  const [week, weekCount] = useState([]);

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

      <div className="dailydata">
        {/* <div className="datacalss">
        <h1> Calls Data</h1>
       </div>
       <div className="datacalss">
        <h1> Calls Data</h1>
       </div>
    */}
      </div>

      <div className="chart1">
        <div className="upcoming">
          <div className="div1">
            <p className="none">Total Lead</p>
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
                    <img width="40px" src={imgofshilpa} alt="img" />
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
  margin-top: 12px;
  padding: 16px;
  flex-wrap: wrap;
  justify-content: space-between;

  /* p {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    letter-spacing: 0;
    color: rgba(61, 78, 101, 0.84);
    margin-top: 50px;
    margin-left: 13px;
  } */

  .chartmain {
    display: flex;
    margin-top: 23px;
    justify-content: space-between;
    .char1 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 7px;
      width: 38%;
      border-radius: 1px;
      background-color: #f8f9fa !important;
      box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.45) inset;
      height: 56vh;
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
      margin-right: 34px;
      background-color: #f8f9fa !important;
      box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.45) inset;
    }
  }
  .chart1 {
    display: flex;
    justify-content: space-around;
    margin-top: 23px;

    .upcoming {
      display: flex;
      flex-direction: column;
      width: 45%;
      margin-top: 35px;
      padding: 9px;
      border-radius: 5px;
      background-color: #f8f9fa !important;
      box-shadow: 1px 1px 5px 1px lightgray;
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
          .p1 {
            border: 2px solid #4b2079;
            border-radius: 20px;
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
            background: #4b2079;
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
      border-radius: 5px;
      box-shadow: 1px 1px 5px 1px lightgray;
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
      .upcomming_child1_div {
        display: flex;
        margin-right: 14px;
        overflow-y: scroll;
        overflow-x: hidden;
        .data22 {
          margin: 12px;
        }

        .data_div {
          display: flex;
          padding: 6px;
          border-radius: 12px;
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
              width: 40px;
              height: 40px;
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
        > div {
          display: flex;
          justify-content: center;
          text-align: center;
          /* flex-direction: column; */
          align-items: center;
          text-align: center;
          width: 100%;
          height: 100%;
          img {
            width: 74px;
            height: 64px;
            margin-top: 74px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }
      }
    }
  }

  .char:hover {
  }

  /* p {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Roboto, sans-serif;
    letter-spacing: 0;
    color: rgba(61, 78, 101, 0.84);
    margin-top: 50px;
  } */
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
   
  .dailydata {
    background-color: red;
    display: flex;
    .datacalss {
      display: flex;
      flex-direction: column;
      width: 20%;
    }
  }
`;
