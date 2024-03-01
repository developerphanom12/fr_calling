import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { appDetailsAction, openModal } from "../../../../redux/users/action";
import { EXCHANGE_URLS_ADMIN } from "../../../URLS";
import Updateapi from "./editpages/CaDataUpdateapi";
import Postapi from "./editpages/CAdataPostapi";
import Callstatus from "./editpages/Callstatus";
import { FaPen } from "react-icons/fa";
import OtherStatusUpdate from "./editpages/OtherStatusUpdate";
import UpdateOtherStatus from "./editpages/UpdateOtherStatus";
import { LuPlus } from "react-icons/lu";
import Appointment from "./editpages/Appointment";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ClientHistory({ popUser = () => {} }) {
  const [applications, setApplications] = useState([]);
  const [uniqueClientNames, setUniqueClientNames] = useState([]);
  const [selectedTele, setSelectedTele] = useState("");
  const dispatch = useDispatch();

  const { modalIsOpen, modalType } = useSelector((state) => state?.users);

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  };

  const [selectedCd, setSelectedCd] = useState(null);
  const handleAddButtonClick = (cd) => {
    setSelectedCd(cd);
    handleOpenModal("postapi");
  };

  const [selectedCA, setSelectedCA] = useState(null);
  const handleAddButtonClickca = (ca_id) => {
    setSelectedCA(ca_id);
    handleOpenModal("updateapi");
  };

  const handleAddButtonClickStatus = (cd) => {
    setSelectedCd(cd);
    handleOpenModal("callstatus");
  };

  const [selectedOtherStatus, setSelectedUpdateStatus] = useState(null);
  const handleAddButtonClickOtherStatus = (status_id) => {
    setSelectedUpdateStatus(status_id);
    handleOpenModal("updatecallstatus");
  };

  const [selectedss, setSelectedOther] = useState(null);
  const handleAddButtonClickOther = (cd) => {
    setSelectedOther(cd);
    handleOpenModal("otherstatus");
  };

  const handleAddButtonClickAppointment = (cd) => {
    setSelectedOther(cd);
    handleOpenModal("appointment");
  };

  const renderModalContent = () => {
    console.log("Modal_Type", modalType);
    switch (modalType) {
      case "updateapi":
        return <Updateapi ca_id={selectedCA} />;
      case "postapi":
        return <Postapi cd={selectedCd} />;

      case "callstatus":
        return <Callstatus cd={selectedCd} />;

      case "updatecallstatus":
        return <UpdateOtherStatus status_id={selectedOtherStatus} />;

      case "otherstatus":
        return <OtherStatusUpdate cd={selectedss} />;

      case "appointment":
        return <Appointment cd={selectedss} />;

      default:
        return null;
    }
  };
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
                    <p>{i?.client_name}</p>
                  </p>
                  <p>
                    <h4> Email: </h4>
                    <p>{i?.client_email}</p>
                  </p>
                  <p>
                    <h4> Phone Number: </h4>
                    <p>{i?.client_phonenumber}</p>
                  </p>
                  <p>
                    <h4> Company Address: </h4>
                    <p>{i?.client_companyaddress}</p>
                  </p>

                  <p>
                    <h4> Company Name: </h4>
                    <p>{i?.company_name}</p>
                  </p>

                  <p>
                    <h4> Company Constitution: </h4>
                    <p>{i?.company_constitution}</p>
                  </p>

                  <p>
                    <h4> Industry Type: </h4>
                    <p>{i?.industry_type}</p>
                  </p>
                </div>
                <div className="statusdata">
                  <p>
                    <h4> CA Name: </h4>
                    <p>{i?.ca?.ca_name}</p>
                  </p>
                  <p>
                    <h4> CA PhoneNumber: </h4>
                    <p>{i?.ca?.ca_number}</p>
                  </p>
                  <p>
                    <h4> CA Accountant Name: </h4>
                    <p>{i?.ca?.ca_accountant_name}</p>
                  </p>
                  <p>
                    <h4>CA Accountant Number: </h4>
                    <p>{i?.ca?.ca_accountant_number}</p>
                  </p>
                  <p>
                    <h4>CA Company Name: </h4>
                    <p>{i?.ca?.ca_company_name}</p>
                  </p>
                  <p>
                    <h4> Company Address: </h4>
                    <p>{i?.ca?.company_address}</p>
                  </p>
                  <div className="edit">
                    {i?.ca &&
                    Object.values(i.ca).some((value) => value !== null) ? (
                      <button
                        className="editbutton"
                        onClick={() => {
                          handleAddButtonClickca(i.ca.ca_id); // Pass ca_id to the function
                        }}
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>
                  <div className="edit">
                    {i?.ca &&
                    Object.values(i.ca).every((value) => value === null) ? (
                      <button onClick={() => handleAddButtonClick(i.cd)}>
                        Add
                      </button>
                    ) : null}
                  </div>
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

                      <button
                        className="editbutton"
                        onClick={() => {
                          handleAddButtonClickAppointment(i.cd);
                        }}
                      >
                        <FaPen />
                      </button>
                    </p>
                  </p>
                  <p>
                    <h4>Call Date: </h4>
                    <p>{i?.call_date ? formatDate(i?.call_date) : "No Date"}</p>
                  </p>
                </div>
                <div className="statusdatas">
                  <p>
                    <div>
                      <h4>First Status: </h4>
                    </div>
                    <div>
                      <p>{i?.call_status}</p>
                      <p>Update On:{formatDate(i?.created_at)}</p>
                      <button
                        className="editbutton"
                        onClick={() => {
                          handleAddButtonClickStatus(i.cd);
                        }}
                      >
                        <FaPen />
                      </button>
                    </div>
                  </p>

                  {i.statuss && i.statuss.length >= 0 ? (
                    <>
                      <p>
                        <h4>Second Status: </h4>{" "}
                        {i.statuss[0]?.call_status ? (
                          <>
                            <div>
                              <p>{i.statuss[0].call_status}</p>

                              <p>
                                {" "}
                                Update On :
                                {isNaN(Date.parse(i.statuss[0].update_dates))
                                  ? "No Data"
                                  : formatDate(i.statuss[0].update_dates)}
                              </p>

                              <button
                                className="editbutton"
                                onClick={() => {
                                  handleAddButtonClickOtherStatus(
                                    i.statuss[0]?.status_id
                                  );
                                }}
                              >
                                <FaPen />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>No Data</p>
                            <button
                              className="editbutton"
                              onClick={() => {
                                handleAddButtonClickOther(i.cd);
                              }}
                            >
                              <LuPlus />
                            </button>
                          </>
                        )}
                      </p>
                      <p>
                        <h4>Third Status: </h4>{" "}
                        {i.statuss[1]?.call_status ? (
                          <>
                            <div>
                              <p>{i.statuss[1].call_status}</p>
                              <p>
                                {" "}
                                Update On :
                                {isNaN(Date.parse(i.statuss[1].update_dates))
                                  ? "No Data"
                                  : formatDate(i.statuss[0].update_dates)}
                              </p>
                              <button
                                className="editbutton"
                                onClick={() => {
                                  handleAddButtonClickOtherStatus(
                                    i.statuss[1]?.status_id
                                  );
                                }}
                              >
                                <FaPen />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="flexi">
                            <p>No Data</p>
                            <button
                              className="editbutton1"
                              onClick={() => {
                                handleAddButtonClickOther(i.cd);
                              }}
                            >
                              <LuPlus />
                            </button>
                          </div>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <h4>Second Status: </h4> <p>No data</p>
                      </p>
                      <p>
                        <h4>Third Status: </h4> <p>No data</p>
                      </p>
                    </>
                  )}
                </div>

                <div className="statusdata11">
                  <p>
                    <h4>Tellecaller Name:</h4> <p>{i?.user?.username}</p>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {modalIsOpen && <div className="open_page">{renderModalContent()}</div>}
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
  .open_page {
    z-index: 1000;
    position: fixed;
    top: 0px;
    left: 1px;
    width: 100%;
    backdrop-filter: blur(2px);
  }
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
    font-family: "Roboto", "sana-serif";
    .app_header {
      display: flex;
      background: #5d05abb8;
      text-align: center;
      color: white;
      width: 136vw;
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
          width: 96%;
          align-items: center;
          font-size: 14px;

          button {
            border: none;
            font-size: 19px;
            color: #5d05abb8;
          }
          h4 {
            margin: 9px 0px;
            color: #000;
            width: 100%;
          }
        }

        .edit {
          display: flex;
          width: 100%;
          justify-content: right;

          button {
            width: 22%;
            padding: 0px;
            height: 100%;
            padding: 3px;
            font-size: 20px;
            border-radius: 9px;
            cursor: pointer;
            margin-right: 8px;
            font-family: sans-serif;
            font-weight: 500;
            background: #5d05abb8;
            color: white;
            border: 2px solid #5d05abb8;
          }
        }
      }
      .statusdatas {
        display: flex;
        flex-direction: column;
        gap: 2px;
        p {
          display: flex;
          justify-content: center;
          flex-direction: column;
          /* width: 87%; */
          font-size: 14px;
          > div {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
          }
          h4 {
            margin: 0px;
            color: #000;
            /* width: 100%; */
          }

          .editbutton {
            font-size: 17px;
            border: none;
            color: #5d05abb8;
            background-color: #fff;
          }
        }

        .edit {
          display: flex;
          width: 100%;
          justify-content: right;

          button {
            width: 22%;
            padding: 0px;
            height: 100%;
            padding: 3px;
            font-size: 20px;
            border-radius: 9px;
            cursor: pointer;
            margin-right: 8px;
            font-family: sans-serif;
            font-weight: 500;
            background: #5d05abb8;
            color: white;
            border: 2px solid #5d05abb8;
          }
        }

        .flexi {
          display: flex;
          button {
            font-size: 26px;
            border: none;
            color: #5d05abb8;
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
          h4 {
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
          padding: 5px;
          h4 {
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
