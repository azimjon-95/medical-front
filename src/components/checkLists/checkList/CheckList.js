import React from 'react';
import './style.css'
import { NumberFormat } from "../../../hook/NumberFormat";

const CheckList = ({
    componentRef,
    firstname,
    lastname,
    payState,
    doctorFirstName,
    doctorLastName,
    doctorSpecialization,
    Hours,
    todaysTime,
    doctorPhone,
    filterarxiv
}) => {
    return (
        <div ref={componentRef} id="invoice-POS">


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
                        Manzil : Pop Tinchlik ko'chasi 7-uy<br />
                        Email : JohnDoe@gmail.com<br />
                        Tel No : +998(94)432-44-45<br />
                    </p>
                </div>
            </div>
            {
                filterarxiv === true ?


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
                                    <p className="itemtext">Xonaning nomeri :</p>
                                </div>

                                <div className="tableitem">
                                    <p className="itemtext"> {doctorLastName}</p>
                                </div>
                            </div>

                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext">Davolanish kuni :</p>
                                </div>
                                <div className="tableitem">
                                    <p className="itemtext">{payState} kun</p>
                                </div>
                            </div>

                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext">1 kunlik narxi :</p>
                                </div>

                                <div className="tableitem">
                                    <p className="itemtext">{NumberFormat(doctorPhone)} so'm</p>
                                </div>
                            </div>
                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext">Bemor:</p>
                                </div>
                                <div className="tableitem">
                                    <p className="itemtext">{firstname} {lastname}</p>
                                </div>
                            </div>

                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext text_p">Sana :</p>
                                </div>
                                <div className="tableitem">
                                    <p className="itemtext text_p">{Hours} {todaysTime}</p>
                                </div>
                            </div>

                            <div className="tabletitle">
                                <div className="tableitem">
                                    <p>To'landi: </p>
                                </div>

                                <div className="payment">
                                    <h2 className="item-h1">{NumberFormat(doctorSpecialization)} so'm</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
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
                                    <p className="itemtext">{doctorSpecialization}: Oliy toifali shifokor<br /> {doctorLastName} {doctorFirstName}</p>
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
                                    <p className="itemtext">{NumberFormat(payState)} so'm</p>
                                </div>
                            </div>
                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext">Bemor:</p>
                                </div>
                                <div className="tableitem">
                                    <p className="itemtext">{firstname} {lastname}</p>
                                </div>
                            </div>

                            <div className="service">
                                <div className="tableitem">
                                    <p className="itemtext text_p">Sana :</p>
                                </div>
                                <div className="tableitem">
                                    <p className="itemtext text_p">{Hours} {todaysTime}</p>
                                </div>
                            </div>

                            <div className="tabletitle">
                                <div className="tableitem">
                                    <p>To'landi: </p>
                                </div>

                                <div className="payment">
                                    <h2 className="item-h1">{NumberFormat(payState)} so'm</h2>
                                </div>
                            </div>
                        </div>

                        <div id="legalcopy">
                            <h2>{filterarxiv.length}</h2>
                            <p >Sizning navbatingiz!</p>
                        </div>

                    </div>
            }


        </div>
    )
}

export default CheckList