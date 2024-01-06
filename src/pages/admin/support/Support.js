import React, { useState } from 'react';
import './style.css';
import { notification, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Layout from '../../../components/layout/Layout';
import LogoMedme from '../../../assets/img/logo.png'
import { SmileOutlined } from '@ant-design/icons';
import { IoIosCall } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";

const Support = () => {

    const [openBor, setOpenBor] = useState(false)
    const [formData, setFormDate] = useState({
        fullname: '',
        phone: '',
        question: ''
    })

    const sendMsgToBot = async (e) => {
        e.preventDefault()

        let msg = `<b> Klent savol qoldirdi!</b>%0A%0A👤 <b>Ismi</b>: ${formData.fullname} %0A%0A 📞 <b>Tel</b>: ${formData.phone} %0A%0A ✉️ <b>Savol:</b> ${formData.question} %0A`

        let tokenBot = "6662523456:AAHLAjqjIyslOzbUfj-pcXSYPnV1cR1EOPI"

        const chatID = 39464759

        let tempUrl = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatID}&text=${msg}&parse_mode=html`
        let api = new XMLHttpRequest();
        api.open("GET", tempUrl, true);
        api.send()

        setFormDate({
            fullname: '',
            question: ''
        })
        setTimeout(() => {
            openNotification()
        }, 2000);
    }
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: "Savolingiz qabul qilindi tez orada siz bilan bog'lanamiz.",
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };

    return (
        <Layout >
            <h2 style={{ textAlign: "center", marginTop: "10px" }}> Qo'llab quvvatlash markazi</h2>
            <div className="support">
                <div className="supportBox">
                    <h3>Qanday yordam bera olamiz?</h3>

                    <Input className={`${openBor ? "TextInpBor" : ""}`} onChange={(e) => setFormDate({ ...formData, fullname: e.target.value })} value={formData.fullname} size="large" placeholder="Ism Familya..." prefix={<UserOutlined />} />
                    <Input className={`${openBor ? "TextInpBor" : ""}`} onChange={(e) => setFormDate({ ...formData, phone: e.target.value })} value={formData.phone} size="large" placeholder="Tel nomer..." prefix={<IoCallOutline />} />

                    <TextArea
                        className={`${openBor ? "TextAreaBor" : "TextArea"}`}
                        showCount
                        onChange={(e) => setFormDate({ ...formData, question: e.target.value })} value={formData.question}
                        placeholder="Savolingizni yozing..."
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />

                    {formData.fullname === "" && formData.question === "" ?
                        <Button className='sentBtnChat' onClick={() => setOpenBor(true)} type="primary" >
                            Yuborish
                        </Button>
                        :
                        <Button className='sentBtnChat' onClick={sendMsgToBot} type="primary" >
                            Yuborish
                        </Button>
                    }



                </div>
                <div className="supportBox">
                    <div className="textSuppoetBox">
                        <img width={200} src={LogoMedme} alt="" /> <br />
                        Medme.uz ilovasi bo'yicha har qanday murojaatlar yuborish mumkin. Sizga doim yordam berishga tayyormiz😊
                        <br />
                        ————————————————————
                        <br />
                        Можно обращаться по любым вопросам по приложению Medme.uz. Мы всегда готовы вам помочь😊
                    </div>
                    <div className="SupportLinks">
                        <a href='https://t.me/+xM21LsZm7jQ1NzRi' className="S-box"><FaTelegram /></a>
                        <a href='https://www.instagram.com/medme_uz?utm_source=qr&igsh=bWp5OWF6eWJwNHM2' className="S-box"><BsInstagram /></a>
                        <a href='tel:+998944324454' className="S-box"><IoIosCall /></a>
                    </div>
                </div>
                {contextHolder}
            </div>
        </Layout>
    )
}

export default Support
