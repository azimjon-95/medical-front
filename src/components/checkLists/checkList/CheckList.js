import React from "react";
import "./style.css";
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
  filterarxiv,
  customersTableRef,
  allDoctor,
  blood_analysis,
  biochemical_analysis,
  urgent_analysis,
  diagnostics,
}) => {
  return (
    <div ref={componentRef} id="invoice-POS">
      <center id="top">
        <div className="logo">
          <h1>Yasmina </h1>
          <p>medical servis</p>
        </div>
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
      {filterarxiv === true ? (
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
              <div className="tableitem">
                <p>To'landi: </p>
              </div>

              <div className="payment">
                <h2 className="item-h1">
                  {NumberFormat(doctorSpecialization)} so'm
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                <p className="itemtext">{NumberFormat(payState)} so'm</p>
              </div>
            </div>

            {blood_analysis ? (
              <div className="service">
                <div className="tableitem">
                  <p className="itemtext">Qon tahlili:</p>
                </div>

                <div className="tableitem">
                  <p className="itemtext">
                    {NumberFormat(
                      allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                        ?.blood_analysis
                    )}{" "}
                    so'm
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {urgent_analysis ? (
              <div className="service">
                <div className="tableitem">
                  <p className="itemtext">Peshob tahlili:</p>
                </div>

                <div className="tableitem">
                  <p className="itemtext">
                    {NumberFormat(
                      allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                        ?.urine_analysis
                    )}{" "}
                    so'm
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {biochemical_analysis ? (
              <div className="service">
                <div className="tableitem">
                  <p className="itemtext">Bioximik tahlili:</p>
                </div>

                <div className="tableitem">
                  <p className="itemtext">
                    {NumberFormat(
                      allDoctor?.filter((i) => i.analis)[0]?.analisisPrices
                        ?.biochemical_analysis
                    )}{" "}
                    so'm
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {!diagnostics === "diagnostica" ? (
              <div className="service">
                <div className="tableitem">
                  <p className="itemtext">{diagnostics}:</p>
                </div>

                <div className="tableitem">
                  <p className="itemtext">
                    {NumberFormat(
                      allDoctor?.find(
                        (i) =>
                          i.diagnostica && i.specialization === diagnostics
                      )?.feesPerCunsaltation
                    )}{" "}
                    so'm
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="service">
              <div className="tableitem">
                <p className="itemtext  text_p">Bemor:</p>
              </div>
              <div className="tableitem">
                <p className="itemtext  text_p">
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
            <div className="service">
              <div className="tableitem">
                <p className="itemtext text_p">To'landi:</p>
              </div>
              <div className="tableitem">
                <p className="itemtext text_p">
                  {NumberFormat(payState)} so'm
                </p>
              </div>
            </div>
          </div>

          <div id="legalcopy">
            <h1>{filterarxiv}</h1>
            <p>Sizning navbatingiz!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckList;
