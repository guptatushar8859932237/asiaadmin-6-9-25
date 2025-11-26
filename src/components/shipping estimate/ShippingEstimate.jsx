import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdDownloadForOffline } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import logo from "../../Assests/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import html2pdf from "html2pdf.js";

import { useRef } from "react";

export default function ShippingEstimate() {
  const [error, setError] = useState({});
  const [update, setUpdate] = useState([0]);
  const [destation, setDestation] = useState([0]);
  const location = useLocation();
  const [freight, setFreight] = useState([0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [origin, setOrigin] = useState([0]);
  const [client, setClient] = useState([]);
  const [suppluierquot, setSuppluierquot] = useState([]);
  const [supplierdata, setSupplierdata] = useState([]);
  const [dat, setDat] = useState([]);
  const [openmodal, setOpenmodal] = useState(false);
  const [selected, setSelected] = useState([]); // selected IDs
  const [open, setOpen] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const getdata = location?.state?.data[0];
  console.log(getdata);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const andlemodaloen = () => {
    setOpenmodal(true);
  };
  const handlechangecalc = (e) => {
    const { name, value } = e.target;

    setFreight((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };
  const num1 = parseFloat(freight.freight_amount || 0);
  const num2 = parseFloat(freight.freight_gp || 0);
  const num3 = num1 / (1 - num2 / 100);
  const finalval = isNaN(num3) ? 0 : num3.toFixed(2);
  const finalvalflo = parseFloat(finalval);
  const originhandelc = (e) => {
    const { name, value } = e.target;
    setOrigin({ ...origin, [name]: value });
  };
  const ori1 = parseFloat(freight.origin_pick_up || 0);
  const ori2 = parseFloat(freight.origin_pickup_gp || 0);
  const ori3 = ori1 / (1 - ori2 / 100);
  const finalori = isNaN(ori3) ? 0 : ori3.toFixed(2);
  ///////////////////origin coustomer////////////////////////////////////////////////////////
  const ori4 = parseFloat(freight.origin_customs || 0);
  const ori5 = parseFloat(freight.origin_customs_gp || 0);
  const ori6 = ori4 / (1 - ori5 / 100);
  const finalori2 = isNaN(ori6) ? 0 : ori6.toFixed(2);
  ///////////////////origin document////////////////////////////////////////////////////////
  const ori7 = parseFloat(freight.origin_document || 0);
  const ori8 = parseFloat(freight.origin_document_gp || 0);
  const ori9 = ori7 / (1 - ori8 / 100);
  const finalori3 = isNaN(ori9) ? 0 : ori9.toFixed(2);
  //////////////////////////////////////////////origin  waregouse///////////////////////////////////
  const ori11 = parseFloat(freight.origin_warehouse || 0);
  const ori12 = parseFloat(freight.origin_warehouse_gp || 0);
  const ori13 = ori11 / (1 - ori12 / 100);
  const final21 = isNaN(ori13) ? 0 : ori13.toFixed(2);
  //////////////////////////////////////origin /////////////////////////////////////////
  const ori21 = parseFloat(freight.origin_port_fees || 0);
  const ori22 = parseFloat(freight.origin_port_fees_gp || 0);
  const ori23 = ori21 / (1 - ori22 / 100);
  const finalori34 = isNaN(ori23) ? 0 : ori23.toFixed(2);
  ////////////////////////////origin other///////////////////////////////////////////////////////////////
  const ori31 = parseFloat(freight.origin_other || 0);
  const ori32 = parseFloat(freight.origin_other_gp || 0);
  const ori33 = ori31 / (1 - ori32 / 100);
  const finalori35 = isNaN(ori33) ? 0 : ori33.toFixed(2);
  const origintotal =
    parseFloat(finalori) +
    parseFloat(finalori2) +
    parseFloat(finalori3) +
    parseFloat(final21) +
    parseFloat(finalori34) +
    parseFloat(finalori35);
  const handlechangedestation = (e) => {
    const { name, value } = e.target;
    setDestation({ ...destation, [name]: value });
  };
  ////////////////////////////////////////////Destation warehouse///////////////////////////////////
  const ori41 = parseFloat(freight.des_warehouse || 0);
  const or42 = parseFloat(freight.des_warehouse_gp || 0);
  const or43 = ori41 / (1 - or42 / 100);
  const finaldestation = isNaN(or43) ? 0 : or43.toFixed(2);
  //////////////////////////////////////////////Destation  des_unpack/////////////////////////////////////
  const ori51 = parseFloat(freight.des_unpack || 0);
  const or52 = parseFloat(freight.des_unpack_gp || 0);
  const or53 = ori51 / (1 - or52 / 100);
  const finaldestation1 = isNaN(or53) ? 0 : or53.toFixed(2);
  /////////////////////////////////////////////destation
  const ori61 = parseFloat(freight.des_port_fees || 0);
  const or62 = parseFloat(freight.des_port_fees_gp || 0);
  const or63 = ori61 / (1 - or62 / 100);
  const finaldestation2 = isNaN(or63) ? 0 : or63.toFixed(2);
  ///////////////////////////////////////////////destation des_other ////////////////////////////////////////////
  const ori71 = parseFloat(freight.des_other || 0);
  const or72 = parseFloat(freight.des_other_gp || 0);
  const or73 = ori71 / (1 - or72 / 100);
  const finaldestation3 = isNaN(or73) ? 0 : or73.toFixed(2);
  ///////////////////////////////////////////////destation des_other ////////////////////////////////////////////
  const ori81 = parseFloat(freight.des_document || 0);
  const or82 = parseFloat(freight.des_document_gp || 0);
  const or83 = ori81 / (1 - or82 / 100);
  const finaldestation4 = isNaN(or83) ? 0 : or83.toFixed(2);
  /////////////////////////////////////////////destation delivery/////////////////////////////////////////////
  const ori91 = parseFloat(freight.des_delivery || 0);
  const or92 = parseFloat(freight.des_delivery_gp || 0);
  const or93 = ori91 / (1 - or92 / 100);
  const finaldestation5 = isNaN(or93) ? 0 : or93.toFixed(2);
  ////////////////////////////////////////////////destation /////////////////////////////////////////////
  const des1 = parseFloat(freight.des_customs || 0);
  const des2 = parseFloat(freight.des_customs_gp || 0);
  const des3 = des1 / (1 - des2 / 100);
  const finaldestation6 = isNaN(des3) ? 0 : des3.toFixed(2);
  const destationTotal =
    parseFloat(finaldestation) +
    parseFloat(finaldestation1) +
    parseFloat(finaldestation2) +
    parseFloat(finaldestation3) +
    parseFloat(finaldestation4) +
    parseFloat(finaldestation5) +
    parseFloat(finaldestation6);
  const overallCharge =
    parseFloat(finalvalflo) +
    parseFloat(origintotal) +
    parseFloat(destationTotal);
  const val1 = !isNaN(finalvalflo) ? finalvalflo * freight.Roefreight : 0;
  const val2 = !isNaN(origintotal)
    ? origintotal * freight.roe_origin_currency
    : 0;
  const val3 = !isNaN(destationTotal)
    ? destationTotal * freight.roe_des_currency
    : 0;
  console.log(val1, val2, val3);
  const estimate =
    (isNaN(val1) ? 0 : val1) +
    (isNaN(val2) ? 0 : val2) +
    (isNaN(val3) ? 0 : val3);
  console.log(estimate);
  const finalestimate = estimate > 0 ? estimate.toFixed(2) : 0;
  console.log(finalestimate);
  const handleclick = () => {
    handlevalidate(update);
  };
  const handlevalidate2 = (value) => {
    let error = {};
    if (!value.supplier_id) {
      toast.error("select supplier is requied And update");
    } else {
      apihit();
    }
    setError(error);
  };
  const handlevalidate = (value) => {
    let error = {};
    if (!value.serial_number) {
      error.serial_number = "Serial Number is Required";
    }
    if (!value.date) {
      error.date = "Date is required";
    } else {
      handlevalidate2(freight);
    }
    setError(error);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const apihit = () => {
    console.log(getdata.client_id);
    const formdata = new FormData();
    formdata.append("freight_id", getdata.freight_id);
    formdata.append("client_id", getdata.client_ref);
    formdata.append("client_name", getdata.client_name);
    formdata.append("serial_number", freight.serial_number);
    formdata.append("date", update.date);
    formdata.append("client_ref", getdata.client_ref);
    formdata.append("product_desc", getdata.product_desc);
    formdata.append("type", getdata.type);
    formdata.append("freight_gp", freight.freight_gp);
    formdata.append("freight", getdata.freight);
    formdata.append("incoterm", getdata.incoterm);
    formdata.append("dimension", getdata.dimension);
    formdata.append("weight", getdata.weight);
    formdata.append("freight_currency", freight.freight_currency);
    formdata.append("origin_currency", freight.origin_currency ?? "");
    formdata.append("freight_amount", freight.freight_amount ?? "");
    formdata.append("origin_pick_up", freight.origin_pick_up ?? "");
    formdata.append("origin_pickup_gp", freight.origin_pickup_gp ?? "");
    formdata.append("origin_customs", freight.origin_customs ?? "");
    formdata.append("origin_customs_gp", freight.origin_customs_gp ?? "");
    formdata.append("origin_document", freight.origin_document ?? "");
    formdata.append("origin_document_gp", freight.origin_document_gp ?? "");
    formdata.append("origin_warehouse", freight.origin_warehouse ?? "");
    formdata.append("origin_warehouse_gp", freight.origin_warehouse_gp ?? "");
    formdata.append("origin_port_fees", freight.origin_port_fees ?? "");
    formdata.append("origin_port_fees_gp", freight.origin_port_fees_gp ?? "");
    formdata.append("origin_other", freight.origin_other ?? "");
    formdata.append("origin_other_gp", freight.origin_other_gp ?? "");
    formdata.append("supplier_id", freight.supplier_id);
    formdata.append("des_delivery", freight.des_delivery ?? "");
    formdata.append("Roefreight", freight.Roefreight ?? "");
    formdata.append("des_delivery_gp", freight.des_delivery_gp ?? "");
    formdata.append("des_customs", freight.des_customs ?? "");
    formdata.append("des_customs_gp", freight.des_customs_gp ?? "");
    formdata.append("des_document", freight.des_document ?? "");
    formdata.append("des_document_gp", freight.des_document_gp ?? "");
    formdata.append("roe_origin_currency", freight.roe_origin_currency ?? "");
    formdata.append("des_warehouse", freight.des_warehouse ?? "");
    formdata.append("des_warehouse_gp", freight.des_warehouse_gp ?? "");
    formdata.append("des_currency", freight.des_currency ?? "");
    formdata.append("roe_des_currency", freight.roe_des_currency ?? "");
    formdata.append("des_port_fees", freight.des_port_fees ?? "");
    formdata.append("des_port_fees_gp", freight.des_port_fees_gp ?? "");
    formdata.append("des_unpack", freight.des_unpack ?? "");
    formdata.append("des_unpack_gp", freight.des_unpack_gp ?? "");
    formdata.append("des_other", freight.des_other ?? "");
    formdata.append("des_other_gp", freight.des_other_gp ?? "");
    formdata.append("freigh_amount", finalvalflo);
    formdata.append("origin_amount", origintotal);
    formdata.append("des_amount", destationTotal);
    formdata.append("sub_amount", overallCharge);
    formdata.append("exchange_rate", freight.exchange_rate ?? "");
    formdata.append("total_amount", finalestimate);
    formdata.append("freight_agent", "tushar");
    formdata.append("Supplier_Quote_Amount", freight.Supplier_Quote_Amount);
    formdata.append("Supplier_Quote_Attachment", selectedFile);
    formdata.append("final_base_currency", freight.final_base_currency);
    formdata.append(
      "freight_final_amount",
      isNaN(finalvalflo * freight.exchange_rate)
        ? 0
        : parseFloat((finalvalflo * freight.exchange_rate).toFixed(2))
    );
    formdata.append(
      "origin_pick_final_amt",
      isNaN(finalori * freight.exchange_rate)
        ? 0
        : parseFloat(finalori * freight.exchange_rate).toFixed(2)
    );

    formdata.append(
      "origin_cust_final_amt",
      isNaN(finalori2 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori2 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_doc_final_amt",
      isNaN(finalori3 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori3 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "origin_ware_final_amt",
      isNaN(final21 * freight.exchange_rate)
        ? 0
        : parseFloat(final21 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "org_port_fee_final_amt",
      isNaN(finalori34 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori34 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "org_other_final_amt",
      isNaN(finalori35 * freight.exchange_rate)
        ? 0
        : parseFloat(finalori35 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_delivery_final_amt",
      isNaN(finaldestation5 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation5 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_cust_final_amt",
      isNaN(finaldestation6 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation6 * freight.exchange_rate).toFixed(2)
    );

    formdata.append(
      "des_doc_final_amt",
      isNaN(finaldestation4 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation4 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_ware_final_amt",
      isNaN(finaldestation * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_portfees_final_amt",
      isNaN(finaldestation1 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation1 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_unpack_final_amt",
      isNaN(finaldestation1 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation1 * freight.exchange_rate).toFixed(2)
    );
    formdata.append(
      "des_other_final_amt",
      isNaN(finaldestation3 * freight.exchange_rate)
        ? 0
        : parseFloat(finaldestation3 * freight.exchange_rate).toFixed(2)
    );
    console.log(formdata);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}shipping_estimate`, formdata)
      .then((response) => {
        toast.success(response.data.message);
        if (response.data.success === true) {
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const supplier = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-suppler-selected`, {
        freight_id: getdata.id,
      })
      .then((response) => {
        console.log(response);
        setClient(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  useEffect(() => {
    supplier();
  }, []);

  const handlepresss = (e) => {
    if (e.charCode < 42 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const dateformate = new Date(getdata?.date).toLocaleDateString("en-GB");
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getsupplier();
  }, []);
  useEffect(() => {
    getdataapi();
  }, []);

  const getsupplier = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setSupplierdata(response.data.data);
        setSuppluierquot(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const data1231 = {
    estimate_id: getdata.estimate_id,
  };
  const getdataapi = async () => {
    console.log(getdata);
    const data123456 = {
      estimate_id: getdata.estimated_id
        ? getdata.estimated_id
        : getdata.estimate_id,
    };
    console.log(data123456);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}get-shipestimate`, data123456)
      .then((response) => {
        console.log(response.data.data);
        setFreight(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleclicknav = () => {
    navigate("/Admin/managefreight");
  };
  const closemodal = () => {
    setOpenmodal(false);
  };

  const getdata1 = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}supplier-list`)
      .then((response) => {
        setDat(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getdata1();
  }, []);

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleAddSupplier = async () => {
    if (selected.length === 0) {
      toast.error("Please select at least one supplier.");
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/freight/assign-Suppliers`,
      { freight_id: getdata.freight_id, supplier_ids: selected }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setOpenmodal(false);
    }
    console.log("something went wrong");
  };
  const pdfRef = useRef();
  const downloadPDF = () => {
    const element = pdfRef.current;
    const contentWidth = element.scrollWidth;
    const contentHeight = element.scrollHeight;

    const options = {
      margin: 0,
      filename: "page.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: "px",
        format: [contentWidth, contentHeight],
        orientation: "portrait",
      },
      pagebreak: { mode: "avoid-all" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
      {openmodal && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5>Select Supplier</h5>
              <button className="btn-close" onClick={() => closemodal()}>
                <CloseIcon />
              </button>
            </div>
            <div className="custom-modal-body">
              <div style={{ margin: "20px" }}>
                {/* Selected Box */}
                <div
                  onClick={() => setOpen(!open)}
                  style={{
                    padding: "10px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    cursor: "pointer",
                    background: "#fff",
                  }}
                >
                  {selected.length > 0
                    ? `${selected.length} selected`
                    : "Select Users"}
                </div>

                {/* Dropdown */}
                {open && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginTop: "5px",
                      padding: "10px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      background: "white",
                    }}
                  >
                    {dat.map((item) => (
                      <label
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                        />
                        <div>
                          <strong>{item.name}</strong>
                          <div style={{ fontSize: "12px", color: "gray" }}>
                            {item.email}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                <br />

                {/* Selected IDs (for testing) */}
                {/* <div>
        <strong>Selected IDs:</strong> {JSON.stringify(selected)}
      </div> */}
              </div>
            </div>
            <div className="custom-modal-footer">
              <button className="btn btn-primary" onClick={handleAddSupplier}>
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="wpWrapper ">
        <div className="container-fluid">
          <div className=" ">
            <div className=" ">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div>
                        <ArrowBackIcon
                          onClick={handleclicknav}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <h4 className="freight_hd mt-0 ms-3">Supplier Form</h4>
                      </div>
                    </div>
                    <button onClick={andlemodaloen} className="btn btn-success">
                      Assign Supplier
                    </button>
                    <MdDownloadForOffline
                      onClick={downloadPDF}
                      className="fs-2"
                      style={{ color: "#1b2245", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <section ref={pdfRef} style={{ margin: 0, padding: 0 }}>
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    outline: "auto",
                    height: "auto",
                  }}
                  className="pdf-page"
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
                                fontSize: 14,
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
                            style={{ fontSize: 14, textTransform: "lowercase" }}
                          ></td>
                          <td
                            style={{
                              fontSize: 14,
                              padding: "0px 20px",
                              textTransform: "lowercase",
                            }}
                          ></td>
                          <td
                            style={{ fontSize: 14, textTransform: "lowercase" }}
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
                              fontSize: 14,
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
                                      fontSize: 14,
                                      padding: "0px 10px",
                                    }}
                                  >
                                    <strong>
                                      {getdata.client_name}
                                      <br />
                                      {getdata.address_1}
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> No. of Packages</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.no_of_packages}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Package Type</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        Sea
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Weight</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.weight}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>M3</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        0.00
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Volumetric (kgs)</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        0.00
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Chargeable</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        0.00
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Commodity</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        0.00
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Hazardous</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        0.00
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Incoterm</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.incoterm}
                                      </p>
                                    </div>
                                    {/* <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>dimension</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.dimension}
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
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Freight</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        Sea
                                      </p>
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
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                          fontSize: 14,
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
                                        onChange={handlechangecalc}
                                        name="final_base_currency"
                                        value={freight?.final_base_currency}
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
                          <td style={{ width: "50%", paddingTop: 10 }}>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      width: 170,
                                      display: "block",
                                      padding: "0px 10px 10px 10px",
                                      fontSize: 14,
                                    }}
                                  >
                                    <strong>Reference</strong>
                                  </td>
                                  <td
                                    style={{ paddingBottom: 10, fontSize: 14 }}
                                  >
                                    {getdata?.client_ref_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "0px 10px 10px 10px",
                                      width: 170,
                                      display: "block",
                                      paddingBottom: 10,
                                      fontSize: 14,
                                    }}
                                  >
                                    <strong>Quote Date</strong>
                                  </td>
                                  <td
                                    style={{
                                      paddingBottom: 15,
                                      fontSize: 14,
                                      padding: "0px 10px 10px 10px",
                                    }}
                                  >
                                    {new Date(getdata?.date).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td
                                    style={{
                                      padding: "0px 10px 10px 10px",
                                      width: 170,
                                      display: "block",
                                      paddingBottom: 10,
                                      fontSize: 14,
                                    }}
                                  >
                                    <strong>Valid Until</strong>
                                  </td>
                                  <td
                                    style={{ paddingBottom: 15, fontSize: 14 }}
                                  >
                                    2023/11/07
                                  </td>
                                </tr> */}
                              </tbody>
                            </table>
                            <table
                              style={{
                                background: "#1b2245",
                                width: "100%",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                margin: "10px 0px",
                                padding: 2,
                              }}
                            >
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Country of Origin</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata.collection_from_name}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Place of Receipt</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        78
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Loading</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.port_of_loading}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong>Port of Discharge</strong>
                                      </p>
                                      <p
                                        className="text-dark"
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.post_of_discharge}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Place of Delivery</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.place_of_delivery}
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
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.quote_received}
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
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Date</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        12/23/2045
                                      </p>
                                    </div>
                                    {/* <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 14,
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
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.quote_received}
                                      </p>
                                    </div> */}

                                    {/* <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        <strong> Estimated Transit Time</strong>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          marginBottom: "unset",
                                          marginTop: 10,
                                        }}
                                      >
                                        {getdata?.transit_time}
                                      </p>
                                    </div> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                  {/* new table */}
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td
                          style={{ padding: 0, borderRight: "1px solid black" }}
                        >
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
                              QUOTE INFORMATION
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table class="cost-table">
                    <thead>
                      <tr>
                        <th>Items</th>
                        <th>Description</th>
                        <th>
                          <div>Currency</div>
                        </th>
                        <th>Cost</th>
                        <th>Unit type</th>
                        <th>Unit</th>
                        <th>T/ Cost</th>
                        <th>GP</th>
                        <th>Amt</th>
                        <th>ROE</th>
                        <th>Final Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* origin charges */}
                      <tr>
                        <td>Origin Charges</td>
                        <td>Pick-Up Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Fuel Surcharge</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>CFS Charge</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Documentation Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Forwarding Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Customs Clearance</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>SOLAS VGM Admin Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <strong>Total - Origin Charges </strong>
                        </td>
                        <td colSpan={4}> 970.00 </td>
                        <td> 17,634.00 </td>
                      </tr>
                      {/* freight charges */}
                      <tr>
                        <td>Freight Charges</td>
                        <td>Ocean freight</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Insurance</td>
                        <td>Ocean freight</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <strong> Total - Freight Charges</strong>
                        </td>
                        <td colSpan={4}> 970.00 </td>
                        <td> 17,634.00 </td>
                      </tr>

                      {/* transit charges */}
                      <tr>
                        <td>Transit Charges</td>
                        <td>Customs Clearing Fees</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>THC Levy</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Unpack Charges</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>3rd Party CFS Charge: LCL Handling Out w/ms</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Admin Charges</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Port Cargo Dues</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Advanced Load House Fee USD</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Documentation Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td></td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Documentation Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <strong> Total - Transit Charges</strong>
                        </td>
                        <td colSpan={4}> 970.00 </td>
                        <td> 17,634.00 </td>
                      </tr>
                      {/* Destination Charges */}
                      <tr>
                        <td>Destination Charges </td>
                        <td>Customs Clearing Fees</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>THC Levy</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Unpack Charges</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Fuel Surcharge Levy w/m</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Admin Charges</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Port Cargo Dues</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Advanced Load House Fee USD</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>3rd Party CFS Charge: LCL Handling Out w/m</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Delivery Charges</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        {/* Destination Charges */}
                        <td> </td>
                        <td>Fuel Surcharge</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <strong> Total - Destination Charges </strong>
                        </td>
                        <td colSpan={4}> 970.00 </td>
                        <td> 17,634.00 </td>
                      </tr>
                      {/* admin charges */}
                      <tr>
                        {/* Destination Charges */}
                        <td> Admin Charges</td>
                        <td>Agency fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Disbursement fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> </td>
                        <td>Documentation & Admin Fee</td>
                        <td>
                          <select
                            className="select_supplier"
                            style={{
                              margin: 0,
                              fontSize: 13,
                              fontWeight: 700,
                              paddingLeft: 5,
                              border: 0,
                            }}
                            onChange={handlechangecalc}
                            name="freight_currency"
                            value={freight?.freight_currency}
                          >
                            <option>Select</option>
                            <option value="RAND">RAND</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EURO">EURO</option>
                          </select>
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              border: "0px",
                              width: "100px",
                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pick_up}
                            name="origin_pick_up"
                            id="floatingInput"
                            placeholder="0.00"
                          />
                        </td>
                        <td>L/S</td>
                        <td>23</td>
                        <td>50</td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              fontWeight: 400,
                              width: "50px",
                              border: "0px",

                              verticalAlign: "middle",
                            }}
                            type="text"
                            onKeyPress={handlepresss}
                            className="supplier_form"
                            onChange={handlechangecalc}
                            value={freight?.origin_pickup_gp}
                            name="origin_pickup_gp"
                            id="floatingInput"
                            placeholder="0.00%"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              border: "0px",
                              verticalAlign: "middle",
                              width: "100px",
                            }}
                            value={finalori}
                            className="supplier_form"
                          />{" "}
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={freight.roe_origin_currency}
                            className="supplier_form"
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              marginBottom: 0,
                              fontSize: 13,
                              color: "black",
                              width: "100px",
                              border: "0px",
                              verticalAlign: "middle",
                            }}
                            value={parseFloat(
                              finalori * freight.roe_origin_currency
                            ).toFixed(2)}
                            placeholder="0.00"
                            className="supplier_form"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <strong> Total - Admin Charges</strong>
                        </td>
                        <td colSpan={4}> 970.00 </td>
                        <td> 17,634.00 </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-center mt-3">
                    <button className="ship_btn" onClick={apihit}>
                      Get Quote
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
