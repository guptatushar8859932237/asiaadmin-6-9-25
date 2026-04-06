
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCommentIcon from "@mui/icons-material/AddComment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const pageSize = 10;
export default function Taskmanager() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [assignedData, setAssignedData] = useState([]);
  const [clearanceData, setClearanceData] = useState([]);
  const [customData, setCustomData] = useState([]);
  // ✅ COMMENT MODAL STATE
  const [commentModal, setCommentModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentData, setCommentData] = useState({
    comment: "",
    status: "",
  });
  const navigate = useNavigate();
  /* ================= FETCH ================= */
  const fetchAssigned = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedFreightsSatff`
      );
      setAssignedData(res.data?.data || []);
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };
  const fetchClearance = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllAssignedClearanceSatff`
      );
      setClearanceData(res.data?.data || []);
    } catch {
      toast.error("Error");
    } finally {
      setLoader(false);
    }
  };
  const fetchCustomTasks = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}getAllCustomTasks`
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
  const submitComment = async () => {
    try {
      let payload = {
        user_id: JSON.parse(localStorage.getItem("data123"))?.id,
        task_id: selectedTask?.task_id || selectedTask?.id,
        task_status: commentData.status,
        comment: commentData.comment,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}updateTaskStatus`,
        payload
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

  // 👉 Option 1: Navigate to details page
navigate(`/Admin/task/${item.task_id || item.id}`);

  // 👉 Option 2 (optional): open modal
  // setSelectedTask(item);
  // setViewModal(true);
};
  /* ================= UI ================= */
  return (
    <>
      <div className="container-fluid">
        <h4>Task Manager</h4>
        <div className="mb-3">
          <button onClick={() => setActiveTab("assigned")}>Freight</button>
          <button onClick={() => setActiveTab("clearance")}>Clearance</button>
          <button onClick={() => setActiveTab("Custom")}>Custom</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Freight Number</th>
              <th>Date</th>
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
                  {item.task_title || item.freight_number || item.clearance_number}
                </td>
                <td>
                  {(item.created_at ||
                    item.freight_created_at ||
                    item.task_created_at)?.split("T")[0]}
                </td>
                <td>
                    {item.task_status}
                </td>
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
            <h4>Add Comment</h4>
            <textarea
              className="form-control my-2"
              placeholder="Comment"
              value={commentData.comment}
              onChange={(e) =>
                setCommentData({
                  ...commentData,
                  comment: e.target.value,
                })
              }
            />
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
            <Button variant="contained" onClick={submitComment}>
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}