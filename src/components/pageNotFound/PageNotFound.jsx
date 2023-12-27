import React from "react";
import bg from "../../assets/pagenotfound.jpg";

function PageNotFound() {
  return (
    <div
      style={{ background: `URL(${bg})`, width: "100%", height: "100vh" ,backgroundSize: "cover"}}
    ></div>
  );
}

export default PageNotFound;
