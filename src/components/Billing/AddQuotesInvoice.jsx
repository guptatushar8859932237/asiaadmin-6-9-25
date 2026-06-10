import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../Assests/logo.png";

const handleclicknav = () => {
    // navigate("/Admin/managefreight");
    window.history.back();
};

const AddQuotesInvoice = () => {
    return (
        <>
            <div className="wpWrapper">
                <div className="container-fluid">
                    <div className=" ">
                        <div className=" ">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="d-flex">
                                            <ArrowBackIcon
                                                onClick={handleclicknav}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <h4 className="freight_hd mb-0">
                                                Quotes Estimate Form
                                                {/* {isCopyPreview && (
                                                    <span className="badge bg-warning text-dark ms-2 small">
                                                        Copy preview — not saved yet
                                                    </span>
                                                )} */}
                                            </h4>
                                        </div>
                                        <div className="d-flex gap-3 align-items-center blueText">
                                            <i
                                                // onClick={() => downloadPDF1()}
                                                class="fa fa-download"
                                                aria-hidden="true"
                                            ></i>

                                            {/* <i class="fa fa-address-card" onClick={() => downloadPDF()}></i>  */}

                                            <button className="blueBtn">
                                                Select Shipment
                                            </button>
                                            <button className="blueBtn">
                                                Select Supplier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section style={{ margin: 0, padding: 0 }}>
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        outline: "auto",
                                        height: "auto",
                                    }}
                                    className="pdf-page"
                                >
                                    <p>
                                        <table>
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
                                                    <td
                                                        style={{
                                                            width: "50%",
                                                            color: "#000",
                                                            paddingBottom: "10px",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize: 20,
                                                                fontWeight: 600,
                                                                marginBottom: "unset",
                                                                borderBottom: "1px solid #cb191e",
                                                                display: "inline-block",
                                                            }}
                                                        >
                                                            Asia Direct - Africa
                                                        </p>
                                                        <p
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                marginBottom: "unset",
                                                                lineHeight: "1.5",
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            Asia Direct, Unit 4 Villa Valencia 2 Anemoon Road
                                                            Glen Marais 1619 South Africa Web
                                                            www.asiaDirect.africa{" "}
                                                        </p>
                                                        <p>
                                                            <span>VAT Number: 4740280377</span>
                                                            <br />
                                                            TEL: +27 10 448 0733
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{
                                            border: "2px solid #1b2245",
                                            padding: "10px 20px",
                                            width: "100%",
                                        }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        textAlign: "center",
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                        width: "100%",
                                                    }}>
                                                        FREIGHT ESTIMATE
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{
                                            border: "2px solid #1b2245",
                                            borderTop: "unset",
                                            width: "100%",
                                        }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        width: "50%",
                                                        borderRight: "2px solid #1a2142",
                                                        height: "100%",
                                                    }}>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{
                                                                        fontSize: 14,
                                                                        padding: "5px",
                                                                    }}>
                                                                        <strong>xyz
                                                                            <br />
                                                                            ABC</strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",

                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        Shipment Details ISO Commodity
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ padding: "10px" }}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <p style={{
                                                                                fontSize: 14,
                                                                                marginBottom: "unset",
                                                                            }}>
                                                                                <strong>Waybill</strong>
                                                                            </p>
                                                                            <p style={{
                                                                                fontSize: 14,
                                                                                marginBottom: "unset",
                                                                            }}>
                                                                                123445233
                                                                            </p>
                                                                        </div>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                        }}>
                                                                            <p style={{
                                                                                fontSize: 14,
                                                                                marginBottom: "unset",
                                                                                marginTop: 5,
                                                                            }}>
                                                                                <strong>Carrier</strong>
                                                                            </p>
                                                                            <p style={{
                                                                                fontSize: 14,
                                                                                marginBottom: "unset",
                                                                                marginTop: 5,
                                                                            }}>
                                                                                carries
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Vessel</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                5535tr63rgd
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>ETD</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                10-06-26
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>ATD</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                10-06-26
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Chargeable</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    // onKeyPress={handlepresss}
                                                                                    name="chargable_rate"
                                                                                // value={freight.chargable_rate}
                                                                                // onChange={handlechangecalc}
                                                                                ></input>
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Status</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                unpaid
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Origin Agent</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                Delhi
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Freight</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                12345678
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            margin: "0px",
                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        Rate of Exchange
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ padding: "5px" }}>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
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
                                                                                // onChange={handlechangecalc}
                                                                                name="final_base_currency"
                                                                            // value={freight?.final_base_currency}
                                                                            >
                                                                                <option>Select</option>
                                                                                <option value="RAND">RAND</option>
                                                                                <option value="USD">USD</option>
                                                                                <option value="INR">INR</option>
                                                                                <option value="EURO">EURO</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{
                                                                        width: 170,
                                                                        display: "block",
                                                                        padding: "0px 10px 0px 10px",
                                                                        fontSize: 14,
                                                                    }}><strong>
                                                                            Invoice No.
                                                                        </strong></td>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        <input
                                                                            type="text"
                                                                            // onKeyPress={handlepresss}
                                                                            name="supplier_invoice_no"
                                                                        // value={freight.supplier_invoice_no}
                                                                        // onChange={handlechangecalc}
                                                                        ></input>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{
                                                                        width: 170,
                                                                        display: "block",
                                                                        padding: "0px 10px 0px 10px",
                                                                        fontSize: 14,
                                                                    }}>
                                                                        <strong>Reference</strong>
                                                                    </td>
                                                                    <td style={{ fontSize: 14 }}>
                                                                        REF123456
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{
                                                                        padding: "0px 10px 0px 10px",
                                                                        width: 170,
                                                                        display: "block",
                                                                        paddingBottom: 0,
                                                                        fontSize: 14,
                                                                    }}>
                                                                        <strong>Quote Date</strong>
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            fontSize: 14,
                                                                        }}
                                                                    >
                                                                        10-06-26
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{
                                                                        padding: "0px 10px 0px 10px",
                                                                        width: 170,
                                                                        display: "block",
                                                                        fontSize: 14,
                                                                    }}>
                                                                        <strong>Due Date</strong>
                                                                    </td>
                                                                    <td style={{
                                                                        fontSize: 14,
                                                                    }}>
                                                                        <input
                                                                            type="date"
                                                                            name="due_date"
                                                                            // onKeyPress={handlepresss}
                                                                            // value={freight.due_date}
                                                                            // onChange={handlechangecalc}
                                                                            style={{
                                                                                padding: "4px 8px",
                                                                                fontSize: "14px",
                                                                                borderRadius: "4px",
                                                                                border: "1px solid #ccc",
                                                                                fontFamily: "inherit"
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table style={{
                                                            background: "#1b2245",
                                                            width: "100%",
                                                            color: "white",
                                                            fontSize: 14,
                                                            textAlign: "center",
                                                            margin: "5px 0px",
                                                            padding: 2,
                                                        }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ fontSize: 14 }}>
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
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Port Of Loading</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                5002
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Port Of Discharge</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                5005
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Destination Agent</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                test
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>Container</strong>
                                                                            </p>
                                                                            <p
                                                                                className="text-dark"
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                test
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Load</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                iieiuif
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Release Type</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                hfehfuieg
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong> Origin Country Name</strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                huhuihhfb
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                <strong>
                                                                                    {" "}
                                                                                    Destination Country Name
                                                                                </strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    marginBottom: "unset",
                                                                                    marginTop: 5,
                                                                                }}
                                                                            >
                                                                                uehuehiueg
                                                                            </p>
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
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: 0, borderRight: "1px solid black" }}>
                                                    <div
                                                        style={{
                                                            border: "1px solid black",
                                                            width: "31%",
                                                            borderBottom: "0px solid transparent",
                                                            height: 22,
                                                            borderTop: "unset",
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
                                                            Shipment Estimate
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                     <div className="table-responsive">
                                         <table class="cost-table">

                                         </table>
                                     </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddQuotesInvoice;