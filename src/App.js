import { Route, Routes } from "react-router-dom";
import Layout from "./components/MainLayouts/Layout";
import PageNF from "./components/PageNF";
import AllPages from "./components/CommonPages/HomePages/AllPages";
import { useSelector } from "react-redux";
import EmployLogin from "./components/CommonPages/loginpages/Tellelogin";
import Employerlogin from "./components/CommonPages/loginpages/AdminLogin";
import EmployeeSign from "./components/CommonPages/clientdata/ClientData";
import Dashboard from "./components/Dashboard";
import TelleRegister from "./components/CommonPages/clientdata/TellecallerRegiter";
import ClientHistory from "./components/CommonPages/clientdata/ClientHistory";
import Telledata from "./components/CommonPages/admin/ListAllTellecaller";

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const userDetails = useSelector((state) => state?.users.user);
  const token = localStorage.getItem("token");
  console.log("role",  userDetails?.role)
  return (
    <Layout>
      <Routes>
        {userCheck && token ? (
          <>
       
       
            {userDetails?.role === "telecaller" ? (
              <>
              <Route path="/dashboard"element={<Dashboard/>} />
             <Route path="/applications" element={<EmployeeSign />} />
             <Route path="/history" element={<ClientHistory />} />


              </>
            ) : userDetails?.role === "admin" ? (
              <>
              <Route path="/dashboard"element={<Dashboard/>} />
                <Route path="/applications" element={<EmployeeSign />} />
                <Route path="/history" element={<ClientHistory />} />
                <Route path="/telleRegister" element={<TelleRegister />} />
                <Route path="/listalltelle" element={<Telledata/>} />
     
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Route path="*" element={<PageNF />} />
            <Route path="/employlogin" element={<EmployLogin />} />
            <Route path="/employerlogin" element={<Employerlogin />} />
            <Route path="/" element={<AllPages />} />
            <Route path="/allpages" element={<AllPages />} />
          </>
        )}


        
      </Routes>
    </Layout>
  );
}

export default App;
