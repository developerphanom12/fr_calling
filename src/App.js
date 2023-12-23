import { Route, Routes } from "react-router-dom";
import Layout from "./components/MainLayouts/Layout";
import PageNF from "./components/PageNF";
import AllPages from "./components/CommonPages/HomePages/AllPages";
import { useSelector } from "react-redux";
import Tellelogin from "./components/CommonPages/loginpages/Tellelogin";
import Employerlogin from "./components/CommonPages/loginpages/AdminLogin";
import Dashboard from "./components/Dashboard";
import TellecallerRegister from "./components/CommonPages/clientdata/TellecallerRegiter";
import ClientHistory from "./components/CommonPages/clientdata/ClientHistory";
import ListAllTellecaller from "./components/CommonPages/admin/ListAllTellecaller";
import ClientData from "./components/CommonPages/clientdata/ClientData";

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
             <Route path="/clientdata" element={<ClientData />} />


              </>
            ) : userDetails?.role === "admin" ? (
              <>
              <Route path="/dashboard"element={<Dashboard/>} />
                <Route path="/history" element={<ClientHistory />} />
                <Route path="/telleRegister" element={<TellecallerRegister />} />
                <Route path="/listalltelle" element={<ListAllTellecaller/>} />
     
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Route path="*" element={<PageNF />} />
            <Route path="/employlogin" element={<Tellelogin />} />
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
