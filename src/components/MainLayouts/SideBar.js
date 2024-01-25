import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPersonSearch } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { userCheckAction } from "../../redux/users/action";
import { IoMdCall } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { ImDatabase } from "react-icons/im";

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    localStorage.setItem("token", "");
    dispatch(userCheckAction(false));
    cogoToast.success("Logout Successfully");
    navigate("/allpages");
  };

  const userDetails = useSelector((state) => state?.users.user);
  const currentUrl = window.location.href;
  console.log("currenturul", currentUrl);
  const activeParam = currentUrl.replace("?", "/").split("/")[3];

  console.log("activeparam", activeParam);

  return (
    <Root>
      <div className="menu_top">
        <div
          className="logo"
          onClick={() => {
            handleLogoutClick();
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
                className={activeParam === "sharedata" ? "active" : ""}
                onClick={() => {
                  navigate("/sharedata");
                }}
              >
                <FaShareAlt />
                <p>Share Data</p>
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
                className={activeParam === "refrencedata" ? "active" : ""}
                onClick={() => {
                  navigate("/refrencedata");
                }}
              >
                {<MdWorkHistory />}
                <p>Refrence Data</p>
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
            </>
          ) : (
            ""
          )}

          <div
            className="logout"
            onClick={() => {
              handleLogoutClick();
            }}
          >
            <FiLogOut />
            <p>Logout</p>
          </div>
        </div>
      </div>
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
  background-image:  linear-gradient(to right, #3a1864, #623084 ,#461c6c);
  font-family: "Roboto", sans-serif;
  overflow: hidden;

  .menu_top {
    display: flex;
    flex-direction: column;
    position: fixed;
    .logo {
      background-image: linear-gradient(to right #120422 ) ;
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
          font-size: small;
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
