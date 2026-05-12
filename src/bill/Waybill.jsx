import React, { useEffect, useState, useRef } from "react";
import image from "../Assests/favicon.png";
import image2 from "../Assests/img2.png";
import { useLocation, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { MdDownloadForOffline } from "react-icons/md";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { red } from "@mui/material/colors";
export default function Waybill() {
  const location = useLocation();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getdat = location.state.data;
  console.log(location);
  const handleclicknav = () => {
    navigate("/Admin/order");
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    try {
      console.log("dataget", getdat.order_id);
      const postData = {
        orderId: getdat.order_id,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}OrderDetailsById`,
        postData,
      );
      console.log(response.data.data[0]);
      setData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const sectionRef = useRef();
  const handleDownload = async () => {
    const elem = sectionRef.current;
    if (!elem) return;
    const canvas = await html2canvas(elem, {
      scale: 2,
      backgroundColor: "#fff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pxHeight = elem.getBoundingClientRect().height;
    const mmHeight = pxHeight * 0.264583;
    const pageHeight = Math.max(mmHeight, 148);
    const pdf = new jsPDF({
      unit: "mm",
      format: [115, pageHeight],
      orientation: "portrait",
    });
    const pdfWidth = 115;
    const pdfImgHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfImgHeight);
    pdf.save("waybill.pdf");
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          <div>
            <div>
              <div className="row manageFreight">
                <div className="col-12">
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          className="text-dark"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd ms-3 mt-0">Waybill</h4>
                      </div>
                    </div>
                    <MdDownloadForOffline
                      className="fs-2"
                      onClick={handleDownload}
                      style={{ color: "#1b2245" }}
                    />
                  </div>
                </div>
              </div>
              <section
                ref={sectionRef}
                style={{
                  width: "125mm",
                  minHeight: "148mm",
                  padding: "1mm",
                  boxSizing: "border-box",
                  background: "#fff",
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    height: "auto",
                    width: "100%",
                    padding: "1mm",
                  }}
                >
                  <table style={{ border: "1px solid black", width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <table
                            style={{
                              borderBottom: "1px solid black",
                              width: "100%",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    width: "40%",
                                    padding: "1.5mm",
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    src={image}
                                    style={{
                                      width: "100px",
                                      height: 60,
                                      objectFit: "contain",
                                    }}
                                  />
                                </td>
                                <td style={{ width: "60%" }}>
                                  <table className="spaceRight">
                                    <tbody>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                          }}
                                        >
                                          <strong> Consignor:</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                          }}
                                        >
                                          {getdat?.shipper}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                          }}
                                        >
                                          <strong>Email:</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                          }}
                                        >
                                          {getdat?.shipper_email}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                          }}
                                        >
                                          <strong>Telephone:</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                          }}
                                        >
                                          {getdat?.shipper_tel}
                                          {/* +27 10 448 0733 */}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          <table
                            style={{
                              width: "100%",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ verticalAlign: "top" }}>
                                  <table
                                    style={{
                                      width: "100%",
                                      height: 130,
                                    }}
                                  >
                                    <tbody>
                                      <tr style={{ verticalAlign: "top" }}>
                                        <td
                                          style={{
                                            fontSize: 10,
                                            paddingRight: "1mm",
                                            paddingLeft: "1mm",
                                            verticalAlign: "top",
                                          }}
                                        >
                                          <div className="wayConAdd">
                                            <strong
                                              style={{ paddingBottom: "2mm" }}
                                            >
                                              {" "}
                                              Consignee:
                                            </strong>
                                            <div>
                                              <span>
                                                {" "}
                                                {getdat?.client_name
                                                  ?.toLowerCase()
                                                  .split(" ")
                                                  .map(
                                                    (word) =>
                                                      word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                      word.slice(1),
                                                  )
                                                  .join(" ")}
                                              </span>
                                              <span>{getdat?.address_1}</span>
                                              <span>{getdat?.city}</span>
                                              <span> {getdat?.province} </span>
                                              <span>
                                                {data?.user_country_name}
                                              </span>
                                              <span>{getdat?.code}</span>
                                            </div>
                                          </div>{" "}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                    className="spaceRight"
                                  >
                                    <tbody>
                                      <tr>
                                        <td className="w-100">
                                          <Barcode
                                            value={`OR000${getdat?.order_id}`}
                                            width={2}
                                            height={50}
                                            format="CODE128"
                                            displayValue={true}
                                            fontOptions=""
                                            font="monospace"
                                            textAlign="center"
                                            textPosition="bottom"
                                            textMargin={2}
                                            fontSize={20}
                                            background="#ffffff"
                                            lineColor="#000000"
                                            margin={10}
                                          />
                                          <p
                                            style={{
                                              textAlign: "center",
                                              margin: 0,
                                            }}
                                          ></p>
                                          <table
                                            style={{
                                              borderTop: "1px solid black",
                                              width: "100%",
                                            }}
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style={{
                                                    fontSize: 15,
                                                    paddingRight: "1mm",
                                                    paddingLeft: "1mm",
                                                  }}
                                                >
                                                  <strong> Order No:</strong>
                                                </td>
                                                <td>
                                                  <button
                                                    type="button"
                                                    style={{
                                                      backgroundColor:
                                                        "lightgrey",
                                                      color: "black",
                                                      padding: "0px 5px",
                                                      border: 0,
                                                      borderRadius: 20,
                                                      width: "100%",
                                                      margin: "3px 0px",
                                                    }}
                                                  >
                                                    {`OR000${getdat?.order_id}`}
                                                  </button>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                    className="spaceRight"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 14,
                                            padding: "1mm",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          <strong>
                                            {" "}
                                            Delivery Instructions:
                                          </strong>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderTop: "1px solid black",
                                            borderBottom: "1px solid black",
                                            width: "100%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          {data?.special_comments}
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "1px solid black",
                                            width: "100%",
                                            paddingTop: 20,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "1px solid black",
                                            width: "100%",
                                            paddingTop: 20,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            borderBottom: "1px solid black",
                                            width: "100%",
                                            paddingTop: 20,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            width: "100%",
                                            paddingTop: 20,
                                          }}
                                        >
                                          <span />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td
                                  style={{
                                    borderLeft: "1px solid black",
                                    width: "210px",
                                    verticalAlign: "top",
                                  }}
                                >
                                  <table
                                    style={{
                                      width: "100%",
                                      borderBottom: "1px solid black",
                                      marginBottom: 5,
                                    }}
                                    className="spaceRight"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                            textAlign: "start",
                                            width: "20%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong> Ship Date:</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: " 1mm",
                                            textAlign: "end",
                                          }}
                                        >
                                          {new Date(
                                            data.order_created_date,
                                          ).toLocaleDateString("en-GB") ==
                                          "01/01/1970"
                                            ? ""
                                            : new Date(
                                                data.order_created_date,
                                              ).toLocaleDateString("en-GB")}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                            textAlign: "start",
                                            width: "20%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong> Freight No:</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: " 1mm",
                                            textAlign: "end",
                                          }}
                                        >
                                          {data.freight_number}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                            textAlign: "start",
                                            width: "20%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong> Weight(kgs):</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: " 1mm",
                                            textAlign: "end",
                                          }}
                                        >
                                          {data?.weight}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: "1mm",
                                            textAlign: "start",
                                            width: "20%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong> Dims(cbm):</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            paddingRight: " 1mm",
                                            textAlign: "end",
                                          }}
                                        >
                                          {data?.dimension}
                                        </td>
                                      </tr>
                                      <tr style={{ verticalAlign: "sub" }}>
                                        <td
                                          style={{
                                            fontSize: 12,

                                            paddingRight: "1mm",
                                            textAlign: "start",
                                            width: "20%",
                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong> Carton(qty):</strong>
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,

                                            paddingRight: " 1mm",
                                            textAlign: "end",
                                          }}
                                        >
                                          {data?.cartons}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      width: "100%",
                                    }}
                                    className="spaceRight"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: 12,

                                            paddingLeft: "1mm",
                                          }}
                                        >
                                          <strong>Warehouse Details</strong>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <p
                                            style={{
                                              fontSize: 12,
                                              marginBottom: 5,
                                              marginTop: 5,
                                              fontWeight: 500,
                                              paddingLeft: "1mm",
                                            }}
                                          >
                                            {data.warehouse_name}
                                            <br />
                                            {data.warehouse_address}
                                            <br />
                                            <br />
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    style={{
                                      borderTop: "1px solid black",
                                      width: "100%",
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td style={{ textAlign: "center" }}>
                                          <img
                                            src={image2}
                                            style={{
                                              width: "100px",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
