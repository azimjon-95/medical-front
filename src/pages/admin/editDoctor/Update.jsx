import React, { useState } from "react";
import { Form, Button, Input, message, Modal, Col } from "antd";
import "./style.css";
import { FiX } from "react-icons/fi";
import {
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../../../redux/doctorApi";
import { LuClipboardEdit } from "react-icons/lu";

function Update({ doctor, setOpenUpdate, editID }) {
  let update = doctor?.find((i) => i._id === editID) || {};

  const [firstName, setFirstName] = useState(update?.firstName || "");
  const [lastName, setLastName] = useState(update?.lastName || "");
  const [phone, setPhone] = useState(update?.phone || "");
  const [email, setEmail] = useState(update?.email || "");
  const [address, setAddress] = useState(update?.address || "");
  const [login, setLogin] = useState(update?.login || "");
  const [password, setPassword] = useState(update?.password || "");
  const [specialization, setSpecialization] = useState(update?.specialization || "");
  const [experience, setExperience] = useState(update?.experience || "");
  const [feesPerCunsaltation, setFeesPerCunsaltation] = useState(update?.feesPerCunsaltation || "");
  const [docORrecep] = useState("doctor");
  const [percent, setPercent] = useState(update?.percent || "");
  const [blood_analysis, setBlood] = useState(update?.blood_analysis || "");
  const [urgent_analysis, setUrgent] = useState(update?.urgent_analysis || "");
  const [biochemical_analysis, setBiochemical] = useState(update?.biochemical_analysis || "");
  const [salary, setSalary] = useState(update?.salary || "");

  console.log(update?.firstName);


  let [updateDoctor] = useUpdateDoctorMutation();
  let [deleteDoctor] = useDeleteDoctorMutation();



  function updateDoctors(e) {
    e.preventDefault();

    let newInfo = {
      ...update,
      firstName,
      lastName,
      phone,
      email,
      address,
      login,
      password,
      specialization,
      experience,
      feesPerCunsaltation: +feesPerCunsaltation,
      docORrecep,
      percent: +percent,
      salary: +salary,
      analisisPrices: {
        blood_analysis: +blood_analysis,
        urine_analysis: +urgent_analysis,
        biochemical_analysis: +biochemical_analysis,
      },
    };

    updateDoctor({ id: editID, body: newInfo })
      .then((res) => {
        if (res?.data?.success) {
          message.success(res?.data?.message);
        }
      })
      .catch((err) => console.log("err", err));


  }
  return (
    <div className="updateDoctor">
      <div className="editForm" >
        <FiX
          className="updateCloseBtn"
          onClick={() => setOpenUpdate(false)}
        />
        <Form className="FormItem" >
          <div className="form-main">
            <label htmlFor="true" className="Form_item" >Ism</label>
            <Input type="text" defaultValue={update?.firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="sir" name="firstName" />
            <label htmlFor="true">Familiya</label>
            <Input type="text" defaultValue={update?.lastName} onChange={(e) => setLastName(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Telefon raqami</label>
            <Input type="text" defaultValue={update?.phone} onChange={(e) => setPhone(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Elektron pochta</label>
            <Input type="text" defaultValue={update?.email} onChange={(e) => setEmail(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Manzili</label>
            <Input type="text" defaultValue={update?.address} onChange={(e) => setAddress(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Mutaxassislik</label>
            <Input type="text" defaultValue={update?.specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="sir" name="lastName" />
          </div>
          <div className="form-main">

            <label htmlFor="true">Login</label>
            <Input type="text" defaultValue={update?.login} onChange={(e) => setLogin(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Parol</label>
            <Input type="text" defaultValue={update?.password} onChange={(e) => setPassword(e.target.value)} placeholder="sir" name="lastName" />


            <label htmlFor="true">Tajriba</label>
            <Input type="text" defaultValue={update?.experience} onChange={(e) => setExperience(e.target.value)} placeholder="sir" name="lastName" />
            <label htmlFor="true">Konsultatsia to'lov miqdori</label>
            <Input type="text" defaultValue={update?.feesPerCunsaltation} onChange={(e) => setFeesPerCunsaltation(e.target.value)} placeholder="sir" name="lastName" />
            {update?.checkList === "percent" ?
              <>
                <label htmlFor="true">Foiz</label>
                <Input type="text" defaultValue={update?.percent} onChange={(e) => setPercent(e.target.value)} placeholder="sir" name="lastName" />
              </>
              :
              <>
                <label htmlFor="true">Oylik</label>
                <Input type="text" defaultValue={update?.salary} onChange={(e) => setSalary(e.target.value)} placeholder="sir" name="lastName" />
              </>
            }
            {update?.analis === "analis" ?
              <>
                <lable label htmlFor="true"></lable>
                <Input type="text" defaultValue={update?.blood_analysis} onChange={(e) => setBlood(e.target.value)} placeholder="sir" name="lastName" />
                <label htmlFor="true"></label>
                <Input type="text" defaultValue={update?.urgent_analysis} onChange={(e) => setUrgent(e.target.value)} placeholder="sir" name="lastName" />
                <label htmlFor="true"></label>
                <Input type="text" defaultValue={update?.biochemical_analysis} onChange={(e) => setBiochemical(e.target.value)} placeholder="sir" name="lastName" />
              </> : ""
            }
          </div>

        </Form>
        <button onClick={(e) => {
          updateDoctors(e)
          setTimeout(() => {
            setOpenUpdate(false)
          }, 1000)
        }} className="taxrirlash">Taxrirlash</button>
      </div>
    </div>
  );
}

export default Update;
