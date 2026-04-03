import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  const [customData, setCustomData] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Priority: "",
    TaskFor: "",
    SupplierId: "",
    Staffid: "",
  });
  const navigate = useNavigate();
  const fetchCustomTasks = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllCustomTasks`,
      );
      console.log(res.data.data);
      setCustomData(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load custom tasks ❌");
    } finally {
      setLoader(false);
    }
  };
  /* ================= FETCH APIS ================= */
  const fetchAssigned = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsSatff`,
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
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedClearanceSatff`,
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

    if (activeTab === "assigned") {
      fetchAssigned();
    } else if (activeTab === "clearance") {
      fetchClearance();
    } else if (activeTab === "Custom") {
      fetchCustomTasks(); // ✅ yaha call hogi
    }
  }, [activeTab]);
  /* ================= FILTER ================= */
  const tableData =
    activeTab === "assigned"
      ? assignedData
      : activeTab === "clearance"
        ? clearanceData
        : customData; // ✅ add this
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
    console.log(activeTab);
    if (activeTab === "assigned") {
      updateFreightStatus(item.id, statusValue);
    }
    if (activeTab === "clearance") {
      updateClearanceStatus(item.id, statusValue);
    }
    if (activeTab === "Custom") {
      updateCustomTaskStatus(item, statusValue);
    }
  };

  const updateCustomTaskStatus = async (item, statusValue) => {
    console.log(item, statusValue);
    const payload = {
      task_id: item.task_id,
      task_status: statusValue,
      notes: item.notes,
      // freight_id: freightId,
      // assign_supplier_status: statusValue,
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllCustomTasks`,
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
      task_title: formData.Title,
      description: formData.Description,
      staff_id: formData.Staffid,
      priority: formData.TaskFor,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}createCustomTask`, payload)
      .then((res) => {
        if (res.data.success) {
          toast.success("Task added successfully ✅");
          closeModal();
          fetchCustomTasks();
          setFormData({
            Title: "",
            Description: "",
            Priority: "",
            TaskFor: "",
            SupplierId: "",
            Staffid: "",
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
      [name]: value,
    });
  };
  useEffect(() => {
    getStaff();
    getSupplierList();
  }, []);
  const getSupplierList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}supplier-list`,
      );
      setSupplier(res.data.data);
    } catch (error) {
      console.error("Failed to fetch staff list", error);
    }
  };
  const getStaff = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}staff-list`,
      );
      setStaffList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch staff list", error);
    }
  };

  const handleViewComments =(taskId)=>{
    navigate(`/Admin/task/${taskId}`);
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
                Freight Tasks
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
                      <th>Status</th>
                      <th>Action</th>
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
                          <td>
                            <select
                              className="form-select"
                              value={item.assign_supplier_status ?? ""}
                              onChange={(e) => handleChangeStatus(e, item)}
                              >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                              <td><button className="btn btn-primary">Add Comment</button></td>
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
                          <td>
                            <select
                              className="form-select"
                              value={item.assign_supplier_status ?? ""}
                              onChange={(e) => handleChangeStatus(e, item)}
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
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
                        <th>Task Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length ? (
                        currentData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{item.task_title}</td>
                            <td>{item.description}</td>
                            <td>
                              <select
                                className="form-select"
                                value={item.task_status ?? ""}
                                onChange={(e) => handleChangeStatus(e, item)}
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <button 
                                className="btn btn-info"
                                onClick={() => handleViewComments(item.task_id)}
                              >
                                View Comments
                              </button>
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
                      name="TaskFor"
                      style={{ cursor: "pointer" }}
                      className="form-control"
                      onChange={handlechange}
                    >
                      <option>Select</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

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
