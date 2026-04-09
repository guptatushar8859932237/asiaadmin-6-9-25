// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import Swal from "sweetalert2";
// import { Box, Button, Modal } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useLocation } from "react-router-dom";
// const pageSize = 10;
// export default function Dashboard1() {

//   const location=useLocation()
//     // const user_id =(location.state.data.id)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [pagenationData, setPagenationData] = useState(1);

//   const [input, setInput] = useState({
//     leave_from: "",
//     leave_to:"" ,
//     reason: ""
//   });

//   const [inputdata, setInputdata] = useState({
//    leave_from: "",
//     leave_to:"" ,
//     reason: ""
//   });

//   // ---------------- FETCH DATA ----------------
//   const getdata = async (page = 1, search = "") => {
//     try {
//       setLoader(true);

//       const payload = {
//         page: page,
//         limit: pageSize,
//         search: search,
//       };

//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}getAllStaffLeaveRequests`,
//         payload
//       );
//       setData(response.data.data);
//       setPagenationData(response.data);
//     } catch (error) {
//       toast.error("Error fetching suppliers");
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     getdata(currentPage, searchQuery);
//   }, []);

//   const totalPages = Math.ceil(pagenationData.total / pagenationData.limit);

//   // ---------------- HANDLE INPUT (ADD) ----------------
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

// const openModal2 = (item) => {
//   console.log(item)
//   setInputdata({
//     leave_id: item.leave_id,
//     status: item.status || "",
//     admin_remark: item.admin_remark || ""
//   });
//   setIsModalOpen2(true);
// };

//   // ---------------- HANDLE UPDATE INPUT ----------------
// const handleupdateapi = (e) => {
//   const { name, value } = e.target;
//   setInputdata((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// const postData1234 = () => {
//   const payload = {
//     leave_id:inputdata.leave_id,
// status : parseInt(inputdata.status),
// admin_remark: inputdata.admin_remark
//   };
//   axios
//     .post(`${process.env.REACT_APP_BASE_URL}updateStaffLeaveStatus`, payload)
//     .then((res) => {
//       toast.success(res.data.message);
//       setIsModalOpen2(false);
//       getdata();
//     })
//     .catch((err) => {
//       toast.error(err.response?.data?.message || "Update failed!");
//     });
// };
//   // ---------------- GET COUNTRIES ----------------
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setCurrentPage(1);
//     getdata(1, value); 
//   };
//   return (
//     <>
//       <>
//         <div className="wpWrapper">
//           <div className="container-fluid">
//             <div className="d-flex justify-content-between my-3">
//               <h4>Leave Management</h4>
//               <div className="d-flex">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="px-2 py-1 rounded"
//                   value={searchQuery}
//                   onChange={handleSearch}
//                 />
//                 {/* <button
//                   className="btn btn-primary ms-2"
//                   onClick={() => setIsModalOpen(true)}
//                 >
//                  Add Leave
//                 </button> */}
//               </div>
//             </div>
//             {/* ---------------- TABLE ---------------- */}
//             {loader ? (
//               <div className="loader-container">
//                 <div className="loader"></div>
//                 <p>Loading...</p>
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Sr.No.</th>
//                       <th>Leave From</th>
//                       <th>Leave To</th>
//                       <th>Reason</th>
//                       <th>Status</th>
//                       <th>Admin Remark</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((item, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{new Date(item.leave_from).toLocaleDateString("en-GB")}</td>
//                         <td>{new Date(item.leave_to).toLocaleDateString("en-GB")}</td>
//                         <td>{item.reason}</td>
//                         <td>{item?.status===0?"Pending":item.status===1?"Approve":item.status===2?"Reject":"pending"}</td>
//                         <td>{item?.admin_remark}</td>
//                         <td><i className="fa fa-edit " onClick={()=>{openModal2(item)}} style={{cursor:"pointer"}}></i></td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 {/* PAGINATION */}
//                 <div className="d-flex justify-content-end align-items-end my-3">
//                   <button
//                     disabled={currentPage === 1}
//                      className="bg_page"
//                     onClick={() => {
//                       setCurrentPage(currentPage - 1);
//                       getdata(currentPage - 1, searchQuery);
//                     }}
//                   >
//                       <i class="fi fi-rr-angle-small-left page_icon"></i>
//                   </button>

//                   <span className="mx-2">
//                     Page {currentPage} of {totalPages}
//                   </span>

//                   <button
//                     disabled={currentPage === totalPages}
//                      className="bg_page"
//                     onClick={() => {
//                       setCurrentPage(currentPage + 1);
//                       getdata(currentPage + 1, searchQuery);
//                     }}
//                   >
//                   <i class="fi fi-rr-angle-small-right page_icon"></i>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* ---------------- ADD SUPPLIER MODAL ---------------- */}
       
//         <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               bgcolor: "white",
//               p: 3,
//               borderRadius: 2,
//               width: "30%",
//             }}
//           >
//             <div className="modal-header">
//               <h4>Edit Leave Application</h4>
//               <button
//                 className="btn-close"
//                 onClick={() => setIsModalOpen2(false)}
//               >
//                 <CloseIcon />
//               </button>
//             </div>
//             <div className="my-3">
//   <label>Status</label>
// <select
//   name="status"
//   value={inputdata.status}
//   onChange={handleupdateapi}
//   className="form-control mb-2"
// >
//   <option value="">Select</option>
//   <option value="1">Approved</option>
//   <option value="2">Rejected</option>
// </select>
                      
//            <label>Admin Remark</label>
// <input
//   type="text"
//   className="form-control mb-2"
//   name="admin_remark"
//   value={inputdata.admin_remark}
//   onChange={handleupdateapi}
// />
//             </div>
         
//             <Button variant="contained" fullWidth onClick={postData1234}>
//               Update Leave
//             </Button>
//           </Box>
//         </Modal>
//         <ToastContainer />
//       </>
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const pageSize = 10;

export default function Dashboard1() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [pagenationData, setPagenationData] = useState({});

  const [inputdata, setInputdata] = useState({
    leave_id: "",
    status: "",
    admin_remark: "",
  });

  // ---------------- FETCH DATA ----------------
  const getdata = async (page = 1, search = "") => {
    try {
      setLoader(true);

      const payload = {
        page: page,
        limit: pageSize,
        search: search,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getAllStaffLeaveRequests`,
        payload
      );

      setData(response?.data?.data || []);
      setPagenationData(response?.data || {});
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoader(false);
    }
  };

  // ---------------- USE EFFECT (SEARCH + PAGINATION) ----------------
  useEffect(() => {
    const delay = setTimeout(() => {
      getdata(currentPage, searchQuery);
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [currentPage, searchQuery]);

  // ---------------- TOTAL PAGES ----------------
  const totalPages = Math.ceil(
    (pagenationData?.total || 0) /
      (pagenationData?.limit || pageSize)
  );

  // ---------------- SEARCH ----------------
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // ---------------- OPEN MODAL ----------------
  const openModal2 = (item) => {
    setInputdata({
      leave_id: item.leave_id,
      status: item.status || "",
      admin_remark: item.admin_remark || "",
    });
    setIsModalOpen2(true);
  };

  // ---------------- HANDLE UPDATE INPUT ----------------
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- UPDATE API ----------------
  const postData1234 = () => {
    const payload = {
      leave_id: inputdata.leave_id,
      status: parseInt(inputdata.status),
      admin_remark: inputdata.admin_remark,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}updateStaffLeaveStatus`,
        payload
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsModalOpen2(false);
        getdata(currentPage, searchQuery);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Update failed!"
        );
      });
  };

  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
          {/* HEADER */}
          <div className="d-flex justify-content-between my-3">
            <h4>Leave Management</h4>
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 rounded"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* TABLE */}
          {loader ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Staff Name</th>
                    <th>Leave From</th>
                    <th>Leave To</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Admin Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        {/* SERIAL NUMBER FIX */}
                        <td>
                          {(currentPage - 1) * pageSize +
                            index +
                            1}
                        </td>

                        <td>
                          {item.staff_name}
                        </td>
                        <td>
                          {new Date(
                            item.leave_from
                          ).toLocaleDateString("en-GB")}
                        </td>

                        <td>
                          {new Date(
                            item.leave_to
                          ).toLocaleDateString("en-GB")}
                        </td>

                        <td>{item.reason}</td>

                        <td>
                          {item.status === 0
                            ? "Pending"
                            : item.status === 1
                            ? "Approved"
                            : item.status === 2
                            ? "Rejected"
                            : "Pending"}
                        </td>

                        <td>{item.admin_remark}</td>

                        <td>
                          <i
                            className="fa fa-edit"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              openModal2(item)
                            }
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="d-flex justify-content-end align-items-center my-3">
                <button
                  disabled={currentPage === 1}
                  className="bg_page"
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                   <i class="fi fi-rr-angle-small-left page_icon"></i>
                </button>

                <span className="mx-2">
                  Page {currentPage} of{" "}
                  {totalPages || 1}
                </span>

                <button
                  disabled={
                    currentPage === totalPages ||
                    totalPages === 0
                  }
                  className="bg_page"
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                    <i class="fi fi-rr-angle-small-right page_icon"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            width: "30%",
          }}
        >
          <div className="d-flex justify-content-between">
            <h4>Edit Leave</h4>
            <button
              className="btn-close"
              onClick={() =>
                setIsModalOpen2(false)
              }
            >
              <CloseIcon />
            </button>
          </div>

          <label>Status</label>
          <select
            name="status"
            value={inputdata.status}
            onChange={handleupdateapi}
            className="form-control mb-2"
          >
            <option value="">Select</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
          </select>

          <label>Admin Remark</label>
          <input
            type="text"
            className="form-control mb-2"
            name="admin_remark"
            value={inputdata.admin_remark}
            onChange={handleupdateapi}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={postData1234}
          >
            Update Leave
          </Button>
        </Box>
      </Modal>

      <ToastContainer />
    </>
  );
}