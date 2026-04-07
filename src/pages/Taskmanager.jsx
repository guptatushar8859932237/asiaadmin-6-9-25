import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const pageSize = 10;
export default function Taskmanager() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  // const [activeTab, setActiveTab] = useState("assigned");
  const [assignedData, setAssignedData] = useState([]);
   const [openPopup, setOpenPopup] = useState(false);
  const [clearanceData, setClearanceData] = useState([]);
  const [customData, setCustomData] = useState([]);
    const [staffList, setStaffList] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentData, setCommentData] = useState({
    comment: "",
    status: "",
  });
   const [formData, setFormData] = useState({
    Title: "",
  Description: "",
  Priority: "",
  TaskFor: "",
  SupplierId: "",
  Staffid: ""
  });
  const navigate = useNavigate();
  /* ================= FETCH ================= */
  const fetchAssigned = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsSatff`,
      );
      setAssignedData(res.data?.data || []);
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };
   const handleclickassigntask = () => {
    setOpenPopup(true);
  };

  const closeModal = () => {
    setOpenPopup(false);
  };
  const fetchClearance = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedClearanceSatff`,
      );
      setClearanceData(res.data?.data || []);
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
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

  const fetchCustomTasks = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllCustomTasks`,
      );
      setCustomData(res.data?.data || []);
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (activeTab === "assigned") fetchAssigned();
    if (activeTab === "clearance") fetchClearance();
    if (activeTab === "Custom") fetchCustomTasks();
  }, [activeTab]);
  /* ================= TABLE ================= */
  const tableData =
    activeTab === "assigned"
      ? assignedData
      : activeTab === "clearance"
        ? clearanceData
        : customData;
  const filteredData = tableData.filter((item) => {
    if (!searchQuery) return true;
    return JSON.stringify(item)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);
  /* ================= COMMENT ================= */
  const handleAddComment = (item) => {
    setSelectedTask(item);
    setCommentModal(true);
  };

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
  const submitComment = async () => {
    try {
      let payload = {
        // user_id: JSON.parse(localStorage.getItem("data123"))?.id,
        task_id: selectedTask?.task_id || selectedTask?.id,
        task_status: commentData.status,
        notes: commentData.comment,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateTaskStatus`,
        payload,
      );
      if (res.data.success) {
        toast.success("Updated ✅");
        setCommentModal(false);
        setCommentData({ comment: "", status: "" });
        if (activeTab === "assigned") fetchAssigned();
        if (activeTab === "clearance") fetchClearance();
        if (activeTab === "Custom") fetchCustomTasks();
      } else {
        toast.warning(res.data.message);
      }
    } catch {
      toast.error("Error ❌");
    }
  };
  const handleView = (item) => {
    console.log("View Item:", item);
    navigate(`/Admin/task/${item.task_id || item.id}`);
  };
  /* ================= UI ================= */
  return (
    <>
      <div className="container-fluid">
        <h4>Task Manager</h4>
        <div className="mb-3 mx-2">
          {/* <button className="btn btn-primary mx-2" onClick={() => setActiveTab("assigned")}>Freight</button>
          <button className="btn btn-primary mx-2" onClick={() => setActiveTab("clearance")}>Clearance</button>
          <button className="btn btn-primary mx-2" onClick={() => setActiveTab("Custom")}>Custom</button> */}
          <button
  className={`btn mx-2 ${
    activeTab === "assigned" ? "btn-primary" : "btn-outline-primary"
  }`}
  onClick={() => setActiveTab("assigned")}
>
  Freight
</button>

<button
  className={`btn mx-2 ${
    activeTab === "clearance" ? "btn-primary" : "btn-outline-primary"
  }`}
  onClick={() => setActiveTab("clearance")}
>
  Clearance
</button>

<button
  className={`btn mx-2 ${
    activeTab === "Custom" ? "btn-primary" : "btn-outline-primary"
  }`}
  onClick={() => setActiveTab("Custom")}
>
  Custom
</button>
{activeTab === "Custom" && (
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleclickassigntask();
                    }}
                  >
                    Add Task
                  </button>
                </div>)}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>{activeTab === "assigned" ? "Freight Number" : activeTab === "clearance" ? "Clearance Number" : "Title"}  </th>
              <th>Date</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{item.staff_name}</td>
                <td>{item.staff_email}</td>
                <td>
                  {item.task_title ||
                    item.freight_number ||
                    item.clearance_number}
                </td>
                <td>
                  {
                    (
                      item.created_at ||
                      item.freight_created_at ||
                      item.task_created_at
                    )?.split("T")[0]
                  }
                </td>
                <td>
                  {
                      item.notes ||
                      item.notes ||
                      item.notes
                  }
                </td>
                <td>{item.task_status}</td>
                {/* ✅ ADD COMMENT BUTTON */}
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* ➕ Add Comment Icon */}
                    <AddCommentIcon
                      style={{ cursor: "pointer", color: "#1976d2" }}
                      onClick={() => handleAddComment(item)}
                      titleAccess="Add Comment"
                    />

                    {/* 👁️ View Icon */}
                    <VisibilityIcon
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={() => handleView(item)}
                      titleAccess="View Details"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINATION */}
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            {currentPage} / {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
        {/* ================= MODAL ================= */}
        <Modal open={commentModal} onClose={() => setCommentModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 3,
              width: 400,
            }}
          >
             <h5>Update Status</h5>
             <select
              className="form-control my-2"
              value={commentData.status}
              onChange={(e) =>
                setCommentData({
                  ...commentData,
                  status: e.target.value,
                })
              }
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
           
            <textarea
              className="form-control my-2"
              placeholder="Add Note"
              value={commentData.comment}
              onChange={(e) =>
                setCommentData({
                  ...commentData,
                  comment: e.target.value,
                })
              }
            />
           
            <Button variant="contained" onClick={submitComment}>
              Submit
            </Button>
          </Box>
        </Modal>
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
      <ToastContainer />
    </>
  );
}
