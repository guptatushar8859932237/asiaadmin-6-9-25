import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import logo from "../../Assests/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useLocation } from "react-router-dom";
export default function Billpdf() {
  const location = useLocation();
  console.log(location.state.data);
  const { targetRef } = usePDF({ filename: "InvoicePDF.pdf" });
  return (
    <>
      <div className="wpWrapper ">
        <div className="container-fluid">
          <div className=" ">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon style={{ cursor: "pointer" }} />
                      </div>
                      <div>
                        <h4 className="freight_hd ms-3">Supplier Form</h4>
                      </div>
                    </div>
                    <MdDownloadForOffline
                      className="fs-2"
                      style={{ color: "#1b2245", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <section
                className="pt-4"
                style={{ marginTop: "10px" }}
                ref={targetRef}
              >
                <div
                  style={{
                    height: "auto",
                    width: "100%",
                    border: "1px solid black",
                    padding: 20,
                    outline: "auto",
                  }}
                >
                  <p>
                    <table style={{ margin: "20px" }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <div>
                              <img
                                style={{ height: 55 }}
                                src={logo}
                                alt="hellow"
                              />
                            </div>
                          </td>
                          <td style={{ width: "50%", color: "#000" }}>
                            <p
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                marginBottom: "unset",
                                borderBottom: "1px solid #cb191e",
                                display: "inline-block",
                                paddingBottom: 5,
                              }}
                            >
                              Asia Direct - Africa
                            </p>
                            <p
                              style={{
                                fontSize: 15,
                                fontWeight: 500,
                                marginBottom: "unset",
                                lineHeight: "1.5",
                                marginTop: 10,
                              }}
                            >
                              Asia Direct, Unit 4 Villa Valencia 2 Anemoon Road
                              Glen Marais 1619 South Africa Mauritania
                              www.asiaDirect.africa{" "}
                            </p>
                            <p>
                              <span>VAT Number: 4740280377</span>
                              <br />
                              TEL: +27 10 448 0733
                            </p>
                            <p> </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ paddingTop: "20px", marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{ fontSize: 15, textTransform: "lowercase" }}
                          ></td>
                          <td
                            style={{
                              fontSize: 15,
                              padding: "0px 20px",
                              textTransform: "lowercase",
                            }}
                          ></td>
                          <td
                            style={{ fontSize: 15, textTransform: "lowercase" }}
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        padding: "10px 20px",
                        width: "100%",
                        marginTop: 20,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              fontSize: 15,
                              fontWeight: 600,
                              width: "100%",
                            }}
                          >
                            FREIGHT ESTIMATE
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        border: "2px solid #1b2245",
                        borderTop: "unset",
                        width: "100%",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              borderRight: "2px solid #1a2142",
                              height: "100%",
                            }}
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 15,
                                      padding: "0px 10px",
                                    }}
                                  >
                                    <strong></strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Shipment Details ISO Commodity
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  {}
                                  <td style={{ padding: "0px 10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>incoterm</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>dimension</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>weight</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Rate of Exchange
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: 10,
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Final Base Currency</strong>
                                      </p>
                                      <select
                                        className="select_supplier border"
                                        style={{
                                          margin: 0,
                                          fontSize: 13,
                                          fontWeight: 700,
                                          paddingLeft: 5,
                                          width: "40%",
                                          border: "2px",
                                        }}
                                        name="final_base_currency"
                                      >
                                        <option>Select</option>
                                        <option>RAND</option>
                                        <option>USD</option>
                                        <option>INR</option>
                                        <option>EURO</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td style={{ width: "50%", paddingTop: 10 }}>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      width: 170,
                                      display: "block",
                                      padding: "0px 10px 10px 10px",
                                      fontSize: 15,
                                    }}
                                  >
                                    <strong>Reference</strong>
                                  </td>
                                  <td
                                    style={{ paddingBottom: 10, fontSize: 15 }}
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "0px 10px 10px 10px",
                                      width: 170,
                                      display: "block",
                                      paddingBottom: 10,
                                      fontSize: 15,
                                    }}
                                  >
                                    <strong>Quote Date</strong>
                                  </td>
                                  <td
                                    style={{
                                      paddingBottom: 15,
                                      fontSize: 15,
                                      padding: "0px 10px 10px 10px",
                                    }}
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 15,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: 15 }}>
                                    Shipment Details
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td style={{ padding: "0px 10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Country of Origin</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Loading</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Discharge</strong>
                                      </p>
                                      <p
                                        className="text-dark"
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Place of Delivery</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>
                                          {" "}
                                          Freight Collect Accepted
                                        </strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                    {/* <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>
                                          {" "}
                                          Frequency from Port of Loading
                                        </strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.quote_received}
                                      </p>
                                    </div> */}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Estimated Transit Time</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 15,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      ></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>

                  <table style={{ width: "100%", marginBottom: 20 }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              border: "1px solid black",
                              width: "31%",
                              borderBottom: "0px solid transparent",
                              height: 22,
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                paddingLeft: 5,
                              }}
                            >
                              QUOTE INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Items
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "31%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Description
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                name="freight_currency"
                              >
                                <option>Select</option>
                                <option>RAND</option>
                                <option>USD</option>
                                <option>INR</option>
                                <option>EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Cost
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                GP
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "10%",
                                height: 22,
                                borderRight: "0px solid transparent",
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                ROE
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Amount()
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                }}
                              >
                                Final Amount
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              >
                                Air Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              {/* {freight.freight_currency} */}

                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="USD"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                class=" supplier_form"
                                name="freight_amount"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>

                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                name="freight_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                name="Roefreight"
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Total for Freight
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                value=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            ></div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                name="origin_currency"
                              >
                                <option>Select</option>
                                <option>RAND</option>
                                <option>USD</option>
                                <option>INR</option>
                                <option>EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                name="roe_origin_currency"
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Pick-up
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_pick_up"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_pickup_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Customs
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_customs"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_customs_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Document
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_document"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="origin_document_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Warehouse
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                name="origin_warehouse"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                name="origin_warehouse_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={final21}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={
                                //   isNaN(final21 * freight.roe_origin_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         final21 * freight.roe_origin_currency
                                //       ).toFixed(2)
                                // }
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Port Fees{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                // onChange={handlechangecalc}
                                // value={freight?.origin_port_fees}
                                name="origin_port_fees"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // onChange={handlechangecalc}
                                // value={freight?.origin_port_fees_gp}
                                name="origin_port_fees_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={finalori34}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finalori34 * freight.roe_origin_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finalori34 * freight.roe_origin_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Origin_Other
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                // onChange={handlechangecalc}
                                // value={freight.origin_other}
                                name="origin_other"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // value={freight.origin_other_gp}
                                // onChange={handlechangecalc}
                                name="origin_other_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_origin_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={finalori35}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finalori35 * freight.roe_origin_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finalori35 * freight.roe_origin_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Total for Origin Charges{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={origintotal.toFixed(2)}
                                placeholder="41.18"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                // value={
                                //   isNaN(origintotal * freight.roe_origin_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         origintotal * freight.roe_origin_currency
                                //       ).toFixed(2)
                                // }
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              {/* <select
                                                                className="select_supplier"
                                                                style={{
                                                                    margin: 0,
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    paddingLeft: 5,
                                                                    width: "100%",
                                                                    border: 0,
                                                                }}
                                                                onChange={handlechangecalc}
                                                                name="des_currency"
                                                            >
                                                                <option>Select</option>
                                                                <option>RAND</option>
                                                                <option>USD</option>
                                                                <option>INR</option>
                                                                <option>EURO</option>
                                                            </select> */}
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <select
                                className="select_supplier"
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  width: "100%",
                                  border: 0,
                                }}
                                // onChange={handlechangecalc}
                                name="des_currency"
                              >
                                <option>Select</option>
                                <option>RAND</option>
                                <option>USD</option>
                                <option>INR</option>
                                <option>EURO</option>
                              </select>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // onKeyPress={handlepresss}
                                // onChange={handlechangecalc}
                                name="roe_des_currency"
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Delivery{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                // onChange={handlechangecalc}
                                // value={freight.des_delivery}
                                name="des_delivery"
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                // value={freight.des_delivery_gp}
                                className="supplier_form"
                                // onChange={handlechangecalc}
                                name="des_delivery_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={finaldestation5}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finaldestation5 * freight.roe_des_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finaldestation5 * freight.roe_des_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Customs
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                // onChange={handlechangecalc}
                                name="des_customs"
                                // value={freight.des_customs}
                                className="supplier_form"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form "
                                // value={freight.des_customs_gp}
                                // onChange={handlechangecalc}
                                name="des_customs_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={finaldestation6}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finaldestation6 * freight.roe_des_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finaldestation6 * freight.roe_des_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Document
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // onChange={handlechangecalc}
                                // value={freight.des_document}
                                name="des_document"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // onChange={handlechangecalc}
                                // value={freight.des_document_gp}
                                name="des_document_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={finaldestation4}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finaldestation4 * freight.roe_des_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finaldestation4 * freight.roe_des_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Warehouse
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form "
                                // value={freight.des_warehouse}
                                // onChange={handlechangecalc}
                                name="des_warehouse"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // onChange={handlechangecalc}
                                // value={freight.des_warehouse_gp}
                                name="des_warehouse_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.roe_des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={finaldestation}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                // value={
                                //   isNaN(finaldestation * freight.roe_des_currency)
                                //     ? 0
                                //     : parseFloat(
                                //         finaldestation * freight.roe_des_currency
                                //       ).toFixed(2)
                                // }
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Port Fees{" "}
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                // value={freight.des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // onKeyPress={handlepresss}
                                className="supplier_form"
                                // value={freight.des_port_fees}
                                // onChange={handlechangecalc}
                                name="des_port_fees"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                type="text"
                                // /onKeyPress={handlepresss}
                                className="supplier_form"
                                // value={freight.des_port_fees_gp}
                                // onChange={handlechangecalc}
                                name="des_port_fees_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                //   value={freight.roe_des_currency}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Unpack
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form "
                                name="des_unpack"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="des_unpack_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              >
                                Destination_Other
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form"
                                name="des_other"
                                id="floatingInput"
                                placeholder="0.00"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                type="text"
                                className="supplier_form "
                                name="des_other_gp"
                                id="floatingInput"
                                placeholder="0.00%"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              >
                                Total for Destination Charges
                              </p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder=""
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",

                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                placeholder="0.00"
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderBottom: "none",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                borderTop: "0px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "31%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRight: "0px solid transparent",
                                width: "10%",
                                height: 22,
                                borderBottom: "1px solid black",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 700,
                                  paddingRight: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                height: 22,
                                border: "1px solid transparent",
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "31%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid transparent",
                                width: "10%",
                                height: 22,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,

                                  paddingLeft: 5,
                                  textAlign: "center",
                                }}
                              ></p>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                width: "20%",
                                height: 22,
                                display: "flex",
                                justifyContent: "space-around",
                                borderBottom: "1px solid black",
                                borderTop: "0px solid transparent",
                                alignItems: "center",
                              }}
                            >
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                              <input
                                style={{
                                  marginBottom: 0,
                                  fontSize: 13,
                                  color: "black",
                                  fontWeight: 400,
                                  paddingLeft: 5,
                                  textAlign: "center",
                                  width: "100%",
                                  border: "0px",
                                  verticalAlign: "middle",
                                }}
                                className="supplier_form"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center"></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
