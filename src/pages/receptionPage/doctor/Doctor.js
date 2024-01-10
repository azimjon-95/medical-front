import React, { useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import { Button } from "antd";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import { showLoading, hideLoading } from "../../../redux/features/lineIoad";
import { useDispatch } from "react-redux";
import imgNoData from "../../../assets/nodata.png";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../../../styles/table.css";
import { useGetAllDoctorsQuery } from "../../../redux/doctorApi";
import './style.css';

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
        <main className="tableMain" id="customers_table">
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Doktor</th>
                  <th>Darajasi</th>
                  <th>Tel raqam</th>
                  <th>Konsultatsiya to'lovi</th>
                  <th>Bemorlari</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, inx) => {
                  return (
                    <tr key={inx}>
                      <td>{inx + 1}</td>
                      <td data-label="Doktor">
                        {item.firstName} {item.lastName}
                      </td>
                      <td data-label="Darajasi">{item.specialization}</td>
                      <td data-label="Tel No">
                        {PhoneNumberFormat(item.phone)}
                      </td>
                      {
                        item?.analis === "analis" ?
                          <td>
                            <div className="AnalisRes">
                              <div>
                                <div>Qon analizi:</div> {NumberFormat(item?.analisisPrices.blood_analysis)} So'm
                              </div>
                              <div>
                                <div>Peshob analizi:</div>  {NumberFormat(item?.analisisPrices.urine_analysis)} So'm
                              </div>
                              <div>
                                <div> Bioximik analizi:</div> {NumberFormat(item?.analisisPrices.biochemical_analysis)}  So'm
                              </div>
                            </div>
                          </td>
                          :
                          <td data-label="Konsultatsiya">
                            {NumberFormat(item.feesPerCunsaltation)} so'm
                          </td>
                      }
                      <td data-label="Bemorlari">
                        <Link
                          to={`/doctorSinglePageAdmin/${item.specialization}`}
                        >
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
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      )
      }
    </Layout >
  );
};

export default Doctor;


