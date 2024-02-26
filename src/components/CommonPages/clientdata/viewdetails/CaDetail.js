import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import { useNavigate, useParams } from "react-router-dom";
import cogoToast from "cogo-toast";

export default function CaDetail({ detail }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    clientid: detail.cd.toString(),
    ca_name: null,
    ca_number: null,
    ca_accountant_name: null,
    ca_company_name: null,
    ca_accountant_number: null,
    company_address: null,
  });

  let { ca_id } = useParams();
  console.log("iddd", ca_id);

  let { cd } = useParams();
  console.log("ccdddiddd", cd);

  const postApiData = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const requestData = Object.fromEntries(
        Object.entries(update).filter(([key, value]) => value !== null)
      );

      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/cadataAdd`,
        requestData,
        axiosConfig
      );

      if (res?.status === 201) {
        navigate("/studash");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        cogoToast.error(err.response.data.error);
      } else {
        console.log("err", err);
      }
    }
  };

  // const handleSubmit = () => {
  //   postApiData();
  // };
  const handleEditClick = () => {
    setIsEditing(true);
    setUpdate({
      clientid: detail.cd.toString(),
      ca_name: null,
      ca_number: null,
      ca_accountant_name: null,
      ca_company_name: null,
      ca_accountant_number: null,
      company_address: null,
    });
  };
  const handleDoneClick = () => {
    setIsEditing(false);
    postApiData();
  };
  return (
    <Root>
      <h4>Application : {detail?.cadetails?.ca_id}</h4>
      <div className="app_table">
        <div className="app_header">
          <div>CA Name</div>
          <div>CA PhoneNumber</div>
          <div>CA Accountant Name</div>
          <div>CA Company Name</div>
          <div>CA Accountant Number</div>
          <div>Company Address</div>
        </div>
        {detail?.cadetails &&
        Object.values(detail.cadetails).every((val) => val === null) ? (
          <div className="app_body">
            <div>
              <input
                type="text"
                value={update?.ca_name}
                onChange={(e) => {
                  setUpdate({ ...update, ca_name: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="number"
                value={update?.ca_number}
                onChange={(e) => {
                  setUpdate({ ...update, ca_number: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="text"
                value={update?.ca_accountant_name}
                onChange={(e) => {
                  setUpdate({
                    ...update,
                    ca_accountant_name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <input
                type="text"
                value={update?.ca_company_name}
                onChange={(e) => {
                  setUpdate({ ...update, ca_company_name: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="number"
                value={update?.ca_accountant_number}
                onChange={(e) => {
                  setUpdate({
                    ...update,
                    ca_accountant_number: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <input
                type="text"
                value={update?.company_address}
                onChange={(e) => {
                  setUpdate({
                    ...update,
                    company_address: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="app_body">
            <div>
              <p>{detail?.cadetails?.ca_name}</p>
            </div>
            <div>
              <p>{detail?.cadetails?.ca_number}</p>
            </div>
            <div>
              <p>{detail?.cadetails?.ca_accountant_name}</p>
            </div>
            <div>
              <p>{detail?.cadetails?.ca_company_name}</p>
            </div>
            <div>
              <p>{detail?.cadetails?.ca_accountant_number}</p>
            </div>
            <div>
              <p>{detail?.cadetails?.company_address}</p>
            </div>
          </div>
        )}
      </div>
      {/* <div>
          <button onClick={handleSubmit}>Edit</button>
        </div> */}
      <div>
        {isEditing ? (
          <button onClick={handleDoneClick}>Done</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;

  .app_table {
    display: flex;
    flex: 1;
    justify-content: center;
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      flex-direction: column;
      width: 24%;
      text-align: center;
      color: black;
      > div {
        flex: 1;
        padding: 15px;
        border: 1px solid #dee2e6;
        font-size: 14px;
        align-items: center;
        display: flex;
      }
    }
    .app_body {
      display: flex;
      flex-direction: column;
      font-family: "Roboto", sans-serif;

      > div {
        flex: 1;
        display: flex;
        border: 1px solid #dee2e6;
        text-transform: capitalize;
        align-items: center;
        padding: 10px;
        input {
          border: none;
          outline: solid 2px white;
        }

        p {
          font-weight: 500;
          font-size: 12px;
          @media (max-width: 789px) {
            font-size: 10px;
          }
        }
      }
    }
  }
  > div {
    display: flex;
    justify-content: center;
    button {
      margin: 5px;
      padding: 7px 20px;
      border: none;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      border-radius: 10px;
      background-color: #63276f;
    }
  }
`;
