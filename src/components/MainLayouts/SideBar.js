import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPersonSearch } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { userCheckAction } from "../../redux/users/action";

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
         TeleCaller 
        </div>

        <div className="nav_section">
          {userDetails.role === "admin" ? (
            <>
              <div
                className={activeParam === "dashboardd" ? "active" : ""}
                onClick={() => {
                  navigate("/dashboardd");
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

              <div className={activeParam === "telleRegister" ? "active" : ""}
               onClick={ () =>{
                navigate("/telleRegister")
               }} 
               >
                {<MdPersonSearch/>}
                <p>Add Tellecaller</p>
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
                <p>Application History</p>
              </div>
              <div
                className={activeParam === "action" ? "active" : ""}
                onClick={() => {
                  navigate("/latestupdates");
                }}
              >
                {<MdPersonSearch />}
                <p>Latest Updates</p>
              </div>
              <div
                className={activeParam === "ugrequire" ? "active" : ""}
                onClick={() => {
                  navigate("/ugrequire");
                }}
              >
                {<MdPersonSearch />}
                <p>UG Entry Requirement</p>
              </div>
              <div
                className={activeParam === "pgrequire" ? "active" : ""}
                onClick={() => {
                  navigate("/pgrequire");
                }}
              >
                {<MdPersonSearch />}
                <p>PG Entry Requirement</p>
              </div>
              <div
                className={activeParam === "urm" ? "active" : ""}
                onClick={() => {
                  navigate("/urm");
                }}
              >
                {<FaUniversity />}
                <p>URM university</p>
              </div>
              {/* <div
                className={activeParam === "search" ? "active" : ""}
                onClick={() => {
                  navigate("/search");
                }}
              >
                {<MdSearch />}
                <p>Search Course</p>
              </div> */}
              <div
                className={activeParam === "listcourses" ? "active" : ""}
                onClick={() => {
                  navigate("/listcourses");
                }}
              >
                {<MdPersonSearch />}
                <p>Courses List</p>
              </div>
            </>
          ) : (
            ""
          )}

          {userDetails.role === "university" ? (
            <>
              <div
                className={activeParam === "unidash" ? "active" : ""}
                onClick={() => {
                  navigate("/unidash");
                }}
              >
                <FaHome />
                <p>Dashboard</p>
              </div>
              <div
                className={activeParam === "uniaddcourses" ? "active" : ""}
                onClick={() => {
                  navigate("/uniaddcourses");
                }}
              >
                {<MdPersonSearch />}
                <p>Add New Courses</p>
              </div>
              <div
                className={activeParam === "ugrequire" ? "active" : ""}
                onClick={() => {
                  navigate("/ugrequire");
                }}
              >
                {<MdPersonSearch />}
                <p>UG Entry Requirement</p>
              </div>
              <div
                className={activeParam === "pgrequire" ? "active" : ""}
                onClick={() => {
                  navigate("/pgrequire");
                }}
              >
                {<MdPersonSearch />}
                <p>PG Entry Requirement</p>
              </div>
              <div
                className={activeParam === "listcourses" ? "active" : ""}
                onClick={() => {
                  navigate("/listcourses");
                }}
              >
                {<MdPersonSearch />}
                <p>Courses List</p>
              </div>
            </>
          ) : (
            ""
          )}

          {userDetails.role === "admin" ? (
            <>
              <div
                className={activeParam === "action" ? "active" : ""}
                onClick={() => {
                  navigate("/action");
                }}
              >
                {<MdPersonSearch />}
                <p>Action</p>
              </div>
              <div
                className={activeParam === "createstaff" ? "active" : ""}
                onClick={() => {
                  navigate("/createstaff");
                }}
              >
                {<MdPersonSearch />}
                <p>Create Staff</p>
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
  font-family: "Roboto", sans-serif;
  position: sticky;
  top: 0px;

  .menu_top {
    display: flex;
    flex-direction: column;
    .company_logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0px 8px 0px;

      img {
        width: 100%;
        padding: 4px;
        cursor: pointer;
      }
    }
    .nav_section {
      display: flex;
      flex-direction: column;
      padding-top: 15px;
      height: 100%;
      gap: 20px;
      font-size: 13px;
      padding: 6px;
      position: relative;
      top: 20px;
      &:hover{
        gap: 10px;
      }

      > div {
        display: flex;
        width: 100%;
        gap: 5px;
        border-radius: 10px;
        align-items: center;
        &:hover {
          cursor: pointer;
        }

        p {
          display: none;
          font-size: small;
          padding-top: 10px;
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
      &:hover {
        display: flex;
      }
    }
  }
  &:hover {
    .nav_section > div > p {
      display: block;
      gap: 0px;
      padding-top: 2px;
    }
  }
`;