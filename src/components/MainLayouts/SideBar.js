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
    position: fixed;
    .logo {
      background-color: dodgerblue;
      border-radius: 4px;
      padding: 15px;
      margin: 20px 0px;
      font-weight: 500;
      display: flex;
      cursor: pointer;
      color: #ffffff;
      font-size: 18px;
      p{
        @media (max-width: 699px) {
            display: none;
          }
      }
      svg {
        color: #ffffff;
        font-weight: 600;
        width: 25px;
        height: 25px;
      }
      @media (max-width: 999px) {
        font-size: 18px;
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
      padding-top: 15px;
      height: 100%;
      font-size: 13px;
      padding: 6px;
      position: relative;
      /* top: 20px; */

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
          font-size: small;
          /* padding-top: 10px; */
          @media (max-width: 699px) {
            display: none;
          }
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
