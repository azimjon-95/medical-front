import React, { useState } from "react";
import "./style.css";
import Layout from "../../../components/layout/Layout";
import axios from "../../../api";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import { message, Tabs } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import imgNoData from "../../../assets/nodata.png";
import {
  useGetAllDoctorsQuery,
  useGetAllUsersQuery,
} from "../../../redux/apiSlice";

const Patients = () => {
  const [payState, setPaid] = useState("");

  let { data: doctors } = useGetAllDoctorsQuery();
  let { data: users, isLoading: loading } = useGetAllUsersQuery();

  const dataFalse = users?.data?.filter((i) => i.payState === false);
  const dataTrue = users?.data?.filter((i) => i.payState === true);
  localStorage.setItem("dataFalse", dataFalse?.length);

  const deletePatients = (_id) => {
    axios
      .delete(`/client/${_id}`)
      .then((res) => {
        if (res.data.success) {
          message.success("Bemor o'chirildi!");
          window.location.reload();
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  function updatePayState(e, id) {
    setPaid(e.target.checked);
    let update = dataFalse.find((i) => i._id === id);

    let doctorSum = doctors?.data?.find(
      (i) => i.specialization.toLowerCase() === update.choseDoctor.toLowerCase()
    ).feesPerCunsaltation;

    let newInfo = {
      ...update,
      payState: true,
      paySumm: doctorSum,
      room: { ...update.room, dayOfTreatment: "0" },
    };
    axios
      .put("/client/" + id, newInfo)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.location.reload();
      });
  }
  return (
    <Layout>
      <h4 className="text-center">Bemorlar</h4>
      <Tabs>
        <Tabs.TabPane tab="Online ro'yhatdan o'tkanlar" key={0}>
          {loading || !dataFalse.length ? (
            <div className="NoData">
              <div className="NoDataImg">
                <img src={imgNoData} alt="No Data" />
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Bemor</th>
                  <th>Tel No</th>
                  <th>Yo'naltirildi</th>
                  <th>Doktor</th>
                  <th>To'landi</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {dataFalse?.map((item, inx) => (
                  <tr key={inx}>
                    <td data-label="Bemor">
                      {item.lastname} {item.firstname}
                    </td>
                    <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                    <td data-label="Yo'naltirildi">{item.choseDoctor}</td>
                    <td data-label="Doktor">
                      {item.doctorLastName} {item.doctorFirstName}
                    </td>
                    <td data-label="To'landi">
                      <div className="PayContainer">
                        <div className="PayPatients">
                          {/* <div onClick={() => setPaid()} className="docORrecep"> */}
                          <label className="containerChe PayCHe">
                            {payState ? (
                              <AiOutlineCheckCircle className="Md" />
                            ) : (
                              <MdOutlineDoNotDisturbAlt className="Ai" />
                            )}
                            <input
                              value="Reception"
                              onChange={(e) => updatePayState(e, item._id)}
                              name="o"
                              id="chi"
                              type="radio"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        {payState ? (
                          <i className="Tolanmadi lee">{item.paySumm} so'm</i>
                        ) : (
                          <del className="Tolanmadi lii">
                            {NumberFormat(
                              doctors?.data?.find(
                                (i) =>
                                  i.specialization.toLowerCase() ===
                                  item.choseDoctor.toLowerCase()
                              )?.feesPerCunsaltation
                            )}{" "}
                            so'm
                          </del>
                        )}
                      </div>
                    </td>
                    <td data-label="O'chirish">
                      <button button="true" className="btn btn-danger">
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bemorlar" key={1}>
          {dataTrue == 0 ? (
            <div className="NoData">
              <div className="NoDataImg">
                <img src={imgNoData} alt="No Data" />
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Bemor</th>
                  <th>Tel No</th>
                  <th>Yo'naltirildi</th>
                  <th>Doktor</th>
                  <th>To'landi</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {dataTrue?.map((item, inx) => (
                  <tr key={inx}>
                    <td data-label="Bemor">
                      {item.lastname} {item.firstname}
                    </td>
                    <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
                    <td data-label="Yo'naltirildi">{item.choseDoctor}</td>
                    <td data-label="Doktor">
                      {item.doctorLastName} {item.doctorFirstName}
                    </td>
                    <td data-label="To'landi">
                      {NumberFormat(item.paySumm)} so'm
                    </td>
                    <td data-label="O'chirish">
                      <button
                        onClick={() => deletePatients(item?._id)}
                        button="true"
                        className="btn btn-danger"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Patients;
