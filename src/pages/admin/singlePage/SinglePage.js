import React, { useEffect } from "react";
import "./style.css";
import axios from "../../../api";
import GetPatients from "./getPatients/GetPatients";
import SingleReports from "./singleReports/SingleReports";
import { useGetAllUsersQuery } from "../../../redux/clientApi";

const SinglePage = () => {
  // ----------------------------------------

  let { data: allClients } = useGetAllUsersQuery();
  let clients = allClients?.data;
  console.log(clients);

  return (
    <div className="SearchBar-Box">
      <SingleReports />
      <GetPatients />

    </div>
  );
};

export default SinglePage;
