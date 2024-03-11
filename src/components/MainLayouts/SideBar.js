import React from "react";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPersonSearch } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { userCheckAction, setOtpVerified } from "../../redux/users/action";
import { IoMdCall } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { ImDatabase } from "react-icons/im";
import { TbFileReport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userCheckAction(false));
    dispatch(setOtpVerified(false));
    localStorage.removeItem('token')
    cogoToast.success("Logout Successfully");
    navigate("/allpages");
  };

  const userCheck = useSelector((state) => state?.users?.userCheck);
  const userDetails = useSelector((state) => state?.users.user);
  const currentUrl = window.location.href;
  const activeParam = currentUrl.replace("?", "/").split("/")[3];
 const token = localStorage.getItem('token')

  return (
    <Root>
      {(userCheck && token && setOtpVerified) &&  (
        <div className="menu_top">
          <div
            className="logo"
            onClick={() => {
              handleLogout();
            }}
          >
            <IoMdCall />
            <p>TeleCaller</p>
          </div>
          <div className="nav_section">
            {userDetails.role === "admin" ? (
              <>
                <div
                  className={activeParam === "dashboardd" ? "active" : ""}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <FaHome />
                  <p>Dashboard</p>
                </div>

                <div
                  className={activeParam === "history" ? "active" : ""}
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  {<MdWorkHistory />}
                  <p>Client History</p>
                </div>

                <div
                  className={activeParam === "listalltelle" ? "active" : ""}
                  onClick={() => {
                    navigate("/listalltelle");
                  }}
                >
                  <FaRegUser />
                  <p>Tellecaller List</p>
                </div>

                <div
                  className={activeParam === "mastersheet" ? "active" : ""}
                  onClick={() => {
                    navigate("/mastersheet");
                  }}
                >
                  <ImDatabase />
                  <p>MasterSheet</p>
                </div>

                <div
                  className={activeParam === "negativelead" ? "active" : ""}
                  onClick={() => {
                    navigate("/negativelead");
                  }}
                >
                  <TbFileReport />
                  <p>Negative Lead</p>
                </div>
              </>
            ) : (
              ""
            )}

            {userDetails.role === "telecaller" ? (
              <>
                <div
                  className={activeParam === "studash" ? "active" : ""}
                  onClick={() => {
                    navigate("/studash");
                  }}
                >
                  <FaHome />
                  <p>Dashboard</p>
                </div>
                <div
                  className={activeParam === "clientdata" ? "active" : ""}
                  onClick={() => {
                    navigate("/clientdata");
                  }}
                >
                  {<MdPersonSearch />}
                  <p>Add Cleint Data</p>
                </div>
                <div
                  className={activeParam === "history" ? "active" : ""}
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  {<MdWorkHistory />}
                  <p>Client History</p>
                </div>

                <div
                  className={activeParam === "dailyreport" ? "active" : ""}
                  onClick={() => {
                    navigate("/dailyreport");
                  }}
                >
                  <TbReportMedical />
                  <p>Daily Report</p>
                </div>

                <div
                  className={activeParam === "telenegativelead" ? "active" : ""}
                  onClick={() => {
                    navigate("/telenegativelead");
                  }}
                >
                  <TbFileReport />
                  <p>Negative Lead</p>
                </div>
              </>
            ) : (
              ""
            )}

            <div
              className="logout"
              onClick={() => {
                handleLogout();
              }}
            >
              <FiLogOut />
              <p>Logout</p>
            </div>
          </div>
        </div>
      )}
    </Root>
  );
}


const Root = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 100vh;
  color: black;
  background-image: linear-gradient(to right, #3a1864, #623084, #461c6c);
  font-family: "Roboto", sans-serif;
  overflow: hidden;

  .menu_top {
    display: flex;
    flex-direction: column;
    position: fixed;
    .logo {
      background-image: linear-gradient(to right #120422);
      border-radius: 4px;
      padding: 15px;
      margin: 20px 0px;
      font-weight: 500;
      display: flex;
      cursor: pointer;
      color: #ffffff;
      font-size: 18px;
      p {
        @media (max-width: 699px) {
          display: none;
        }
      }
      svg {
        color: #ffffff;
        font-weight: 600;
        width: 20px;
        height: 20px;
      }
      @media (max-width: 999px) {
        font-size: 14px;
        margin: 10px 0px;
        padding: 10px;

        svg {
          color: #ffffff;
          font-weight: 600;
          width: 30px;
          height: 30px;
        }
      }
    }
    .nav_section {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 30px;
      font-size: 13px;
      padding: 6px 6px 6px 1px;
      position: relative;

      > div {
        display: flex;
        color: white;
        gap: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        align-items: center;
        &:hover {
          cursor: pointer;
        }

        p {
          font-size: 13px;
          margin: 2px;
          @media (max-width: 699px) {
            display: none;
          }
        }
        svg {
          width: 22px;
          height: 22px;
        }
      }
      .active {
        color: #1e0945;
        background: #fff;
        padding: 4px;
      }
    }
  }
`;

