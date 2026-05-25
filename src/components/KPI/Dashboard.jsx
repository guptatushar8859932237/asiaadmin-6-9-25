import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const pageSize = 10;
const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
const parseLeaveDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
const getStatusLabel = (status) => {
  if (status === 1) return "Approved";
  if (status === 2) return "Rejected";
  return "Pending";
};
const formatDisplayDate = (value) => {
  const date = parseLeaveDate(value);
  if (!date) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const buildLeaveDatesMap = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const start = parseLeaveDate(item.leave_from);
    const end = parseLeaveDate(item.leave_to);
    if (!start || !end) return;
    const entry = {
      leave_id: item.leave_id,
      staff_name: item.staff_name,
      status: item.status,
      reason: item.reason,
      leave_from: item.leave_from,
      leave_to: item.leave_to,
    };
    const cursor = new Date(start);
    while (cursor <= end) {
      const key = toDateKey(cursor);
      if (!map.has(key)) map.set(key, []);
      const dayLeaves = map.get(key);
      if (!dayLeaves.some((l) => l.leave_id === entry.leave_id)) {
        dayLeaves.push(entry);
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  });
  return map;
};
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
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [hoverTooltip, setHoverTooltip] = useState(null)
  const leaveDatesMap = useMemo(() => buildLeaveDatesMap(data), [data]);
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;
    return leaveDatesMap.has(toDateKey(date)) ? "highlight" : null;
  };
  const showLeaveTooltip = (e, date, leaves) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverTooltip({
      date,
      leaves,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const leaves = leaveDatesMap.get(toDateKey(date));
    if (!leaves?.length) return null;
    return (
      <div
        className="leave-day-hover-zone"
        onMouseEnter={(e) => showLeaveTooltip(e, date, leaves)}
        onMouseLeave={() => setHoverTooltip(null)}
      >
        <span className="leave-day-count">{leaves.length}</span>
      </div>
    );
  };
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
  useEffect(() => {
    const delay = setTimeout(() => {
      getdata(currentPage, searchQuery);
    }, 400);
    return () => clearTimeout(delay);
  }, [currentPage, searchQuery]);
  const totalPages = Math.ceil(
    (pagenationData?.total || 0) / (pagenationData?.limit || pageSize)
  );
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const openModal2 = (item) => {
    setInputdata({
      leave_id: item.leave_id,
      status: item.status || "",
      admin_remark: item.admin_remark || "",
    });
    setIsModalOpen2(true);
  };
  const handleupdateapi = (e) => {
    const { name, value } = e.target;
    setInputdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
        toast.error(err.response?.data?.message || "Update failed!");
      });
  };
  return (
    <>
      <div className="wpWrapper">
        <div className="container-fluid">
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
          {loader ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="leave-management-wrap">
              <div className="leave-calendar-section w-100 mb-4">
                <div className="card p-3 shadow-sm">
                  <h6 className="mb-2">Leave Calendar</h6>
                  <Calendar
                    className="leave-calendar-full w-100"
                    value={calendarDate}
                    onChange={setCalendarDate}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                  />
                </div>
              </div>
              <div className="leave-table-section mt-4 pt-4">
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
                            <td>
                              {(currentPage - 1) * pageSize + index + 1}
                            </td>
                            <td>{item.staff_name}</td>
                            <td>
                              {new Date(item.leave_from).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>
                              {new Date(item.leave_to).toLocaleDateString(
                                "en-GB"
                              )}
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
                                onClick={() => openModal2(item)}
                              ></i>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end align-items-center my-3">
                    <button
                      disabled={currentPage === 1}
                      className="bg_page"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      <i className="fi fi-rr-angle-small-left page_icon"></i>
                    </button>
                    <span className="mx-2">
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                      disabled={
                        currentPage === totalPages || totalPages === 0
                      }
                      className="bg_page"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      <i className="fi fi-rr-angle-small-right page_icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {hoverTooltip && (
            <div
              className="leave-calendar-tooltip"
              style={{
                left: hoverTooltip.x,
                top: hoverTooltip.y,
              }}
            >
              <div className="leave-calendar-tooltip-arrow" />
              <div className="leave-calendar-tooltip-title">
                {hoverTooltip.date.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="leave-calendar-tooltip-list">
                {hoverTooltip.leaves.map((leave) => (
                  <div
                    key={leave.leave_id}
                    className="leave-calendar-tooltip-item"
                  >
                    <div className="leave-tooltip-row">
                      <strong>{leave.staff_name}</strong>
                      <span
                        className={`leave-status-badge status-${leave.status}`}
                      >
                        {getStatusLabel(leave.status)}
                      </span>
                    </div>
                    <div className="leave-tooltip-meta">
                      {formatDisplayDate(leave.leave_from)} –{" "}
                      {formatDisplayDate(leave.leave_to)}
                    </div>
                    {leave.reason && (
                      <div className="leave-tooltip-reason">{leave.reason}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            width: "30%",
          }}
        >
          <div className="d-flex justify-content-between">
            <h4>Edit Leave</h4>
            <button className="btn-close" onClick={() => setIsModalOpen2(false)}>
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
          <Button variant="contained" fullWidth onClick={postData1234}>
            Update Leave
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}