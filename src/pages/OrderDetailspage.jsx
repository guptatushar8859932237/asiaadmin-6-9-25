import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
export default function MAnageFreightDetails() {
  const infolocation = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dat, setDat] = useState({});
  const [data0, setData0] = useState({});
  const [data111, setData111] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  const [data5, setData5] = useState({});
  const [data6, setData6] = useState({});
  const [data7, setData7] = useState({});
  const [data8, setData8] = useState({});
  const [data9, setData9] = useState({});
  const [data10, setData10] = useState({});
  const [data11, setData11] = useState({});
  const info = infolocation?.state?.data;
  console.log(infolocation?.state);
  console.log(infolocation.state.data);


  useEffect(()=>{
    getalldata()
  },[])

  const getalldata = async() => {
  try {
console.log(info?.order_id)
    const datapost={orderId:info?.order_id}
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}OrderDetailsById`,datapost)
    setData(response.data.data[0]);
    console.log(response.data.data[0]);
  } catch (error) {
    console.log(error);
  }
  }
  const [document, setDocument] = useState([]);
  const [documents, setDocuments] = useState({});
  const [document1, setDocument1] = useState([]);
  const [packing, setPacking] = useState([]);
  const [licenses, setLicenses] = useState([]);
  console.log(info);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-shipestimate`, {
        freight_id: info.freight_id,
      })
      .then((response) => {
        setDat(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getordertracking = () => {
    const data1 = {
      order_id: `OR000${info.order_id}`,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-order-status`, data1)
      .then((response) => {
        console.log(response.data);
        setData0(response?.data?.data[0]);
        setData111(response?.data?.data[1]);
        setData2(response?.data?.data[2]);
        setData3(response?.data?.data[3]);
        setData4(response?.data?.data[4]);
        setData5(response?.data?.data[5]);
        setData6(response?.data?.data[6]);
        setData7(response?.data?.data[7]);
        setData8(response?.data?.data[8]);
        setData9(response?.data?.data[9]);
        setData10(response?.data?.data[10]);
        setData11(response?.data?.data[11]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getordertracking();
  }, []);
  const handleclicknav = () => {
    navigate("/Admin/order");
  };
  const deleteapi = (id) => {
    console.log(id);
    const data11 = {
      doc_id: id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteDocument`, data11)
      .then((response) => {
        GetFreightImages();
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
   const GetFreightImages = () => {
    const data = { freight_id: info.freight_id,uploaded_by:"1" };
  
    axios
      .post(`${process.env.REACT_APP_BASE_URL}GetFreightImages`, data)
      .then((response) => {
        console.log(response.data.data);
  
        // Save all groups (Customs, Packing, Invoices, Licenses, etc.)
        setDocuments(response.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  };
  // const GetFreightImages = () => {
  //   const data = { freight_id: info.freight_id };
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}GetFreightImages`, data)
  //     .then((response) => {
  //       setDocument(response?.data?.data["Supplier Invoice"]);
  //       setLicenses(response?.data?.data["Licenses"]);
  //       setDocument1(response?.data?.data["Other Documents"]);
  //       setPacking(response?.data?.data["Packing List"]);
  //       console.log(response?.data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
  // };
  useEffect(() => {
    GetFreightImages();
  }, []);

  return (
    <div className="wpWrapper">
      <div className="container-fluid">
        <div className="formDetails">
          <div className="row">
            <div className="col-lg-12 px-0">
              <div className="d-flex">
                <div>
                  <ArrowBackIcon
                    onClick={handleclicknav}
                    className="text-dark"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div>
                  <h4 className="det_hd ms-3"> Order Freight Details</h4>
                </div>
              </div>
            </div>
          </div>
          <section className="my-4">
            <div className="row">
              <div className="col-md-4 pe-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Shipper Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div class="table-responsive">
                        <table class="det_show">
                          <tbody>
                            <tr>
                              <td class="fright_num">
                                <p class="client_para1">Shipper:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? info?.shipper_name
                                    : "Asia Direct"}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Contact Person:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? info?.contact_person
                                    : ""}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Cell:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? info?.cellphone
                                    : " +27 10 448 0733"}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Telephone:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? info?.telephone
                                    : ""}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1 mb-3">Email:</p>
                              </td>
                              <td>
                                <p class="client_para1 mb-3">
                                  {info?.shipment_ref === "shipper"
                                    ? info?.client_email
                                    : "sa@asiadirect.africa "}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">Pickup Address</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Address1:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.address_1}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">City:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.city}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Country:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.collection_from_country}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1 mb-3">Postal Code:</p>
                              </td>
                              <td>
                                <p class="client_para1 mb-3">{info?.code}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">Export details</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Exporter:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.shipper_name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Export Code:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.code}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Vat/Tax No:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.tax_ref}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Consignee Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div class="table-responsive">
                        <table class="det_show">
                          <tbody>
                            <tr>
                              <td class="fright_num">
                                <p class="client_para1">Consignee:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? "Asia Direct"
                                    : info?.client_name}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Contact Person:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? ""
                                    : info?.contact_person}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Cell:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? "+27 10 448 0733"
                                    : info?.telephone}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Telephone:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipment_ref === "shipper"
                                    ? ""
                                    : info?.cellphone}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1 mb-3">Email:</p>
                              </td>
                              <td>
                                <p class="client_para1 mb-3">
                                  {info?.shipment_ref === "shipper"
                                    ? "sa@asiadirect.africa"
                                    : info?.client_email}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">Delivery Address</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Address1:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.supplier_address}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">City:</p>
                              </td>
                              <td>
                                <p class="client_para1"></p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Country:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.delivery_to_country}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1 mb-3">Postal Code:</p>
                              </td>
                              <td>
                                <p class="client_para1 mb-3"></p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">Export details</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Importer:</p>
                              </td>
                              <td>
                                <p class="client_para1">Asia Direct</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Export Code:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.code}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Vat/Tax No:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.tax_ref}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ps-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Booking Information</h6>
                      <span className="line"></span>
                    </div>
                    <div className="main_det">
                      <div class="table-responsive">
                        <table class="det_show">
                          <tbody>
                            <tr>
                              <td>
                                <p className="ship_hd">POL Information</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Origin Handler:</p>
                              </td>
                              <td>
                                <p class="client_para1">{data?.shipments_origin_agent}</p>
                              </td>
                            </tr>
                            <tr>
                              <td class="fright_num">
                                <p class="client_para1">Place of loading:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.shipper_address}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Port of Loading:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.port_of_loading}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="instr_td">
                                <p className="client_para1 mb-3">
                                  Instructions:
                                </p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3">
                                  {info?.shipment_origin}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">Transit Information</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Freight Option:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.freight}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Efficiency:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.type}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Incoterms:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.incoterm}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Insurance:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.insurance}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Type:</p>
                              </td>
                              <td>
                                <p class="client_para1">{info?.fcl_lcl}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Warehouse:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.assign_warehouse}
                                </p>
                              </td>
                            </tr>
                           
                           
                            <tr>
                              <td>
                                <p class="client_para1">ETD:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {new Date(info?.ETA).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Carrier:</p>
                              </td>
                              <td>
                                <p class="client_para1">{data?.carrier}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Vessel Name:</p>
                              </td>
                              <td>
                                <p class="client_para1">{data?.vessel}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Master Bill:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {data?.shipments_waybill}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">House Bill:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {data?.house_bill_landing}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Container No:</p>
                              </td>
                              <td>
                                <p class="client_para1">{data?.container_no}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1 mb-3">Release Type:</p>
                              </td>
                              <td>
                                <p class="client_para1 mb-3">
                                  {data?.shipments_release_type}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="ship_hd">POD Information</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Destination Handler:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {data?.shipments_destination_agent}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Place of Delivery:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.place_of_delivery}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Port of Discharge:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {info?.post_of_discharge}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="instr_td">
                                <p className="client_para1 mb-3">
                                  Instructions:
                                </p>
                              </td>
                              <td>
                                <p className="client_para1 mb-3">
                                  {info?.shipment_des}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Local Carrier:</p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {data?.local_carrier}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">Driver Name:</p>
                              </td>
                              <td>
                                <p class="client_para1">{data?.driver_name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p class="client_para1">
                                  Vehicle Registration:
                                </p>
                              </td>
                              <td>
                                <p class="client_para1">
                                  {data?.vehicle_registration}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="details_box">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6 pe-4">
                    <div className="card desti_card1 cargoBold">
                      <div className="card-body">
                        <div className="">
                          <h6 className="orgin_hd">Cargo Details</h6>
                          <span className="line"></span>
                        </div>
                        <div className="main_det">
                          <div class="table-responsive">
                            <table class="det_show">
                              <tbody>
                                <tr>
                                  <td class="fright_num">
                                    <p class="client_para1">
                                      Product Description:
                                    </p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.product_desc}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Hazardous:</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.hazardous}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Industry:</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.nature_of_hazard}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Packaging:</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.package_type}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">No of Packages:</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.no_of_packages}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Dimensions(cbm):</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.dimension}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Commodity:</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {data?.commodity_name}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Weight(kgs):</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">{info?.weight}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">Vol weight(kgs):</p>
                                  </td>
                                  <td>
                                    <p class="client_para1">
                                      {info?.volumetric_weight}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p class="client_para1">
                                      Chargeable weight:
                                    </p>
                                  </td>
                                  <td>
                                    <p class="client_para1"></p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card desti_card1">
                      <div className="card-body">
                        <div className="">
                          <h6 className="orgin_hd">Shipping Estimate</h6>
                          <span className="line"></span>
                        </div>
                        <div className="main_det">
                          <div className="table-responsive">
                            <table className="det_show">
                              <thead>
                                <tr>
                                  <td className="ship_hd1"></td>
                                  <td className="ship_hd2">Cost</td>
                                  <td className="ship_hd3">Billing</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="ship_hd">
                                    Freight
                                    <br />
                                    <p className="client_para1 mb-3">
                                      {dat.freight}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1 mb-3">
                                      {dat.freight_amount}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1 mb-3">
                                      {dat.freight_final_amount}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ship_hd">
                                    Origin Charges
                                    <br />
                                    <p className="client_para1">
                                      Origin Pickup
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_pick_up}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_pick_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Origin Customs
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_customs}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_cust_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Origin Document
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_document}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_doc_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Origin Warehouse
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_warehouse}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_ware_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Origin Port Fees
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.origin_port_fees}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.org_port_fee_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1 mb-3">
                                      Origin Other
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1 mb-3">
                                      {dat.origin_other}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1 mb-3">
                                      {dat.org_other_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ship_hd">
                                    Destination Charges
                                    <br />
                                    <p className="client_para1">
                                      Destination Delivery
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_delivery}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_delivery_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Customs
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_customs}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_cust_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Documents
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_document}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_doc_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Warehouse
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_warehouse}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_ware_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Port Fees
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_port_fees}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_portfees_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Unpack
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_unpack}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_unpack_final_amt}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="client_para1">
                                      Destination Other
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_other}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="client_para1">
                                      {dat.des_other_final_amt}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4 ps-4">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Tracking</h6>
                      <span className="line"></span>
                    </div>
                    <div className="scroll_timeline">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="main-timeline">
                            <div class="timeline">
                              <div class="timeline-content">
                                {dat0.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                )}

                                <h3 class="title left_title">
                                  Collected from supplier
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data111.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}
                                <h3 class="title right_title">
                                  Received at Asia Direct warehouse
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data2.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}
                                <h3 class="title left_title">
                                  Dispatched to port
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data3.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}
                                <h3 class="title right_title">
                                  Goods at origin port
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data4.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-white"></i>
                                  </div>
                                )}
                                <h3 class="title left_title">
                                  Goods are in transit
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data5.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}
                                <h3 class="title right_title">
                                  Arrived at destination port
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data6.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}
                                <h3 class="title left_title">
                                  Customs clearing in progress
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data7.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}

                                <h3 class="title right_title">
                                  Customs released
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data8.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}

                                <h3 class="title left_title">
                                  Goods in transit to warehouse
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data9.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}

                                <h3 class="title right_title">
                                  Imported at Asia Direct warehouse
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data10.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}

                                <h3 class="title left_title">
                                  Out for delivery
                                </h3>
                              </div>
                            </div>
                            <div class="timeline">
                              <div class="timeline-content">
                                {data11.is_completed === "0" ? (
                                  <div class="timeline-icon">
                                    <i class="fa fa-globe"></i>
                                  </div>
                                ) : (
                                  <div class="timeline-icon aaa">
                                    <i class="fa fa-globe text-success"></i>
                                  </div>
                                )}

                                <h3 class="title right_title">Delivered</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}{" "}
              {/* <div className="col-md-4  ">
                <div className="card desti_card">
                  <div className="card-body">
                    <div className="">
                      <h6 className="orgin_hd">Documents</h6>
                      <span className="line"></span>
                    </div>
                    <div className="mb-3 mt-2">
                      <div className="mb-3 supplyInv">
                        <div>
                          <label>Supplier Invoice : </label>
                        </div>
                        <div>
                          {document?.map((item, index) => {
                            return (
                              <>
                                <a
                                  href={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="view_docu ms-2"
                                >
                                  View Document
                                </a>
                                <DeleteIcon
                                  onClick={() => {
                                    deleteapi(item.id);
                                  }}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mb-3 supplyInv">
                        <div>
                          <label>Other Document :</label>
                        </div>
                        <div>
                          {document1?.map((item, index) => {
                            return (
                              <>
                                <a
                                  href={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="view_docu ms-2"
                                >
                                  View Document
                                </a>
                                <DeleteIcon
                                  onClick={() => {
                                    deleteapi(item.id);
                                  }}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mb-3 supplyInv">
                        <div>
                          <label>packing List :</label>
                        </div>
                        <div>
                          {packing?.map((item, index) => {
                            return (
                              <>
                                <a
                                  href={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="view_docu ms-2"
                                >
                                  View Document
                                </a>
                                <DeleteIcon
                                  onClick={() => {
                                    deleteapi(item.id);
                                  }}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mb-3 supplyInv">
                         
                          <div>
                            <label>Attach Quotation:</label>
                          </div>
                          <div>
                            {info?.attachment_Estimate === null ? (
                              " "
                            ) : (
                              <a
                                href={`${process.env.REACT_APP_BASE_URLdocument}${info?.attachment_Estimate}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view_docu ms-2"
                              >
                                View Document
                              </a>
                            )}
                         
                        </div>
                      </div>
                      <div className="mb-3 "></div>
                    </div>
                  </div>
                </div>
              </div> */}
 <div className="col-md-4">
  <div className="card desti_card">
    <div className="card-body mb-3">
      {Object.keys(documents).map((groupName, groupIndex) => (
        <div key={groupIndex} className="mb-2">
          <label>{groupName} :</label>
          {documents[groupName]?.map((item, index) => (
            <div key={item.id} className="d-flex align-items-center">
              <a
                href={`${process.env.REACT_APP_BASE_URLdocument}${item?.document}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view_docu ms-2"
              >
                View Document
              </a>
              <DeleteIcon
                onClick={() => deleteapi(item.id)}
                className="text-danger ms-2"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      ))}

      {/* Quotation (separate because it's not part of groups) */}
      <div className="mb-2">
        <label>Attach Quotation :</label>
        {info.attachment_Estimate && (
          <a
            href={`${process.env.REACT_APP_BASE_URLdocument}${info?.attachment_Estimate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="view_docu ms-2"
          >
            View Document
          </a>
        )}
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
