// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// export const Controller = () => {
//   const location = useLocation();
//   const role = localStorage.getItem("admin");

//   if (role === "owner") {
//     return (<Outlet />), (<Navigate to="/reports" />);
//   } else if (role === "reception") {
//     return (<Navigate to="/receptionHome" />), (<Outlet />);
//   } else if (role === "doctor") {
//     return (<Navigate to="/appointments" />), (<Outlet />);
//   } else {
//     return <Navigate to="/" state={{ from: location }} />;
//   }
// };
