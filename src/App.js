import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/admin/home/HomePage";
import Login from "./pages/Login";
import { useSelector } from 'react-redux';
import Patients from "./pages/receptionPage/patients/Patients";
import Doctor from "./pages/receptionPage/doctor/Doctor";
import Profile from "./pages/admin/profile/Profile";
import AddDoctors from "./pages/admin/addDoctors/AddDoctors";
import RegisterOwner from "./pages/admin/registerOwner/AddOwner";
import Cabins from "./pages/receptionPage/Cabins/Cabins";
import Register from "./pages/receptionPage/register/Registers";
import Appointments from './pages/doctorPage/appointments/Appointments'
import AppointmentSinglePage from "./pages/doctorPage/appointment-single-page/AppointmentSinglePage";
import PatientsHistory from "./pages/doctorPage/patientsHistory/PatientsHistory";
import RecordList from "./components/checkLists/patientRecordList/RecordList";
import SinglePage from "./pages/admin/singlePage/SinglePage";
import LoadingTik from "./components/loading/tiktok/LoadingTik";
import GetPatients from "./pages/admin/singlePage/getPatients/GetPatients";
import Rooms from "./pages/admin/rooms/Rooms";

function App() {
  const { loading } = useSelector(state => state.alerts)


  // ---------Online and Ofline Controls-----------
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(window.navigator.onLine);
    };
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  console.log(isOnline);
  return (
    <div className="app">
      <BrowserRouter>
        {loading ? <LoadingTik /> :
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/add-doctor" element={<AddDoctors />} />
            <Route path="/admin/users" element={<Patients />} />
            <Route path="reports/" element={<HomePage />} />
            <Route path="/viewRoom" element={<Rooms />} />
            <Route path="/admin/doctors" element={<Doctor />} />
            <Route path="/setting" element={<RegisterOwner />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/receptionHome" element={<Register />} />
            <Route path="/doctor/profilr/:id" element={<Profile />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctor/patients_history" element={<PatientsHistory />} />
            <Route path="/appointments/:id" element={<AppointmentSinglePage />} />
            <Route path="/AppointmentSinglePage/:id" element={<RecordList />} />
            <Route path="/doctorSinglePage/:_id" element={<SinglePage />} />
            <Route path="/doctorSinglePageAdmin/:_id" element={<GetPatients />} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
