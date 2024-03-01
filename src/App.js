import { Route, Routes } from "react-router-dom";
import Layout from "./components/MainLayouts/Layout";
import PageNF from "./components/PageNF";
import AllPages from "./components/CommonPages/HomePages/AllPages";
import { useSelector } from "react-redux";
import Tellelogin from "./components/CommonPages/loginpages/Tellelogin";
import Dashboard from "./components/Dashboard";
import TellecallerRegister from "./components/CommonPages/clientdata/TellecallerRegiter";
import ClientHistory from "./components/CommonPages/clientdata/viewdetails/ClientHistory";
import ListAllTellecaller from "./components/CommonPages/admin/ListAllTellecaller";
import ClientData from "./components/CommonPages/clientdata/ClientData";
import DetailView from "./components/CommonPages/clientdata/viewdetails/DetailView";
import ApexChart from "./components/CommonPages/admin/chart/ApexChart";
import Mainchart from "./components/CommonPages/admin/chart/Mainchart";
import Mainchart2 from "./components/CommonPages/admin/chart/Mainchart2";
import ApexChart2 from "./components/CommonPages/admin/chart/Apexchart2";
import UpcomingGet from "./components/CommonPages/admin/chart/UpcomingGet";
import RefrenceData from "./components/CommonPages/clientdata/RefrenceData";
import ClientDashboard from "./components/CommonPages/clientdashboard/ClientDashboard";
import ShareData from "./components/CommonPages/admin/sharedata/ShareData";
import { DailyReport } from "./components/CommonPages/dailyreport/DailyReport";
import  MasterSheet  from "./components/CommonPages/admin/mastersheet/MasterSheet";
import AddData from "./components/CommonPages/admin/mastersheet/AddData";
import Mainchart3 from "./components/CommonPages/admin/chart/Mainchart3";
import ApexChart3 from "./components/CommonPages/admin/chart/ApexChart3";
import NegativeLead from "./components/CommonPages/admin/sharedata/NegativeLead";
import TellecallerNegativeLead from "./components/CommonPages/admin/sharedata/TellecallerNegativeLead";
import TelleReport from "./components/CommonPages/admin/chart/dailyreport/TelleReport";
import ViewStat from "./components/CommonPages/admin/chart/dailyreport/ViewStat";
import Otp from "./components/CommonPages/loginpages/Otp";
import VerifyOtp from "./components/CommonPages/loginpages/VerifyOtp";
import Adminlogin from "./components/CommonPages/loginpages/AdminLogin";
import Updateapi from "./components/CommonPages/clientdata/viewdetails/editpages/CaDataUpdateapi";
import Postapi from "./components/CommonPages/clientdata/viewdetails/editpages/CAdataPostapi";
import Callstatus from "./components/CommonPages/clientdata/viewdetails/editpages/Callstatus";

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
                <Route path="/dailyreport" element={<DailyReport />} />
                <Route path="/telenegativelead" element={<TellecallerNegativeLead />} />
                <Route path="/otpverify" element={<Otp />} />
                <Route path="/otpverifycode" element={<VerifyOtp />} />
                <Route path="/updateapi" element={<Updateapi />} />
                <Route path="/postapi" element={<Postapi />} />
                <Route path="/callstatus" element={<Callstatus />} />


                
              </>
            ) : userDetails?.role === "admin" ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<ClientHistory />} />
                <Route path="/telleRegister" element={<TellecallerRegister />} />
                <Route path="/apexdonut" element={<Mainchart3 />} />
                <Route path="/apexdonuts" element={<ApexChart3 />} />
                <Route path="/adddata" element={<AddData />} />
                <Route path="/listalltelle" element={<ListAllTellecaller />} />
                <Route path="/detailview/:cd" element={<DetailView />} />
                <Route path="/upcomingdata/:id" element={<UpcomingGet />} />
                <Route path="/apex" element={<Mainchart />} />
                <Route path="/apexs" element={<ApexChart />} />
                <Route path="/apex2" element={<Mainchart2 />} />
                <Route path="/apex22" element={<ApexChart2 />} />
                <Route path="/sharedata" element={<ShareData />} />
                <Route path="/mastersheet" element={<MasterSheet />} />
                <Route path="/negativelead" element={<NegativeLead />} />
                <Route path="/tellereport" element={<TelleReport />} />
                <Route path="/viewstat" element={<ViewStat />} />

              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Route path="*" element={<PageNF />} />
            <Route path="/tellelogin" element={<Tellelogin />} />
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/" element={<AllPages />} />
            <Route path="/allpages" element={<AllPages />} />
            

          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
