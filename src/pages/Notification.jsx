// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import CloseIcon from "@mui/icons-material/Close";

// const pageSize =10;
// const Notification = () => {
//   const [data, setData] = useState("");
//   const [inpdata, setInpdata] = useState({
//     send_to: "", user_id: "", title: "", description: ""
//   });
//   const [showContent, setShowContent] = useState(false);
//   const [showContent1, setShowContent1] = useState(false);
//   const [clientlist, setClientlist] = useState([]);
//    const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState("");
//   const [stafflist, setStafflist] = useState([]);
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const messageRef = useRef();

//   const handledelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.post(`${process.env.REACT_APP_BASE_URL}delete-notification`, { notification_id: id }).then((response) => {
//           toast.success(response.data.message);
//           showdata();
//         }).catch((error) => {
//           toast.error(error.response.data.message);
//         });
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//       }
//     });
//   };

//   const showdata = () => {
//     axios.post(`${process.env.REACT_APP_BASE_URL}notification-list`).then((response) => {
//       setData(response.data.data);
//     });
//   };

//   const totalPage = Math.ceil(data.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentdata = data.slice(startIndex, endIndex);
//   useEffect(() => {
//     showdata();
//   }, []);

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setInpdata({ ...inpdata, [name]: value });
//     if (name === "send_to") {
//       setShowContent(value === "4");
//       setShowContent1(value === "3");
//     }
//   };

//   const handelvalidate = (value) => {
//     let error = {};
//     if (!value.title) {
//       error.title = "Title is required";
//     }
//     if (!value.description) {
//       error.description = "Description is required";
//     }
//     if (!error.title && !error.description) {
//       apihit();
//     }
//     setError(error);
//   };

//   const postdata = () => {
//     handelvalidate(inpdata);
//   };

//   const apihit = () => {
//     axios.post(`${process.env.REACT_APP_BASE_URL}send-notification`, inpdata).then((response) => {
//       toast.success(response.data.message);
//       nameRef.current.value = "";
//       emailRef.current.value = "";
//       messageRef.current.value = "";
//       showdata();
//     });
//   };

//   const handleclickshow = () => {
//     axios.get(`${process.env.REACT_APP_BASE_URL}staff-list`).then((response) => {
//       setStafflist(response.data.data);
//     });
//   };

//   const handleclickshow1 = () => {
//     axios.get(`${process.env.REACT_APP_BASE_URL}clientlist`).then((response) => {
//       setClientlist(response.data.data);
//     });
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div>
//             <div>
//               <div className="row manageFreight">
//                 <div className="col-12">
//                   <div className='d-flex justify-content-between align-item-center'>
//                     <div className="">
//                       <h4 className="freight_hd">Notification</h4>
//                     </div>
//                     <div className="">
//                       <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                         Send Notification
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal fade modalBorder" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title" id="exampleModalLabel">Add Notification</h5>
//                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
//                       <CloseIcon/>
//                       </button>
//                     </div>
//                     <div className="modal-body notifiAddmodal">
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <input type="radio" id="all_user" value="2" ref={nameRef} name="send_to" onChange={handlechange} />
//                           <label for="all_user" className="ms-1">All User</label>
//                         </div>
//                         <div>
//                           <input type="radio" id="All_Staff" value="1" name="send_to" onChange={handlechange} />
//                           <label for="All_Staff" className="ms-1">All Staff</label>
//                         </div>
//                         <div>
//                           <input type="radio" id="Particular_user" value="3" onClick={handleclickshow1} name="send_to" onChange={handlechange} />
//                           <label for="Particular_user" className="ms-1">Particular User</label>
//                         </div>
//                         <div>
//                           <input type="radio" id="Particular_staff" value="4" onClick={handleclickshow} name="send_to" onChange={handlechange} />
//                           <label for="Particular_staff" className="ms-1">Particular Staff</label>
//                         </div>
//                       </div>
//                       {showContent1 && (
//                         <div>
//                           <label className="mt-3">Particular User</label><br />
//                           <select name="user_id" className="w-100 p-2 rounded" onChange={handlechange}>
//                             <option className="ps-2">Select...</option>
//                             {clientlist.length > 0 && clientlist.map((item, index) => (
//                               <option key={index} value={item.id}>{item.client_name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       )}
//                       {showContent && (
//                         <div>
//                           <label className="mt-3">Particular Staff</label><br />
//                           <select name="user_id" className="w-100 p-2 border-1 rounded" onChange={handlechange}>
//                             <option>Select...</option>
//                             {stafflist.length > 0 && stafflist.map((item, index) => (
//                               <option key={index} value={item.id}>{item.full_name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       )}
//                       <div>
//                         <label>Title</label>
//                         <input type="text" onChange={handlechange} ref={emailRef} name="title" placeholder="Title" className="form-control" />
//                         <p className="text-danger">{error.title}</p>
//                       </div>
//                       <div>
//                         <label>Message</label>
//                         <textarea type="text" ref={messageRef} onChange={handlechange} placeholder="Message" name="description" className="form-control" />
//                         <p className="text-danger mb-0">{error.description}</p>
//                       </div>
//                     </div>
//                     <div className="modal-footer">
//                       <button type="button" onClick={postdata} className="btn btn-primary">
//                         Send Notification
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="table-responsive mt-2">
//                 <table className="table table-striped tableICon">
//                   <thead>
//                     <tr>
//                       <th scope="col">Sr.No.</th>
//                       <th scope="col">Title</th>
//                       <th scope="col">Message</th>
//                       <th scope="col">Date</th>
//                       <th scope="col">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody style={{ border: "none" }}>
//                     {currentdata.length > 0 && currentdata.map((item, index) => {
//                       const date = new Date(item?.created_at);
//                       const formattedDate = date.toLocaleDateString("en-GB", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric"
//                       });
//                       return (
//                         <tr className="border-bottom" key={index}>
//                           <th>{index + 1}</th>
//                           <td>{item.title}</td>
//                           <td>{item.description}</td>
//                           <td>{formattedDate}</td>
//                           <td>
//                             <div className="action_btn1">
//                               <AiFillDelete className="text-danger" onClick={() => handledelete(item.id)} style={{cursor:"pointer"}} />
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//                 <div className="text-center d-flex justify-content-end align-items-center">
//                       <button
//                         disabled={currentPage === 1}
//                         className="bg_page"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                       >
//                         <i class="fi fi-rr-angle-small-left page_icon"></i>
//                       </button>
//                       <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//                       <button
//                         disabled={currentPage === totalPage}
//                         className="bg_page"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                       >
//                         <i class="fi fi-rr-angle-small-right page_icon"></i>
//                       </button>
//                     </div>
//               </div>
//             </div>
//           </div >
//           <ToastContainer />
//         </div >
//       </div >
//     </>
//   );
// };

// export default Notification;
// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { AiFillDelete } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import Select from "react-select";
// import CloseIcon from "@mui/icons-material/Close";

// const pageSize = 10;

// const Notification = () => {
//   const [data, setData] = useState([]);
//   const [inpdata, setInpdata] = useState({
//     send_to: "",
//     user_id: "",
//     title: "",
//     description: "",
//   });

//   const [showContent, setShowContent] = useState(false);
//   const [showContent1, setShowContent1] = useState(false);
//   const [showMultiUser, setShowMultiUser] = useState(false);
//   const [showBatchUser, setShowBatchUser] = useState(false);
//   const [batchId,setBatchId]=useState("")
//   const [clientlist, setClientlist] = useState([]);
//   const [stafflist, setStafflist] = useState([]);
//   const [batchlist, setBatchlist] = useState([]);
//   const [batchlist1, setBatchlist1] = useState([]);
//   const [batchUserList, setBatchUserList] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState({});
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const messageRef = useRef();

//   const handledelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .post(`${process.env.REACT_APP_BASE_URL}delete-notification`, {
//             notification_id: id,
//           })
//           .then((response) => {
//             toast.success(response.data.message);
//             showdata();
//           })
//           .catch((error) => {
//             toast.error(error.response.data.message);
//           });
//       }
//     });
//   };

//   const showdata = () => {
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}notification-list`)
//       .then((response) => {
//         setData(response.data.data);
//       });
//   };

//   const totalPage = Math.ceil(data.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentdata = data.slice(startIndex, endIndex);

//   useEffect(() => {
//     showdata();
//   }, []);

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setInpdata({ ...inpdata, [name]: value });

//     if (name === "send_to") {
//       setShowContent(value === "4");
//       setShowContent1(value === "3");
//       setShowMultiUser(value === "5");
//       setShowBatchUser(value === "6");

//       if (value === "3" || value === "5" || value === "6") {
//         axios
//           .get(`${process.env.REACT_APP_BASE_URL}clientlist`)
//           .then((response) => {
//             setClientlist(response.data.data);
//           });
//       }
//       if (value === "4") {
//         axios
//           .get(`${process.env.REACT_APP_BASE_URL}staff-list`)
//           .then((response) => {
//             setStafflist(response.data.data);
//           });
//       }
//       if (value === "6") {
//         axios
//           .get(`${process.env.REACT_APP_BASE_URL}getBatchList`)
//           .then((response) => {
//             setBatchlist(response.data.data);
//           });
//       }
//     }
//   };

//   const handleUserMultiSelect = (e) => {
//     const selected = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedUsers(selected);
//     setInpdata({ ...inpdata, user_id: selected.join(",") });
//   };
//   const handleBatchChange = (e) => {
//     const batchId = e.target.value;
//     setBatchId(batchId);
//   };
//   const handelvalidate = (value) => {
//     let error = {};
//     if (!value.title) error.title = "Title is required";
//     if (!value.description) error.description = "Description is required";
//     if (!error.title && !error.description) {
//       apihit();
//     }
//     setError(error);
//   };
//   const postdata = () => {
//     handelvalidate(inpdata);
//   };
//  const apihit = () => {
//   const inpdata1 = {
//     send_to: inpdata.send_to,
//     batch_id: parseInt(batchId),
//     user_id: inpdata.user_id,
//     title: inpdata.title,
//     description: inpdata.description,
//   };
//   console.log(inpdata1);
//   axios
//     .post(`${process.env.REACT_APP_BASE_URL}send-notification`, inpdata1)
//     .then((response) => {
//       toast.success(response.data.message);
//       setInpdata({
//         send_to: "",
//         user_id: "",
//         title: "",
//         description: "",
//       });
//       setSelectedUsers([]);
//       setShowContent(false);
//       setShowContent1(false);
//       setShowMultiUser(false);
//       setShowBatchUser(false);
//       showdata();
//     })
//     .catch((error) => {
//       if (error.response) {
//         const errMsg = error.response.data.message || "Something went wrong on server.";
//         toast.error(`Error: ${errMsg}`);
//       } else if (error.request) {
//         toast.error("No response from server. Please check your network.");
//       } else {
//         toast.error(`Request error: ${error.message}`);
//       }
//       console.error("API Error:", error);
//     });
// };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   useEffect(() => {
//     Batchget();
//   }, []);
//   const Batchget = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}getAllBatch`
//       );

//       if (response.data.success === true) {
//         setBatchlist1(response.data.data);
//       } else {
//         console.error(
//           "Failed to fetch batches:",
//           response.data.message || "Unknown error"
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching batches:", error.message || error);
//     }
//   };
//   return (
//     <>
//       <div className="wpWrapper">
//         <div className="container-fluid">
//           <div className="row manageFreight">
//             <div className="col-12">
//               <div className="d-flex justify-content-between align-item-center">
//                 <h4 className="freight_hd">Notification</h4>
//                 <button
//                   type="button"
//                   data-bs-toggle="modal"
//                   data-bs-target="#exampleModal"
//                 >
//                   Send Notification
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div
//             className="modal fade modalBorder"
//             id="exampleModal"
//             tabIndex={-1}
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Add Notification</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   >
//                     <CloseIcon />
//                   </button>
//                 </div>
//                 <div className="modal-body notifiAddmodal">
//                   <div className="d-flex flex-wrap gap-3 mb-3">
//                     <label>
//                       <input
//                         type="radio"
//                         value="2"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       All User
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="1"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       All Staff
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="3"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       Particular User
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="4"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       Particular Staff
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="5"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       Multiple Users
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         value="6"
//                         name="send_to"
//                         onChange={handlechange}
//                       />{" "}
//                       Users by Batch
//                     </label>
//                   </div>
//                   {showContent1 && (
//                     <div className="mb-3">
//                       <label>Particular User</label>
//                       <select
//                         name="user_id"
//                         className="form-control"
//                         onChange={handlechange}
//                       >
//                         <option value="">Select...</option>
//                         {clientlist.map((item) => (
//                           <option key={item.id} value={item.id}>
//                             {item.client_name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {showContent && (
//                     <div className="mb-3">
//                       <label>Particular Staff</label>
//                       <select
//                         name="user_id"
//                         className="form-control"
//                         onChange={handlechange}
//                       >
//                         <option value="">Select...</option>
//                         {stafflist.map((item) => (
//                           <option key={item.id} value={item.id}>
//                             {item.full_name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {showMultiUser && (
//                     <div className="mb-3">
//                       <label>Multiple Users</label>
//                       <Select
//                         isMulti
//                         options={clientlist.map((item) => ({
//                           value: item.id,
//                           label: item.client_name,
//                         }))}
//                         className="basic-multi-select"
//                         classNamePrefix="select"
//                         onChange={(selectedOptions) => {
//                           const selectedIds = selectedOptions.map(
//                             (option) => option.value
//                           );
//                           setSelectedUsers(selectedIds);
//                           setInpdata({
//                             ...inpdata,
//                             user_id: selectedIds.join(","),
//                           });
//                         }}
//                         value={clientlist
//                           .filter((item) => selectedUsers.includes(item.id))
//                           .map((item) => ({
//                             value: item.id,
//                             label: item.client_name,
//                           }))}
//                       />
//                     </div>
//                   )}

//                   {showBatchUser && (
//                     <>
//                       <div className="mb-3">
//                         <label>Select Batch</label>
//                         <select
//                           className="form-control"
//                           onChange={handleBatchChange}
//                         >
//                           <option value="">Select Batch</option>
//                           {batchlist1.map((batch, i) => {
//                             console.log(batch);
//                             return (
//                               <>
//                                 <option key={i} value={batch.id}>
//                                   {batch.batch_number}
//                                 </option>
//                               </>
//                             );
//                           })}
//                         </select>
//                       </div>
//                       <div className="mb-3">
//                         <label>Users in Batch</label>
//                         <ul>
//                           {batchUserList.map((user) => (
//                             <li key={user.id}>{user.client_name}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </>
//                   )}

//                   <div className="mb-3">
//                     <label>Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       ref={emailRef}
//                       onChange={handlechange}
//                       className="form-control"
//                     />
//                     <p className="text-danger">{error.title}</p>
//                   </div>

//                   <div className="mb-3">
//                     <label>Message</label>
//                     <textarea
//                       name="description"
//                       ref={messageRef}
//                       onChange={handlechange}
//                       className="form-control"
//                     />
//                     <p className="text-danger">{error.description}</p>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button onClick={postdata} className="btn btn-primary">
//                     Send Notification
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Modal End */}

//           <div className="table-responsive mt-2">
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Sr.No.</th>
//                   <th>Title</th>
//                   <th>Message</th>
//                   <th>Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentdata.map((item, index) => {
//                   const date = new Date(item?.created_at);
//                   const formattedDate = date.toLocaleDateString("en-GB", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   });
//                   return (
//                     <tr key={item.id}>
//                       <td>{startIndex + index + 1}</td>
//                       <td>{item.title}</td>
//                       <td>{item.description}</td>
//                       <td>{formattedDate}</td>
//                       <td>
//                         <AiFillDelete
//                           className="text-danger"
//                           style={{ cursor: "pointer" }}
//                           onClick={() => handledelete(item.id)}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <div className="d-flex justify-content-end align-items-center">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 className="bg_page"
//               >
//                 &lt;
//               </button>
//               <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
//               <button
//                 disabled={currentPage === totalPage}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 className="bg_page"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default Notification;
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import Select from "react-select";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "bootstrap";
const pageSize = 10;

const Notification = () => {
  const [data, setData] = useState([]);
  const [inpdata, setInpdata] = useState({
    send_to: "",
    user_id: "",
    title: "",
    description: "",
  });

  const [showContent, setShowContent] = useState(false);
  const [showContent1, setShowContent1] = useState(false);
  const [showMultiUser, setShowMultiUser] = useState(false);
  const [showBatchUser, setShowBatchUser] = useState(false);
  const [batchId, setBatchId] = useState("");

  const [clientlist, setClientlist] = useState([]);
  const [stafflist, setStafflist] = useState([]);
  const [batchlist1, setBatchlist1] = useState([]);
  const [batchUserList, setBatchUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState({});

  const emailRef = useRef();
    const titleRef = useRef();
  const messageRef = useRef();
  const selectRef = useRef();


  const showdata = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}notification-list`)
      .then((response) => {
        setData(response.data.data);
      });
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}delete-notification`, {
            notification_id: id,
          })
          .then((response) => {
            toast.success(response.data.message);
            showdata();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpdata({ ...inpdata, [name]: value });

    if (name === "send_to") {
      setShowContent(value === "4");
      setShowContent1(value === "3");
      setShowMultiUser(value === "5");
      setShowBatchUser(value === "6");

      if (value === "3" || value === "5" || value === "6") {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}clientlist`)
          .then((response) => {
            setClientlist(response.data.data);
          });
      }
      if (value === "4") {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}staff-list`)
          .then((response) => {
            setStafflist(response.data.data);
          });
      }
      if (value === "6") {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}getBatchList`)
          .then((response) => {
            setBatchlist1(response.data.data);
          });
      }
    }
  };

  const handleBatchChange = (e) => {
    const id = e.target.value;
    setBatchId(id);

    if (id) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}getClientByBatchId`, {
          batch_id: id,
        })
        .then((response) => {
          setBatchUserList(response.data.data);
          const userIds = response.data.data.map((item) => item.id).join(",");
          setInpdata({ ...inpdata, user_id: userIds });
        })
        .catch((error) => {
      console.log("i")
          // toast.error("Failed to fetch users for the batch.");
        });
    } else {
      setBatchUserList([]);
      setInpdata({ ...inpdata, user_id: "" });
    }
  };

  const handelvalidate = (value) => {
    let error = {};
    if (!value.title) error.title = "Title is required";
    if (!value.description) error.description = "Description is required";
    if (!error.title && !error.description) {
      apihit();
    }
    setError(error);
  };

  const postdata = () => {
    handelvalidate(inpdata);
  };

  const apihit = () => {
    const inpdata1 = {
      send_to: inpdata.send_to,
      batch_id: parseInt(batchId),
      user_id: inpdata.user_id,
      title: inpdata.title,
      description: inpdata.description,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}send-notification`, inpdata1)
      .then((response) => {
        toast.success(response.data.message);
         const modalEl = document.getElementById("exampleModal");
const modalInstance = Modal.getOrCreateInstance(modalEl);
modalInstance.hide();

// Clean up leftover backdrop manually
setTimeout(() => {
  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  document.body.classList.remove("modal-open");
  document.body.style = "";
}, 300); // wait for animation
          if (titleRef.current) titleRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
        setInpdata({
          send_to: "",
          user_id: "",
          title: "",
          description: "",
        });
        setSelectedUsers([]);
        setShowContent(false);
        setShowContent1(false);
        setShowMultiUser(false);
        setShowBatchUser(false);
        setBatchId("");
        setBatchUserList([]);
        showdata();
          if (selectRef.current) selectRef.current.value = "";
      })
      .catch((error) => {
        if (error.response) {
          toast.error(`Error: ${error.response.data.message || "Server error"}`);
        } else {
          toast.error("Network or request error.");
        }
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    showdata();
    axios.get(`${process.env.REACT_APP_BASE_URL}getAllBatch`).then((response) => {
      if (response.data.success) {
        setBatchlist1(response.data.data);
      }
    });
  }, []);

  const totalPage = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentdata = data.slice(startIndex, startIndex + pageSize);
  return (
    <>
     <div className="wpWrapper">
        <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Notification</h4>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">
            Send Notification
          </button>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Notification</h5>
                <button className="btn-close" data-bs-dismiss="modal">
                  <CloseIcon />
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-wrap gap-3 mb-3">
                  {[
                    { label: "All User", value: "2" },
                    { label: "All Staff", value: "1" },
                    { label: "Particular User", value: "3" },
                    { label: "Particular Staff", value: "4" },
                    { label: "Multiple Users", value: "5" },
                    { label: "Users by Batch", value: "6" },
                  ].map((opt) => (
                    <label key={opt.value}>
                      <input type="radio" value={opt.value} name="send_to" onChange={handlechange} /> {opt.label}
                    </label>
                  ))}
                </div>

                {showContent1 && (
                  <div className="mb-3">
                    <label>Particular User</label>
                    <select name="user_id" className="form-control" onChange={handlechange}>
                      <option value="">Select...</option>
                      {clientlist.map((item) => (
                        <option key={item.id} value={item.id}>{item.client_name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {showContent && (
                  <div className="mb-3">
                    <label>Particular Staff</label>
                    <select name="user_id" className="form-control" onChange={handlechange}>
                      <option value="">Select...</option>
                      {stafflist.map((item) => (
                        <option key={item.id} value={item.id}>{item.full_name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {showMultiUser && (
                  <div className="mb-3">
                    <label>Multiple Users</label>
                    <Select
                      isMulti
                      options={clientlist.map((item) => ({
                        value: item.id,
                        label: item.client_name,
                      }))}
                      classNamePrefix="select"
                      onChange={(selectedOptions) => {
                        const ids = selectedOptions.map((opt) => opt.value);
                        setSelectedUsers(ids);
                        setInpdata({ ...inpdata, user_id: ids.join(",") });
                      }}
                      value={clientlist
                        .filter((item) => selectedUsers.includes(item.id))
                        .map((item) => ({ value: item.id, label: item.client_name }))}
                    />
                  </div>
                )}

                {showBatchUser && (
                  <>
                    <div className="mb-3">
                      <label>Select Batch</label>
                      <select className="form-control" onChange={handleBatchChange}>
                        <option value="">Select Batch</option>
                        {batchlist1.map((batch) => (
                          <option key={batch.id} value={batch.id}>{batch.batch_number}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <label>Title</label>
                  <input type="text" name="title" className="form-control" onChange={handlechange} ref={titleRef} />
                  <p className="text-danger">{error.title}</p>
                </div>

                <div className="mb-3">
                  <label>Message</label>
                  <textarea name="description" className="form-control" onChange={handlechange} ref={messageRef} />
                  <p className="text-danger">{error.description}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={postdata} className="btn btn-primary">
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive mt-2">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentdata.map((item, index) => {
                  const date = new Date(item?.created_at);
                  const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <AiFillDelete
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handledelete(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          {/* Pagination */}
           <div className="d-flex justify-content-end align-items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg_page"
              >
                &lt;
              </button>
              <span className="mx-2">{`Page ${currentPage} of ${totalPage}`}</span>
              <button
                disabled={currentPage === totalPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg_page"
              >
                &gt;
              </button>
            </div>
        </div>
      </div>

      <ToastContainer />
      </div>
    </>
  );
};

export default Notification;
