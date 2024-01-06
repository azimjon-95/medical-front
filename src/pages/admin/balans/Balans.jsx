// import React, { useState } from "react";
// import "./style.css";
// import { NumberFormat } from "../../../hook/NumberFormat";
// import { GrBottomCorner } from "react-icons/gr";
// import CountUp from "react-countup";
// import NoMony from "../../../assets/img/nomony.png";
// import moment from "moment";
// import { GiMoneyStack } from "react-icons/gi";
// import { MdOutlineBedroomChild } from "react-icons/md";
// import { TbUsersGroup } from "react-icons/tb";
// import { useGetAllRoomsQuery } from "../../../redux/roomApi";

// import { useGetAllUsersQuery } from "../../../redux/clientApi";

// const Balans = ({ dataTrue }) => {
//   let { data: users, isLoading: loading } = useGetAllUsersQuery();
//   let { data: rooms } = useGetAllRoomsQuery();
//   const [selectedDate, setSelectedDate] = u~seState(moment().startOf("day"));
//   let time = new Date();
//   let dateChane =
//     time.getDate() - 1 + "." + (time.getMonth() + 1) + "." + time.getFullYear();
//   let change = selectedDate.format("DD.MM.YYYY");

//   const back = () => {
//     setSelectedDate(selectedDate.clone().subtract(1, "day"));
//   };
//   const forward = () => {
//     setSelectedDate(selectedDate.clone().add(1, "day"));
//   };

//   // Calculation of payments from hospitals and patients
//   let base = dataTrue?.filter((i) => i.day === change && i.view === true);
//   let result = base?.reduce(function (prev, cur) {
//     return prev + cur.paySumm;
//   }, 0);

//   let baseRoom = dataTrue?.filter(
//     (i) => i.outDay === change && i.view === true
//   );
//   let TreatmentsFees = baseRoom?.reduce(function (prev, cur) {
//     return prev + cur.room.payForRoom;
//   }, 0);
//   let total = result + TreatmentsFees;

//   console.log(total);
//   // Number of people treated in hospitals
//   let NumberOfTreatments = rooms?.innerData?.reduce(function (prev, cur) {
//     return prev + cur.capacity?.length;
//   }, 0);
//   // ------------------------------------------------------------
//   return (
//     <div className="grid-one-item grid-common grid-c1">
//       <div className="grid-c1-content">
//         <div className="balansBox">
//           <p>Balans</p>
//           <div className="bedrom">
//             {base?.length === 0 ? (
//               ""
//             ) : (
//               <div>
//                 <TbUsersGroup /> - {base?.length}
//               </div>
//             )}
//             {NumberOfTreatments === 0 ? (
//               ""
//             ) : (
//               <div>
//                 <MdOutlineBedroomChild /> - {NumberOfTreatments}{" "}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="lg-value1">
//           {total === 0 ? (
//             <img src={NoMony} alt="" />
//           ) : (
//             <div className="payCaounting">
//               <div>
//                 <GiMoneyStack /> Jami:
//               </div>
//               <div className="">
//                 <CountUp
//                   className="lg-value1"
//                   end={NumberFormat(total)}
//                   decimals="3"
//                   suffix=" so'm"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="lg-value1">
//           {result === 0 ? (
//             <img src={NoMony} alt="" />
//           ) : (
//             <div className="payCaounting">
//               <div>
//                 <GiMoneyStack /> Bemorlar:
//               </div>
//               <div className="">
//                 <CountUp
//                   className="lg-value1"
//                   end={NumberFormat(result)}
//                   decimals="3"
//                   suffix=" so'm"
//                 />
//               </div>
//             </div>
//           )}
//         </div>{" "}
//         <div className="lg-value1">
//           {TreatmentsFees === 0 ? (
//             <img src={NoMony} alt="" />
//           ) : (
//             <div className="payCaounting">
//               <div>
//                 <GiMoneyStack /> Xonalar:
//               </div>
//               <div className="">
//                 <CountUp
//                   className="lg-value1"
//                   end={NumberFormat(TreatmentsFees)}
//                   decimals="3"
//                   suffix=" so'm"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="card-logo-wrapper">
//           <div>
//             <div className="changeDate">
//               <p className="text text-sm text-white  text-date">
//                 {selectedDate.format("DD.MM.YYYY")}
//               </p>
//               <span>
//                 <button onClick={back}>
//                   <GrBottomCorner className="BottomCorner-1" />
//                 </button>
//                 {change <= dateChane ? (
//                   <button onClick={forward}>
//                     <GrBottomCorner className="BottomCorner-2" />
//                   </button>
//                 ) : (
//                   ""
//                 )}
//               </span>
//             </div>
//           </div>
//           <div className="card-logo">
//             <div className="logo-shape1"></div>
//             <div className="logo-shape2"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Balans;

import React, { useState } from "react";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";
import { GrBottomCorner } from "react-icons/gr";
import CountUp from "react-countup";
import NoMony from "../../../assets/img/nomony.png";
import moment from "moment";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { useGetAllRoomsQuery } from "../../../redux/roomApi";

import { useGetAllUsersQuery } from "../../../redux/clientApi";

const Balans = () => {
  let page = 0;
  let { data: data } = useGetAllUsersQuery({
    size: 30,
    page: page + 1,
  });

  let { data: rooms } = useGetAllRoomsQuery();

  const [selectedDate, setSelectedDate] = useState(moment().startOf("day"));

  let time = new Date();
  let dateChane =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  let change = selectedDate.format("DD.MM.YYYY");

  const back = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "day"));
  };
  const forward = () => {
    setSelectedDate(selectedDate.clone().add(1, "day"));
  };

  // Calculation of payments from hospitals and patients
  let base = data?.data?.filter(
    (user) => user.day === dateChane && user.view && user.payState
  );
  let result = base?.reduce((a, b) => a + b.paySumm, 0);

  // let baseRoom = data?.dataTrue?.filter(
  //   (i) => i.outDay === change && i.view === true
  // );
  let baseRoom = data?.data?.filter(
    (i) => i.outDay === change && i.view === true
  );

  let TreatmentsFees = baseRoom?.reduce(function (prev, cur) {
    return prev + cur.room.payForRoom;
  }, 0);

  let total = result + TreatmentsFees;

  // Number of people treated in hospitals
  let NumberOfTreatments = rooms?.innerData?.reduce(function (prev, cur) {
    return prev + cur.capacity?.length;
  }, 0);
  // ------------------------------------------------------------
  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c1-content">
        <div className="balansBox">
          <p>Balans</p>
          <div className="bedrom">
            {base?.length === 0 ? (
              ""
            ) : (
              <div>
                <TbUsersGroup /> - {base?.length}
              </div>
            )}
            {NumberOfTreatments === 0 ? (
              ""
            ) : (
              <div>
                <MdOutlineBedroomChild /> - {NumberOfTreatments}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="lg-value1">
          {total === 0 ? (
            <img src={NoMony} alt="" />
          ) : (
            <div className="payCaounting">
              <div>
                <GiMoneyStack /> Jami:
              </div>
              <div className="">
                <CountUp
                  className="lg-value1"
                  // end={NumberFormat(total)}
                  end={total}
                  decimals="3"
                  suffix=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="lg-value1">
          {result === 0 ? (
            <img src={NoMony} alt="" />
          ) : (
            <div className="payCaounting">
              <div>
                <GiMoneyStack /> Bemorlar:
              </div>
              <div className="">
                <CountUp
                  className="lg-value1"
                  // end={NumberFormat(result)}
                  end={result}
                  decimals="3"
                  suffix=""
                />
              </div>
            </div>
          )}
        </div>{" "}
        <div className="lg-value1">
          {TreatmentsFees === 0 ? (
            <img src={NoMony} alt="" />
          ) : (
            <div className="payCaounting">
              <div>
                <GiMoneyStack /> Xonalar:
              </div>
              <div className="">
                <CountUp
                  className="lg-value1"
                  end={NumberFormat(TreatmentsFees)}
                  decimals="3"
                  suffix=" so'm"
                />
              </div>
            </div>
          )}
        </div>
        <div className="card-logo-wrapper">
          <div>
            <div className="changeDate">
              <p className="text text-sm text-white  text-date">
                {selectedDate.format("DD.MM.YYYY")}
              </p>
              <span>
                <button onClick={back}>
                  <GrBottomCorner className="BottomCorner-1" />
                </button>
                {change <= dateChane ? (
                  <button onClick={forward}>
                    <GrBottomCorner className="BottomCorner-2" />
                  </button>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
          <div className="card-logo">
            <div className="logo-shape1"></div>
            <div className="logo-shape2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balans;
