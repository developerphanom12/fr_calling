import { Route, Routes } from "react-router-dom";
import Layout from "./components/MainLayouts/Layout";
import PageNF from "./components/PageNF";
import AllPages from "./components/CommonPages/HomePages/AllPages";
import { useSelector } from "react-redux";
import Tellelogin from "./components/CommonPages/loginpages/Tellelogin";
import Employerlogin from "./components/CommonPages/loginpages/AdminLogin";
import Dashboard from "./components/Dashboard";
import TellecallerRegister from "./components/CommonPages/clientdata/TellecallerRegiter";
import ClientHistory from "./components/CommonPages/clientdata/viewdetails/ClientHistory";
import ListAllTellecaller from "./components/CommonPages/admin/ListAllTellecaller";
import ClientData from "./components/CommonPages/clientdata/ClientData";
import ColdLead from "./components/TelleData/ColdLead";
import DetailView from "./components/CommonPages/clientdata/viewdetails/DetailView";
import ApexChart from "./components/CommonPages/admin/chart/ApexChart";
import Mainchart from "./components/CommonPages/admin/chart/Mainchart";
import Mainchart2 from "./components/CommonPages/admin/chart/Mainchart2";
import ApexChart2 from "./components/CommonPages/admin/chart/Apexchart2";
import UpcomingGet from "./components/CommonPages/admin/chart/UpcomingGet";
import RefrenceData from "./components/CommonPages/clientdata/RefrenceData";
import ClientDashboard from "./components/CommonPages/clientdashboard/ClientDashboard";
import ShareData from "./components/CommonPages/admin/sharedata/ShareData";

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const userDetails = useSelector((state) => state?.users.user);
  const token = localStorage.getItem("token");
  console.log("role", userDetails?.role);
  return (
    <Layout>
      <Routes>
        {userCheck && token ? (
          <>
            {userDetails?.role === "telecaller" ? (
              <>
                <Route path="/studash" element={<ClientDashboard />} />
                <Route path="/detailview/:cd" element={<DetailView />} />
                <Route path="/history" element={<ClientHistory />} />
                <Route path="/clientdata" element={<ClientData />} />
                <Route path="/detailviewss" element={<DetailView />} />
                <Route path="/refrencedata" element={<RefrenceData />} />
                <Route path="/upcomingdata/:id" element={<UpcomingGet />} />
              </>
            ) : userDetails?.role === "admin" ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<ClientHistory />} />
                <Route
                  path="/telleRegister"
                  element={<TellecallerRegister />}
                />
                <Route path="/listalltelle" element={<ListAllTellecaller />} />
                <Route path="/coldlead" element={<ColdLead />} />
                <Route path="/detailview/:cd" element={<DetailView />} />
                <Route path="/upcomingdata/:id" element={<UpcomingGet />} />
                <Route path="/apex" element={<Mainchart />} />
                <Route path="/apexs" element={<ApexChart />} />
                <Route path="/apex2" element={<Mainchart2 />} />
                <Route path="/apex22" element={<ApexChart2 />} />
                <Route path="/sharedata" element={<ShareData />} />
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
