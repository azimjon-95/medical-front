import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom"
import "./style.css"
import logo from "../../assets/img/logo.png"
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    message,
} from 'antd';
import { NumberFormat } from "../../hook/NumberFormat";
import { useCreateClientMutation } from "../../redux/clientApi";
import { PiPrinterFill } from "react-icons/pi";
import CheckList from "../../components/checkLists/checkList/CheckList";
import { useGetAllDoctorsQuery } from "../../redux/doctorApi";
import html2canvas from 'html2canvas';

function Home() {
    const [modal2Open, setModal2Open] = useState(false);
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [CreateNewClient] = useCreateClientMutation();
    const [paySum, setPaySum] = useState(0);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [year, setYear] = useState("");
    const [phone, setPhone] = useState("");
    const [doctorPhone, setDoctorPhone] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctorSpecialization, setDoctorSpecialization] = useState("");
    const [queueNumber, setQueueNumber] = useState(0);
    const [list, setList] = useState(false);;
    const [choseDoctor, setChoseDoctor] = useState(null);



    let { data: all_Doctor } = useGetAllDoctorsQuery();
    let allDoctor = all_Doctor?.data || [];
    useEffect(() => {
        let doctor_info = allDoctor?.find((d) => d._id === choseDoctor);
        setPaySum(doctor_info?.feesPerCunsaltation);
        setDoctorFirstName(doctor_info?.firstName);
        setDoctorLastName(doctor_info?.lastName);
        setDoctorSpecialization(doctor_info?.specialization);
        setDoctorPhone(doctor_info?.phone);
    }, [choseDoctor]);


    let time = new Date();
    let Hours = time.getHours() + ":" + time.getMinutes();
    let todaysTime =
        time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

    function sendData(e) {
        e.preventDefault();

        let doctor_price = allDoctor?.find((d) => d._id === choseDoctor);

        const AllInfo = {
            firstname,
            lastname,
            phone,
            address,
            year,
            paySumm: 0,
            payState: false,
            choseDoctor: doctor_price.specialization,
            doctorFirstName: doctor_price.firstName,
            doctorLastName: doctor_price.lastName,
            doctorPhone: doctor_price.phone,
            day: todaysTime,
            month: time.toLocaleString("default", { month: "long" }),
        };

        CreateNewClient(AllInfo)
            .then((res) => {
                if (res?.data?.success) {
                    setQueueNumber(res.data.data.queueNumber);
                    message.success(res?.data?.message);
                    setList(true);
                }
            })
            .catch((err) => console.log(err));

        // e.target.clear()
    }
    const onChange = (date, dateString) => {
        setYear(dateString);
    };



    // -------------------------------------

    const screenshotRef = useRef(null);

    const takeScreenshot = () => {
        const element = screenshotRef.current;

        if (element) {
            html2canvas(element).then((canvas) => {
                const screenshotUrl = canvas.toDataURL();
                console.log(screenshotUrl);
            });
        }
    };




    return (
        <div className="homeBoxCont">
            <div className='home'>
                <div className="home__navbar">
                    <div className="home__logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className='nav__btns nav__btnsShow'>
                        <Link to={`/login`}>Tizimga kirish</Link>
                        <Button type="primary" onClick={() => setModal2Open(true)}>
                            Ro'yhatdan o'tish
                        </Button>
                    </div>
                </div>
                <h1 className='home__title'>
                    <span>HAYOTLAR</span>
                    <span>SIFATINI </span>
                    <span>O'ZGARTIRISHGA</span>
                    <span>HARAKAT</span>
                    <span>QILAMIZ!</span>
                </h1>
                <div className='nav__btns nav__btnsHide'>
                    <Link to={`/login`}>Tizimga kirish</Link>
                    <Button type="primary" onClick={() => setModal2Open(true)}>
                        Ro'yhatdan o'tish
                    </Button>
                </div>


                <Modal
                    title="Do'ktor qabuliga yozilish uchun maydonlarni toldiring!"
                    centered
                    open={modal2Open}
                    onOk={sendData}
                    onCancel={() => setModal2Open(false)}
                >
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                        style={{
                            maxWidth: 700,
                        }}


                    >

                        <Form.Item label="Ism" name="firstname" direction="vertical">
                            <Input value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                placeholder="Ismi" />
                        </Form.Item>
                        <Form.Item label="Familiya" name="lastname">
                            <Input value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                placeholder="Familiya" />
                        </Form.Item>
                        <Form.Item
                            label="Yil:"
                            name="year"
                            required
                            rules={[{ required: true }]}
                            direction="vertical"
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                value={year}
                                onChange={onChange}
                            />
                        </Form.Item>
                        <Form.Item label="Address" name="address" direction="vertical">
                            <Input value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="Manzili" />
                        </Form.Item>
                        <Form.Item label="Tel:" name="phone" >
                            <Input value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                placeholder="Tel raqam" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Doctor"
                            name="doctor"
                            required
                            rules={[{ required: true }]}
                        >
                            <select className='SelectBar' required onChange={(e) => setChoseDoctor(e.target.value)}>
                                <option >doctor tanlash</option>
                                {allDoctor
                                    ?.filter((i) => i.docORrecep === "doctor")
                                    .map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {" "}
                                            {item.specialization} ({item.firstName} {item.lastName}){" "}
                                        </option>
                                    ))}
                            </select>
                        </Form.Item>
                        <Form.Item label="To'lov:">
                            {
                                paySum ?
                                    <div style={{ width: "100%" }} >{NumberFormat(paySum)} so'm</div>
                                    :
                                    ""
                            }
                        </Form.Item>
                    </Form>
                    <div className={`${list ? "viewCheckList" : "ListNone"}`}>
                        <button onClick={() => setList(false)} className="OutCheck">
                            +
                        </button>
                        <div className="viewBox">
                            <button onClick={takeScreenshot} className="PrintChekList" type="submit">
                                {" "}
                                <PiPrinterFill />
                            </button>

                            <div ref={screenshotRef} className="waveList">
                                <center id="top">
                                    <div className="logo"></div>
                                    <div className="info">
                                        <h2 className="item-h2">Har doim siz bilan!</h2>
                                    </div>
                                </center>

                                <div id="mid">
                                    <div className="info">
                                        <h2 className="item-h2">Aloqa uchun malumot</h2>
                                        <p className="text_p">
                                            Manzil : Pop Tinchlik ko'chasi 7-uy
                                            <br />
                                            Email : JohnDoe@gmail.com
                                            <br />
                                            Tel raqam : +998(94)432-44-45
                                            <br />
                                        </p>
                                    </div>
                                </div>

                                <div id="bot">
                                    <div id="table">
                                        <div className="tabletitle">
                                            <div className="item_check">
                                                <h2 className="item-h2">Element</h2>
                                            </div>
                                            <div className="Hours">
                                                <h2 className="item-h2"></h2>
                                            </div>
                                            <div className="Rate">
                                                <h2 className="item-h2"></h2>
                                            </div>
                                        </div>

                                        <div className="service">
                                            <div className="tableitem">
                                                <p className="itemtext">
                                                    {doctorSpecialization}: Oliy toifali shifokor
                                                </p>
                                            </div>

                                            <div className="tableitem">
                                                <p className="itemtext">
                                                    {" "}
                                                    {doctorLastName} {doctorFirstName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="service">
                                            <div className="tableitem">
                                                <p className="itemtext">Doktor Tel :</p>
                                            </div>
                                            <div className="tableitem">
                                                <p className="itemtext">+998{doctorPhone}</p>
                                            </div>
                                        </div>

                                        <div className="service">
                                            <div className="tableitem">
                                                <p className="itemtext">Qabul :</p>
                                            </div>

                                            <div className="tableitem">
                                                <p className="itemtext">{NumberFormat(paySum)} so'm</p>
                                            </div>
                                        </div>
                                        <div className="service">
                                            <div className="tableitem">
                                                <p className="itemtext">Bemor:</p>
                                            </div>
                                            <div className="tableitem">
                                                <p className="itemtext">
                                                    {firstname} {lastname}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="service">
                                            <div className="tableitem">
                                                <p className="itemtext text_p">Sana :</p>
                                            </div>
                                            <div className="tableitem">
                                                <p className="itemtext text_p">
                                                    {Hours} {todaysTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="tabletitle">
                                            <div className="payment">
                                                <div className="item-h1">Do'ktor qabuliga kirishdan avval to'lovni amalga oshirin</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="legalcopy">
                                        <h2>{queueNumber}</h2>
                                        <p>Sizning navbatingiz!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "none" }}>
                        <CheckList
                            componentRef={screenshotRef}
                            customersTableRef={screenshotRef}
                            firstname={firstname}
                            lastname={lastname}
                            payState={paySum}
                            doctorFirstName={doctorFirstName}
                            doctorLastName={doctorLastName}
                            doctorSpecialization={doctorSpecialization}
                            todaysTime={todaysTime}
                            Hours={Hours}
                            doctorPhone={doctorPhone}
                            filterarxiv={queueNumber}
                        />
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default Home









