import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/admin/home/HomePage";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Patients from "./pages/receptionPage/patients/Patients";
import Doctor from "./pages/receptionPage/doctor/Doctor";
// import Profile from "./pages/admin/profile/Profile";
import AddDoctors from "./pages/admin/addDoctors/AddDoctors";
import RegisterOwner from "./pages/admin/registerOwner/AddOwner";
import Rooms from "./pages/admin/rooms/Rooms";
import Support from "./pages/admin/support/Support";
import Cabins from "./pages/receptionPage/Cabins/Cabins";
import Register from "./pages/receptionPage/register/Registers";
import Appointments from "./pages/doctorPage/appointments/Appointments";
import AppointmentSinglePage from "./pages/doctorPage/appointment-single-page/AppointmentSinglePage";
import PatientsHistory from "./pages/doctorPage/patientsHistory/PatientsHistory";
import RecordList from "./components/checkLists/patientRecordList/RecordList";
import SinglePage from "./pages/admin/singlePage/SinglePage";
import LoadingTik from "./components/loading/tiktok/LoadingTik";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import GetPatients from "./pages/admin/singlePage/getPatients/GetPatients";
import { useState, useEffect } from "react";
import Wallet from "./pages/doctorPage/wallet/Wallet";
import Home from "./components/home/Home";
import CabindEnter from "./pages/doctorPage/cabins/CabinsRoom";
import SingleReports from "./pages/admin/singlePage/singleReports/SingleReports";
import TableUse from "./pages/admin/singlePage/Table";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const [isOnline, setIsOnline] = useState("");
  window.ononline = () => setIsOnline("Online");
  window.onoffline = () => setIsOnline("Ofline");

  setTimeout(() => setIsOnline(""), [5000]);

  // ----The language will be added in the second update-------
  const startLanguage = localStorage.getItem("language");
  const [language, setLanguage] = useState(startLanguage || "uz");
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  // ------------------------------------------

  return (
    <div className="app">
      {isOnline && (
        <p
          style={{ background: isOnline === "Ofline" ? "red" : "#17cd32" }}
          className="isOnline"
        >
          {isOnline}
        </p>
      )}
      {/* ---------isOnline---------- */}
      {/* {loading ? (
        <LoadingTik />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-doctor" element={<AddDoctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="reports/" element={<HomePage />} />
          <Route path="/admin/doctors" element={<Doctor />} />
          <Route path="/setting" element={<RegisterOwner />} />
          <Route path="/cabins" element={<Cabins />} />
          <Route path="/receptionHome" element={<Register />} />
          // <Route path="/doctor/profilr/:id" element={<Profile />} /> 
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/kashelyok" element={<Wallet />} />
          <Route path="/viewRoom" element={<Rooms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/doctor-patients" element={<CabindEnter />} />
          <Route
            path="/doctor/patients_history"
            element={<PatientsHistory />}
          />
          <Route path="/appointments/:id" element={<AppointmentSinglePage />} />
          <Route path="/AppointmentSinglePage/:id" element={<RecordList />} />
          <Route path="/doctorSinglePage/:_id" element={<SinglePage />} />
          <Route path="/doctorSinglePageAdmin/:_id" element={<GetPatients />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )} */}

      <marquee>
        {" "}
        <h1>Welcome</h1>{" "}
      </marquee>
    </div>
  );
}

export default App;
