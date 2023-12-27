import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { Button } from "antd";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import imgNoData from "../../../assets/nodata.png";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useGetAllDoctorsQuery } from "../../../redux/apiSlice";

const Doctor = () => {
  const dispatch = useDispatch();
  let { data: doctor, isLoading } = useGetAllDoctorsQuery();

  useEffect(() => {
    isLoading ? dispatch(showLoading()) : dispatch(hideLoading());
  }, [isLoading]);

  let data = doctor?.data?.filter((i) => i.docORrecep === "doctor");

  return (
    <Layout>
      <h3 className="text-center">Doktorlar</h3>
      {data == 0 ? (
        <div className="NoData">
          <div className="NoDataImg">
            <img src={imgNoData} alt="No Data" />
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Doktor</th>
              <th>Darajasi</th>
              <th>Tel No</th>
              <th>Konsultatsiya to'lovi</th>
              <th>Bemorlari</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, inx) => (
              <tr key={inx}>
                <td data-label="Doktor">
                  {item.firstName} {item.lastName}
                </td>
                <td data-label="Darajasi">{item.specialization}</td>
                <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                <td data-label="Konsultatsiya">
                  {NumberFormat(item.feesPerCunsaltation)} so'm
                </td>
                <td data-label="Bemorlari">
                  <Link to={`/doctorSinglePageAdmin/${item.specialization}`}>
                    <Button
                      style={{
                        background: "transparent",
                        fontSize: "18px",
                        border: "none",
                        padding: "0px 10pxpx",
                        boxShadow: "none",
                      }}
                    >
                      <IoEyeOutline style={{ marginBottom: "10px" }} />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Doctor;
