// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Modal, Grid, TextField, Box, Button } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import CloseIcon from "@mui/icons-material/Close";
// const pageSize = 10;
// const style1 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "8px",
// };
// export default function WarehouseOrder() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [batch, setBatch] = useState([]);
//   const [file, setFile] = useState(null);
//   const [erd, setErd] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [prodata, setProdata] = useState("");
//   const [clickdata, setClickdata] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [batchidsdsd, setBatchidsdsd] = useState();
//   const [loader, setLoader] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [updatedata, setUpdatedata] = useState(false);
//   const [data1, setData1] = useState({
//     origin: "",
//     destination: "",
//     startDate: "",
//     endDate: "",
//     freightType: "",
//     freightSpeed: "",
//   });
//   const [selectedData, setSelectedData] = useState(null);
//   const navigate = useNavigate();
//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);
//   const handleOpenModal2 = () => setIsModalOpen2(true);
//   const handleCloseModal2 = () => setIsModalOpen2(false);
//   useEffect(() => {
//     getData();
//   }, []);

//   const userid = JSON.parse(localStorage.getItem("data123"))?.id;
//   const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;

//   const getData = async () => {
//     try {
//       const datapost = {
//         staff_id: userid,
//         user_type: usertype,
//         route_url: "/GetWarehouseOrders",
//       };
//       const permission = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}CheckPermission`,
//         datapost
//       );
//       if (permission.data.success === true) {
//         setLoader(true);
//         try {
//           const response = await axios.post(
//             `${process.env.REACT_APP_BASE_URL}GetWarehouseOrders`
//           );

//           setLoader(false);
//           if (response.data && response.data.data) {
//             setData(response.data.data);
//           } else {
//             toast.error("No warehouse orders found.");
//           }
//         } catch (error) {
//           setLoader(false);
//           console.error("Error fetching warehouse orders:", error);
//           if (error.response && error.response.status === 400) {
//             toast.error(
//               error.response.data.message ||
//                 "Data not found or permission denied."
//             );
//           } else {
//             toast.error("Something went wrong while fetching orders.");
//           }
//         }
//       } else {
//         toast.error("Permission Denied: You don’t have access to this action");
//       }
//     } catch (error) {
//       console.error("Error checking permission:", error);
//       if (error.response && error.response.status === 400) {
//         toast.error("Permission Denied: You don’t have access to this page");
//       } else {
//         toast.error("Something went wrong while checking permission.");
//       }
//     }
//   };

//   const getAllBatch = (item) => {
//     console.log(item);
//     const payload = {
//       des_country_id: item.delivery_to,
//       origin_country_id: item.collection_from,
//       freight: item.Freight,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}AllBatchNumbers`, payload)
//       .then((response) => {
//         setClickdata(response.data.data[0]);

//         setBatch(response.data.data);
//         toast.error(response.data.data.message);
//       })
//       .catch((error) => {
//         console.error(error.response.data);
//         toast.error("Error fetching batch data");
//       });
//   };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const handleEditClick = (freight_ID, warehouse_assign_order_id) => {
//     console.log(freight_ID);
//     setErd(warehouse_assign_order_id);
//     const selectedData = data.find((item) => item.freight_ID === freight_ID);
//     console.log(selectedData);
//     setSelectedData(selectedData);
//     handleOpenModal();
//   };
//   const handleEditClick12 = (
//     warehouse_assign_order_id,
//     order_id,
//     freight_id
//   ) => {
//     const data = {
//       id: warehouse_assign_order_id,
//       order_id: order_id,
//       freight_id: freight_id,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}DeleteWarehouseOrder`, data)
//       .then((response) => {
//         toast.success(response.data.message);
//         getData();
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };
//   const handleBatchChange = (e, item) => {
//     const batchId = e.target.value;
//     setBatchidsdsd(e.target.value);
//     console.log(e);
//     console.log(clickdata);
//     console.log(item);
//     console.log(item.batch_id);
//     console.log(e.target.value, item);
//     if (batchId) {
//       console.log(batchId);
//       moveFreightToBatch(batchId, item);
//     }
//   };
//   const moveFreightToBatch = (batchId, item) => {
//     console.log(item, batchId);
//     const datapost = {
//       freight_id: item.freight_id,
//       batch_id: batchId,
//       warehouse_id: item.warehouse_id,
//       order_id: item.order_id,
//     };
//     console.log(datapost);
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}moveFreightToBatch`, datapost)
//       .then((response) => {
//         toast.success("Freight moved to batch successfully");
//         getData();
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
//   const filteredData = data.filter((item) => {
//     return (
//       item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.collection_from_name
//         ?.toLowerCase()
//         ?.includes(searchQuery?.toLowerCase()) ||
//       item?.nature_of_hazard
//         ?.toLowerCase()
//         ?.includes(searchQuery?.toLowerCase()) ||
//       item?.delivery_to_name
//         ?.toLowerCase()
//         ?.includes(searchQuery?.toLowerCase()) ||
//       item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.Freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.batch_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
//       item?.freight_number?.toLowerCase()?.includes(searchQuery?.toLowerCase())
//     );
//   });
//   const totalPage = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentData = filteredData.slice(startIndex, endIndex);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedData({ ...selectedData, [name]: value });
//   };
//   const handleSubmit = () => {
//     const dataApi = {
//       warehouse_assign_id: selectedData.warehouse_assign_order_id,
//       order_id: selectedData.order_id,
//       freight_id: selectedData.freight_id,
//       ware_receipt_no: selectedData.ware_receipt_no,
//       tracking_number: selectedData.tracking_number,
//       warehouse_status: selectedData.warehouse_status,
//       warehouse_collect: selectedData.warehouse_collect,
//       date_received: selectedData.date_received,
//       package_type: selectedData.package_type,
//       packages: selectedData.packages,
//       dimension: selectedData.dimension,
//       weight: selectedData.weight,
//     };
//     console.log(dataApi);
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}editWarehouseDetails`, dataApi)
//       .then((response) => {
//         toast.success("Warehouse order updated successfully");
//         getData();
//         handleCloseModal();
//       })
//       .catch((error) => {
//         console.error(error.response.data);
//         toast.error("Error updating warehouse order");
//       });
//   };
//   const closeModal1 = () => {
//     setIsModalOpen1(false);
//   };
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };
//   const postData1 = () => {
//     if (file) {
//       const formdata = new FormData();
//       formdata.append("file", file);
//       axios
//         .post(`${process.env.REACT_APP_BASE_URL}UploadExcelWarehouse`, formdata)
//         .then((response) => {
//           if (response.data.success === true) {
//             toast.success(response.data.message);
//             closeModal1();
//           }
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     } else {
//       console.log("No file selected");
//     }
//   };
//   const handleclicknavi = async (item) => {
//     try {
//       const datapost = {
//         staff_id: userid,
//         user_type: usertype,
//         route_url: "/Admin/warehousedetails",
//       };
//       const permission = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}CheckPermission`,
//         datapost
//       );
//       if (permission.data.success === true) {
//         console.log(item);
//         navigate("/Admin/warehousedetails", { state: { data: item } });
//       } else {
//         toast.error("Permission Denied: You don’t have access to this page");
//       }
//     } catch (error) {
//       console.error("Error checking permission:", error);
//       if (error.response && error.response.status === 400) {
//         toast.error("Permission Denied: You don’t have access to this page");
//       } else {
//         toast.error("Something went wrong while checking permission.");
//       }
//     }
//   };
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };
//   const handleclickrevert123 = (item) => {
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}get-estimate-details`, {
//         estimate_id: item.estimated_id,
//       })
//       .then((response) => {
//         navigate("/Admin/download_url", { state: response.data.data });
//       })
//       .catch((error) => {
//         toast.error("Estimate not calculate");
//       });
//   };
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setData1({ ...data1, [name]: value });
//   };
//   const handlechangepro = (e) => {
//     const { name, value } = e.target;
//     setProdata({ ...prodata, [name]: value });
//   };
//   const handpechangepro = () => {
//     console.log(erd);
//     const item = {
//       warehouse_assign_order_id: erd,
//     };
//     const dat11a = {
//       warehouse_order_id: erd,
//       user_id: JSON.parse(localStorage.getItem("data123")).id,
//       added_by: JSON.parse(localStorage.getItem("data123")).user_type,
//       product_description: prodata.product_description,
//       Hazardous: prodata.Hazardous,
//       date_received: prodata.date_received,
//       package_type: prodata.package_type,
//       packages: prodata.packages,
//       dimension: prodata.dimension,
//       weight: prodata.weight,
//       warehouse_ref: prodata.warehouse_ref,
//       freight: prodata.freight,
//       groupage_batch_ref: prodata.groupage_batch_ref,
//       supplier: prodata.supplier,
//       warehouse_receipt_number: prodata.warehouse_receipt_number,
//       tracking_number: prodata.tracking_number,
//       date_dspatched: prodata.date_dspatched,
//       supplier_address: prodata.supplier_address,
//       warehouse_collect: prodata.warehouse_collect,
//       costs_to_collect: prodata.costs_to_collect,
//       port_of_loading: prodata.port_of_loading,
//       warehouse_dispatch: prodata.warehouse_dispatch,
//       warehouse_cost: prodata.warehouse_cost,
//       cost_to_dispatch: prodata.cost_to_dispatch,
//       waybill_ref: prodata.waybill_ref,
//     };
//     console.log(dat11a);
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}addWarehouseProduct`, dat11a)
//       .then((response) => {
//         toast.success(response.data.message);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };
//   console.log(selectedData);
//   const handlekey = (e) => {
//     if (e.charCode < 48 || e.charCode > 57) {
//       e.preventDefault();
//     }
//   };
//   useEffect(() => {
//     updatecountry();
//   }, []);
//   const updatecountry = () => {
//     axios
//       .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
//       .then((response) => {
//         setUpdatedata(response.data.data);
//       })
//       .catch((error) => {
//         console.group(error.response.data.message);
//       });
//   };
//   const postData = () => {
//     const data3 = {
//       origin: data1.origin,
//       destination: data1.destination,
//       startDate: data1.startDate,
//       endDate: data1.endDate,
//       freightType: data1.freight,
//       freightSpeed: data1.type,
//     };
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}GetWarehouseOrders`, data3)
//       .then((response) => {
//         console.log(response.data.data);
//         if (response.data.success === true) {
//           handleCloseModal2();
//           setData(response.data.data);
//         }
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };
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
//             <div className="row manageFreight">
//               <div className="col-md-12">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="freight_hd">Warehouse Order List</h4>
//                   </div>
//                   <div className="d-flex justify-content-end align-items-center">
//                     <div className="">
//                       <input
//                         className="px-2 py-1 rounded "
//                         placeholder="Search"
//                         value={searchQuery}
//                         onChange={handleSearch}
//                       ></input>
//                     </div>
//                     <div className="ms-1">
//                       <Button
//                         variant="contained"
//                         onClick={() => {
//                           handleOpenModal2();
//                         }}
//                       >
//                         Filter
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="  mt-3">
//                   <div className="">
//                     <div className="table-responsive">
//                       <table className="table table-striped tableICon">
//                         <tbody>
//                           {currentData &&
//                             currentData.length > 0 &&
//                             currentData.map((item) => {
//                               return (
//                                 <>
//                                   <tr key={item.id}>
//                                     <td className="list_bd">
//                                       <div className="container-fluid">
//                                         <div className="d-flex justify-content-between align-items-center">
//                                           <div className="d-flex align-items-center">
//                                             <p
//                                               className="client_nm"
//                                               style={{ fontSize: "18px" }}
//                                             >
//                                               {item.client_name}
//                                             </p>
//                                             <p
//                                               className="fright_no mx-2"
//                                               style={{ fontSize: "14px" }}
//                                             >
//                                               {item.batch_number}
//                                             </p>
//                                           </div>
//                                           <div className="">
//                                             <p className="port_date">
//                                               {new Date(
//                                                 item.date
//                                               ).toLocaleDateString("en-GB")}
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <div className="row align-items-center">
//                                           <div className="col-md-3">
//                                             <div className="">
//                                               <p
//                                                 className="origin"
//                                                 style={{ fontSize: "14px" }}
//                                               >
//                                                 {item.product_desc}
//                                               </p>
//                                             </div>
//                                           </div>
//                                           <div className="col-md-5">
//                                             <div className="d-flex align-items-center justify-content-center">
//                                               <p className="origin">
//                                                 {item.collection_from_name}
//                                               </p>
//                                               <div className="arrow">
//                                                 <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
//                                               </div>
//                                               <p className="origin">
//                                                 {item.delivery_to_name}
//                                                 <span className="fright_type">
//                                                   (
//                                                   {item.Freight
//                                                     ? item.Freight
//                                                     : item.freight_type}
//                                                   )
//                                                 </span>
//                                               </p>
//                                             </div>
//                                           </div>
//                                           <div className="col-md-2">
//                                             <div className="text-center">
//                                               <p className="origin">
//                                                 {item.nature_of_hazard}
//                                               </p>
//                                             </div>
//                                           </div>
//                                           <div className="col-md-2">
//                                             <div className="text-end">
//                                               <div className="dropdown">
//                                                 <select
//                                                   onClick={() => {
//                                                     getAllBatch(item);
//                                                   }}
//                                                   onChange={(e) =>
//                                                     handleBatchChange(e, item)
//                                                   }
//                                                   name="dropval"
//                                                   value={item?.dropval}
//                                                   className="py-1 ps-1 sel_batches"
//                                                   style={{ cursor: "pointer" }}
//                                                 >
//                                                   <option
//                                                     className="op_tion"
//                                                     value=""
//                                                   >
//                                                     Select Batch
//                                                   </option>
//                                                   {batch &&
//                                                     batch.length > 0 &&
//                                                     batch.map(
//                                                       (batchItem, index) => (
//                                                         <option
//                                                           className="op_tion"
//                                                           key={index}
//                                                           value={
//                                                             batchItem.batch_id
//                                                           }
//                                                         >
//                                                           {
//                                                             batchItem.batch_number
//                                                           }
//                                                         </option>
//                                                       )
//                                                     )}
//                                                 </select>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="row">
//                                           <div className="col-md-6">
//                                             <div className="d-flex align-items-center">
//                                               <p
//                                                 type="radio"
//                                                 className="input_user mb-0"
//                                               />
//                                               {item.assign_to_batch === 0 ? (
//                                                 <div className="d-flex align-items-center">
//                                                   <span className="dot bg-danger me-2"></span>
//                                                   <p
//                                                     className="text-danger mb-0"
//                                                     style={{ fontSize: "12px" }}
//                                                   >
//                                                     Batch Not Assigned
//                                                   </p>
//                                                 </div>
//                                               ) : (
//                                                 <div className="d-flex align-items-center">
//                                                   <span className="dot bg-success me-2"></span>
//                                                   <p
//                                                     className="text-success mb-0"
//                                                     style={{ fontSize: "12px" }}
//                                                   >
//                                                     Batch Assigned
//                                                   </p>
//                                                 </div>
//                                               )}
//                                             </div>
//                                           </div>
//                                           <div className="col-md-6 text-end">
//                                             <FaEdit
//                                               onClick={() =>
//                                                 handleEditClick(
//                                                   item.freight_ID,
//                                                   item.warehouse_assign_order_id
//                                                 )
//                                               }
//                                               style={{
//                                                 color: "#1d2044",
//                                                 cursor: "pointer",
//                                               }}
//                                             />
//                                             <DeleteIcon
//                                               onClick={() =>
//                                                 handleEditClick12(
//                                                   item.warehouse_assign_order_id,
//                                                   item.order_id,
//                                                   item.freight_id
//                                                 )
//                                               }
//                                               style={{
//                                                 color: "#1d2044",
//                                                 cursor: "pointer",
//                                               }}
//                                             />
//                                             <VisibilityIcon
//                                               onClick={() =>
//                                                 handleclicknavi(item)
//                                               }
//                                               style={{
//                                                 color: "rgb(27 34 69)",
//                                                 cursor: "pointer",
//                                                 width: "20px",
//                                               }}
//                                             />
//                                             <PictureAsPdfIcon
//                                               style={{ cursor: "pointer" }}
//                                               onClick={() => {
//                                                 handleclickrevert123(item);
//                                               }}
//                                             />
//                                           </div>{" "}
//                                         </div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </>
//                               );
//                             })}
//                         </tbody>
//                       </table>
//                       <div className="text-center d-flex justify-content-end align-items-center">
//                         <button
//                           disabled={currentPage === 1}
//                           className="bg_page"
//                           onClick={() => handlePageChange(currentPage - 1)}
//                         >
//                           <i class="fi fi-rr-angle-small-left page_icon"></i>
//                         </button>
//                         <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                         <button
//                           disabled={currentPage === totalPage}
//                           className="bg_page"
//                           onClick={() => handlePageChange(currentPage + 1)}
//                         >
//                           <i class="fi fi-rr-angle-small-right page_icon"></i>
//                         </button>
//                       </div>
//                       <ToastContainer />
//                       <Modal
//                         open={isModalOpen1}
//                         onClose={closeModal1}
//                         aria-labelledby="modal-modal-title"
//                         aria-describedby="modal-modal-description"
//                       >
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                             height: 300,
//                             width: 450,
//                             bgcolor: "background.paper",
//                             boxShadow: 24,
//                             p: 4,
//                           }}
//                         >
//                           <h4 id="modal-modal-title">Add Excel</h4>
//                           <input
//                             type="file"
//                             accept=".xlsx,.xls"
//                             onChange={handleFileChange}
//                             className="mb-3 border ps-2 py-2 rounded w-100"
//                             style={{ display: "block", marginTop: "16px" }}
//                           />
//                           <Button
//                             variant="contained"
//                             className="submit_btn"
//                             onClick={postData1}
//                           >
//                             Submit
//                           </Button>
//                         </Box>
//                       </Modal>
//                       <Modal
//                         open={isModalOpen2}
//                         onClose={handleCloseModal2}
//                         aria-labelledby="modal-modal-title"
//                         aria-describedby="modal-modal-description"
//                       >
//                         <Box
//                           sx={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                           }}
//                         >
//                           <div className="modal-header">
//                             <h2 id="modal-modal-title">Filter</h2>
//                             <button
//                               className="btn btn-close"
//                               onClick={handleCloseModal2}
//                             >
//                               <CloseIcon />
//                             </button>
//                           </div>
//                           <div className="newModalGap noFormaControl">
//                             <div className="row my-3  ">
//                               <div className="col-6">
//                                 <label>Delivery Type</label>
//                                 <select name="type" onChange={handlechange}>
//                                   <option value="">Select</option>
//                                   <option value="express">Express</option>
//                                   <option value="normal">Consolidation</option>
//                                 </select>
//                               </div>
//                               <div className="col-6">
//                                 <label>Priority </label>
//                                 <div className="shipRefer1 d-flex">
//                                   <div>
//                                     <input
//                                       type="radio"
//                                       id="shipper"
//                                       name="priority"
//                                       style={{ cursor: "pointer" }}
//                                       value="High"
//                                       onChange={handlechange}
//                                     />
//                                     <label htmlFor="shipper">High</label>
//                                   </div>
//                                   <div>
//                                     <input
//                                       type="radio"
//                                       id="shipper2"
//                                       style={{ cursor: "pointer" }}
//                                       name="priority"
//                                       value="Medium"
//                                       onChange={handlechange}
//                                     />
//                                     <label htmlFor="consignee">Medium</label>
//                                   </div>
//                                   <div>
//                                     <input
//                                       type="radio"
//                                       id="shipper3"
//                                       name="priority"
//                                       style={{ cursor: "pointer" }}
//                                       value="Low"
//                                       onChange={handlechange}
//                                     />
//                                     <label htmlFor="mediumPr">Low</label>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="row mb-3">
//                               <div className="col-6">
//                                 <label>Country of Origin</label>
//                                 <select name="origin" onChange={handlechange}>
//                                   <option value="">Select</option>
//                                   {updatedata &&
//                                     updatedata.length > 0 &&
//                                     updatedata.map((item, index) => {
//                                       return (
//                                         <>
//                                           <option value={item.id}>
//                                             {item.name}
//                                           </option>
//                                         </>
//                                       );
//                                     })}
//                                 </select>
//                               </div>
//                               <div className="col-6">
//                                 <label>Delivery to Country </label>
//                                 <select
//                                   name="destination"
//                                   onChange={handlechange}
//                                 >
//                                   <option value="">Select</option>
//                                   {updatedata &&
//                                     updatedata.length > 0 &&
//                                     updatedata.map((item, index) => {
//                                       return (
//                                         <>
//                                           <option value={item.id}>
//                                             {item.name}
//                                           </option>
//                                         </>
//                                       );
//                                     })}
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="row mb-3">
//                               <div className="col-6">
//                                 <label>Start Date</label>
//                                 <input
//                                   type="date"
//                                   id="shipper3"
//                                   name="startDate"
//                                   style={{ cursor: "pointer" }}
//                                   className="form-control"
//                                   onChange={handlechange}
//                                 />
//                               </div>
//                               <div className="col-6">
//                                 <label>End Date </label>
//                                 <input
//                                   type="date"
//                                   id="shipper3"
//                                   name="endDate"
//                                   style={{ cursor: "pointer" }}
//                                   className="form-control"
//                                   onChange={handlechange}
//                                 />
//                               </div>
//                             </div>
//                             <div className="row mb-3">
//                               <div className="col-6">
//                                 <label>Freight</label>
//                                 <select name="freight" onChange={handlechange}>
//                                   <option value="">Select...</option>
//                                   <option value="Sea">Sea</option>
//                                   <option value="Air">Air</option>
//                                   <option value="Road">Road</option>
//                                 </select>
//                               </div>
//                             </div>
//                             <Button variant="contained" onClick={postData}>
//                               Apply
//                             </Button>
//                           </div>
//                         </Box>
//                       </Modal>
//                       <Modal
//                         open={isModalOpen}
//                         onClose={handleCloseModal}
//                         aria-labelledby="modal-title"
//                         aria-describedby="modal-description"
//                         className="editWare"
//                       >
//                         <Box sx={style1}>
//                           <div className="modal-header">
//                             <h2 id="modal-modal-title">Edit Warehouse Order</h2>
//                             <button
//                               className="btn btn-close"
//                               onClick={handleCloseModal}
//                             >
//                               <CloseIcon />
//                             </button>
//                           </div>
//                           <div className="newModalGap">
//                             <div className="text-center">
//                               <div className="d-flex justify-content-between">
//                                 <div
//                                   className="fs-3 border rounded-circle px-2 bg-dark text-white"
//                                   style={{
//                                     cursor: "pointer",
//                                     height: 40,
//                                     width: 40,
//                                   }}
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#exampleModal"
//                                   onClick={handleCloseModal}
//                                 >
//                                   +
//                                 </div>
//                               </div>
//                             </div>
//                             {selectedData && (
//                               <form onSubmit={handleSubmit} className="pt-3">
//                                 <Grid container spacing={2}>
//                                   <Grid
//                                     item
//                                     xs={12}
//                                     sm={6}
//                                     className="warehouse_ord"
//                                   >
//                                     <TextField
//                                       fullWidth
//                                       label="Warehouse Receipt No"
//                                       variant="outlined"
//                                       name="ware_receipt_no"
//                                       value={selectedData.ware_receipt_no || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Waybill"
//                                       variant="outlined"
//                                       name="tracking_number"
//                                       value={selectedData.tracking_number || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Warehouse Status"
//                                       variant="outlined"
//                                       name="warehouse_status"
//                                       value={
//                                         selectedData.warehouse_status || ""
//                                       }
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Warehouse Collect"
//                                       variant="outlined"
//                                       name="warehouse_collect"
//                                       value={
//                                         selectedData.warehouse_collect || ""
//                                       }
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Date Received"
//                                       type="date"
//                                       variant="outlined"
//                                       name="date_received"
//                                       InputLabelProps={{
//                                         shrink: true,
//                                       }}
//                                       value={selectedData.date_received || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Package Type"
//                                       variant="outlined"
//                                       name="package_type"
//                                       value={selectedData.package_type || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Total Packages"
//                                       variant="outlined"
//                                       name="no_of_packages"
//                                       value={selectedData.no_of_packages || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={6}>
//                                     <TextField
//                                       fullWidth
//                                       label="Dimension"
//                                       variant="outlined"
//                                       name="dimension"
//                                       value={selectedData.dimension || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                   <Grid item xs={12} sm={12}>
//                                     <TextField
//                                       fullWidth
//                                       label="Weight"
//                                       variant="outlined"
//                                       name="weight"
//                                       value={selectedData.weight || ""}
//                                       onChange={handleInputChange}
//                                     />
//                                   </Grid>
//                                 </Grid>
//                                 <Box
//                                   mt={3}
//                                   display="flex"
//                                   justifyContent="space-between"
//                                 >
//                                   <div className="unsetLt">
//                                     <Button
//                                       variant="contained"
//                                       className="save_btn text-center"
//                                       onClick={handleSubmit}
//                                     >
//                                       Submit
//                                     </Button>
//                                   </div>
//                                 </Box>
//                               </form>
//                             )}
//                           </div>
//                         </Box>
//                       </Modal>
//                       <div
//                         class="modal fade"
//                         id="exampleModal"
//                         tabindex="-1"
//                         aria-labelledby="exampleModalLabel"
//                         aria-hidden="true"
//                       >
//                         <div class="modal-dialog modal-lg modal-dialog-centered">
//                           <div class="modal-content ware_cont">
//                             <div class="modal-header">
//                               <h1
//                                 class="modal-title fs-5"
//                                 id="exampleModalLabel"
//                               >
//                                 Warehouse Detail
//                               </h1>
//                               <button
//                                 type="button"
//                                 class="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                               >
//                                 <CloseIcon />
//                               </button>
//                             </div>

//                             <div class="modal-body">
//                               <div className="newModalGap">
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       Product Description
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="product description"
//                                       onChange={handlechangepro}
//                                       name="product_description"
//                                     />
//                                   </div>
//                                   <div className="col-md-6 noFormaControl">
//                                     <label className="form-label">
//                                       Harzadous
//                                     </label>
//                                     <select
//                                       onChange={handlechangepro}
//                                       name="Hazardous"
//                                     >
//                                       <option>Select...</option>
//                                       <option value="Yes">Yes</option>
//                                       <option value="No">No</option>
//                                     </select>
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       Warehouse Ref.
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="warehouse reference"
//                                       name="warehouse_ref"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       Data Received
//                                     </label>
//                                     <input
//                                       type="date"
//                                       className="form-control"
//                                       placeholder=""
//                                       name="date_received"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6 noFormaControl">
//                                     <label className="form-label">
//                                       Package Type
//                                     </label>
//                                     <select
//                                       name="package_type"
//                                       onChange={handlechangepro}
//                                     >
//                                       <option value="">Select...</option>
//                                       <option value="box">Box</option>
//                                       <option value="crate">Crate</option>
//                                       <option value="pallet">Pallet</option>
//                                       <option value="bags">Bags</option>
//                                     </select>
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       Total Packages
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onKeyPress={handlekey}
//                                       name="packages"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       Dimension
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="dimension"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                       onKeyPress={handlekey}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">Weight</label>
//                                     <input
//                                       type="text"
//                                       name="weight"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onKeyPress={handlekey}
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       freight
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="freight"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       supplier_address
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="supplier_address"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       supplier
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="supplier"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       groupage_batch_ref
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="groupage_batch_ref"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       date_dspatched
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="date_dspatched"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       added_by
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="added_by"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       warehouse_order_id
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="warehouse_order_id"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                       onKeyPress={handlekey}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       costs_to_collect
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="costs_to_collect"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onKeyPress={handlekey}
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       port_of_loading
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="port_of_loading"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       warehouse_dispatch
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="warehouse_dispatch"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       warehouse_cost
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="warehouse_cost"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                       onKeyPress={handlekey}
//                                     />
//                                   </div>
//                                   <div className="col-md-6">
//                                     <label className="form-label">
//                                       cost_to_dispatch
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="cost_to_dispatch"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onKeyPress={handlekey}
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row mb-3">
//                                   <div className="col-md-12">
//                                     <label className="form-label">
//                                       waybill_ref
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="waybill_ref"
//                                       className="form-control"
//                                       placeholder="0.00"
//                                       onChange={handlechangepro}
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                               <div class="modal-footer">
//                                 <button
//                                   type="button"
//                                   class="btn btn-secondary closeSpacing"
//                                   data-bs-dismiss="modal"
//                                 >
//                                   Close
//                                 </button>
//                                 <button
//                                   type="button"
//                                   class="btn btn-primary"
//                                   onClick={handpechangepro}
//                                 >
//                                   Save changes
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Modal, Grid, TextField, Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
const pageSize = 10;
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
export default function WarehouseOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [batch, setBatch] = useState([]);
  const [file, setFile] = useState(null);
   const [formFiles, setFormFiles] = useState({
      supplier_invoice: [],
      other_documents: [],
      licenses: [],
      packing_list: [],
    });
  const [erd, setErd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [prodata, setProdata] = useState("");
  const [orderID, setOrderID] = useState("");
  const [clickdata, setClickdata] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchidsdsd, setBatchidsdsd] = useState();
  const [loader, setLoader] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [updatedata, setUpdatedata] = useState(false);
  const [data1, setData1] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    freightType: "",
    freightSpeed: "",
  });
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleOpenModal3();
  };
  const handleOpenModal2 = () => setIsModalOpen2(true);
  const handleOpenModal3 = () => setIsModalOpen3(true);
  const handleCloseModal2 = () => setIsModalOpen2(false);
  const handleCloseModal3 = () => setIsModalOpen3(false);
  useEffect(() => {
    getData();
  }, []);

  const userid = JSON.parse(localStorage.getItem("data123"))?.id;
  const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;

  const getData = async () => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/GetWarehouseOrders",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success === true) {
        setLoader(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}GetWarehouseOrders`
          );

          setLoader(false);
          if (response.data && response.data.data) {
            setData(response.data.data);
          } else {
            toast.error("No warehouse orders found.");
          }
        } catch (error) {
          setLoader(false);
          console.error("Error fetching warehouse orders:", error);
          if (error.response && error.response.status === 400) {
            toast.error(
              error.response.data.message ||
                "Data not found or permission denied."
            );
          } else {
            toast.error("Something went wrong while fetching orders.");
          }
        }
      } else {
        toast.error("Permission Denied: You don’t have access to this action");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };

  const getAllBatch = (item) => {
    console.log(item);
    const payload = {
      des_country_id: item.delivery_to,
      origin_country_id: item.collection_from,
      freight: item.Freight,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}AllBatchNumbers`, payload)
      .then((response) => {
        setClickdata(response.data.data[0]);

        setBatch(response.data.data);
        toast.error(response.data.data.message);
      })
      .catch((error) => {
        console.error(error.response.data);
        toast.error("Error fetching batch data");
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleEditClick = (freight_ID, warehouse_assign_order_id, order_id) => {
    console.log(freight_ID, warehouse_assign_order_id, order_id);
    setOrderID(order_id);
    setErd(warehouse_assign_order_id);
    const selectedData = data.find((item) => item.freight_ID === freight_ID);
    console.log(selectedData);
    setSelectedData(selectedData);
    handleOpenModal();
  };
  const handleEditClick12 = (
    warehouse_assign_order_id,
    order_id,
    freight_id
  ) => {
    const data = {
      id: warehouse_assign_order_id,
      order_id: order_id,
      freight_id: freight_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}DeleteWarehouseOrder`, data)
      .then((response) => {
        toast.success(response.data.message);
        getData();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleBatchChange = (e, item) => {
    const batchId = e.target.value;
    setBatchidsdsd(e.target.value);
    console.log(e);
    console.log(clickdata);
    console.log(item);
    console.log(item.batch_id);
    console.log(e.target.value, item);
    if (batchId) {
      console.log(batchId);
      moveFreightToBatch(batchId, item);
    }
  };
  const moveFreightToBatch = (batchId, item) => {
    console.log(item, batchId);
    const datapost = {
      freight_id: item.freight_id,
      batch_id: batchId,
      warehouse_id: item.warehouse_id,
      order_id: item.order_id,
    };
    console.log(datapost);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}moveFreightToBatch`, datapost)
      .then((response) => {
        toast.success("Freight moved to batch successfully");
        getData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const filteredData = data.filter((item) => {
    return (
      item?.client_name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.product_desc?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.collection_from_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.nature_of_hazard
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.delivery_to_name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.Freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.batch_number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.freight_number?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  });
  const totalPage = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value });
  };
//   const handleSubmit = () => {
//     const formdata1 = new FormData()
//     // const dataApi = {
//       warehouse_assign_id: selectedData.warehouse_assign_order_id,
//       order_id: selectedData.order_id,
//       freight_id: selectedData.freight_id,
//       ware_receipt_no: selectedData.ware_receipt_no,
//       tracking_number: selectedData.tracking_number,
//       warehouse_status: selectedData.warehouse_status,
//       warehouse_collect: selectedData.warehouse_collect,
//       date_received: selectedData.date_received,
//       package_type: selectedData.package_type,
//       no_of_packages: selectedData.no_of_packages,
//       packages: selectedData.packages,
//       total_dimension: selectedData.total_dimension,
//       weight: selectedData.weight,
//       costs_to_collect: selectedData.costs_to_collect,
//       warehouse_cost: selectedData.warehouse_cost,
//       warehouse_dispatch: selectedData.warehouse_dispatch,
//       cost_to_dispatch: selectedData.cost_to_dispatch,

//          Object.values(formFiles).forEach((files) => {
//   files.forEach((file) => {
//     formdata.append("document", file); // static key
//   });
// });
//     };
//     console.log(dataApi);
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}editWarehouseDetails`, dataApi)
//       .then((response) => {
//         toast.success("Warehouse order updated successfully");
//         getData();
//         handleCloseModal();
//       })
//       .catch((error) => {
//         console.error(error.response.data);
//         toast.error("Error updating warehouse order");
//       });
//   };
  
const handleSubmit = () => {
  const formdata1 = new FormData();

  // Append all fields from selectedData
  formdata1.append("warehouse_assign_id", selectedData.warehouse_assign_order_id);
  formdata1.append("order_id", selectedData.order_id);
  formdata1.append("freight_id", selectedData.freight_id);
  formdata1.append("ware_receipt_no", selectedData.ware_receipt_no);
  formdata1.append("tracking_number", selectedData.tracking_number);
  formdata1.append("warehouse_status", selectedData.warehouse_status);
  formdata1.append("warehouse_collect", selectedData.warehouse_collect);
  formdata1.append("date_received", selectedData.date_received);
  formdata1.append("package_type", selectedData.package_type);
  formdata1.append("no_of_packages", selectedData.no_of_packages);
  formdata1.append("total_dimension", selectedData.total_dimension);
  formdata1.append("weight", selectedData.weight);
  formdata1.append("costs_to_collect", selectedData.costs_to_collect);
  formdata1.append("warehouse_cost", selectedData.warehouse_cost);
  formdata1.append("warehouse_dispatch", selectedData.warehouse_dispatch);
  formdata1.append("cost_to_dispatch", selectedData.cost_to_dispatch);
  formdata1.append("documentName", selectedData.documentName);

  // If packages is an object or array, stringify it
  formdata1.append("packages", JSON.stringify(selectedData.packages));

  // Append files (with static key "document")
  Object.values(formFiles).forEach((files) => {
    files.forEach((file) => {
      formdata1.append("document", file);
    });
  });

  // Optional: Debug log of FormData contents
  for (let [key, value] of formdata1.entries()) {
    console.log(`${key}:`, value);
  }

  // Submit the data via axios
  axios
    .post(`${process.env.REACT_APP_BASE_URL}editWarehouseDetails`, formdata1)
    .then((response) => {
      toast.success("Warehouse order updated successfully");
      getData();
      handleCloseModal();
    })
    .catch((error) => {
      console.error(error.response?.data || error.message);
      toast.error("Error updating warehouse order");
    });
};



const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const postData1 = () => {
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}UploadExcelWarehouse`, formdata)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            closeModal1();
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      console.log("No file selected");
    }
  };

    const handleFileChange123 = (e, fieldName) => {
    const files = Array.from(e.target.files);
    setFormFiles((prev) => ({
      ...prev,
      [fieldName]: files,
    }));
  };
  const handleclicknavi = async (item) => {
    try {
      const datapost = {
        staff_id: userid,
        user_type: usertype,
        route_url: "/Admin/warehousedetails",
      };
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        datapost
      );
      if (permission.data.success === true) {
        console.log(item);
        navigate("/Admin/warehousedetails", { state: { data: item } });
      } else {
        toast.error("Permission Denied: You don’t have access to this page");
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Permission Denied: You don’t have access to this page");
      } else {
        toast.error("Something went wrong while checking permission.");
      }
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleclickrevert123 = (item) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}get-estimate-details`, {
        estimate_id: item.estimated_id,
      })
      .then((response) => {
        navigate("/Admin/download_url", { state: response.data.data });
      })
      .catch((error) => {
        toast.error("Estimate not calculate");
      });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
  };
  const handlechangepro = (e) => {
    const { name, value } = e.target;
    setProdata({ ...prodata, [name]: value });
  };

const handpechangepro = () => {
  console.log(erd);
  const formdata = new FormData();
  formdata.append("warehouse_order_id", erd);
  formdata.append("order_id", orderID);
  formdata.append("user_id", JSON.parse(localStorage.getItem("data123")).id);
  formdata.append("added_by", JSON.parse(localStorage.getItem("data123")).user_type);
  formdata.append("product_description", prodata.product_description);
  formdata.append("Hazardous", prodata.Hazardous);
  formdata.append("date_received", prodata.date_received);
  formdata.append("package_type", prodata.package_type);
  formdata.append("packages", prodata.packages);
  formdata.append("dimension", prodata.dimension);
  formdata.append("weight", prodata.weight);
  formdata.append("warehouse_ref", prodata.warehouse_ref);
  formdata.append("freight", prodata.freight);
  formdata.append("groupage_batch_ref", prodata.groupage_batch_ref);
  formdata.append("supplier", prodata.supplier);
  formdata.append("warehouse_receipt_number", prodata.warehouse_receipt_number);
  formdata.append("tracking_number", prodata.tracking_number);
  formdata.append("date_dspatched", prodata.date_dspatched);
  formdata.append("supplier_address", prodata.supplier_address);
  formdata.append("warehouse_collect", prodata.warehouse_collect);
  formdata.append("costs_to_collect", prodata.costs_to_collect);
  formdata.append("port_of_loading", prodata.port_of_loading);
  formdata.append("warehouse_dispatch", prodata.warehouse_dispatch);
  formdata.append("warehouse_cost", prodata.warehouse_cost);
  formdata.append("cost_to_dispatch", prodata.cost_to_dispatch);
  formdata.append("waybill_ref", prodata.waybill_ref);
  formdata.append("documentName", prodata.documentName);

  // Append files with static key "document"
  Object.values(formFiles).forEach((files) => {
    files.forEach((file) => {
      formdata.append("document", file);
    });
  });
  // Optional: log the formdata
  for (let [key, value] of formdata.entries()) {
    console.log(`${key}:`, value);
  }

  axios
    .post(`${process.env.REACT_APP_BASE_URL}addWarehouseProduct`, formdata)
    .then((response) => {
      handleCloseModal3();
      toast.success(response.data.message);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response?.data || error.message);
      toast.error("Error adding warehouse product");
    });
};



//   const handpechangepro = () => {
//     console.log(erd);
//     const item = {
//       warehouse_assign_order_id: erd,
//     };
//     const dat11a = {
//       warehouse_order_id: erd,
//       order_id: orderID,
//       user_id: JSON.parse(localStorage.getItem("data123")).id,
//       added_by: JSON.parse(localStorage.getItem("data123")).user_type,
//       product_description: prodata.product_description,
//       Hazardous: prodata.Hazardous,
//       date_received: prodata.date_received,
//       package_type: prodata.package_type,
//       packages: prodata.packages,
//       dimension: prodata.dimension,
//       weight: prodata.weight,
//       warehouse_ref: prodata.warehouse_ref,
//       freight: prodata.freight,
//       groupage_batch_ref: prodata.groupage_batch_ref,
//       supplier: prodata.supplier,
//       warehouse_receipt_number: prodata.warehouse_receipt_number,
//       tracking_number: prodata.tracking_number,
//       date_dspatched: prodata.date_dspatched,
//       supplier_address: prodata.supplier_address,
//       warehouse_collect: prodata.warehouse_collect,
//       costs_to_collect: prodata.costs_to_collect,
//       port_of_loading: prodata.port_of_loading,
//       warehouse_dispatch: prodata.warehouse_dispatch,
//       warehouse_cost: prodata.warehouse_cost,
//       cost_to_dispatch: prodata.cost_to_dispatch,
//       waybill_ref: prodata.waybill_ref,
//       documentName: prodata.documentName,
//     };

//      Object.values(formFiles).forEach((files) => {
//   files.forEach((file) => {
//     formdata.append("document", file); // static key
//   });
// });
//     console.log(dat11a);
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}addWarehouseProduct`, dat11a)
//       .then((response) => {
//         handleCloseModal3();
//         toast.success(response.data.message);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };
  console.log(selectedData);
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  useEffect(() => {
    updatecountry();
  }, []);
  const updatecountry = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}GetCountries`)
      .then((response) => {
        setUpdatedata(response.data.data);
      })
      .catch((error) => {
        console.group(error.response.data.message);
      });
  };
  const postData = () => {
    const data3 = {
      origin: data1.origin,
      destination: data1.destination,
      startDate: data1.startDate,
      endDate: data1.endDate,
      freightType: data1.freight,
      freightSpeed: data1.type,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}GetWarehouseOrders`, data3)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success === true) {
          handleCloseModal2();
          setData(response.data.data);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
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
            <div className="row manageFreight">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="freight_hd">Warehouse Order List</h4>
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="">
                      <input
                        className="px-2 py-1 rounded "
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                      ></input>
                    </div>
                    <div className="ms-1">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenModal2();
                        }}
                      >
                        Filter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="  mt-3">
                  <div className="">
                    <div className="table-responsive">
                      <table className="table table-striped tableICon">
                        <tbody>
                          {currentData &&
                            currentData.length > 0 &&
                            currentData.map((item) => {
                              return (
                                <>
                                  <tr key={item.id}>
                                    <td className="list_bd">
                                      <div className="container-fluid">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="d-flex align-items-center">
                                            <p
                                              className="client_nm"
                                              style={{ fontSize: "18px" }}
                                            >
                                              {item.client_name}
                                            </p>
                                            <p
                                              className="fright_no mx-2"
                                              style={{ fontSize: "14px" }}
                                            >
                                              {item.batch_number}
                                            </p>
                                          </div>
                                          <div className="">
                                            <p className="port_date">
                                              {new Date(
                                                item.date
                                              ).toLocaleDateString("en-GB")}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row align-items-center">
                                          <div className="col-md-3">
                                            <div className="">
                                              <p
                                                className="origin"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {item.product_desc}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-5">
                                            <div className="d-flex align-items-center justify-content-center">
                                              <p className="origin">
                                                {item.collection_from_name}
                                              </p>
                                              <div className="arrow">
                                                <i className="fi fi-rr-arrow-right mx-2 arr_icon"></i>
                                              </div>
                                              <p className="origin">
                                                {item.delivery_to_name}
                                                <span className="fright_type">
                                                  (
                                                  {item.Freight
                                                    ? item.Freight
                                                    : item.freight_type}
                                                  )
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-2">
                                            <div className="text-center">
                                              <p className="origin">
                                                {item.nature_of_hazard}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-2">
                                            <div className="text-end">
                                              <div className="dropdown">
                                                <select
                                                  onClick={() => {
                                                    getAllBatch(item);
                                                  }}
                                                  onChange={(e) =>
                                                    handleBatchChange(e, item)
                                                  }
                                                  name="dropval"
                                                  value={item?.dropval}
                                                  className="py-1 ps-1 sel_batches"
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <option
                                                    className="op_tion"
                                                    value=""
                                                  >
                                                    Select Batch
                                                  </option>
                                                  {batch &&
                                                    batch.length > 0 &&
                                                    batch.map(
                                                      (batchItem, index) => (
                                                        <option
                                                          className="op_tion"
                                                          key={index}
                                                          value={
                                                            batchItem.batch_id
                                                          }
                                                        >
                                                          {
                                                            batchItem.batch_number
                                                          }
                                                        </option>
                                                      )
                                                    )}
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                              <p
                                                type="radio"
                                                className="input_user mb-0"
                                              />
                                              {item.assign_to_batch === 0 ? (
                                                <div className="d-flex align-items-center">
                                                  <span className="dot bg-danger me-2"></span>
                                                  <p
                                                    className="text-danger mb-0"
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Batch Not Assigned
                                                  </p>
                                                </div>
                                              ) : (
                                                <div className="d-flex align-items-center">
                                                  <span className="dot bg-success me-2"></span>
                                                  <p
                                                    className="text-success mb-0"
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Batch Assigned
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="col-md-6 text-end">
                                            <FaEdit
                                              onClick={() =>
                                                handleEditClick(
                                                  item.freight_ID,
                                                  item.warehouse_assign_order_id,
                                                  item.order_id
                                                )
                                              }
                                              style={{
                                                color: "#1d2044",
                                                cursor: "pointer",
                                              }}
                                            />
                                            <DeleteIcon
                                              onClick={() =>
                                                handleEditClick12(
                                                  item.warehouse_assign_order_id,
                                                  item.order_id,
                                                  item.freight_id
                                                )
                                              }
                                              style={{
                                                color: "#1d2044",
                                                cursor: "pointer",
                                              }}
                                            />
                                            <VisibilityIcon
                                              onClick={() =>
                                                handleclicknavi(item)
                                              }
                                              style={{
                                                color: "rgb(27 34 69)",
                                                cursor: "pointer",
                                                width: "20px",
                                              }}
                                            />
                                            <PictureAsPdfIcon
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                handleclickrevert123(item);
                                              }}
                                            />
                                          </div>{" "}
                                        </div>
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
                      <ToastContainer />
                      <Modal
                        open={isModalOpen1}
                        onClose={closeModal1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            height: 300,
                            width: 450,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <h4 id="modal-modal-title">Add Excel</h4>
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="mb-3 border ps-2 py-2 rounded w-100"
                            style={{ display: "block", marginTop: "16px" }}
                          />
                          <Button
                            variant="contained"
                            className="submit_btn"
                            onClick={postData1}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Modal>
                      <Modal
                        open={isModalOpen2}
                        onClose={handleCloseModal2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="modal-header">
                            <h2 id="modal-modal-title">Filter</h2>
                            <button
                              className="btn btn-close"
                              onClick={handleCloseModal2}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap noFormaControl">
                            <div className="row my-3  ">
                              <div className="col-6">
                                <label>Delivery Type</label>
                                <select name="type" onChange={handlechange}>
                                  <option value="">Select</option>
                                  <option value="express">Express</option>
                                  <option value="normal">Consolidation</option>
                                </select>
                              </div>
                              <div className="col-6">
                                <label>Priority </label>
                                <div className="shipRefer1 d-flex">
                                  <div>
                                    <input
                                      type="radio"
                                      id="shipper"
                                      name="priority"
                                      style={{ cursor: "pointer" }}
                                      value="High"
                                      onChange={handlechange}
                                    />
                                    <label htmlFor="shipper">High</label>
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      id="shipper2"
                                      style={{ cursor: "pointer" }}
                                      name="priority"
                                      value="Medium"
                                      onChange={handlechange}
                                    />
                                    <label htmlFor="consignee">Medium</label>
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      id="shipper3"
                                      name="priority"
                                      style={{ cursor: "pointer" }}
                                      value="Low"
                                      onChange={handlechange}
                                    />
                                    <label htmlFor="mediumPr">Low</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-6">
                                <label>Country of Origin</label>
                                <select name="origin" onChange={handlechange}>
                                  <option value="">Select</option>
                                  {updatedata &&
                                    updatedata.length > 0 &&
                                    updatedata.map((item, index) => {
                                      return (
                                        <>
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                              <div className="col-6">
                                <label>Delivery to Country </label>
                                <select
                                  name="destination"
                                  onChange={handlechange}
                                >
                                  <option value="">Select</option>
                                  {updatedata &&
                                    updatedata.length > 0 &&
                                    updatedata.map((item, index) => {
                                      return (
                                        <>
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-6">
                                <label>Start Date</label>
                                <input
                                  type="date"
                                  id="shipper3"
                                  name="startDate"
                                  style={{ cursor: "pointer" }}
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                              <div className="col-6">
                                <label>End Date </label>
                                <input
                                  type="date"
                                  id="shipper3"
                                  name="endDate"
                                  style={{ cursor: "pointer" }}
                                  className="form-control"
                                  onChange={handlechange}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-6">
                                <label>Freight</label>
                                <select name="freight" onChange={handlechange}>
                                  <option value="">Select...</option>
                                  <option value="Sea">Sea</option>
                                  <option value="Air">Air</option>
                                  <option value="Road">Road</option>
                                </select>
                              </div>
                            </div>
                            <Button variant="contained" onClick={postData}>
                              Apply
                            </Button>
                          </div>
                        </Box>
                      </Modal>
                      <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        className="editWare"
                      >
                        <Box sx={style1}>
                          <div className="modal-header">
                            <h2 id="modal-modal-title">Edit Warehouse Order</h2>
                            <button
                              className="btn btn-close"
                              onClick={handleCloseModal}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                          <div className="newModalGap">
                            <div className="text-center">
                              <div className="d-flex justify-content-between">
                                <div
                                  className="fs-3 border rounded-circle px-2 bg-dark text-white"
                                  style={{
                                    cursor: "pointer",
                                    height: 40,
                                    width: 40,
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={handleCloseModal}
                                >
                                  +
                                </div>
                              </div>
                            </div>
                            {selectedData && (
                              <form onSubmit={handleSubmit} className="pt-3">
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    className="warehouse_ord"
                                  >
                                    <TextField
                                      fullWidth
                                      label="Warehouse Receipt No"
                                      variant="outlined"
                                      name="ware_receipt_no"
                                      value={selectedData.ware_receipt_no || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Waybill"
                                      variant="outlined"
                                      name="tracking_number"
                                      value={selectedData.tracking_number || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Warehouse Status"
                                      variant="outlined"
                                      name="warehouse_status"
                                      value={
                                        selectedData.warehouse_status || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Warehouse Collect"
                                      variant="outlined"
                                      name="warehouse_collect"
                                      value={
                                        selectedData.warehouse_collect || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Date Received"
                                      type="date"
                                      variant="outlined"
                                      name="date_received"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={selectedData.date_received || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Package Type"
                                      variant="outlined"
                                      name="package_type"
                                      value={selectedData.package_type || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Total Packages"
                                      variant="outlined"
                                      name="no_of_packages"
                                      value={selectedData.no_of_packages || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Dimension"
                                      variant="outlined"
                                      name="total_dimension"
                                      value={selectedData.total_dimension || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Costs to collect"
                                      variant="outlined"
                                      name="costs_to_collect"
                                      value={
                                        selectedData.costs_to_collect || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Warehouse Cost"
                                      variant="outlined"
                                      name="warehouse_cost"
                                      value={selectedData.warehouse_cost || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Warehouse Dispatch"
                                      variant="outlined"
                                      name="warehouse_dispatch"
                                      value={
                                        selectedData.warehouse_dispatch || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Cost to Dispatch"
                                      variant="outlined"
                                      name="cost_to_dispatch"
                                      value={
                                        selectedData.cost_to_dispatch || ""
                                      }
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      fullWidth
                                      label="Weight"
                                      variant="outlined"
                                      name="weight"
                                      value={selectedData.weight || ""}
                                      onChange={handleInputChange}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                          {/* <label>Select Document </label> */}
                          <select name="documentName" className="w-100 py-3"  onChange={handleInputChange}>
                            <option value="">Select Document</option>
                            <option value="Warehouse Entry Docs">  Shipper Docs</option>
                            <option value="Warehouse Entry Docs">Warehouse Docs</option>
                            <option value="Invoice, Packing List">Invoice / Packing </option>
                            <option value="Product Literature">Product Literature</option>
                            <option value="Letters of Authority">LOA</option>
                          </select>
                                  </Grid>
                                  <Grid item xs={12} sm={12}>
                                    
                          <label>Upload Document</label>
                          <input
                            type="file"
                            multiple
                            className="w-100 mb-3 rounded"
                            onChange={(e) =>
                              handleFileChange123(e, "other_documents")
                            }
                          />
                        </Grid>
                                </Grid>
                                <Box
                                  mt={3}
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  <div className="unsetLt">
                                    <Button
                                      variant="contained"
                                      className="save_btn text-center"
                                      onClick={handleSubmit}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </Box>
                              </form>
                            )}
                          </div>
                        </Box>
                      </Modal>
                      <Modal open={isModalOpen3} onClose={handleCloseModal3}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "80%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            maxHeight: "90vh",
                            overflowY: "auto",
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                          >
                            <Typography variant="h6">
                              Warehouse Detail
                            </Typography>
                            <IconButton onClick={handleCloseModal3}>
                              <CloseIcon />
                            </IconButton>
                          </Box>

                          {/* Your form fields go here (input/select) */}
                          <div className="newModalGap  noFormaControl">
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Product Description
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="product description"
                                  onChange={handlechangepro}
                                  name="product_description"
                                />
                              </div>
                              <div className="col-md-6 noFormaControl">
                                <label className="form-label">Harzadous</label>
                                <select
                                  onChange={handlechangepro}
                                  name="Hazardous"
                                >
                                  <option>Select...</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Warehouse Ref.
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="warehouse reference"
                                  name="warehouse_ref"
                                  onChange={handlechangepro}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Data Received
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder=""
                                  name="date_received"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6 noFormaControl">
                                <label className="form-label">
                                  Package Type
                                </label>
                                <select
                                  name="package_type"
                                  onChange={handlechangepro}
                                >
                                  <option value="">Select...</option>
                                  <option value="box">Box</option>
                                  <option value="crate">Crate</option>
                                  <option value="pallet">Pallet</option>
                                  <option value="bags">Bags</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Total Packages
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  name="packages"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">Dimension</label>
                                <input
                                  type="text"
                                  name="dimension"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                  onKeyPress={handlekey}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">Weight</label>
                                <input
                                  type="text"
                                  name="weight"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Supplier Address
                                </label>
                                <input
                                  type="text"
                                  name="supplier_address"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Supplier</label>
                                <input
                                  type="text"
                                  name="supplier"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Warehouse  Order
                                </label>
                                <input
                                  type="text"
                                  name="warehouse_order_id"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                  onKeyPress={handlekey}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Costs to Collect
                                </label>
                                <input
                                  type="text"
                                  name="costs_to_collect"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Warehouse dispatch
                                </label>
                                <input
                                  type="text"
                                  name="warehouse_dispatch"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Waybill Ref
                                </label>
                                <input
                                  type="text"
                                  name="waybill_ref"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Warehouse Cost
                                </label>
                                <input
                                  type="text"
                                  name="warehouse_cost"
                                  className="form-control"
                                  placeholder="0.00"
                                  onChange={handlechangepro}
                                  onKeyPress={handlekey}
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Cost to Dispatch
                                </label>
                                <input
                                  type="text"
                                  name="cost_to_dispatch"
                                  className="form-control"
                                  placeholder="0.00"
                                  onKeyPress={handlekey}
                                  onChange={handlechangepro}
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-6 mt-3">
                          <select name="documentName" className="w-100 py-3"  onChange={handlechangepro}>
                            <option value="">Select Document</option>
                            <option value="Warehouse Entry Docs">  Shipper Docs</option>
                            <option value="Warehouse Entry Docs">Warehouse Docs</option>
                            <option value="Invoice, Packing List">Invoice / Packing </option>
                            <option value="Product Literature">Product Literature</option>
                            <option value="Letters of Authority">LOA</option>
                          </select>
                        </div>
                              <div className="col-6 mt-3">
                          <label>Upload Document</label>
                          <input
                            type="file"
                            multiple
                            className="w-100 mb-3 rounded"
                            onChange={(e) =>
                              handleFileChange(e, "other_documents")
                            }
                          />
                        </div>
                            </div>
                            <div className="row mb-3"></div>

                            <div class="modal-footer"></div>
                          </div>

                          <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button
                              variant="contained"
                              onClick={handpechangepro}
                            >
                              Add Product
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
