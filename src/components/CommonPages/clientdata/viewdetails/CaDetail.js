import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../../URLS";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function CaDetail({ detail }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    ca_name: "",
    ca_number: "",
    ca_accountant_name: "",
    ca_company_name: "",
    ca_accountant_number: "",
    company_address: "",
  });

  let { ca_id } = useParams();
  console.log("iddd", ca_id);

  const postApiData = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.post(
        `${EXACHANGE_URLS_TELLE}/cadataAdd`,
        update,
        axiosConfig
      );
      if (res?.status === 201) {
        navigate("/studash");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const updateApiData = async () => {
    try {
      const axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const id = detail?.cadetails?.ca_id;
      console.log("datatatatatta",id)
      const res = await axios.put(
        `${EXACHANGE_URLS_TELLE}/updateadetail/${id}`,
        update,
        axiosConfig
      );
      console.log("ressponnse", res);
      if (res?.status === 200) {
        navigate("/studash");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleSubmit = () => {
    postApiData();
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDoneEditing = () => {
    setIsEditing(false);
    updateApiData();
  }; 

  return (
    <Root>
      <h4>Application : {detail?.cadetails?.ca_id}</h4>
      <div className="edit_button_div">
        <button onClick={isEditing ? handleDoneEditing : handleEditClick}>
          {isEditing ? "Done Editing" : "Edit"}
          <HiOutlinePencilSquare />
        </button>
      </div>
      <div className="app_table">
        <div className="app_header">
          <div>CA Name</div>
          <div>CA PhoneNumber</div>
          <div>CA Accountant Name</div>
          <div>CA Company Name</div>
          <div>CA Accountant Number</div>
          <div>Company Address</div>
        </div>

        {detail?.cadetails && detail?.cadetails ? (
          <div className="app_body">
            {isEditing ? (
              <>
                <div>
                  <input
                    type="text"
                    value={update.ca_name}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        ca_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={update.ca_number}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        ca_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={update.ca_accountant_name}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        ca_accountant_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={update.ca_company_name}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        ca_company_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={update.ca_accountant_number}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        ca_accountant_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={update.company_address}
                    onChange={(e) =>
                      setUpdate({
                        ...update,
                        company_address: e.target.value,
                      })
                    }
                  />
                </div>
               
              </>
            ) : (
              <>
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
               
              </>
            )}
          </div>
        ) : (
          <>
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
            <div>
              <button onClick={handleSubmit}>submit</button>
            </div>
          </>
        )}
      </div>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  .edit_button_div {
    display: flex;
    justify-content: center;
    button {
      background: none;
      border: none;
      color: #63276f;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      font-size: 15px;
      svg {
        width: 20px;
        height: 20px;
        padding-left: 5px;
      }
    }
  }
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
    > div {
      button {
        margin: 5px;
        padding: 10px;
        border: none;
        color: #ffffff;
        border-radius: 10px;
        background-color: #63276f;
      }
    }
  }
`;
