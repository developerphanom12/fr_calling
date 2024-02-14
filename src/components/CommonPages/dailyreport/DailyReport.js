
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EXACHANGE_URLS_TELLE } from "../../URLS";
import axios from "axios";
import { useDispatch } from "react-redux";
import { appDetailsAction } from "../../../redux/users/action";




const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


export const DailyReport = ({ popUser = () => {} }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        const responseData = res?.data?.data?.data;
  
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else if (responseData) {
          setData([responseData]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    getdata();
  }, [currentPage]);

  const handlePassData = (i) => {
    console.log("getDetails1", i);
    dispatch(appDetailsAction(i));
    popUser(true);
  };
  const handleNext = () => {
    const isConfirmed = window.confirm("Are you sure you want to submit this data and show the next data?");
    
    if (isConfirmed) {
      setCurrentPage(currentPage + 1);
    }
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
        <div className="app_body">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((i) => (
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
                    <span>Hot Client</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span>{formatDate(i?.update_date)}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-message">No data available at this time.</div>
          )}
        </div>
        <div className="btn1">
          <button className="nt2" onClick={handleNext}>
            Next
          </button>
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
    max-width: 40vw;
    width: 100%;
    max-height: 40vh;
    height: 100%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);    > div {
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
      max-width: 13vw;
      color: white;
      height: 5vh;
      justify-content: center;
      text-align: center;
      font-size: 12px;
    }
  }
  .app_body {
    display: flex;
    /* gap: 54px; */
    border-radius: 0px;
    height: 6vh;
    > div {
      border: 1px solid #dee2e6;
      width: 40vw;
      justify-content: center;
      text-align: center;
      align-items: center;
      display: flex;
      height: 5vh
    }
    .btnus {
      color: black;
      display: flex;
      background-color: #e7e7e8;
      justify-content: center;
      text-align: center;
      align-items: center;
    }
    .no-data-message{
      color: red;
    font-family: -webkit-body;
    margin-top: 13px;
    font-size: 21px;
    font-weight: 900;
    }
  }
  .btn1 {
    margin-top: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    .nt2 {
      font-size: 24px;
    width: 101px;
    height: 5vh;
    font-weight: 900;
    padding: 0px;
    color: white;
    border: 1px solid #005aff;
    background: #005aff;
    border-radius: 8px;
    cursor: pointer;
    }
  }
`;

