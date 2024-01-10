import React, { useState } from "react";
import { Form, Button, Input, message, Modal, Col } from "antd";
import "./style.css";
import imgNoData from "../../../assets/nodata.png";
import { NumberFormat, PhoneNumberFormat } from "../../../hook/NumberFormat";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDeleteDoctorMutation } from "../../../redux/doctorApi";
import { LuClipboardEdit } from "react-icons/lu";
import Update from "./Update";

const EditDoctors = ({ doctor, filterData1 }) => {
    const [editID, setEditID] = useState(null);
    let update = doctor?.find((i) => i._id === editID) || {};


    const [open, setOpen] = useState(false);
    let [deleteDoctor] = useDeleteDoctorMutation();


    const showModal = (id) => {
        setOpen(true);
        setEditID(id)
    };

    const { confirm } = Modal;
    const showDeleteConfirm = (_id) => {
        confirm({
            title: "O'chirib tashlaysizmi?",
            icon: <ExclamationCircleFilled />,
            okText: "Ha",
            okType: "danger",
            cancelText: "Yo'q",
            onOk() {
                deleteDoctor(_id)
                    .then((res) => {
                        if (res.data.success) {
                            message.success("Doktor o'chirildi!");
                        } else {
                            message.error(res.data.message);
                        }
                    })
                    .catch((err) => console.log(err));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };


    // --------------------------------

    return (

        <>

            {filterData1 == 0 ? (
                <div className="NoData">
                    <div className="NoDataImg">
                        <img src={imgNoData} alt="No Data" />
                    </div>
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ismi</th>
                            <th>Familiyasi</th>
                            <th>Kasbi</th>
                            <th>Tel raqam</th>
                            <th>Qabuli</th>
                            <th>Oylik</th>
                            <th>Taxrirlash</th>
                            <th>O'chirish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData1?.map((item, inx) => (
                            <tr key={inx}>
                                <td data-label="Ismi">{item.lastName} </td>
                                <td data-label="Familiyasi">{item.firstName}</td>
                                <td data-label="Kasbi">{item.specialization}</td>
                                <td data-label="Tel No">{PhoneNumberFormat(item.phone)}</td>
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
                                {item.percent ? (
                                    <td data-label="Oylik">{item.percent} %</td>
                                ) : (
                                    <td data-label="Oylik">
                                        {NumberFormat(item.salary)} so'm
                                    </td>
                                )}
                                <td>
                                    <Button onClick={() => {
                                        showModal(item?._id)
                                        setOpen(true)
                                    }}><LuClipboardEdit /></Button>
                                </td>

                                <td data-label="O'chirish">
                                    <button
                                        onClick={() => showDeleteConfirm(item?._id)}
                                        button="true"
                                        className="btn btn-danger"
                                    >
                                        Del
                                    </button>

                                </td>

                                {open && (
                                    <Update doctor={doctor} editID={editID} setOpenUpdate={setOpen} />
                                )}
                            </tr>
                        ))}
                    </tbody >
                </table >
            )}
        </>




    );
};

export default EditDoctors;














// Azimov	Faxriddin	Nevrolog	934566676	100000
// Melikulov	Alisher	Kardioxirurg	904445434	150000
// Aminov	Sanjar	Kardiolog	905556545	200000
// Fozilbekov	Ro'ziqul	Ginekolog	770706687	80000
// Miraxmedov	G'ayrat	Anesteziolog	904324466	90000
// Babakulov	Abduaziz	Ortoped	902344344	120000
// Umarova	Gulnora	Revmatolog	946609606	130000
// Abdullayev	Oybek	Travmatolog	944324445	80000



