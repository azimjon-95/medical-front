import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { useSelector } from 'react-redux';
import { Loading } from "./components/Loading";
import PublicRoute from "./hook/PublicRoute";
import Patients from "./pages/receptionPage/patients/Patients";
import Doctor from "./pages/receptionPage/doctor/Doctor";
import Profile from "./pages/admin/profile/Profile";
import AddDoctors from "./pages/admin/addDoctors/AddDoctors";
import RegisterOwner from "./pages/admin/registerOwner/AddOwner";
import Cabins from "./pages/receptionPage/Cabins/Cabins";
import Register from "./pages/receptionPage/register/Registers";
import QueueList from "./components/checkLists/queue/QueueLisit";


function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      {/* <QueueList /> */}
      <BrowserRouter>
        {loading ? <Loading /> :
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

            <Route path="/add-doctor" element={<AddDoctors />} />

            <Route path="/admin/users" element={<Patients />} />

            <Route path="/admin/doctors" element={<Doctor />} />
            <Route path="/setting" element={<RegisterOwner />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/receptionHome" element={<Register />} />

            <Route path="/doctor/profilr/:id" element={<Profile />} />
          </Routes>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
