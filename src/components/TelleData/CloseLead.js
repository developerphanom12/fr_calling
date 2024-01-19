import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { EXCHANGE_URLS_ADMIN } from "../URLS";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function CloseLead() {
  const { callStatus = "close_status" } = useParams();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const getColdLead = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(
        `${EXCHANGE_URLS_ADMIN}/callstatuscheck/${callStatus}`,
        axiosConfig
      );
      if (res.status === 200) {
        const formattedApplications = res.data.data.map((app) => ({
          ...app,
          client_data: {
            ...app.client_data,
            call_schedule_date: formatDate(app.client_data.call_schedule_date),
          },
        }));

        setApplications(formattedApplications);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getColdLead();
  }, [callStatus]);

  return (
    <Root>
      <div className="app_table">
        <div className="app_header">
          <div>Tellecaller Name</div>
          <div>Client Name</div>
          <div>Schedule date</div>
          <div>Call Status</div>
          <div>View</div>
        </div>
        {applications.map((application) => (
          <div className="child1" key={application.id}>
            <div>
              <p>
                {" "}
                <span>{application.username}</span>
              </p>
            </div>

            <div>
              <p>
                {" "}
                <span>{application.client_data.client_name}</span>
              </p>
            </div>

            <div>
              <p>
                {" "}
                <span>{application.client_data.call_schedule_date}</span>
              </p>
            </div>
            <div>
              <p>
                {" "}
                <span>{application.client_data.call_status}</span>
              </p>
            </div>
            <div
                  className="iconn"
                  onClick={() => {
                    navigate(`/detailview/${application?.telecaller_id}`);
                  }}
                >
                  <BsFillEyeFill />
                </div>
          </div>
        ))}
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 39vh;

  .app_table {
    display: flex;
    flex-direction: column;
    width: 98%;
    margin: 10px;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background: #5d05abb8;
      text-align: center;
      color: white;

      > div {
        flex: 1;
        border: 1px solid #dee2e6;
        padding: 4px;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 14px;
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
  /* color: red; */
  .child1 {
    display: flex;
    > div {
      flex: 1;
      border: 0.3px solid #fbfbfd;
      text-transform: capitalize;
      background-color: #e7e7e8;
      text-align: center;
      padding: 7px 10px;
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
        margin: 0;
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
    p {
      display: flex;
      font-size: 12px;
      cursor: pointer;
      color: gray;
    }
  }
`;
