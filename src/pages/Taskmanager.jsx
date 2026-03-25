import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
const pageSize = 10;
export default function Taskmanager() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [assignedData, setAssignedData] = useState([]);
  const [clearanceData, setClearanceData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
  Description: "",
  Priority: "",
  TaskFor: "",
  SupplierId: "",
  Staffid: ""
  });
  /* ================= FETCH APIS ================= */
  const fetchAssigned = async () => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsForAdmin`,
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
        `${process.env.REACT_APP_BASE_URL}GetAllAssignedClearances`,
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
        item?.freight_number
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item?.supplier_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
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
        payload,
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
        payload,
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

  const handleclickassigntask = () => {
    setOpenPopup(true);
  };

  const closeModal = () => {
    setOpenPopup(false);
  };

//   const postData = () => {
//     const userid = JSON.parse(localStorage.getItem("data123"))?.id;
//     const postData = () => {
//   setLoader(true);

//   let payload = {
//     title: formData.Title,
//     description: formData.Description,
//     priority: formData.Priority,
//     task_for_type: formData.TaskFor?.toLowerCase(),
//     created_by: userid,
//   };

//   if (formData.TaskFor === "Supplier") {
//     payload.task_for_id = formData.id;
//   }

//   if (formData.TaskFor === "Staff") {
//     payload.task_for_id = formData.id;
//   }
//   axios
//     .post(`${process.env.REACT_APP_BASE_URL}add-task`, payload)
//     .then((res) => {
//       if (res.data.success) {
//         toast.success("Task added successfully ✅");
//         closeModal();
//       } else {
//         toast.warning(res.data.message || "Failed to add task ❌");
//       }
//       setLoader(false);
//     })
//     .catch((error) => {
//       console.error(error);
//       toast.error("Failed to add task ❌");
//       setLoader(false);
//     });
// };
  
//   };
const postData = () => {

  const userid = JSON.parse(localStorage.getItem("data123"))?.id;

  setLoader(true);

  let payload = {
    title: formData.Title,
    description: formData.Description,
    priority: formData.Priority,
    task_for_type: formData.TaskFor?.toLowerCase(),
    created_by: userid
  };

  if (formData.TaskFor === "Supplier") {
    payload.task_for_id = formData.SupplierId;
  }

  if (formData.TaskFor === "Staff") {
    payload.task_for_id = formData.Staffid;
  }

  axios
    .post(`${process.env.REACT_APP_BASE_URL}add-task`, payload)
    .then((res) => {
      if (res.data.success) {
        toast.success("Task added successfully ✅");
        closeModal();

        setFormData({
          Title: "",
          Description: "",
          Priority: "",
          TaskFor: "",
          SupplierId: "",
          Staffid: ""
        });

      } else {
        toast.warning(res.data.message || "Failed to add task ❌");
      }

      setLoader(false);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to add task ❌");
      setLoader(false);
    });
};
 const handlechange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};

  useEffect(()=>{
    getStaff()
getSupplierList()
  },[])
  const getSupplierList = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}supplier-list`);  
      setSupplier(res.data.data)
    } catch (error) {
      console.error("Failed to fetch staff list", error);
    }
  }
  const getStaff = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}staff-list`);  
      setStaffList(res.data.data)
    } catch (error) {
      console.error("Failed to fetch staff list", error);
    }
  }

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
              <button
                className={`btn ${
                  activeTab === "Custom" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("Custom")}
              >
                Custom Tasks
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
                              onChange={(e) => handleChangeStatus(e, item)}
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
                              onChange={(e) => handleChangeStatus(e, item)}
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
            {activeTab === "Custom" && (
              <div>
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleclickassigntask();
                    }}
                  >
                    Add Task
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Custom No</th>
                        <th>Custom</th>
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
                                onChange={(e) => handleChangeStatus(e, item)}
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
          <Modal
            open={openPopup}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="newModal"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
              }}
            >
              <div className="modal-header">
                <h2 id="modal-modal-title">Add Task</h2>
                <button className="btn btn-close" onClick={closeModal}>
                  <CloseIcon />{" "}
                </button>
              </div>
              <div className="newModalGap noFormaControl newModalGap2">
                <div className="row my-3  ">
                  <div className="col-6">
                    <label>Title</label>
                    <input
                      type="text"
                      id="shipper3"
                      name="Title"
                      style={{ cursor: "pointer" }}
                      className="form-control"
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-6">
                    <label>Description</label>
                    <input
                      type="text"
                      id="shipper3"
                      name="Description"
                      style={{ cursor: "pointer" }}
                      className="form-control"
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-6">
                    <label>Priority</label>
                    <select
                      type="text"
                      id="shipper3"
                      name="Priority"
                      style={{ cursor: "pointer" }}
                      className="form-control"
                      onChange={handlechange}
                    >
                      <option >Select</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Task For</label>
                    <select
                      type="text"
                      id="shipper3"
                      name="TaskFor"
                      style={{ cursor: "pointer" }}
                      className="form-control"
                      onChange={handlechange}
                    >
                      <option >Select</option>
                      <option value="Self">Self</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  {
                    formData.TaskFor === "Supplier" && (
                     <div className="col-6">
                    <label>Supplier List</label>
                    <select
name="SupplierId"
className="form-control"
onChange={handlechange}
>
<option>Select</option>

{supplier.map((item) => (
<option key={item.id} value={item.id}>
{item.name}
</option>
))}

</select>
                  </div>
                    )
                  }
                 {
                    formData.TaskFor === "Staff" && (
                      <div className="col-6">

                    <label>Staff List</label>
                   <select
name="Staffid"
className="form-control"
onChange={handlechange}
>

<option>Select</option>

{staffList.map((item) => (
<option key={item.id} value={item.id}>
{item.full_name}
</option>
))}

</select>
                  </div>
                    )
                 }
                </div>
                <Button variant="contained" onClick={postData}>
                  Apply
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
