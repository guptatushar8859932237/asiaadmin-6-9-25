import React, { useEffect } from "react";
import image from "../Assests/favicon.png";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import axios from "axios";
export default function Customeclearingbill() {
  const location = useLocation();
  const [data, setData] = React.useState([]);
  const dataget = location.state.data;
  console.log(dataget);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
 const navigate = useNavigate();
  const handleclick = () => {
    navigate("/Admin/order");
  };

useEffect(() => { 
  getalldata()
},[])
const getalldata = async () => {
  try {
    console.log("dataget", dataget.order_id);

    const postData = {
      orderId: dataget.order_id,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}OrderDetailsById`,
      postData
    );

    console.log(response.data.data[0]);
    setData(response.data.data[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className=" ">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="">
                <ArrowBackIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleclick();
                  }}
                />
              </div>
              <div className="">
                <h5>Custom Clearance</h5>
              </div>
            </div>
            <div>
              <MdDownloadForOffline
                className="fs-2"
                onClick={() => toPDF()}
                style={{ color: "#1b2245" }}
              />
            </div>
          </div>
          <div>
            <div className="mainCustomClear" ref={targetRef}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ width: "100%" }}>
                    <td style={{ width: "100%" }}>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr style={{ width: "100%" }}>
                            <td style={{ width: "100%" }}>
                              <h2
                                style={{
                                  textAlign: "center",
                                  margin: "5px 0px",
                                }}
                              >
                                Asia Direct - Africa (Pty) Ltd
                              </h2>
                              <div className="prantVills">
                                <p>
                                  <span>Address :</span>
                                  <span>
                                    Unit 4, Villa Valencia Office Park, 2
                                    Anemoon Ave
                                  </span>{" "}
                                </p>
                                <p> Kempton Park, South Africa, 1619 </p>
                                <p>
                                  <span>Reg :</span>
                                  <span> 2017 / 667803 / 07</span>{" "}
                                </p>
                                <p>
                                  <span>Vat :</span>
                                  <span> 4740280377 </span>{" "}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td>
                              <h3 style={{ margin: "5px 0px" }}>
                                Letter of Authority: Customs Clearing &amp;
                                Handling
                              </h3>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "50%" }}>
                              <div style={{ textAlign: "center" }}>
                                <img
                                  style={{ height: 85 }}
                                  src={image}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td style={{ width: "50%" }}>
                              <table style={{ width: "100%", marginTop: 11 }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: 0 }}>
                                      <div
                                        style={{
                                          border: "1px solid black",
                                          width: "50%",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            padding: "3px 3px 3px 5px",
                                          }}
                                        >
                                          Importer Details
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "start",
                                          border: "1px solid black",
                                          width: "100%",
                                        }}
                                      >
                                        <div style={{ width: "65%" }}>
                                          <p
                                            style={{
                                              margin: 5,
                                              fontSize: 11,
                                              fontWeight: 600,
                                            }}
                                          >
                                            {dataget.client_name}
                                          </p>
                                          <p
                                            style={{
                                              margin: 5,
                                              fontSize: 11,
                                              fontWeight: 500,
                                              lineHeight: "1.7",
                                            }}
                                          >
                                            {dataget.address_1}
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            borderLeft: "1px solid black",
                                            width: "45%",
                                            marginTop: 15,
                                            borderTop: "1px solid #000",
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: 0,
                                              fontSize: 11,
                                              fontWeight: 600,
                                              padding: "3px 3px 3px 5px",
                                            }}
                                          >
                                            Email
                                          </p>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderTop: "1px solid #000",
                                            }}
                                          >
                                            <p
                                              style={{
                                                marginBottom: 0,
                                                padding: "3px 3px 3px 5px",
                                                fontSize: 11,
                                                color: "black",
                                                fontWeight: 400,
                                                paddingLeft: 5,
                                              }}
                                            >
                                              {dataget.client_email}
                                            </p>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderTop: "1px solid #000",
                                            }}
                                          >
                                            <p
                                              style={{
                                                margin: 0,
                                                fontSize: 11,
                                                fontWeight: 600,
                                                padding: "3px 3px 3px 5px",
                                              }}
                                            >
                                              Importers Code
                                            </p>
                                          </div>
                                          <div
                                            style={{
                                              width: "100%",
                                              borderTop: "1px solid #000",
                                            }}
                                          >
                                            <p
                                              style={{
                                                marginBottom: 0,
                                                fontSize: 11,
                                                color: "black",
                                                fontWeight: 400,
                                                padding: "3px 3px 3px 5px",
                                              }}
                                            >
                                              {dataget.code}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          borderRight: "1px solid #000",
                                          width: "100%",
                                          borderLeft:
                                            "1px solid rgba(255, 0, 0, 0)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "41%",
                                            marginLeft: "auto",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              justifyContent: "end",
                                            }}
                                          >
                                            <div
                                              style={{
                                                border: "1px solid #000",
                                                borderTop: "unset",
                                                borderRight: "unset",
                                                width: "100%",
                                              }}
                                            >
                                              <p
                                                style={{
                                                  margin: 0,
                                                  fontSize: 11,
                                                  fontWeight: 600,
                                                  padding: "3px 3px 3px 5px",
                                                }}
                                              >
                                                Vat Number / Company / ID Reg
                                              </p>
                                              <p
                                                style={{
                                                  borderTop: "1px solid #000",
                                                  margin: 0,
                                                  fontSize: 11,
                                                  fontWeight: 600,
                                                  textAlign: "right",
                                                  padding: "3px 3px 3px 5px",
                                                }}
                                              >
                                                {dataget.company_id}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table style={{ width: "100%", marginTop: 5 }}>
                                <tbody>
                                  <tr>
                                    <td style={{ padding: 0 }}>
                                      <div
                                        style={{
                                          border: "1px solid black",
                                          width: "50%",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <p
                                          style={{
                                            margin: 0,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            padding: "3px 3px 3px 5px",
                                          }}
                                        >
                                          {dataget.local_carrier}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "start",
                                          border: "1px solid black",
                                          width: "100%",
                                        }}
                                      >
                                        <div style={{ width: "65%" }}>
                                          <p
                                            style={{
                                              margin: 5,
                                              fontSize: 11,
                                              fontWeight: 600,
                                            }}
                                          >
                                            {dataget.shipper}
                                          </p>
                                          <p
                                            style={{
                                              margin: 5,
                                              fontSize: 11,
                                              fontWeight: 500,
                                              lineHeight: "1.7",
                                            }}
                                          >
                                            {dataget.shipper_address}
                                          </p>
                                        </div>
                                      </div>
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
                          border: "1px solid",
                          color: "#000000",
                          width: 220,
                          paddingLeft: 5,
                          borderBottom: "none",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "5px",
                              }}
                            >
                              CARRIER INFORMATION
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "1px solid #000" }}
                      >
                        <tbody>
                          <tr>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                              }}
                            >
                              CARRIER
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                              }}
                            >
                              ORDER NUMBERS / REFERENCE
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.carrier}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 11,
                                fontWeight: 500,
                              }}
                            >
                              {`OR000${dataget.order_id}`}
                            </td>
                          </tr>
                          <tr>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                              }}
                            >
                              RELEASE TYPE
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                              }}
                            >
                              LOCAL CLEARING AGENT
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.release_type}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.local_carrier}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "unset" }}
                      >
                        <tbody>
                          <tr style={{ border: "unset" }}>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              VESSEL / VOYAGE / IMO(LLOYDS)
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              {" "}
                              CONTAINER No
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              {" "}
                              MASTER BILL OF LADING
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              {" "}
                              HOUSE BILL OF LADING
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.vessel}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.container_no}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.master_landing_bill}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.house_bill_landing}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "unset" }}
                      >
                        <tbody>
                          <tr style={{ borderTop: "unset" }}>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                                borderTop: "unset",
                              }}
                            >
                              Incoterms
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                width: "50%",
                                borderTop: "unset",
                              }}
                            >
                              COMMODITY TYPE
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {dataget.incoterm}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                fontSize: 11,
                                fontWeight: 500,
                              }}
                            >
                              {dataget.commodity}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "unset" }}
                      >
                        <tbody>
                          <tr style={{ border: "unset" }}>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              ORIGIN
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              ETD
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              {" "}
                              DESTINATION
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                                width: "25%",
                              }}
                            >
                              {" "}
                              ETA
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {dataget.collection_from_country}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(dataget.date_start).toLocaleDateString(
                                "en-GB"
                              )=='01/01/1970'?"":new Date(dataget.date_start).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {dataget.delivery_to_country}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(
                                dataget.delivery_ETA
                              ).toLocaleDateString("en-GB")=='01/01/1970'?"":new Date(
                                dataget.delivery_ETA
                              ).toLocaleDateString("en-GB")}
                            </td>
                          </tr>
                          <tr style={{ border: "unset" }}>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                              }}
                            >
                              PORT OF LOADING
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                              }}
                            >
                              ETD
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                              }}
                            >
                              {" "}
                              PORT OF DISCHARGE
                            </th>
                            <th
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                borderTop: "none",
                              }}
                            >
                              {" "}
                              ETA
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.port_of_loading}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(data.date_start).toLocaleDateString(
                                "en-GB"
                              )=='01/01/1970'?"":new Date(data.date_start).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.post_of_discharge}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(
                                data.delivery_ETA
                              ).toLocaleDateString("en-GB")=='01/01/1970'?"":new Date(
                                data.delivery_ETA
                              ).toLocaleDateString("en-GB")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          border: "1px solid",
                          color: "#000000",
                          width: 220,
                          paddingLeft: 5,
                          borderBottom: "none",
                          marginTop: 10,
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "5px",
                              }}
                            >
                              {" "}
                              ROUTING INFORMATION{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "1px solid #000" }}
                      >
                        <tbody>
                          <tr>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              Mode
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              Vessel / Voyage / IMO(Lloyds)
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              Load
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              Disch.
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              ETD
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              ETA
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.mode_of_transport}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.vessel}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}></td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.destination}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(data.date_start).toLocaleDateString(
                                "en-GB"
                              )=='01/01/1970'?"":new Date(data.date_start).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {new Date(
                                data.delivery_ETA
                              ).toLocaleDateString("en-GB")=="01/01/1970"?"":new Date(
                                data.delivery_ETA
                              ).toLocaleDateString("en-GB")}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}></td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          border: "1px solid",
                          color: "#000000",
                          width: 220,
                          paddingLeft: 5,
                          borderBottom: "none",
                          marginTop: 10,
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "5px",
                              }}
                            >
                              {" "}
                              CONSIGNMENT INFORMATION
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "1px solid #000" }}
                      >
                        <tbody>
                          <tr>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              MARKS AND NUMBERS
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              GOODS DESCRIPTION
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              WEIGHT
                            </th>
                            <th style={{ fontSize: 11, fontWeight: 700 }}>
                              VOLUME
                            </th>
                            <th
                              style={{ fontSize: 11, fontWeight: 700 }}
                              colSpan={2}
                            >
                              PACKS (OUT/IN)
                            </th>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>0</td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.product_desc}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.weight}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.volumetric_weight}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}>
                              {data.no_of_packages}
                            </td>
                            <td style={{ fontSize: 11, fontWeight: 500 }}> </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ marginTop: 5 }}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              COMMENTS
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="cmaBorder"
                        style={{ width: "100%", border: "1px solid #000" }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ width: "40%" }} />
                            <td style={{ padding: 0, border: "unset" }}>
                              <table
                                className="cmaBorder borderBottomClear"
                                style={{ width: "100%", borderTop: "unset" }}
                              >
                                <tbody>
                                  <tr style={{ border: "unset" }}>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        borderTop: "unset",
                                      }}
                                    >
                                      DESCRIPTION OF GOODS
                                    </th>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        borderTop: "unset",
                                      }}
                                    >
                                      Duty
                                    </th>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        borderTop: "unset",
                                      }}
                                    >
                                      Vat
                                    </th>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        borderTop: "unset",
                                      }}
                                    >
                                      Total
                                    </th>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {data.product_desc}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    >
                                      {" "}
                                    </td>
                                    <td
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></td>
                                  </tr>
                                  <tr style={{ border: "unset" }}>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        textAlign: "right",
                                        borderRight: "1px solid",
                                      }}
                                    >
                                      Total{" "}
                                    </th>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        borderRight: "none",
                                      }}
                                    >
                                      {" "}
                                    </th>
                                    <th
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        borderRight: "unset",
                                      }}
                                    >
                                      {" "}
                                    </th>
                                    <th
                                      style={{ fontSize: 11, fontWeight: 500 }}
                                    ></th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <h3 style={{ marginBottom: 10 }}>
                                In respect of the above shipment:
                              </h3>
                              <p>
                                "We, the CONSIGNEE, "&amp;D5&amp;" fully
                                indemnify the Agent: Asia Direct - Africa,
                                transacting through its principals, employees
                                and agents, and to hold all of you completely
                                harmless in respect of any liability, claims,
                                loss, damages, demurrage, penalties, costs or
                                expense of whatever n"&amp;"ature and howsoever
                                caused, which may be incurred by you, by reason
                                of releasing the above shipment to us, in
                                accordance with our request. We the CONSIGNEE
                                further, agree to remain liable for any
                                liability, penalty, damages, loss, demurrage or
                                expense of "&amp;"whatever nature and howsoever
                                caused, that may arise or be incurred by reason
                                of you releasing the above shipment and
                                container to us, our agents, servants or
                                transporter."
                              </p>
                              <p style={{ marginTop: 10 }}>
                                "We, the CONSIGNEE, "&amp;D5&amp;" fully
                                indemnify the Agent: Asia Direct - Africa,
                                transacting through its principals, employees
                                and agents, and to hold all of you completely
                                harmless in respect of any liability, claims,
                                loss, damages, demurrage, penalties, costs or
                                expense of whatever n"&amp;"ature and howsoever
                                caused, which may be incurred by you, by reason
                                of releasing the above shipment to us, in
                                accordance with our request. We the CONSIGNEE
                                further, agree to remain liable for any
                                liability, penalty, damages, loss, demurrage or
                                expense of "&amp;"whatever nature and howsoever
                                caused, that may arise or be incurred by reason
                                of you releasing the above shipment and
                                container to us, our agents, servants or
                                transporter."
                              </p>
                              <div className="consigneeBottom">
                                <div>
                                  <p>
                                    {" "}
                                    <strong>Consignee</strong>{" "}
                                  </p>
                                  <p>Asia Direct - Africa</p>
                                </div>
                                <div>
                                  <p>
                                    {" "}
                                    <strong>
                                      Vat Number / Company / ID Reg
                                    </strong>{" "}
                                  </p>
                                  <p
                                    style={{
                                      width: 200,
                                      borderBottom: "1px solid #000",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="consigneeBottom">
                                <div>
                                  <p>Represented by </p>
                                  <p
                                    style={{
                                      width: 200,
                                      borderBottom: "1px solid #000",
                                      marginTop: 20,
                                    }}
                                  />
                                </div>
                                <div>
                                  <p>Representative Sign </p>
                                  <p
                                    style={{
                                      width: 200,
                                      borderBottom: "1px solid #000",
                                      marginTop: 20,
                                    }}
                                  />
                                </div>
                                <div>
                                  <p> Date</p>
                                  <p
                                    style={{
                                      width: 200,
                                      borderBottom: "1px solid #000",
                                      marginTop: 20,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
