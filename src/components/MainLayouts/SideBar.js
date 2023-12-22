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
const logo = require("../images/logo_final_web (1).webp");
export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    localStorage.setItem("token", "");
    dispatch(userCheckAction(false));
    cogoToast.success("Logout Successfully");
    navigate("/home");
  };

  const userDetails = useSelector((state) => state?.users.user);
  const currentUrl = window.location.href;
  console.log("currenturul",currentUrl)
  const activeParam = currentUrl.replace("?", "/").split("/")[3];

  console.log("activeparam", activeParam);

  return (
    <Root>
      <div className="menu_top">
        <div
          className="company_logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="img" />
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
              {/* <div
                className={activeParam === "applications" ? "active" : ""}
                onClick={() => {
                  navigate("/applications");
                }}
              >
                {<MdPersonSearch />}
                <p>Add Cleint Data</p>
              </div> */}
              <div
                className={activeParam === "history" ? "active" : ""}
                onClick={() => {
                  navigate("/history");
                }}
              >
                {<MdWorkHistory />}
                <p>Client History</p>
              </div>

              {/* <div className={activeParam === "telleRegister" ? "active" : ""}
               onClick={ () =>{
                navigate("/telleRegister")
               }} 
               >
                {<MdPersonSearch/>}
                <p>Add Tellecaller</p>
               </div>    */}

              <div
                className={activeParam === "dashboardd" ? "active" : ""}
                onClick={() => {
                  navigate("/listalltelle");
                }}
              >
                <FaRegUser />
                <p>Tellecaller List</p>
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
                className={activeParam === "applications" ? "active" : ""}
                onClick={() => {
                  navigate("/applications");
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
  background-color: #0088ff;
  font-family: "Roboto", sans-serif;
  overflow: hidden;
  .menu_top {
    display: flex;
    flex-direction: column;
    .company_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      /* padding: 8px 0px 8px 0px; */

      img {
        width: 100%;
        padding: 0px 4px;
        cursor: pointer;
      }
    }
    .nav_section {
      display: flex;
      flex-direction: column;
      padding-top: 15px;
      height: 100%;
      /* gap: 20px; */
      font-size: 13px;
      padding: 6px;
      position: relative;
      top: 20px;

      > div {
        display: flex;
        /* width: 100%; */
        margin-top: 33px;
        color: white;
        gap: 5px;
        border-radius: 10px;
        align-items: center;
        &:hover {
          cursor: pointer;
        }

        p {
          /* display: none; */
          font-size: small;
          /* padding-top: 10px; */
        }
        svg {
          width: 25px;
          height: 25px;
        }
      }
      .active {
        color: white;
        background: #000080;
        padding: 4px;
      }
    }
  }
`;