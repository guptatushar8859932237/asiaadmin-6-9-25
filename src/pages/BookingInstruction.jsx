import React, { useEffect, useState } from "react";
import "./CustomIns.css";
import logo from ".././Assests/logo.png";
import { usePDF } from "react-to-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import { DownloadForOffline } from "@mui/icons-material";
import { data } from "jquery";
import axios from "axios";
const BookingInstruction = () => {
  const navigate = useNavigate();
  const [data,setData]=useState({})
  const openInsForm = () => {
    navigate("/Admin/booking_instruction_form",{state:{data:info}});
  };
  const loaction = useLocation();
  console.log(loaction?.state?.data);
  const info = loaction?.state?.data;
  const { toPDF, targetRef } = usePDF({ filename: "Booking Instruction.pdf" });

  const getdata =async ()=>{
try {
  const orde = {
    order_id:info.order_id
  }
  const response =await axios.post(`${process.env.REACT_APP_BASE_URL}GetBookingInstructionById`,orde)
  console.log(response.data.data)
if(response.data.success===true){
  setData(response.data.data)
}
} catch (error) {
  console.log(error)
}
  }
  useEffect(()=>{
    getdata()
  },[])
  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            <div className="d-flex">
              <h4 class="freight_hd">
                Shipping and Custom Clearance Instruction
              </h4>
              <div className="addInsForm ms-4 ">
                <button onClick={openInsForm}>Add Booking Instruction</button>
              </div>
            </div>
          </div>
          <div>
            <DownloadForOffline onClick={() => toPDF()} />
          </div>
        </div>
        <div className="customInsPdf " ref={targetRef}>
          <table>
            <tr>
              <td>
                <table className="Bordered-table">
                  <tr>
                    <td>
                      <div>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{ width: "50%", border: "1px solid #000" }}
                          >
                            <table style={{ background: "#b2b3b730" }}>
                              <tr>
                                <td
                                  style={{
                                    borderBottom: "1px solid rgb(0, 0, 0)",
                                  }}
                                >
                                  <h6>SHIPPER : </h6>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  SHIPPER:
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {info?.shipment_ref === "shipper"
                                    ? "Asia Direct"
                                    : info?.client_name}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  rowspan="3"
                                  style={{
                                    borderRight: "1px solid #000",
                                    width: "40%",
                                  }}
                                >
                                  ADDRESS
                                </th>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  {info?.shipment_ref === "shipper"
                                    ? "Johannesburg, South Africa"
                                    : info?.address_1}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  {" "}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ borderBottom: "1px solid #000" }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  CONTACT
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {info?.shipment_ref === "shipper"
                                    ? "+27 10 448 0733"
                                    : info?.telephone}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  TEL. NO / EMAIL
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {info?.shipment_ref === "shipper"
                                    ? "sa@asiadirect.africa"
                                    : info?.client_email}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  PO NUMBER TO ASIA DIRECT - AFRICA
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_ship_poNo}</td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  EXPORT CUSTOMS CODE:
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_ship_custCode}</td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  REGISTERED NAME OF IMP / EXPORTERS CODE
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_ship_regNum}</td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td>
                                  <strong>
                                    In the event that the Customer issues
                                    instructions for the use of an exporter’s
                                    code other than the Customer’s own, the
                                    Customer warrants that they do so with the
                                    written authorisation of the owner of the
                                    exporter’s code and a copy of the
                                    authorisation shall be forwarded to Asia
                                    Direct - Africa together with the
                                    instruction.
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  SHIPPER'S REF NO:
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderTop: "1px solid #000",

                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_ship_refNo}</td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>
                                    COMMERICIAL DOCUMENT INFORMATION{" "}
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  MARK WITH AN X THE DOCUMENTS YOU ARE PROVIDING
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_xdoc_provider}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  COMMERCIAL INVOICE
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_comm_Invoice}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  TOTAL COUNT OF COMMERCIAL INVOICES ON THIS
                                  SHIPMENT
                                </th>
                                <td
                                  style={{
                                    width: "130px",
                                    borderLeft: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_count_CommInv}</td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  PACKING LIST
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_packing_list}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  ORIGINAL TRANSPORT DOCUMENTS
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_trasprt_doc}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    whiteSpace: "break-spaces",
                                  }}
                                >
                                  MSDS ( MATERIAL SAFTY DATA SHEET FOR DG CARGO)
                                  / PRODUCT LITERATURE
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_MSDS}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  CUSTOMS DOCUMENTS / RULINGS
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  COUNTRY TRADE AGREEMENT / CERIFICATE / EUR1
                                  /SADC
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_CuntyTrd_SADC}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  LETTER OF CREDIT
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_letter_credit}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>INSURANCE REQUIREMENTS</strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  IS ASIA DIRECT - AFRICA REQUIRED TO PROVIDE
                                  INSURANCE COVER. Please note that should you
                                  not require Insurance goods are carried at
                                  Owners Risk
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_Insur_cover}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  ASIA DIRECT - AFRICA CHARGES ESTIMATE SUPPLIED
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >{data.bk_estim_supp}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  ESTIMATE REF
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "100px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  ESTIMATE REF
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>
                                    {" "}
                                    Africa Gobal Logistics BILLING REQUIREMENTS{" "}
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  SELECT
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >
                                  Shipper
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  Consignee
                                </td>

                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  Other (specify)
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  ORIGIN EXPORT CHARGES
                                </td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_org_exptCharge}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "100px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000",
                                    width: "40%",
                                  }}
                                >
                                  INTERNATIONAL FREIGHT CHARGES
                                </td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_intenFreig_charge}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "100px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  CHARGES AT DESTINATION
                                </td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >{data.bk_charges_destination}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "100px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                  }}
                                ></td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #000" }}>
                                <td> DUTIES & TAXES</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderBottom: "none",
                                  }}
                                >{data.bk_duties_taxes}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderBottom: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "100px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    borderBottom: "none",
                                  }}
                                ></td>
                              </tr>
                            </table>
                          </div>
                          {/* right part end */}
                          <div
                            style={{
                              width: "50%",
                              marginLeft: "10px",
                              border: "1px solid rgb(0, 0, 0)",
                            }}
                          >
                            <table style={{ background: "#b2b3b730" }}>
                              <tr>
                                <td
                                  style={{
                                    borderBottom: "1px solid rgb(0, 0, 0)",
                                  }}
                                >
                                  <h6>CONSIGNEE:</h6>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  CONSIGNEE:
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {" "}
                                  {info?.shipment_ref === "shipper"
                                    ? info?.shipper_name
                                    : "Asia Direct"}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  rowspan="2"
                                  style={{
                                    borderRight: "1px solid #000",
                                    width: "40%",
                                  }}
                                >
                                  ADDRESS
                                </th>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  {/* address_1 */}
                                  {info?.shipment_ref === "shipper"
                                    ? info?.address_1
                                    : "Johannesburg, South Africa"}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  {" "}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  NOTIFY PARTY
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {data.bk_consg_notfParty}
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  CONTACT PERSON
                                </th>
                                <td
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {info?.shipment_ref === "shipper"
                                    ? info?.cellphone
                                    : "+27 10 448 0733"}
                                </td>
                                <td
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  TEL
                                </td>
                                <td
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  {info?.shipment_ref === "shipper"
                                    ? info?.telephone
                                    : ""}
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  PORT OF DISCHARGE
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderLeft: "1px solid #000",
                                  }}
                                >
                                  {info.post_of_discharge}
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                    borderTop: "1px solid #000",
                                  }}
                                >
                                  <strong>
                                    TRANSPORT DOCUMENT INSTRUCTIONS
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  CONTACT PERSON TO RECEIVE TRACKING REPORTS
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderTop: "1px solid #000",

                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_track_contPersn}</td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  CONTACT PERSON TO RECEIVE POD DOCUMENTS
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderTop: "1px solid #000",

                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_podDoc_contPersn}</td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>EXPORT MODE OF TRANSPORT</strong>
                                </td>
                              </tr>
                            </table>
                            <table className="selectRight">
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "95px",
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  SELECT
                                </th>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >
                                  {data.bk_exprt_modTransport}
                                  <br />
                                  {/* {info.fcl_lcl} */}
                                </td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  className="exWidth"
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                ></th>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                              </tr>
                            </table>

                            <table className="">
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>
                                    COMMERICAL TERMS OF SALE ( INCOTERMS 2020 ){" "}
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table className="selectRight">
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    width: "95px",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  NAMED PLACE
                                </th>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    textAlign: "center",
                                  }}
                                >
                                  {data.bk_comTerm_sales}
                                </td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "70px",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "70px",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "70px",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "70px",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table className="selectRight">
                              <tr>
                                <th
                                  style={{
                                    borderRight: "1px solid #000",
                                    borderBottom: "1px solid #000",
                                    width: "95px",
                                  }}
                                ></th>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  className="exWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "140px",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    width: "140px",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table className="selectRight">
                              <tr>
                                <th
                                  style={{
                                    borderTop: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    width: "95px",
                                    borderTop: "none",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  EXPORTERS BANK NAME
                                </th>
                                <td
                                  rowSpan={2}
                                  style={{
                                    width: "195px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                    borderBottom: "1px solid #000",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "140px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  DO YOU WANT Africa Gobal Logistics TO ALLOCATE
                                  UCR REFERENCE
                                </td>

                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  className="lclWidth"
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table className="">
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                    borderBottom: "1px solid #000",
                                  }}
                                >
                                  <strong>SHIPMENT DETAILS</strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  HAZARDOUS CARGO
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  {data.bk_hazard_cargo}
                                </td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  IF YES ,PROVIDE IMCO CLASS/ UN# AND PROPER
                                  SHIPPING NAME
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>

                              {/* two row */}
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  IS THE CARGO PACKED TO INTERNATIONAL HAZARDOUS
                                  REGULATIONS?
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >{data.bk_cargo_packed}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  IF NO (WHO IS RESPONSIBLE FOR PACKING COSTS )
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                              {/* two row end */}
                              {/* two row */}
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  BATTERIES MSDS MUST BE PROVIDED
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >{data.bk_battery_MSDS}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  ARE THE BATTERIES PACKED SEPERATLY OR INSIDE
                                  OTHER EQUIPMENT
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                              {/* two row end */}
                              {/* two row */}
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  IF SHIPPER HAS PACKED THE SEAFREIGHT CONTAINER
                                  CAN YOU PROVIDE YOUR SOLAS VERFICATION NUMBER
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  IF YES (STATE VERFICATION NUMBER)
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                              {/* two row end */}
                              {/* two row */}
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  IS Africa Gobal Logistics TO ARRANGE
                                  PRE-SHIPMENT INSPECTION?
                                </th>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  IF YES. REFERENCE NUMBER AND INSPECTION BODY
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "85px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    width: "85px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  colSpan={3}
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <th
                                  rowSpan={2}
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  TYPE OF EXPORT ENTRY REQUIRED
                                </th>
                                <td
                                  style={{
                                    width: "85px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  PERMANENT
                                </td>
                                <td
                                  style={{
                                    width: "85px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  TEMPORARY
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  EX BOND
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  RETURN
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  OTHER
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >{data.bk_export_Import}</td>
                                <td
                                  style={{
                                    width: "65px",
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                >
                                  No
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    borderRight: "none",
                                    textAlign: "center",
                                    borderTop: "none",
                                  }}
                                ></td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "center",
                                    background: "#b2b3b730",
                                  }}
                                >
                                  <strong>
                                    {" "}
                                    Africa Gobal Logistics BILLING REQUIREMENTS{" "}
                                  </strong>
                                </td>
                              </tr>
                            </table>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000",
                                    borderTop: "1px solid #000",
                                  }}
                                >
                                  description one
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  description one
                                </td>
                              </tr>
                              <tr>
                                <td>description one</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <table>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                background: "#b2b3b730",
                                marginTop: "20px",
                              }}
                              className="my-2"
                            >
                              <strong>
                                COLLECTION REQUIREMENTS (ONLY COMPLETE IF CARGO
                                IS NOT BEING DELIVERED TO ASIA DIRECT - AFRICA
                                WAREHOUSE)
                              </strong>
                            </td>
                          </tr>
                        </table>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{ width: "50%", border: "1px solid #000" }}
                          >
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  COLLECTION ADDRESS
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                ></td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderRight: "1px solid #000",
                                    width: "40%",
                                  }}
                                >
                                  CONTACT NAME AND TEL
                                </th>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000",
                                    borderBottom: "none",
                                  }}
                                >
                                  Adress line one
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div
                            style={{
                              width: "50%",
                              border: "1px solid #000",
                              marginLeft: "10px",
                            }}
                          >
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "40%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                  }}
                                >
                                  COLLECTION ADDRESS
                                </th>
                                <td
                                  style={{
                                    width: "60%",
                                    borderBottom: "1px solid #000",
                                    borderLeft: "1px solid #000",
                                  }}
                                >{data.bk_coll_dddress}</td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    borderRight: "1px solid #000",
                                    width: "40%",
                                  }}
                                >
                                  CONTACT NAME AND TEL
                                </th>
                                <td
                                  style={{
                                    borderBottom: "1px solid #000",
                                    borderBottom: "none",
                                  }}
                                >
                                  Adress line one
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <table>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                background: "#b2b3b730",
                              }}
                              className="my-2"
                            >
                              <strong>
                                CARGO DETAILS AND CARGO HANDLING REQUIRMENTS
                              </strong>
                            </td>
                          </tr>
                        </table>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{ width: "50%", border: "1px solid #000" }}
                          >
                            <table>
                              <tr>
                                <th
                                  style={{
                                    width: "50%",
                                    borderBottom: "1px solid #000",
                                    borderRight: "1px solid #000",
                                    textAlign: "center",
                                    borderRight: "NONE",
                                  }}
                                >
                                  DESCRIPTION OF GOODS
                                </th>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                  {data.bk_desc_goods}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                               . </td>
                              </tr>
                              <tr>
                                <td style={{ borderBottom: "1px solid #000" }}>
                                .</td>
                              </tr>
                            </table>
                          </div>
                          <div
                            style={{
                              width: "50%",
                              border: "1px solid #000",
                              marginLeft: "10px",
                            }}
                          >
                            <table className="bottomTable">
                              <tr>
                                <th>HANDLING REQUIREMENTS </th>
                                {/* <th>WEIGHT (KG'S)</th>
                                <th>NUMBER OF PIECES </th>
                                <th>LENGTH (METER)</th>
                                <th>WIDTH (METER)</th>
                                <th>HEIGHT (METER)</th> */}
                              </tr>
                              <tr>
                                <td>{data.bk_handling_req}</td>
                                {/* <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>123</td> */}
                              </tr>
                              <tr>
                                <td>.</td>
                                {/* <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>123</td>*/}
                            </tr>
                              <tr>
                                <td>.</td>
                                {/* <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>123</td> */}
                              </tr>
                            </table>
                          </div>
                        </div>
                        <table>
                          <tr>
                            <td style={{ padding: "unset !important" }}>
                              <p style={{ marginTop: "5px" }}>
                                We hereby agree to be bound by the Standard
                                Trading Conditions as set out by Asia Direct -
                                Africa. A copy of which will be made available
                                on request. Please ensure ALL your requirements
                                are completed on the above instruction
                              </p>
                              <p style={{ marginTop: "5px" }}>
                                herby request Asia Direct - Africa to clear and
                                deliver these goods in accordance with the
                                abovementioned shipping and clearing
                                instructions. I further declare that no onther
                                clearing instructions have been given to any
                                other person to effect clearance on my behalf
                                .The person authorising and signing this
                                document certifies that they are duly authorised
                                by the principle company to issue such an
                                instruction
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: "20px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <p
                                    style={{
                                      borderTop: "2px solid #000",
                                      width: "200px",
                                    }}
                                  >
                                    <strong>Name</strong>
                                  </p>
                                </div>
                                <div>
                                  {" "}
                                  <p
                                    style={{
                                      borderTop: "2px solid #000",
                                      width: "200px",
                                    }}
                                  >
                                    <strong>Designation</strong>
                                  </p>
                                </div>
                                <div>
                                  {" "}
                                  <p
                                    style={{
                                      borderTop: "2px solid #000",
                                      width: "200px",
                                    }}
                                  >
                                    <strong>Signature</strong>
                                  </p>{" "}
                                </div>
                                <div>
                                  <p
                                    style={{
                                      borderTop: "2px solid #000",
                                      width: "200px",
                                    }}
                                  >
                                    <strong>Date (yy/mm/dd)</strong>
                                  </p>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "20px",
                                }}
                              >
                                <p style={{ fontSize: "10px" }}>
                                  This document is the property of Africa Global
                                  Logistics; Distribution and reproduction
                                  prohibited without authorisation of the QHSE
                                  Manager
                                </p>
                                <div>
                                  <img
                                    style={{ width: "150px" }}
                                    src={logo}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingInstruction;
