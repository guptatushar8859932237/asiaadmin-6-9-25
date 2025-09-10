// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Box, Button, Modal } from "@mui/material";
// import { FaEdit } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import CloseIcon from "@mui/icons-material/Close";

// const pageSize = 10;
// export default function MAnageshipments() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [data1, setData1] = useState([]);
//   const [countries, setcountries] = useState([]);
//   const [inputdata, setInputdata] = useState([]);
//   const [tindexdata, setTindexdata] = useState([]);
//   const [filesd, setFilesd] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [freight1, setFreight1] = useState([]);
//   const [shipmentID, setShipmentID] = useState("");
//   const [loader, setLoader] = useState(true);
//   const navigate = useNavigate();
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const totalPage = Math.ceil(data.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentdata = data.slice(startIndex, endIndex);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const userid = JSON.parse(localStorage.getItem("data123"))?.id;
//   const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;
//   const openModal1 = async () => {
//     try {
//       const permission = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}CheckPermission`,
//         {
//           staff_id: userid,
//           user_type: usertype,
//           route_url: "/Admin/addshipment",
//         }
//       );
//       if (permission.data?.success === true) {
//         navigate("/Admin/addshipment");
//       } else {
//         toast.error("You don't have permission to add shipment");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error("Permission Denied: You don’t have access to this page");
//       } else {
//         toast.error("Something went wrong while checking permission.");
//       }
//     }
//   };
//   useEffect(() => {
//     getcountry();
//   }, []);
//   const getcountry = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
//       .then((response) => {
//         setcountries(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data.data);
//       });
//   };
//   useEffect(() => {
//     getwarehouse();
//   }, []);
//   const getwarehouse = () => {
//     setLoader(true);
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}getShipment`)
//       .then((response) => {
//         setLoader(false);
//         setData(response.data.data);
//       })
//       .catch((error) => {
//         setLoader(false);
//         console.log(error.response.data.message);
//       });
//   };
//   const openModal2 = (id) => {
//     setShipmentID(id);
//     const postshipmentpost = {
//       shipment_id: id,
//     };
//     axios
//       .post(
//         `${process.env.REACT_APP_BASE_URL}GetShipmentDetails`,
//         postshipmentpost
//       )
//       .then((response) => {
//         setInputdata(response.data.shipment);
//         setTindexdata(response.data.details);
//         console.log(response.data.details);
//       })
//       .catch((error) => {
//         console.log(error.response.data.data);
//       });
//     console.log(id);
//     setIsModalOpen2(true);
//   };
//   const closeModal2 = () => {
//     setIsModalOpen2(false);
//   };
//   const handleFileChange1 = (e) => {
//     const { name, value } = e.target;
//     setInputdata({ ...inputdata, [name]: value });
//   };
//   const handleclickaddarray = () => {
//     console.log(inputdata.assign_shipment);
//     const payload = {
//       type: inputdata.freight === "freight" ? "1" : "2",
//       id: inputdata.id,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, payload)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };
//   const handleFileChange1file = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFilesd(file);
//     }
//   };
//   const apiupdatepost = async () => {
//     try {
//       const datapost = {
//         staff_id: userid,
//         user_type: usertype,
//         route_url: "UpdateShipment",
//       };
//       const permission = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}CheckPermission`,
//         datapost
//       );
//       console.log(permission);
//       if (permission.data.success === true) {
//         console.log(tindexdata);
//         const formdata = new FormData();
//         formdata.append("shipment_id", shipmentID);
//         formdata.append("waybill", inputdata.waybill);
//         formdata.append("freight", inputdata.freight);
//         formdata.append("carrier", inputdata.carrier);
//         formdata.append("vessel", inputdata.vessel);
//         formdata.append("ETD", inputdata.ETD);
//         formdata.append("date_of_dispatch", formatteddispatch);
//         formdata.append("ATD", inputdata.ATD);
//         formdata.append("status", inputdata.status);
//         formdata.append("origin_agent", inputdata.origin_agent);
//         formdata.append("port_of_loading", inputdata.port_of_loading);
//         formdata.append("port_of_discharge", inputdata.port_of_discharge);
//         formdata.append("destination_agent", inputdata.destination_agent);
//         formdata.append("load", inputdata.load);
//         formdata.append("release_type", inputdata.release_type);
//         formdata.append("container", inputdata.container);
//         formdata.append("seal", inputdata.seal);
//         formdata.append("details", JSON.stringify(tindexdata));
//         formdata.append("des_country_id", inputdata.des_country_id);
//         formdata.append("origin_country_id", inputdata.origin_country_id);
//         formdata.append("document", filesd);
//         axios
//           .post(`${process.env.REACT_APP_BASE_URL}UpdateShipment`, formdata)
//           .then((response) => {
//             try {
//               toast.success("Shipment Update successfully");
//               console.log("Response Data:", response.data);
//               if (response.data.success === true) {
//                 closeModal2();
//                 getwarehouse();
//               }
//             } catch (err) {
//               console.error("Error in then block:", err);
//               throw err;
//             }
//           })
//           .catch((error) => {
//             console.error("Error Response:", error.response);
//             if (error.response && error.response.data) {
//               console.log(error.response.data.message);
//             } else {
//               console.log("Error:", error.message);
//             }
//           });
//       } else {
//         toast.error("permission denied");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error("Permission Denied: You don’t have access to this page");
//       } else {
//         toast.error("Something went wrong while checking permission.");
//       }
//     }
//   };
//   const deletewarehouse = (id) => {
//     try {
//       const permission = axios.post(
//         `${process.env.REACT_APP_BASE_URL}CheckPermission`,
//         {
//           user_id: userid,
//           user_type: usertype,
//           route_url: "/DeleteShipment",
//         }
//       );
//       if (permission.data.status === true) {
//         Swal.fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             const datadelete = { shipment_id: id };

//             axios
//               .post(
//                 `${process.env.REACT_APP_BASE_URL}DeleteShipment`,
//                 datadelete
//               )
//               .then((response) => {
//                 console.log(response.data);
//                 toast.success(response.data.message);
//                 getwarehouse();
//                 Swal.fire({
//                   title: "Deleted!",
//                   text: "Your file has been deleted.",
//                   icon: "success",
//                 });
//               })
//               .catch((error) => {
//                 console.error(error.response?.data || error.message);
//                 toast.error("Failed to delete the warehouse!");
//               });
//           }
//         });
//       } else {
//         toast.error("you dont have permission to access this page");
//       }
//     } catch (error) {
//       if (error.response && error.response.data.status === 400) {
//         toast.error("Permission Denied: You don’t have access to this page");
//       } else {
//         toast.error("Something went wrong while checking permission.");
//       }
//     }
//   };
//   useEffect(() => {
//     if (inputdata.des_country_id && inputdata.origin_country_id) {
//       const timer = setTimeout(() => {
//         getbatch(inputdata);
//         getorderid(inputdata);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [inputdata.des_country_id, inputdata.origin_country_id]);
//   const getbatch = (inputdata) => {
//     const payload = {
//       des_country_id: inputdata.des_country_id,
//       origin_country_id: inputdata.origin_country_id,
//       freight: inputdata.freight,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}AllBatchNumbers`, payload)
//       .then((response) => {
//         console.log(response.data.data);
//         setOptions(response.data.data);
//       });
//   };
//   const getorderid = (inputdata) => {
//     const pauyload = {
//       des_country_id: inputdata.des_country_id,
//       origin_country_id: inputdata.origin_country_id,
//       freight: inputdata.freight,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}AllFreightOrderNumbers`, pauyload)
//       .then((response) => {
//         console.log(response.data.data);
//         setFreight1(response.data.data);
//       });
//   };
//   const handleclicknaciv = (id) => {
//     console.log("id", id);
//     console.log(id);
//     const datanavigate = data.filter((item) => {
//       return item.id === id;
//     });
//     console.log(datanavigate);
//     navigate("/Admin/shipmentdetail", { state: { data: datanavigate } });
//   };
//   const handleclickcopy = (id) => {
//     const dataget = data.filter((item) => {
//       return item.id === id;
//     });
//     navigate("/Admin/addshipment", { state: { id: dataget[0] } });
//   };
//   const handleFileChange12 = (e) => {
//     const { name, value } = e.target;
//     setData1((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const addbuttonclick = () => {
//     try {
//       const payload = {
//         type: data1.assign_shipment,
//         id: data1.assign_shipment_id,
//         origin_country_id: inputdata.origin_country_id,
//         des_country_id: inputdata.des_country_id,
//       };
//       console.log(payload);
//       axios
//         .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, payload)
//         .then((response) => {
//           toast.success(response.data.message);
//           const newResponse = response.data.data;
//           setTindexdata((prevData) => [...prevData, ...newResponse]);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//     } catch (error) {
//       toast.error("Something went Wrong");
//     }
//   };
//   const handleclickdelete = async (item, id) => {
//     console.log(item);
//     const payload = {
//       shipment_detail_id: item.shipment_details_id,
//       orderId: item.order_id,
//     };
//     console.log(payload);
//     try {
//       console.log(tindexdata);
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}DeleteShipmentDetails`,
//         payload
//       );
//       toast.success(response.data.message);
//       const updatedData = tindexdata.filter(
//         (item) => item.shipment_details_id !== item.shipment_details_id
//       );
//       setTindexdata(updatedData);
//       getwarehouse();
//     } catch (error) {
//       console.error(
//         "Error deleting shipment details:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   const handlclickposterror = () => {
//     toast.error("Shipment requires at least one batch or freight.");
//   };
//   console.log(tindexdata);
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };
//   const formattedETD = formatDate(inputdata.ETD);
//   const formattedATD = formatDate(inputdata.ATD);
//   const formatteddispatch = formatDate(inputdata.date_of_dispatch);
//   return (
//     <>
//       {loader ? (
//         <div class="loader-container">
//           <div class="loader"></div>
//           <p class="loader-text">Updating... This may take some time</p>
//         </div>
//       ) : (
//         <div className="wpWrapper">
//           <div className="container-fluid">
//             <div className="row  manageFreight">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="freight_hd">Shipments List</h4>
//                   </div>
//                   <div className="d-flex justify-content-end align-items-center">
//                     <div className="mx-2">
//                       <button onClick={openModal1}>Add Shipment</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="table-responsive mt-2">
//               <table className="table table-striped tableICon">
//                 <tbody>
//                   {currentdata &&
//                     currentdata.length > 0 &&
//                     currentdata.map((item, index) => {
//                       console.log(item);
//                       return (
//                         <>
//                           <tr key={index}>
//                             <td>{item.waybill} </td>
//                             <td>
//                               <p>{item.vessel}</p>
//                               <p>{item.freight}</p>
//                             </td>
//                             <td>
//                               <div className="palceLand">
//                                 <div>
//                                   <p>{item.port_of_loading}</p>
//                                   <p>
//                                     {new Date(item.ETD).toLocaleDateString(
//                                       "en-GB"
//                                     )}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <i
//                                     className="fa fa-long-arrow-right"
//                                     aria-hidden="true"
//                                   />
//                                 </div>
//                                 <div>
//                                   <p>{item.port_of_discharge}</p>
//                                   <p>
//                                     {new Date(item.ATD).toLocaleDateString(
//                                       "en-GB"
//                                     )}
//                                   </p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               {" "}
//                               <p>{item.status}</p>
//                             </td>{" "}
//                             <td className="w-25">
//                               <div className="progress">
//                                 <div
//                                   className="progress-bar progress-bar-striped bg-success"
//                                   role="progressbar"
//                                   style={{
//                                     width: `${
//                                       item.status === "Goods at origin port"
//                                         ? "20%"
//                                         : item.status === "Goods are in transit"
//                                         ? "40%"
//                                         : item.status ===
//                                           "Arrived at destination port"
//                                         ? "60%"
//                                         : item.status ===
//                                           "Customs clearing in progress"
//                                         ? "80%"
//                                         : item.status === "Customs released"
//                                         ? "100%"
//                                         : "25%"
//                                     }`,
//                                   }}
//                                 />
//                               </div>
//                               <div className="dropdown text-end">
//                                 <a
//                                   className="act_btn dropdown-toggle"
//                                   href="#"
//                                   role="button"
//                                   data-bs-toggle="dropdown"
//                                   aria-expanded="false"
//                                 >
//                                   Action
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                   <li>
//                                     <dropdow
//                                       className="dropdown-item li_icon"
//                                       onClick={() => {
//                                         handleclicknaciv(item.id);
//                                       }}
//                                     >
//                                       <VisibilityIcon
//                                         style={{
//                                           color: "rgb(27 34 69)",
//                                           marginRight: "10px",
//                                           width: "20px",
//                                           cursor: "pointer",
//                                         }}
//                                       />
//                                       View
//                                     </dropdow>
//                                   </li>
//                                   <li>
//                                     <dropdow
//                                       className="dropdown-item li_icon"
//                                       onClick={() => {
//                                         handleclickcopy(item.id);
//                                       }}
//                                     >
//                                       <ContentCopyIcon
//                                         style={{
//                                           color: "rgb(27 34 69)",
//                                           marginRight: "10px",
//                                           fontSize: "20px",
//                                           width: "20px",
//                                           cursor: "pointer",
//                                         }}
//                                       />
//                                       Copy
//                                     </dropdow>
//                                   </li>
//                                   <li>
//                                     <delete
//                                       className="dropdown-item"
//                                       onClick={() => {
//                                         deletewarehouse(item.id);
//                                       }}
//                                     >
//                                       <AiFillDelete
//                                         className="text-danger"
//                                         style={{
//                                           marginRight: "10px",
//                                           width: "20px",
//                                           fontSize: "20px",
//                                           cursor: "pointer",
//                                         }}
//                                       />
//                                       Delete
//                                     </delete>
//                                   </li>
//                                   <li>
//                                     <p
//                                       className="dropdown-item"
//                                       onClick={() => {
//                                         openModal2(item.id);
//                                       }}
//                                     >
//                                       <FaEdit
//                                         style={{
//                                           color: "rgb(27 34 69)",
//                                           marginRight: "10px",
//                                           width: "20px",
//                                           cursor: "pointer",
//                                         }}
//                                       />
//                                       Edit
//                                     </p>
//                                   </li>
//                                 </ul>
//                               </div>
//                             </td>
//                           </tr>
//                         </>
//                       );
//                     })}
//                 </tbody>
//               </table>
//               <div className="text-center d-flex justify-content-end align-items-center">
//                 <button
//                   disabled={currentPage === 1}
//                   className="bg_page"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   <i class="fi fi-rr-angle-small-left page_icon"></i>
//                 </button>
//                 <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                 <button
//                   disabled={currentPage === totalPage}
//                   className="bg_page"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   <i class="fi fi-rr-angle-small-right page_icon"></i>
//                 </button>
//               </div>
//               <Modal
//                 open={isModalOpen2}
//                 onClose={closeModal2}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//               >
//                 <Box
//                   className="warehouse_modal123"
//                   sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                   }}
//                 >
//                   <div className="row">
//                     <div className="modal-header">
//                       <h2 id="modal-modal-title">
//                         Update Shipment Detail / Form
//                       </h2>

//                       <button className="btn btn-close" onClick={closeModal2}>
//                         <CloseIcon />
//                       </button>
//                     </div>
//                     <div className="newModalGap">
//                       <div className="row">
//                         <div className="col-3">
//                           <label className="ware_label">Waybill</label>
//                           <input
//                             type="text"
//                             placeholder="Waybill"
//                             value={inputdata.waybill}
//                             onChange={handleFileChange1}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             name="waybill"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Freight</label>
//                           <select
//                             type="text"
//                             name="freight"
//                             value={inputdata.freight}
//                             placeholder="freight"
//                             onChange={handleFileChange1}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           >
//                             <option>Select...</option>
//                             <option value="Sea">Sea</option>
//                             <option value="Air">Air</option>
//                             <option value="Road">Road</option>
//                           </select>
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Vessel</label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.vessel}
//                             name="vessel"
//                             placeholder="vessel"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Carrier</label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.carrier}
//                             name="carrier"
//                             placeholder="carrier"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-3">
//                           <label className="ware_label">date_of_dispatch</label>
//                           <input
//                             type="date"
//                             onChange={handleFileChange1}
//                             name="date_of_dispatch"
//                             placeholder="date_of_dispatch"
//                             value={formatteddispatch}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">ETD</label>
//                           <input
//                             type="date"
//                             onChange={handleFileChange1}
//                             name="ETD"
//                             placeholder="ETD"
//                             value={formattedETD}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">ETA</label>
//                           <input
//                             type="date"
//                             onChange={handleFileChange1}
//                             placeholder="ATD"
//                             value={formattedATD}
//                             name="ATD"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Origin Agent</label>
//                           <select
//                             className="form-control mb-3 py-2"
//                             onChange={handleFileChange1}
//                             name="origin_agent"
//                             value={inputdata.origin_agent}
//                           >
//                             <option>Select...</option>
//                             <option value="Asia Direct">Asia Direct</option>
//                             <option value="Shenzhen Nimbus Shipping">
//                               Shenzhen Nimbus Shipping
//                             </option>
//                             <option value="Shenzhen Portline">
//                               Shenzhen Portline
//                             </option>
//                             <option value="OBD Logistics">OBD Logistics</option>
//                           </select>
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Seal Number </label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.seal}
//                             name="seal"
//                             placeholder="seal"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-3">
//                           <label className="ware_label">Port of Loading</label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.port_of_loading}
//                             name="port_of_loading"
//                             placeholder="port_of_loading"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">
//                             Port of Discharge
//                           </label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.port_of_discharge}
//                             name="port_of_discharge"
//                             placeholder="port_of_discharge"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">
//                             Destination Agent
//                           </label>
//                           <select
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             name="destination_agent"
//                             onChange={handleFileChange1}
//                             value={inputdata.destination_agent}
//                           >
//                             <option>Select...</option>
//                             <option value="DHL">DHL</option>
//                             <option value="Fedex">Fedex</option>
//                             <option value="SACO CFR">SACO CFR</option>
//                             <option value="Contra Consolidations">
//                               Contra Consolidations
//                             </option>
//                             <option value="Afristar">Afristar</option>
//                             <option value="Asia Direct - Africa">
//                               Asia Direct - Africa
//                             </option>
//                           </select>
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Load</label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.load}
//                             name="load"
//                             placeholder="load"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-3">
//                           <label className="ware_label">Release Type</label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.release_type}
//                             name="release_type"
//                             placeholder="Release Type"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">
//                             Container number{" "}
//                           </label>
//                           <input
//                             type="text"
//                             onChange={handleFileChange1}
//                             value={inputdata.container}
//                             name="container"
//                             placeholder="container"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           />
//                         </div>

//                         <div className="col-3">
//                           <label className="ware_label">Status</label>
//                           <select
//                             onChange={handleFileChange1}
//                             name="status"
//                             value={inputdata?.status}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                           >
//                             <option>Select</option>
//                             <option value="Goods at origin port">
//                               Goods at origin port
//                             </option>
//                             <option value="Goods are in transit">
//                               Goods are in transit
//                             </option>
//                             <option value="Arrived at destination port">
//                               Arrived at destination port
//                             </option>
//                             <option value="Customs clearing in progress">
//                               Customs clearing in progress
//                             </option>
//                             <option value="Customs released">
//                               Customs released
//                             </option>
//                           </select>
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">
//                             Destination Country
//                           </label>
//                           <select
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             name="des_country_id"
//                             value={inputdata?.des_country_id}
//                             onChange={handleFileChange1}
//                           >
//                             <option>Select...</option>
//                             {countries.map((item, index) => {
//                               return (
//                                 <>
//                                   <option key={index} value={item.id}>
//                                     {item.name}
//                                   </option>
//                                 </>
//                               );
//                             })}
//                           </select>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-3">
//                           <label className="ware_label">
//                             Country of Origin
//                           </label>
//                           <select
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             name="origin_country_id"
//                             value={inputdata?.origin_country_id}
//                             onChange={handleFileChange1}
//                           >
//                             <option>Select...</option>
//                             {countries.map((item, index) => {
//                               return (
//                                 <>
//                                   <option key={index} value={item.id}>
//                                     {item.name}
//                                   </option>
//                                 </>
//                               );
//                             })}
//                           </select>
//                         </div>
//                         <div className="col-3">
//                           <label className="ware_label">Upload Document</label>
//                           <input
//                             type="file"
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             name="document"
//                             onChange={handleFileChange1file}
//                           ></input>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <h5 className="my-3">Assign Shipment</h5>
//                         <div className="d-flex justify-content-between">
//                           <div className="col-4">
//                             <p>Assign Shipment</p>
//                             <select
//                               type="text"
//                               placeholder="warehouse name"
//                               onChange={handleFileChange12}
//                               className="mb-3 border ps-2 py-3 rounded w-100"
//                               name="assign_shipment"
//                               value={data1.assign_shipment}
//                             >
//                               <option>Select...</option>
//                               <option value="1">Freight / order</option>
//                               <option value="2">Groupage / Batch</option>
//                             </select>
//                           </div>
//                           {data1.assign_shipment === "1" ? (
//                             <div className="col-4">
//                               <label className="ware_label">Freight</label>
//                               <select
//                                 onChange={handleFileChange12}
//                                 name="assign_shipment_id"
//                                 className="mb-3 border ps-2 py-3 rounded w-100"
//                                 value={inputdata.assign_shipment_id}
//                               >
//                                 <option>Select...</option>
//                                 {freight1 &&
//                                   freight1.length > 0 &&
//                                   freight1.map((item, index) => {
//                                     console.log(item);
//                                     return (
//                                       <>
//                                         <option
//                                           key={index}
//                                           value={item.order_id}
//                                         >
//                                           {item.freight_number} /{" "}
//                                           {item.order_number}
//                                         </option>
//                                       </>
//                                     );
//                                   })}
//                               </select>
//                             </div>
//                           ) : (
//                             <div className="col-4">
//                               <div className="">
//                                 <label className="ware_label">Batch</label>
//                                 <select
//                                   onChange={handleFileChange12}
//                                   name="assign_shipment_id"
//                                   className="mb-3 border ps-2 py-3 rounded w-100"
//                                   value={inputdata.assign_shipment_id}
//                                 >
//                                   <option>Select...</option>
//                                   {options &&
//                                     options.length > 0 &&
//                                     options.map((item, index) => {
//                                       console.log(item);
//                                       return (
//                                         <>
//                                           <option
//                                             key={index}
//                                             value={item.batch_id}
//                                           >
//                                             {item.batch_number}
//                                           </option>
//                                         </>
//                                       );
//                                     })}
//                                 </select>
//                               </div>
//                             </div>
//                           )}
//                           <div>
//                             <button
//                               className="mt-4 btn btn-secondary  px-4 py-2 rounded"
//                               onClick={addbuttonclick}
//                             >
//                               Add
//                             </button>
//                           </div>
//                         </div>
//                         <div className="table-responsive mt-2">
//                           <table className="table mt-4 table-striped tableICon">
//                             <thead>
//                               <tr>
//                                 <th>Sr.No.</th>
//                                 <th>"Freight / Order No.</th>
//                                 <th>Client Name</th>
//                                 <th>HAWB / Tracking</th>
//                                 <th>Total Weight</th>
//                                 <th>Total CBM</th>
//                                 <th>Nature of Goods</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {tindexdata?.map((item, index) => {
//                                 return (
//                                   <>
//                                     <tr key={index}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                         {item?.freight_number} /{" "}
//                                         {item?.order_number}
//                                       </td>
//                                       <td>{item?.client_name}</td>
//                                       <td>{item?.hawb}</td>
//                                       <td>{item?.weight}</td>
//                                       <td>{item?.dimensions}</td>
//                                       <td>{item?.nature_of_goods}</td>
//                                       <td>
//                                         {item?.shipment_details_id ? (
//                                           <>
//                                             <DeleteIcon
//                                               style={{ cursor: "pointer" }}
//                                               onClick={() => {
//                                                 handleclickdelete(item);
//                                               }}
//                                             />
//                                           </>
//                                         ) : (
//                                           ""
//                                         )}
//                                       </td>
//                                     </tr>
//                                   </>
//                                 );
//                               })}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                       <div className="text-center mt-2">
//                         {tindexdata.length <= 0 ? (
//                           <Button
//                             variant="contained"
//                             onClick={handlclickposterror}
//                           >
//                             Update Warehouse
//                           </Button>
//                         ) : (
//                           <Button variant="contained" onClick={apiupdatepost}>
//                             Update Warehouse
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </Box>
//               </Modal>
//               <ToastContainer />
//             </div>
//             <section className="tableMain">
//               <div className="container">
//                 <div className="row table-responsive ">
//                   <table className="table-striped"></table>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
const pageSize = 10;
export default function MAnageshipments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [countries, setcountries] = useState([]);
  const [inputdata, setInputdata] = useState([]);
  const [tindexdata, setTindexdata] = useState([]);
  const [filesd, setFilesd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [options, setOptions] = useState([]);
  const [freight1, setFreight1] = useState([]);
  const [shipmentID, setShipmentID] = useState("");
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
     const [show1, setShow1] = useState(false);
        const [selectedDocs, setSelectedDocs] = useState([]);
      
       const docOptions = [
        { id: "Waybills", label: "Master Bill" },
      { id: "Waybills", label: "House bill" },
      { id: "Waybills", label: "Arrival Notification" },
      { id: "Supporting Documents", label: "Detention Notice" },
      { id: "Release", label: "Release" },
      ];
        const handleShow = () => setShow1(true);
        const handleClose = () => setShow1(false);
      
        // Handle dropdown change
        const handleSelect = (e) => {
          const selected = e.target.value;
          if (selected && !selectedDocs.find((doc) => doc.name === selected)) {
            setSelectedDocs([...selectedDocs, { name: selected, files: [] }]);
          }
        };
      
        // Handle file upload for each document type
        const handleFileChangefil = (e, docName) => {
          const files = Array.from(e.target.files);
          setSelectedDocs((prev) =>
            prev.map((doc) =>
              doc.name === docName ? { ...doc, files } : doc
            )
          );
        };
      
        // For saving data (you can send to API)
      const handleSave = () => {
        console.log("Uploaded Documents:", selectedDocs);
      
        // To see filenames instead of [object Object]
        selectedDocs.forEach(doc => {
          console.log("Doc Type:", doc);
          doc.files.forEach(file => {
            console.log("File:", file.name, "| Size:", file.size, "bytes");
          });
        });
      
        handleClose();
      };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentdata = data.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const userid = JSON.parse(localStorage.getItem("data123"))?.id;
  const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;
  const openModal1 = async () => {
    try {
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        {
          staff_id: userid,
          user_type: usertype,
          route_url: "/Admin/addshipment",
        }
      );
      if (permission.data?.success === true) {
        navigate("/Admin/addshipment");
      } else {
        toast.error("You don't have permission to add shipment");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };
  useEffect(() => {
    getcountry();
  }, []);
  const getcountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setcountries(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };
  useEffect(() => {
    getwarehouse();
  }, []);
  const getwarehouse = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}getShipment`)
      .then((response) => {
        setLoader(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.response.data.message);
      });
  };
  const openModal2 = (id) => {
    setShipmentID(id);
    const postshipmentpost = {
      shipment_id: id,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}GetShipmentDetails`,
        postshipmentpost
      )
      .then((response) => {
        setInputdata(response.data.shipment);
        setTindexdata(response.data.details);
        console.log(response.data.details);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
    console.log(id);
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };
  const handleFileChange1 = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };
  const handleclickaddarray = () => {
    console.log(inputdata.assign_shipment);
    const payload = {
      type: inputdata.freight === "freight" ? "1" : "2",
      id: inputdata.id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleFileChange1file = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilesd(file);
    }
  };
  const apiupdatepost = async () => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/UpdateShipment",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      console.log(permission);
      if (permission.data.success === true) {
        console.log(tindexdata);
        const formdata = new FormData();
        formdata.append("shipment_id", shipmentID);
        formdata.append("waybill", inputdata.waybill);
        formdata.append("freight", inputdata.freight);
        formdata.append("carrier", inputdata.carrier);
        formdata.append("vessel", inputdata.vessel);
        formdata.append("ETD", inputdata.ETD);
        formdata.append("date_of_dispatch", formatteddispatch);
        formdata.append("ATD", inputdata.ATD);
        formdata.append("status", inputdata.status);
        formdata.append("origin_agent", inputdata.origin_agent);
        formdata.append("port_of_loading", inputdata.port_of_loading);
        formdata.append("port_of_discharge", inputdata.port_of_discharge);
        formdata.append("destination_agent", inputdata.destination_agent);
        formdata.append("load", inputdata.load);
        formdata.append("release_type", inputdata.release_type);
        formdata.append("container", inputdata.container);
        formdata.append("seal", inputdata.seal);
        formdata.append("details", JSON.stringify(tindexdata));
        formdata.append("des_country_id", inputdata.des_country_id);
        formdata.append("origin_country_id", inputdata.origin_country_id);
        formdata.append("documentName", inputdata.documentName);
        // formdata.append("document", filesd);
         selectedDocs.forEach(doc => {
  console.log("Doc Type:", doc.name);

  doc.files.forEach(file => {
    formdata.append(doc.name, file); // 👈 each file append
    console.log("File:", file.name, "| Size:", file.size, "bytes");
  });
});
        axios
          .post(`${process.env.REACT_APP_BASE_URL}UpdateShipment`, formdata)
          .then((response) => {
            try {
              toast.success("Shipment Update successfully");
              console.log("Response Data:", response.data);
              if (response.data.success === true) {
                closeModal2();
                getwarehouse();
              }
            } catch (err) {
              console.error("Error in then block:", err);
              throw err;
            }
          })
          .catch((error) => {
            console.error("Error Response:", error.response);
            if (error.response && error.response.data) {
              console.log(error.response.data.message);
            } else {
              console.log("Error:", error.message);
            }
          });
      } else {
        toast.error("permission denied");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };

  const deletewarehouse = async (id) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    try {
      const payload = {
        user_type: usertype,
        staff_id: userid,
        route_url: "/DeleteShipment",
      };

      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        payload
      );
      console.log(permission);
      if (permission.status === 200) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
          const datadelete = { shipment_id: id };
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}DeleteShipment`,
              datadelete
            );
            toast.success(response.data.message);
            getwarehouse();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Failed to delete the warehouse!");
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.data.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };

  // const deletewarehouse = (id) => {
  //   try {
  //     const payload = {

  //         user_type:usertype ,
  //         staff_id: userid,
  //         route_url: "/DeleteShipment"
  //     }
  //     const permission = axios.post(`${process.env.REACT_APP_BASE_URL}CheckPermission`,payload )
  //       if(permission.data.status===true){
  //         Swal.fire({
  //           title: "Are you sure?",
  //           text: "You won't be able to revert this!",
  //           icon: "warning",
  //           showCancelButton: true,
  //           confirmButtonColor: "#3085d6",
  //           cancelButtonColor: "#d33",
  //           confirmButtonText: "Yes, delete it!",
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             const datadelete = { shipment_id: id };

  //             axios
  //               .post(`${process.env.REACT_APP_BASE_URL}DeleteShipment`, datadelete)
  //               .then((response) => {
  //                 console.log(response.data);
  //                 toast.success(response.data.message);
  //                 getwarehouse();
  //                 Swal.fire({
  //                   title: "Deleted!",
  //                   text: "Your file has been deleted.",
  //                   icon: "success",
  //                 });
  //               })
  //               .catch((error) => {
  //                 console.error(error.response?.data || error.message);
  //                 toast.error("Failed to delete the warehouse!");
  //               });
  //           }
  //         });
  //       }else{
  //         toast.error("you dont have permission to access this page")
  //       }
  //   } catch (error) {
  //     if (error.response && error.response.data.status === 400) {
  //       toast.error("Permission Denied: You don’t have access to this page");
  //     } else {
  //       toast.error("Something went wrong while checking permission.");
  //     }
  //   }

  // };
  useEffect(() => {
    if (inputdata.des_country_id && inputdata.origin_country_id) {
      const timer = setTimeout(() => {
        getbatch(inputdata);
        getorderid(inputdata);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inputdata.des_country_id, inputdata.origin_country_id]);
  const getbatch = (inputdata) => {
    const payload = {
      des_country_id: inputdata.des_country_id,
      origin_country_id: inputdata.origin_country_id,
      freight: inputdata.freight,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}AllBatchNumbers`, payload)
      .then((response) => {
        console.log(response.data.data);
        setOptions(response.data.data);
      });
  };
  const getorderid = (inputdata) => {
    const pauyload = {
      des_country_id: inputdata.des_country_id,
      origin_country_id: inputdata.origin_country_id,
      freight: inputdata.freight,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}AllFreightOrderNumbers`, pauyload)
      .then((response) => {
        console.log(response.data.data);
        setFreight1(response.data.data);
      });
  };
  const handleclicknaciv = (id) => {
    console.log("id", id);
    console.log(id);
    const datanavigate = data.filter((item) => {
      return item.id === id;
    });
    console.log(datanavigate);
    navigate("/Admin/shipmentdetail", { state: { data: datanavigate } });
  };
  const handleclickcopy = (id) => {
    const dataget = data.filter((item) => {
      return item.id === id;
    });
    navigate("/Admin/addshipment", { state: { id: dataget[0] } });
  };
  const handleFileChange12 = (e) => {
    const { name, value } = e.target;
    setData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const addbuttonclick = () => {
    try {
      const payload = {
        type: data1.assign_shipment,
        id: data1.assign_shipment_id,
        origin_country_id: inputdata.origin_country_id,
        des_country_id: inputdata.des_country_id,
      };
      console.log(payload);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}getAssignShipmentList`, payload)
        .then((response) => {
          toast.success(response.data.message);
          const newResponse = response.data.data;
          setTindexdata((prevData) => [...prevData, ...newResponse]);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };
  const handleclickdelete = async (item, id) => {
    console.log(item);
    const payload = {
      shipment_detail_id: item.shipment_details_id,
      orderId: item.order_id,
    };
    console.log(payload);
    try {
      console.log(tindexdata);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}DeleteShipmentDetails`,
        payload
      );
      toast.success(response.data.message);
      const updatedData = tindexdata.filter(
        (item) => item.shipment_details_id !== item.shipment_details_id
      );
      setTindexdata(updatedData);
      getwarehouse();
    } catch (error) {
      console.error(
        "Error deleting shipment details:",
        error.response?.data || error.message
      );
    }
  };
  const handlclickposterror = () => {
    toast.error("Shipment requires at least one batch or freight.");
  };
  console.log(tindexdata);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedETD = formatDate(inputdata.ETD);
  const formattedATD = formatDate(inputdata.ATD);
  const formatteddispatch = formatDate(inputdata.date_of_dispatch);
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... This may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="row  manageFreight">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="freight_hd">Shipments List</h4>
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="mx-2">
                      <button onClick={openModal1}>Add Shipment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive mt-2">
              <table className="table table-striped tableICon">
                <tbody>
                  {currentdata &&
                    currentdata.length > 0 &&
                    currentdata.map((item, index) => {
                      console.log(item);
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.waybill} </td>
                            <td>
                              <p>{item.vessel}</p>
                              <p>{item.freight}</p>
                            </td>
                            <td>
                              <div className="palceLand">
                                <div>
                                  <p>{item.port_of_loading}</p>
                                  <p>
                                    {new Date(item.ETD).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <i
                                    className="fa fa-long-arrow-right"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>
                                  <p>{item.port_of_discharge}</p>
                                  <p>
                                    {new Date(item.ATD).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <p>{item.status}</p>
                            </td>{" "}
                            <td className="w-25">
                              <div className="progress">
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  style={{
                                    width: `${
                                      item.status === "Goods at origin port"
                                        ? "20%"
                                        : item.status === "Goods are in transit"
                                        ? "40%"
                                        : item.status ===
                                          "Arrived at destination port"
                                        ? "60%"
                                        : item.status ===
                                          "Customs clearing in progress"
                                        ? "80%"
                                        : item.status === "Customs released"
                                        ? "100%"
                                        : "25%"
                                    }`,
                                  }}
                                />
                              </div>
                              <div className="dropdown text-end">
                                <a
                                  className="act_btn dropdown-toggle"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Action
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <dropdow
                                      className="dropdown-item li_icon"
                                      onClick={() => {
                                        handleclicknaciv(item.id);
                                      }}
                                    >
                                      <VisibilityIcon
                                        style={{
                                          color: "rgb(27 34 69)",
                                          marginRight: "10px",
                                          width: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                      View
                                    </dropdow>
                                  </li>
                                  <li>
                                    <dropdow
                                      className="dropdown-item li_icon"
                                      onClick={() => {
                                        handleclickcopy(item.id);
                                      }}
                                    >
                                      <ContentCopyIcon
                                        style={{
                                          color: "rgb(27 34 69)",
                                          marginRight: "10px",
                                          fontSize: "20px",
                                          width: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                      Copy
                                    </dropdow>
                                  </li>
                                  <li>
                                    <delete
                                      className="dropdown-item"
                                      onClick={() => {
                                        deletewarehouse(item.id);
                                      }}
                                    >
                                      <AiFillDelete
                                        className="text-danger"
                                        style={{
                                          marginRight: "10px",
                                          width: "20px",
                                          fontSize: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                      Delete
                                    </delete>
                                  </li>
                                  <li>
                                    <p
                                      className="dropdown-item"
                                      onClick={() => {
                                        openModal2(item.id);
                                      }}
                                    >
                                      <FaEdit
                                        style={{
                                          color: "rgb(27 34 69)",
                                          marginRight: "10px",
                                          width: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                      Edit
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
              <div className="text-center d-flex justify-content-end align-items-center">
                <button
                  disabled={currentPage === 1}
                  className="bg_page"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i class="fi fi-rr-angle-small-left page_icon"></i>
                </button>
                <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
                <button
                  disabled={currentPage === totalPage}
                  className="bg_page"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i class="fi fi-rr-angle-small-right page_icon"></i>
                </button>
              </div>
              <Modal
                open={isModalOpen2}
                onClose={closeModal2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="warehouse_modal123"
                  sx={{
                    position: "absolute",
                    overflow: "scroll",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: 600,
                    width: 900,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <div className="row">
                    <h5 className=" fw-bold fs-5 mb-3">
                      Update Shipment Detail / Form
                    </h5>
                    <div className="col-3">
                      <label className="ware_label">Waybill</label>
                      <input
                        type="text"
                        placeholder="Waybill"
                        value={inputdata.waybill}
                        onChange={handleFileChange1}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        name="waybill"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Freight</label>
                      <select
                        type="text"
                        name="freight"
                        value={inputdata.freight}
                        placeholder="freight"
                        onChange={handleFileChange1}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      >
                        <option>Select...</option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                        <option value="Road">Road</option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Vessel</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.vessel}
                        name="vessel"
                        placeholder="vessel"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Carrier</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.carrier}
                        name="carrier"
                        placeholder="carrier"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col-3">
                      <label className="ware_label">date_of_dispatch</label>
                      <input
                        type="date"
                        onChange={handleFileChange1}
                        name="date_of_dispatch"
                        placeholder="date_of_dispatch"
                        value={formatteddispatch}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">ETD</label>
                      <input
                        type="date"
                        onChange={handleFileChange1}
                        name="ETD"
                        placeholder="ETD"
                        value={formattedETD}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">ETA</label>
                      <input
                        type="date"
                        onChange={handleFileChange1}
                        placeholder="ATD"
                        value={formattedATD}
                        name="ATD"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Origin Agent</label>
                      <select
                        className="form-control mb-3 py-2"
                        onChange={handleFileChange1}
                        name="origin_agent"
                        value={inputdata.origin_agent}
                      >
                        <option>Select...</option>
                        <option value="Asia Direct">Asia Direct</option>
                        <option value="Shenzhen Nimbus Shipping">
                          Shenzhen Nimbus Shipping
                        </option>
                        <option value="Shenzhen Portline">
                          Shenzhen Portline
                        </option>
                        <option value="OBD Logistics">OBD Logistics</option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Seal Number </label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.seal}
                        name="seal"
                        placeholder="seal"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label className="ware_label">Port of Loading</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.port_of_loading}
                        name="port_of_loading"
                        placeholder="port_of_loading"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Port of Discharge</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.port_of_discharge}
                        name="port_of_discharge"
                        placeholder="port_of_discharge"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Destination Agent</label>
                      <select
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        name="destination_agent"
                        onChange={handleFileChange1}
                        value={inputdata.destination_agent}
                      >
                        <option>Select...</option>
                        <option value="DHL">DHL</option>
                        <option value="Fedex">Fedex</option>
                        <option value="SACO CFR">SACO CFR</option>
                        <option value="Contra Consolidations">
                          Contra Consolidations
                        </option>
                        <option value="Afristar">Afristar</option>
                        <option value="Asia Direct - Africa">
                          Asia Direct - Africa
                        </option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Load</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.load}
                        name="load"
                        placeholder="load"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label className="ware_label">Release Type</label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.release_type}
                        name="release_type"
                        placeholder="Release Type"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Container number </label>
                      <input
                        type="text"
                        onChange={handleFileChange1}
                        value={inputdata.container}
                        name="container"
                        placeholder="container"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      />
                    </div>

                    <div className="col-3">
                      <label className="ware_label">Status</label>
                      <select
                        onChange={handleFileChange1}
                        name="status"
                        value={inputdata?.status}
                        className="mb-3 border ps-2 py-2 rounded w-100"
                      >
                        <option>Select</option>
                        <option value="Goods at origin port">
                          Goods at origin port
                        </option>
                        <option value="Goods are in transit">
                          Goods are in transit
                        </option>
                        <option value="Arrived at destination port">
                          Arrived at destination port
                        </option>
                        <option value="Customs clearing in progress">
                          Customs clearing in progress
                        </option>
                        <option value="Customs released">
                          Customs released
                        </option>
                      </select>
                    </div>
                    <div className="col-3">
                      <label className="ware_label">Destination Country</label>
                      <select
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        name="des_country_id"
                        value={inputdata?.des_country_id}
                        onChange={handleFileChange1}
                      >
                        <option>Select...</option>
                        {countries.map((item, index) => {
                          return (
                            <>
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label className="ware_label">Country of Origin</label>
                      <select
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        name="origin_country_id"
                        value={inputdata?.origin_country_id}
                        onChange={handleFileChange1}
                      >
                        <option>Select...</option>
                        {countries.map((item, index) => {
                          return (
                            <>
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                     {/* <div className="col-3">
                                                    <label className="ware_label">Select Document</label>
                                                    <select  style={{ padding: "10px" }}
                      className="mb-3 border rounded w-100" name="documentName" onChange={handleFileChange1}>
                            <option value="">Select...</option>
                            <option value="Customs Documents">Customs docs</option>
                            <option value="Supporting Documents">Supporting docs</option>
                            <option value="Invoice, Packing List">Invoice / Packing L</option>
                            <option value="Product Literature">Product Literature</option>
                            <option value="Letters of authority">LOA</option>
                            <option value="Waybills">Freight Docs</option>
                            <option value="Waybills">Shipping instruction</option>
                            <option value="Supplier Invoices">Freight Invoices </option>
                            <option value="AD_Quotations">Attach Quote</option>
                          </select>
                                                 </div>
                    <div className="col-3">
                      <label className="ware_label">Upload Document</label>
                      <input
                        type="file"
                        className="mb-3 border ps-2 py-2 rounded w-100"
                        name="document"
                        onChange={handleFileChange1file}
                      ></input>
                    </div> */}
                                        <div className="row mb-3 mt-4">
                                                                      <div className="col-9 mt-3">
                                                                        <h4 className="freight_hd">Document Section</h4>
                                                                        <span class="line"></span>
                                                                      </div>
                                                                      <div className="col-3">
                                                    <Button className="btn  btn-primary" onClick={handleShow}>
                                                              Upload Documents
                                                            </Button>
                                                                           {
                                                                            show1 ? <Modal
                                                            open={show1}
                                                            onClose={handleClose}
                                                            slotProps={{
                                                              backdrop: {
                                                                sx: { backgroundColor: "rgba(0,0,0,0.2)" },
                                                              },
                                                            }}
                                                          >
                                                            <Box
                                                              sx={{
                                                                p: 3,
                                                                bgcolor: "background.paper",
                                                                borderRadius: 2,
                                                                width: 500,
                                                                mx: "auto",
                                                                mt: 10,
                                                              }}
                                                            >
                                                              <h2>Upload Documents</h2>
                                                              <FormControl fullWidth sx={{ mt: 2 }}>
                                                                <InputLabel id="doc-select-label">Select Document Type</InputLabel>
                                                                <Select
                                                                  labelId="doc-select-label"
                                                                  // value={selected}
                                                                  onChange={handleSelect}
                                                                >
                                                                  {docOptions.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id}>
                                                                      {option.label}
                                                                    </MenuItem>
                                                                  ))}
                                                                </Select>
                                                              </FormControl>
                                                              <div className="mt-3">
                                                                {selectedDocs.map((doc, index) => (
                                                                  <div key={index} className="mb-3">
                                                                    <label className="fw-bold">{doc.name}</label>
                                                                    <input
                                                                      type="file"
                                                                      className="form-control"
                                                                      multiple
                                                                      accept="image/*,application/pdf"
                                                                      onChange={(e) => handleFileChangefil(e, doc.name)}
                                                                    />
                                                                  </div>
                                                                ))}
                                                              </div>
                                                    
                                                              {/* Footer buttons */}
                                                              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                                                                <Button onClick={handleClose}>Cancel</Button>
                                                                <Button variant="contained" color="success" onClick={handleSave}>
                                                                  Save Documents
                                                                </Button>
                                                              </Box>
                                                            </Box>
                                                          </Modal> : ""
                                                                           }   
                                                                      </div>
                                                                    </div>
                  </div>
                  <div className="row">
                    <h5 className="my-3">Assign Shipment</h5>
                    <div className="d-flex justify-content-between">
                      <div className="col-4">
                        <p>Assign Shipment</p>
                        <select
                          type="text"
                          placeholder="warehouse name"
                          onChange={handleFileChange12}
                          className="mb-3 border ps-2 py-3 rounded w-100"
                          name="assign_shipment"
                          value={data1.assign_shipment}
                        >
                          <option>Select...</option>
                          <option value="1">Freight / order</option>
                          <option value="2">Groupage / Batch</option>
                        </select>
                      </div>
                      {data1.assign_shipment === "1" ? (
                        <div className="col-4">
                          <label className="ware_label">Freight</label>
                          <select
                            onChange={handleFileChange12}
                            name="assign_shipment_id"
                            className="mb-3 border ps-2 py-3 rounded w-100"
                            value={inputdata.assign_shipment_id}
                          >
                            <option>Select...</option>
                            {freight1 &&
                              freight1.length > 0 &&
                              freight1.map((item, index) => {
                                console.log(item);
                                return (
                                  <>
                                    <option key={index} value={item.order_id}>
                                      {item.freight_number} /{" "}
                                      {item.order_number}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      ) : (
                        <div className="col-4">
                          <div className="">
                            <label className="ware_label">Batch</label>
                            <select
                              onChange={handleFileChange12}
                              name="assign_shipment_id"
                              className="mb-3 border ps-2 py-3 rounded w-100"
                              value={inputdata.assign_shipment_id}
                            >
                              <option>Select...</option>
                              {options &&
                                options.length > 0 &&
                                options.map((item, index) => {
                                  console.log(item);
                                  return (
                                    <>
                                      <option key={index} value={item.batch_id}>
                                        {item.batch_number}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      )}
                      <div>
                        <button
                          className="mt-4 btn btn-secondary  px-4 py-2 rounded"
                          onClick={addbuttonclick}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive mt-2">
                      <table className="table mt-4 table-striped tableICon">
                        <thead>
                          <tr>
                            <th>Sr.No.</th>
                            <th>"Freight / Order No.</th>
                            <th>Client Name</th>
                            <th>HAWB / Tracking</th>
                            <th>Total Weight</th>
                            <th>Total CBM</th>
                            <th>Nature of Goods</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tindexdata?.map((item, index) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {item?.freight_number} /{" "}
                                    {item?.order_number}
                                  </td>
                                  <td>{item?.client_name}</td>
                                  <td>{item?.hawb}</td>
                                  <td>{item?.weight}</td>
                                  <td>{item?.dimensions}</td>
                                  <td>{item?.nature_of_goods}</td>
                                  <td>
                                    {item?.shipment_details_id ? (
                                      <>
                                        <DeleteIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            handleclickdelete(item);
                                          }}
                                        />
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    {tindexdata.length <= 0 ? (
                      <Button variant="contained" onClick={handlclickposterror}>
                        Update Warehouse
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={apiupdatepost}>
                        Update Warehouse
                      </Button>
                    )}
                  </div>
                </Box>
              </Modal>
              <ToastContainer />
            </div>
            <section className="tableMain">
              <div className="container">
                <div className="row table-responsive ">
                  <table className="table-striped"></table>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
