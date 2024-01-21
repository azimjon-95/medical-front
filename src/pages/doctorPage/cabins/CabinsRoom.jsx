import React from "react";
import "./style.css";
import { PhoneNumberFormat } from "../../../hook/NumberFormat";
import Layout from "../../../components/layout/Layout";
import { useGetAllRoomsQuery } from "../../../redux/roomApi";
import imgNoData from "../../../assets/nodata.png";

function CabindEnter() {
  let { data: room } = useGetAllRoomsQuery();
  const data = room?.innerData || [];
  let category = localStorage?.getItem("category");

  let clients = data?.filter(
    (i) =>
      i?.capacity?.filter((i) => i?.stories[0]?.doctorID === category)
        .length > 0
  );
  let arr = [];
  for (let i = 0; i < clients?.length; i++) {
    arr.push(data[i]);
  }

  let time = new Date();
  const CountingDay = (value) => {
    let date1 = new Date(value);
    let date2 = new Date();
    if (date1.getTime() && date2.getTime()) {
      let timeDifference = date2.getTime() - date1.getTime();
      let dayDifference = Math.floor(
        Math.abs(timeDifference / (1000 * 3600 * 24))
      );
      return dayDifference;
    } else {
      return "Error";
    }
  };

  return (
    <Layout>
      {clients == 0 ? (
        <div className="NoData">
          <div className="NoDataImg">
            <img src={imgNoData} alt="No Data" />
          </div>
        </div>
      ) : (
        <div className="Room_wrapperDoc">
          <table className="table">
            <thead>
              <tr>
                <th>№ Xona/Qavati</th>
                <th>Bemor</th>
                <th>Yoshi</th>
                <th>№ Tel</th>
                <th>Kun</th>
              </tr>
            </thead>
            <tbody>
              {arr?.map((value, inx) => (
                <tr key={inx}>
                  <td>
                    {value?.roomNumber}/{value?.floor}
                  </td>
                  {value?.capacity?.map((i) => (
                    <>
                      <td>
                        {i.firstname} {i.lastname}
                      </td>
                      <td>
                        {!(time.getFullYear() - i.year?.slice(0, 4)) &&
                          "noma'lum"}
                      </td>
                      <td>+998 {PhoneNumberFormat(i?.phone)}</td>
                      <td data-label="Kun">{CountingDay(i?.dayOfTreatment)}</td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default CabindEnter;



























// import React, { useState } from "react";
// import "./style.css";
// import { PhoneNumberFormat } from "../../../hook/NumberFormat";
// import Layout from "../../../components/layout/Layout";
// import { useGetAllRoomsQuery } from "../../../redux/roomApi";
// import imgNoData from "../../../assets/nodata.png";

// function CabindEnter() {
//   let { data: room } = useGetAllRoomsQuery();
//   const data = room?.innerData || [];
//   let category = localStorage?.getItem("category");


//   let dataNull = data?.filter((i) => i?.capacity.length > 0)
//   let clients = data?.filter(
//     (i) =>
//       i?.capacity?.filter((i) => i?.stories[0]?.choseDoctor === category)
//   );

//   let arr = [];
//   for (let i = 0; i < clients?.length; i++) {
//     arr.push(data[i]);
//   }

//   let time = new Date();
//   const CountingDay = (value) => {
//     let date1 = new Date(value);
//     let date2 = new Date();
//     if (date1.getTime() && date2.getTime()) {
//       let timeDifference = date2.getTime() - date1.getTime();
//       let dayDifference = Math.floor(
//         Math.abs(timeDifference / (1000 * 3600 * 24))
//       );
//       return dayDifference;
//     } else {
//       return "Error";
//     }
//   };

  
//   return (
//     <Layout>
//       {/* { arr === 0 ? (
//         <div className="NoData">
//           <div className="NoDataImg">
//             <img src={imgNoData} alt="No Data" />
//           </div>
//         </div>
//       ) : ( */}
//         <div className="Room_wrapperDoc">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>№ Xona/Qavati</th>
//                 <th>Bemor</th>
//                 <th>Yoshi</th>
//                 <th>№ Tel</th>
//                 <th>Kun</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients?.capacity?.map((value, inx
//                 ) => (
//                   <tr key={inx}>
//                     <td>
//                       {value?.roomNumber}/{value?.floor}
//                     </td>
//                     {/* {value?.capacity?.filter((i) => i?.stories[0]?.choseDoctor === category)?.map((i) => (
//                       <>
//                         <td>
//                           {i.firstname} {i.lastname}
//                         </td>
//                         <td>
//                           {!(time.getFullYear() - i.year?.slice(0, 4)) &&
//                             "noma'lum"}
//                         </td>
//                         <td>+998 {PhoneNumberFormat(i?.phone)}</td>
//                         <td data-label="Kun">{CountingDay(i?.dayOfTreatment)}</td>
//                       </>
//                     ))} */}
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       {/* )} */}
//     </Layout>
//   );
// }

// export default CabindEnter;
