import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../URLS";
import axios from "axios";
import { useDispatch } from "react-redux";
import { appDetailsAction } from "../../../redux/users/action";
import { FaRegEdit } from "react-icons/fa";
import cogoToast from "cogo-toast";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const DailyReport = ( { popUser = () => {} }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateStatus, setUpdateStatus] = useState({
    call_status: "",
  });

  const [isPageRefreshed, setPageRefreshed] = useState(false);
  const [isStatusUpdated, setStatusUpdated] = useState(false);

  console.log("datawhy", updateStatus);

  const dispatch = useDispatch();

  const getdata = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  
    try {
      const res = await axios.get(
        `${EXACHANGE_URLS_TELLE}/getMaster?page=${currentPage}`,
        axiosConfig
      );
  
      console.log("data", res);
  
      if (res.status === 200) {
        const responseData = res?.data?.data;
  
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else if (responseData) {
          setData([responseData]);
        }
      } else if (res.status === 404 && res?.data?.error === "No data found for the telecaller.") {
        cogoToast.warn("No data available at this time."); 
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  
  
  const updateStatusOne = async (itemId) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
  
      const res = await axios.put(
        `${EXACHANGE_URLS_TELLE}/dailyreport/${itemId}`,
        updateStatus,
        axiosConfig
      );
  
      if (res?.status === 200) {
        cogoToast.success("Status updated successfully");
        setStatusUpdated(true);
        setUpdateStatus({
          call_status: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        cogoToast.error(err.response.data.error);
      } else {
        console.error("Error updating Status data:", err);
        cogoToast.error(
          "Failed to update Status data. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    getdata();

    const isRefreshed = sessionStorage.getItem('isRefreshed');
    if (isRefreshed) {
      cogoToast.warn("Page refreshed! Please update the status.");
      setPageRefreshed(true);
      sessionStorage.removeItem('isRefreshed');
    }
  }, [currentPage]);

  const handlePassData = (i) => {
    console.log("getDetails1", i);
    dispatch(appDetailsAction(i));
    popUser(true);
  };

  const handleNext = () => {
    if (!isStatusUpdated) {
      cogoToast.warn("Please update the status before moving to the next data.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to submit this data and show the next data?"
    );

    if (isConfirmed) {
      setCurrentPage(currentPage + 1);
      setStatusUpdated(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Root>
      <div className="app_table">
        <div>
          <p className="heading">Daily Report</p>
        </div>
        <div className="app_header">
          <div className="ap1">Client Name </div>
          <div>Company Name</div>
          <div>Call Schedule Date</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        <div>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((i) => (
              <>
                <div
                  key={i.id}
                  className="app_body"
                  onClick={() => {
                    handlePassData(i);
                  }}
                >
                  <div className="cams">{i?.client_name}</div>
                  <div>
                    <p>
                      <span>{i?.company_name}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>{formatDate(i?.callschedule_date)}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>{i?.call_status}</span>
                    </p>

                    <div>
                      <div
                        className="icons"
                        onClick={toggleDropdown}
                        style={{ cursor: "pointer" }}
                      >
                        <FaRegEdit />
                      </div>
                      {isOpen && (
                        <>
                          <select
                            name=""
                            id="languages"
                            onChange={(e) =>
                              setUpdateStatus({ call_status: e.target.value })
                            }
                          >
                            <option value="hot_lead">Hot Lead</option>
                            <option value="cold_lead">Cold Lead</option>
                            <option value="close_status">Close Status</option>
                          </select>
                          <div className="datarefresh">
                            <button onClick={() => updateStatusOne(i.id)}>
                              Done
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>
                      <span>{formatDate(i?.update_date)}</span>
                    </p>
                  </div>
                </div>
                <div className="btn1">
                  <button className="nt2" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </>
            ))
          ) : (
            <div className="no-data-message">
              <p> No data available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </Root>
  );
};


const Root = styled.section`
  display: flex;
  max-width: 100vw;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 230px;
  .app_table {
    /* border: 3px solid #c2b4ce; */
    border-radius: 12px;
    transform: translate(0, -50%);
    padding: 10px;
    width: 80%;
    display: flex;
    flex-direction: column;
    height: 80%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    > div {
      .heading {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 23px;
        margin: 0px;
        padding: 7px;
        margin-bottom: 4px;
        font-weight: 600;
        font-family: fangsong;
      }
    }
  }
  .app_header {
    display: flex;
    background-color: #5d05abb8;
    border: 1px solid #dee2e6;

    > div {
      font-weight: 500;
      display: flex;
      align-items: center;
      border: 1px solid #dee2e6;
      width: 100%;
      color: white;
      padding: 15px;
      justify-content: center;
      text-align: center;
      font-size: 12px;
    }
  }
  .app_body {
    display: flex;
    /* gap: 54px; */
    border-radius: 0px;

    select {
      color: black;
      display: flex;
      border-radius: 7px;
      padding: 3px;
      font-size: 12px;
      font-weight: 500;
      font-family: ui-serif;
    }
    > div {
      border: 1px solid #dee2e6;
      width: 100%;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
      padding: 10px;
      gap: 12px;
      /* height: 5vh; */
    }
    .btnus {
      color: black;
      display: flex;
      background-color: #e7e7e8;
      justify-content: center;
      text-align: center;
      align-items: center;
    }

    .icons {
      color: blue;
      font-size: 19px;
      margin-left: 13px;
    }
  }
  .no-data-message {
    color: red;
    font-family: -webkit-body;
    margin-top: 13px;
    font-size: 21px;
    font-weight: 900;
    padding: 34px;
    margin: 0px;
    p {
      display: flex;
      justify-content: center;
      font-size: 32px;
      margin: 0px;
      font-weight: 900;
    }
  }
  .btn1 {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 10px;
    .nt2 {
      font-size: 18px;
      font-weight: 600;
      padding: 5px 20px;
      color: white;
      border: 1px solid #005aff;
      background: #005aff;
      border-radius: 8px;
      cursor: pointer;
    }
  }
`;
