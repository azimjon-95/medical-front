import React, { useRef } from 'react';
import './style.css';
import Qeu from './qeue.png';
import { NumberFormat } from '../../../hook/NumberFormat';


const QueueList = (
    {
        componentRef,
        firstname,
        lastname,
        payState,
        doctorFirstName,
        doctorLastName,
        doctorSpecialization,
        queueNumber
    }
) => {

    let sv_SE = new Date()
    let date = sv_SE.toLocaleDateString("sv-SE")
    let time = sv_SE.getHours() + ":" + sv_SE.getMinutes()

    return (
        <>
            <div ref={componentRef} className='queue_Container'>
                <div className="queue_Img-box">
                    <img src={Qeu} alt="" />
                </div>
                <div className="textQueue">
                    <p>Медицинский центр</p>
                    <i>Har doim siz bilan!</i>


                </div>

                <div className="queue_Box">
                    <p>⚕️{doctorSpecialization}: Oliy toifali shifokor<br /> {doctorLastName} {doctorFirstName}
                    </p>
                    <i></i>
                </div>
                <div className="queue_Box">
                    <p>👤Bemor:<br />{firstname} {lastname}
                    </p>
                </div>
                <div className="queue_pay">
                    <p>To'landi</p> <i>{NumberFormat(payState)} so'm</i>
                </div>
                <div className="queue_pay" id='queNone'>
                    <p>{time}</p> <i>{date}</i>
                </div>
                <div className="queue">
                    <b>{queueNumber}</b>
                    <i>Sizning navbatingiz!</i>
                </div>
                <div className="queue_address">
                    <i>Pop shahri, M.Hakimov ko'chasi, 1-uy</i>
                </div>

            </div>


            {/* <div bgcolor="#f6f6f6" style="color: #333; height: 100%; width: 100%;" height="100%" width="100%">
                <table bgcolor="#f6f6f6" cellspacing="0" style="border-collapse: collapse; padding: 40px; width: 100%;"
                    width="100%">
                    <tbody>
                        <tr>
                            <td width="5px" style="padding: 0;"></td>
                            <td style="clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 10px 0;">
                                <table width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 0;">
                                                <a href="#" style="color: #348eda;" target="_blank">
                                                    <img src="//ssl.gstatic.com/accounts/ui/logo_2x.png" alt="Bootdey.com"
                                                        style="height: 50px; max-width: 100%; width: 157px;" height="50"
                                                        width="157" />
                                                </a>
                                            </td>
                                            <td style="color: #999; font-size: 12px; padding: 0; text-align: right;"
                                                align="right">
                                                Bootdey<br />
                                                Invoice #3440952<br />
                                                August 04, 2018
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>j nhn  bnb
                            <td width="5px" style="padding: 0;"></td>
                        </tr>
                        <tr>
                            <td width="5px" style="padding: 0;"></td>
                            <td bgcolor="#FFFFFF"
                                style="border: 1px solid #000; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                                <table width="100%"
                                    style="background: #f9f9f9; border-bottom: 1px solid #eee; border-collapse: collapse; color: #999;">
                                    <tbody>
                                        <tr>
                                            <td width="50%" style="padding: 20px;"><strong
                                                style="color: #333; font-size: 24px;">$23.95</strong> Paid</td>
                                            <td align="right" width="50%" style="padding: 20px;">Thanks for using <span
                                                class="il">Bootdey.com</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style="padding: 0;"></td>
                            <td width="5px" style="padding: 0;"></td>
                        </tr>
                        <tr>
                            <td width="5px" style="padding: 0;"></td>
                            <td
                                style="border: 1px solid #000; border-top: 0; clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                                <table cellspacing="0"
                                    style="border-collapse: collapse; border-left: 1px solid #000; margin: 0 auto; max-width: 600px;">
                                    <tbody>
                                        <tr>
                                            <td valign="top" style="padding: 20px;">
                                                <h3 style="
                                            border-bottom: 1px solid #000;
                                            color: #000;
                                            font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                            font-size: 18px;
                                            font-weight: bold;
                                            line-height: 1.2;
                                            margin: 0;
                                            margin-bottom: 15px;
                                            padding-bottom: 5px;
                                        ">
                                                    Summary
                                                </h3>
                                                <table cellspacing="0" style="border-collapse: collapse; margin-bottom: 40px;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding: 5px 0;">Old Plan</td>
                                                            <td align="right" style="padding: 5px 0;">Free plan (10,000
                                                                msg/month)</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 5px 0;">New Plan</td>
                                                            <td align="right" style="padding: 5px 0;">Concept Plan</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 5px 0;">Prorated subscription amount due</td>
                                                            <td align="right" style="padding: 5px 0;">$23.95</td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;">
                                                                Amount paid</td>
                                                            <td align="right"
                                                                style="border-bottom: 2px solid #000; border-top: 2px solid #000; font-weight: bold; padding: 5px 0;">
                                                                $23.95</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5px" style="padding: 0;"></td>
                        </tr>
                        <tr style="color: #666; font-size: 12px;">
                            <td width="5px" style="padding: 10px 0;"></td>
                            <td style="clear: both; display: block; margin: 0 auto; max-width: 600px; padding: 10px 0;">
                                <table width="100%" cellspacing="0" style="border-collapse: collapse;">
                                    <tbody>
                                        <tr>
                                            <td width="40%" valign="top" style="padding: 10px 0;">
                                                <h4 style="margin: 0;">Questions?</h4>
                                                <p
                                                    style="color: #666; font-size: 12px; font-weight: normal; margin-bottom: 10px;">
                                                    Please visit our
                                                    <a href="#" style="color: #666;" target="_blank">
                                                        Support Center
                                                    </a>
                                                    with any questions.
                                                </p>
                                            </td>
                                            <td width="10%" style="padding: 10px 0;">&nbsp;</td>
                                            <td width="40%" valign="top" style="padding: 10px 0;">
                                                <h4 style="margin: 0;"><span class="il">Bootdey</span> Technologies</h4>
                                                <p
                                                    style="color: #666; font-size: 12px; font-weight: normal; margin-bottom: 10px;">
                                                    <a href="#">535 Mission St., 14th Floor San Francisco, CA 94105</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5px" style="padding: 10px 0;"></td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </>
    )
}
export default QueueList