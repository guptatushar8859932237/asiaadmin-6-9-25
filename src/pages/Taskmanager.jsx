// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// const pageSize = 10;
// export default function Taskmanager() {
//   const [activeTab, setActiveTab] = useState("assigned");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loader, setLoader] = useState(false);
//   const [assignedData, setAssignedData] = useState([]);
//   const [clearanceData, setClearanceData] = useState([]);
//   const [valueStatus, setValueStatus] = useState("");
//   const fetchAssigned = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsForAdmin`
//       );
//       setAssignedData(res.data.data || []);
//     } finally {
//       setLoader(false);
//     }
//   };
//   const fetchClearance = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}GetAllAssignedClearances`
//       );
//       setClearanceData(res.data.data || []);
//     } finally {
//       setLoader(false);
//     }
//   };
//   useEffect(() => {
//     setCurrentPage(1);
//     setSearchQuery("");
//     activeTab === "assigned" ? fetchAssigned() : fetchClearance();
//   }, [activeTab]);
//   /* ================= FILTER ================= */
//   const tableData = activeTab === "assigned" ? assignedData : clearanceData;
//   const filteredData = tableData.filter((item) => {
//     if (!searchQuery) return true;
//     if (activeTab === "assigned") {
//       return (
//         item?.freight_number
//           ?.toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         item?.supplier_name
//           ?.toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         item?.supplier_email?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     return (
//       item?.clearance_number
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       item?.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item?.assigned_supplier_name
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     );
//   });
//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentData = filteredData.slice(startIndex, startIndex + pageSize);

// const hanelchanehh =(e,item)=>{
// const value111 = e.target.value;
// setValueStatus(value111);
// functionCall(item)
// console.log(item.id,value111)
// functionCall(item,value111)
// }

// const functionCall = async(item)=>{
//   const payload = {
//       freight_id: item.id,
//     assign_supplier_status:valueStatus
//   }
//      try {
//     const res = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}updateSupplierStatusOfFreight`,
//       payload
//     );

//     // ✅ Success check (adjust according to backend)
//     if (res?.data?.success) {
//       toast.success("Freight status updated successfully ✅");
//     } else {
//       toast.warning(res?.data?.message || "Status updated");
//     }
//   } catch (error) {
//     console.error("Error updating status:", error);

//     if (error.response) {
//       toast.error(
//         error.response.data?.message || "Server error occurred ❌"
//       );
//     } else if (error.request) {
//       toast.error("Server not responding 🚫");
//     } else {
//       toast.error("Something went wrong ❌");
//     }
//   }}

//   return (
//     <>
//       {loader ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//           <p>Loading...</p>
//         </div>
//       ) : (
//         <div className="wpWrapper">
//           <div className="container-fluid">
//             <div className="d-flex justify-content-between mb-3">
//               <h4>Assign Task's</h4>
//               <input
//                 className="px-2 py-1"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//             </div>
//             <div className="mb-3 d-flex gap-2">
//               <button
//                 className={`btn ${
//                   activeTab === "assigned"
//                     ? "btn-primary"
//                     : "btn-outline-primary"
//                 }`}
//                 onClick={() => setActiveTab("assigned")}
//               >
//                 Assigned Tasks
//               </button>
//               <button
//                 className={`btn ${
//                   activeTab === "clearance"
//                     ? "btn-primary"
//                     : "btn-outline-primary"
//                 }`}
//                 onClick={() => setActiveTab("clearance")}
//               >
//                 Clearance Tasks
//               </button>
//             </div>
//             {activeTab === "assigned" && (
//               <div className="table-responsive">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Freight No</th>
//                       <th>Freight</th>
//                       <th>Priority</th>
//                       <th>Supplier Name</th>
//                       <th>Supplier Email</th>
//                       <th>Created Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentData.length ? (
//                       currentData.map((item, index) => (
//                         <tr key={item.id}>
//                           <td>{startIndex + index + 1}</td>
//                           <td>{item.freight_number}</td>
//                           <td>{item.freight}</td>
//                           <td>{item.priority}</td>
//                           <td>{item.supplier_name}</td>
//                           <td>{item.supplier_email}</td>
//                           <td>
//                             {item.created_at
//                               ? new Date(item.created_at).toLocaleDateString()
//                               : "-"}
//                           </td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={item.status || ""}
//                               onChange={(e)=>{hanelchanehh(e,item)}}
//                             >
//                               <option value="0">Pending</option>
//                               <option value="1">Accepted</option>
//                               <option value="2">Reject</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center">
//                           No Assigned Freight Found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//             {activeTab === "clearance" && (
//               <div className="table-responsive">
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Clearance No</th>
//                       <th>Freight</th>
//                       <th>Client Name</th>
//                       <th>Nature of Goods</th>
//                       <th>Assigned Supplier</th>
//                       <th>Created Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentData.length ? (
//                       currentData.map((item, index) => (
//                         <tr key={item.id}>
//                           <td>{startIndex + index + 1}</td>
//                           <td>{item.clearance_number}</td>
//                           <td>{item.freight}</td>
//                           <td>{item.client_name}</td>
//                           <td>{item.nature_of_goods}</td>
//                           <td>{item.assigned_supplier_name}</td>
//                           <td>
//                             {item.created_at
//                               ? new Date(item.created_at).toLocaleDateString()
//                               : "-"}
//                           </td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={item.status || ""}
//                               disabled                            >
//                               <option value="pending">Pending</option>
//                               <option value="in_progress">In Progress</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center">
//                           No Clearance Data Found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//             <div className="d-flex justify-content-end align-items-center mt-2">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 ‹
//               </button>
//               <span className="mx-2">
//                 Page {currentPage} of {totalPages || 1}
//               </span>
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const pageSize = 10;

export default function Taskmanager() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [assignedData, setAssignedData] = useState([]);
  const [clearanceData, setClearanceData] = useState([]);

  /* ================= FETCH APIS ================= */

  const fetchAssigned = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsForAdmin`
      );
      setAssignedData(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load assigned freights ❌");
    } finally {
      setLoader(false);
    }
  };

  const fetchClearance = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}GetAllAssignedClearances`
      );
      setClearanceData(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load clearance data ❌");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    activeTab === "assigned" ? fetchAssigned() : fetchClearance();
  }, [activeTab]);

  /* ================= FILTER ================= */

  const tableData = activeTab === "assigned" ? assignedData : clearanceData;

  const filteredData = tableData.filter((item) => {
    if (!searchQuery) return true;

    if (activeTab === "assigned") {
      return (
        item?.freight_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.supplier_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.supplier_email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      item?.clearance_number
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item?.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.assigned_supplier_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  /* ================= STATUS CHANGE ================= */

  const handleChangeStatus = (e, item) => {
    const statusValue = e.target.value;

    if (activeTab === "assigned") {
      updateFreightStatus(item.id, statusValue);
    } else {
      updateClearanceStatus(item.id, statusValue);
    }
  };

  /* ================= UPDATE FREIGHT ================= */

  const updateFreightStatus = async (freightId, statusValue) => {
    const payload = {
      freight_id: freightId,
      assign_supplier_status: statusValue,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateSupplierStatusOfFreight`,
        payload
      );

      if (res?.data?.success) {
        toast.success("Freight status updated ✅");
        fetchAssigned();
      } else {
        toast.warning(res?.data?.message || "Update failed");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  /* ================= UPDATE CLEARANCE ================= */

  const updateClearanceStatus = async (clearanceId, statusValue) => {
    const payload = {
      clearance_id: clearanceId,
      assign_supplier_status: statusValue,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateSupplierStatusOfClearance`,
        payload
      );

      if (res?.data?.success) {
        toast.success("Clearance status updated ✅");
        fetchClearance();
      } else {
        toast.warning(res?.data?.message || "Update failed");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  /* ================= ERROR HANDLER ================= */

  const handleApiError = (error) => {
    console.error(error);

    if (error.response) {
      toast.error(error.response.data?.message || "Server error ❌");
    } else if (error.request) {
      toast.error("Server not responding 🚫");
    } else {
      toast.error("Something went wrong ❌");
    }
  };

  /* ================= UI ================= */

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="d-flex justify-content-between mb-3">
              <h4>Assign Task's</h4>
              <input
                className="px-2 py-1"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="mb-3 d-flex gap-2">
              <button
                className={`btn ${
                  activeTab === "assigned"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("assigned")}
              >
                Assigned Tasks
              </button>

              <button
                className={`btn ${
                  activeTab === "clearance"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("clearance")}
              >
                Clearance Tasks
              </button>
            </div>

            {/* ================= ASSIGNED TABLE ================= */}

            {activeTab === "assigned" && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Freight No</th>
                      <th>Freight</th>
                      <th>Priority</th>
                      <th>Supplier Name</th>
                      <th>Supplier Email</th>
                      <th>Created Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length ? (
                      currentData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{startIndex + index + 1}</td>
                          <td>{item.freight_number}</td>
                          <td>{item.freight}</td>
                          <td>{item.priority}</td>
                          <td>{item.supplier_name}</td>
                          <td>{item.supplier_email}</td>
                          <td>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={item.assign_supplier_status ?? ""}
                              onChange={(e) =>
                                handleChangeStatus(e, item)
                              }
                            >
                              <option value="0">Pending</option>
                              <option value="1">Accepted</option>
                              <option value="2">Reject</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Assigned Freight Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ================= CLEARANCE TABLE ================= */}

            {activeTab === "clearance" && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Clearance No</th>
                      <th>Freight</th>
                      <th>Client Name</th>
                      <th>Nature of Goods</th>
                      <th>Assigned Supplier</th>
                      <th>Created Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length ? (
                      currentData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{startIndex + index + 1}</td>
                          <td>{item.clearance_number}</td>
                          <td>{item.freight}</td>
                          <td>{item.client_name}</td>
                          <td>{item.nature_of_goods}</td>
                          <td>{item.assigned_supplier_name}</td>
                          <td>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={item.assign_supplier_status ?? ""}
                              onChange={(e) =>
                                handleChangeStatus(e, item)
                              }
                            >
                              <option value="0">Pending</option>
                              <option value="1">Accepted</option>
                              <option value="2">Reject</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Clearance Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {/* ================= PAGINATION ================= */}
            <div className="d-flex justify-content-end align-items-center mt-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ‹
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
