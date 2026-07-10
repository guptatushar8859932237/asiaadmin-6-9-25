import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";

const pageSize = 10;
export default function Cashbook() {
  const [data, setData] = useState([]);
  const [clients, setClients] = useState([]);
  const [ordersPerRow, setOrdersPerRow] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quer, setQuer] = useState({
    search: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(true);
  const [openAdModal, setOpenAdModal] = useState(false);
  const [adDocumentUrl, setAdDocumentUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("POP Document");

  // Add/Edit and Split States
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [addEditMode, setAddEditMode] = useState("add"); // "add" or "edit"
  const [cashbookForm, setCashbookForm] = useState({
    cashbook_id: "",
    date: "",
    bank_ref: "",
    description_on_receipt: "",
    receipt: "",
  });

  const [openSplitModal, setOpenSplitModal] = useState(false);
  const [splitForm, setSplitForm] = useState({
    cashbook_id: "",
    originalDate: "",
    originalBankRef: "",
    originalDescription: "",
    originalReceipt: 0,
    receipt1: 0,
    receipt2: 0,
    description1: "",
    description2: "",
  });
  const userid = JSON.parse(localStorage.getItem("data123"))?.id;
  const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;
  useEffect(() => {
    getCashbookList(currentPage);
    getClients();
  }, [currentPage]);

  const getCashbookList = async (page) => {
    try {
      setLoader(true);
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        {
          staff_id: userid,
          route_url: "/Admin/sageinvoice",
          user_type: usertype,
        }
      );
      if (permission.data.success) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}GetCashbookList?page=${page}`
        );
        setData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        fetchOrdersForCustomers(response.data.data);
      } else {
        toast.error("Access Denied");
      }
    } catch (error) {
      toast.error("Error fetching data.");
    } finally {
      setLoader(false);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}client-list`
      );
      setClients(response.data.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error.message);
    }
  };

  const fetchOrdersForCustomers = async (data) => {
    const orders = {};
    await Promise.all(
      data.map(async (row) => {
        if (row.customer_id) {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_BASE_URL}OrderInvoiceList?client_id=${row.customer_id}`
            );
            orders[row.id] = response.data.data || [];
          } catch (error) {
            orders[row.id] = [];
          }
        }
      })
    );
    setOrdersPerRow(orders);
  };
  const handleDropdownChange = async (value, rowId, field) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
    if (field === "customer_id") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}OrderInvoiceList?client_id=${value}`
        );
        setOrdersPerRow((prev) => ({
          ...prev,
          [rowId]: response.data.data || [],
        }));
      } catch (error) {
        toast.error("Failed to fetch orders.");
      }
      return;
    }
    if (field === "order_ID") {
      const updatedRow = data.find((row) => row.id === rowId);
      if (!updatedRow) return;
      const payload = {
        cashbook_id: rowId,
        customer_id: updatedRow.customer_id,
        order_id: value,
        allocated: updatedRow.allocated,
        receipt: updatedRow.receipt,
      };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}ADDcashbook`,
          payload
        );
        if (response.data.success) {
          getCashbookList(currentPage);
          toast.success("Updated successfully!");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Failed to update row.");
      }
    }
  };
  const filteredData = data.filter(
    (item) =>
      item?.description_on_receipt
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.receipt.toString().includes(searchQuery)
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlelearch = (e) => {
    const { name, value } = e.target;
    setQuer({ ...quer, [name]: value });
  };
  const handlecjh = async () => {
    console.log(quer);
    if (!quer) {
    }
    try {
      setLoader(true);
      const permission = await axios.post(
        `${process.env.REACT_APP_BASE_URL}CheckPermission`,
        {
          staff_id: userid,
          route_url: "/Admin/sageinvoice",
          user_type: usertype,
        }
      );
      if (permission.data.success) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}GetCashbookList?search=${quer.search}`
        );
        setQuer({ search: "" });
        setData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        fetchOrdersForCustomers(response.data.data);
      } else {
        toast.error("Access Denied");
      }
    } catch (error) {
      toast.error("Error fetching data.");
    } finally {
      setLoader(false);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const handleAddNewClick = () => {
    setAddEditMode("add");
    setCashbookForm({
      cashbook_id: "",
      date: new Date().toISOString().split("T")[0],
      bank_ref: "",
      description_on_receipt: "",
      receipt: "",
    });
    setOpenAddEditModal(true);
  };

  const handleEditClick = (item) => {
    setAddEditMode("edit");
    setCashbookForm({
      cashbook_id: item.id || item.cashbook_id,
      date: formatDateForInput(item.date),
      bank_ref: item.bank_ref || "",
      description_on_receipt: item.description_on_receipt || "",
      receipt: item.receipt || "",
    });
    setOpenAddEditModal(true);
  };

  const handleCopyClick = (item) => {
    setAddEditMode("add");
    setCashbookForm({
      cashbook_id: "",
      date: formatDateForInput(item.date),
      bank_ref: item.bank_ref || "",
      description_on_receipt: (item.description_on_receipt || "") + " (Copy)",
      receipt: item.receipt || "",
    });
    setOpenAddEditModal(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Cashbook?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        setLoader(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}deleteCashbookById`,
          { cashbook_id: id }
        );
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response?.data?.message || "Cashbook Deleted successfully.",
            confirmButtonColor: "#3085d6",
          });
          getCashbookList(currentPage);
        } else {
          toast.error(response.data.message || "Failed to delete cashbook.");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoader(false);
      }
    }
  };

  const handleSplitClick = (item) => {
    const originalReceipt = parseFloat(item.receipt) || 0;
    const half = (originalReceipt / 2).toFixed(2);
    setSplitForm({
      cashbook_id: item.id || item.cashbook_id,
      originalDate: formatDateForInput(item.date),
      originalBankRef: item.bank_ref || "",
      originalDescription: item.description_on_receipt || "",
      originalReceipt: originalReceipt,
      receipt1: parseFloat(half),
      receipt2: parseFloat((originalReceipt - parseFloat(half)).toFixed(2)),
      description1: (item.description_on_receipt || "") + " - Part 1",
      description2: (item.description_on_receipt || "") + " - Part 2",
    });
    setOpenSplitModal(true);
  };

  const handleAddEditSubmit = async (e) => {
    e.preventDefault();
    if (!cashbookForm.date || !cashbookForm.receipt) {
      toast.error("Please fill all required fields (Date & Receipt).");
      return;
    }
    const payload = {
      date: cashbookForm.date,
      bank_ref: cashbookForm.bank_ref,
      description_on_receipt: cashbookForm.description_on_receipt,
      receipt: parseFloat(cashbookForm.receipt),
    };
    if (addEditMode === "edit") {
      payload.cashbook_id = cashbookForm.cashbook_id;
    }
    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}addUpdateCashbook`,
        payload
      );
      if (response.data.success) {
        toast.success(
          addEditMode === "edit"
            ? "Cashbook updated successfully!"
            : "Cashbook added successfully!"
        );
        setOpenAddEditModal(false);
        getCashbookList(currentPage);
      } else {
        toast.error(response.data.message || "Failed to save cashbook.");
      }
    } catch (error) {
      toast.error("Error saving cashbook.");
    } finally {
      setLoader(false);
    }
  };

  const handleSplitSubmit = async (e) => {
    e.preventDefault();
    const r1 = parseFloat(splitForm.receipt1);
    const r2 = parseFloat(splitForm.receipt2);
    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) {
      toast.error("Receipt values must be positive numbers.");
      return;
    }
    const sum = parseFloat((r1 + r2).toFixed(2));
    if (Math.abs(sum - splitForm.originalReceipt) > 0.01) {
      toast.error(`The sum of split receipts (${sum}) must equal the original receipt (${splitForm.originalReceipt}).`);
      return;
    }

    try {
      setLoader(true);
      // 1. Update the original record
      const updatePayload = {
        cashbook_id: splitForm.cashbook_id,
        date: splitForm.originalDate,
        bank_ref: splitForm.originalBankRef,
        description_on_receipt: splitForm.description1,
        receipt: r1,
      };
      const updateRes = await axios.post(
        `${process.env.REACT_APP_BASE_URL}addUpdateCashbook`,
        updatePayload
      );
      if (!updateRes.data.success) {
        toast.error("Failed to update original part of split.");
        setLoader(false);
        return;
      }

      // 2. Create the new record
      const addPayload = {
        date: splitForm.originalDate,
        bank_ref: splitForm.originalBankRef,
        description_on_receipt: splitForm.description2,
        receipt: r2,
      };
      const addRes = await axios.post(
        `${process.env.REACT_APP_BASE_URL}addUpdateCashbook`,
        addPayload
      );
      if (addRes.data.success) {
        toast.success("Cashbook split successfully!");
        setOpenSplitModal(false);
        getCashbookList(currentPage);
      } else {
        toast.error("Original updated, but failed to create the split new record.");
      }
    } catch (error) {
      toast.error("Error performing split operations.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Updating... Cashbook may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid">
            <div className="card-body">
              <div className="col-12 d-flex justify-content-end align-items-center manageFreight">
                <input
                  className="py-1 rounded ps-1 mx-2"
                  type="text"
                  name="search"
                  onChange={handlelearch}
                  placeholder="Search"
                  style={{ height: "38px" }}
                />
                <button className="btn btn-secondary" style={{ height: "38px" }} onClick={handlecjh}>
                  Search
                </button>
                <button className="btn btn-primary mx-2" style={{ height: "38px" }} onClick={handleAddNewClick}>
                  Add Cashbook
                </button>
              </div>
              <div className="table-responsive mt-2">
                <table className="table table-striped tableICon">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bank Ref.</th>
                      <th>Description of Receipt</th>
                      <th>Receipt</th>
                      <th>Payment</th>
                      <th>Customer</th>
                      <th>Shipment Ref</th>
                      <th>Allocated</th>
                      <th>Invoice (POP)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>
                            {new Date(item.date).toLocaleDateString("en-GB")}
                          </td>
                          <td>{item.bank_ref}</td>
                          <td>{item.description_on_receipt}</td>
                          <td>{item.receipt}</td>
                          <td>{item.payment}</td>
                          <td>
                            <select
                              onChange={(e) =>
                                handleDropdownChange(
                                  e.target.value,
                                  item.id,
                                  "customer_id"
                                )
                              }
                              value={item.customer_id || ""}
                            >
                              <option value="">Select...</option>
                              {clients.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.full_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              onChange={(e) =>
                                handleDropdownChange(
                                  e.target.value,
                                  item.id,
                                  "order_ID"
                                )
                              }
                              value={item.order_id || ""}
                            >
                              <option value="">Select...</option>
                              {ordersPerRow[item.id]?.map((order) => (
                                <option
                                  key={order.order_ID}
                                  value={order.order_ID}
                                >
                                  {order.order_number}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>{item.order_id ? "YES" : ""}</td>
                          <td className="text-center">
                            {item.freight_pop_docs && item.freight_pop_docs.filter((doc) => doc.document_name === "POP (AD)").length > 0 ? (
                              item.freight_pop_docs
                                .filter((doc) => doc.document_name === "POP (AD)")
                                .map((doc) => (
                                  <i
                                    key={doc.id}
                                    className="fi fi-rr-document mx-1"
                                    style={{ cursor: "pointer", fontSize: "1.2rem", color: "#007bff" }}
                                    title="View POP Document"
                                    onClick={() => {
                                      setModalTitle("Invoice (POP)");
                                      setAdDocumentUrl(`${process.env.REACT_APP_BASE_URLdocument}${doc.document}`);
                                      setOpenAdModal(true);
                                    }}
                                  ></i>
                                ))
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            <div className="dropdown">
                              <div type="button" data-bs-toggle="dropdown">
                                <BsThreeDotsVertical />
                              </div>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => handleSplitClick(item)}
                                  >
                                    Split
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => handleEditClick(item)}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => handleCopyClick(item)}
                                  >
                                    Copy
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDeleteClick(item.id)}
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="text-center d-flex justify-content-end align-items-center">
                  <button
                    disabled={currentPage === 1}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <i className="fi fi-rr-angle-small-left page_icon"></i>
                  </button>
                  <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    disabled={currentPage === totalPages}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i className="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* View Document Modal */}
            <Modal open={openAdModal} onClose={() => setOpenAdModal(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "80vh",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5>{modalTitle}</h5>
                  <button
                    onClick={() => setOpenAdModal(false)}
                    className="btn btn-danger btn-sm"
                  >
                    Close
                  </button>
                </div>
                <iframe
                  src={adDocumentUrl}
                  width="100%"
                  height="100%"
                  title="Document"
                  style={{ border: "none", flexGrow: 1 }}
                ></iframe>
              </Box>
            </Modal>

            {/* Add / Edit Cashbook Modal */}
            <Modal open={openAddEditModal} onClose={() => setOpenAddEditModal(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "500px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                  <h4 className="m-0">{addEditMode === "edit" ? "Edit Cashbook" : "Add Cashbook"}</h4>
                  <button
                    onClick={() => setOpenAddEditModal(false)}
                    className="btn-close"
                    style={{ border: "none", background: "none", fontSize: "1.5rem", cursor: "pointer" }}
                  >
                    &times;
                  </button>
                </div>
                <form onSubmit={handleAddEditSubmit}>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      value={cashbookForm.date}
                      onChange={(e) => setCashbookForm({ ...cashbookForm, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Bank Ref.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2026-2342"
                      value={cashbookForm.bank_ref}
                      onChange={(e) => setCashbookForm({ ...cashbookForm, bank_ref: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Description of Receipt</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={cashbookForm.description_on_receipt}
                      onChange={(e) => setCashbookForm({ ...cashbookForm, description_on_receipt: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-weight-bold">Receipt <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      placeholder="0.00"
                      value={cashbookForm.receipt}
                      onChange={(e) => setCashbookForm({ ...cashbookForm, receipt: e.target.value })}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      type="button"
                      onClick={() => setOpenAddEditModal(false)}
                      className="btn btn-secondary me-2 mx-1"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>

            {/* Split Cashbook Modal */}
            <Modal open={openSplitModal} onClose={() => setOpenSplitModal(false)}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "600px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                  <h4 className="m-0">Split Cashbook</h4>
                  <button
                    onClick={() => setOpenSplitModal(false)}
                    className="btn-close"
                    style={{ border: "none", background: "none", fontSize: "1.5rem", cursor: "pointer" }}
                  >
                    &times;
                  </button>
                </div>
                <div className="alert alert-info py-2 mb-3">
                  <strong>Original Receipt:</strong> {splitForm.originalReceipt} | <strong>Bank Ref:</strong> {splitForm.originalBankRef}
                </div>
                <form onSubmit={handleSplitSubmit}>
                  <div className="row">
                    <div className="col-md-6 border-end">
                      <h5>Part 1 (Original Row)</h5>
                      <div className="mb-3">
                        <label className="form-label font-weight-bold">Part 1 Receipt <span className="text-danger">*</span></label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={splitForm.receipt1}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const remaining = parseFloat((splitForm.originalReceipt - val).toFixed(2));
                            setSplitForm({
                              ...splitForm,
                              receipt1: e.target.value,
                              receipt2: remaining >= 0 ? remaining : 0,
                            });
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label font-weight-bold">Part 1 Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={splitForm.description1}
                          onChange={(e) => setSplitForm({ ...splitForm, description1: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h5>Part 2 (New Row)</h5>
                      <div className="mb-3">
                        <label className="form-label font-weight-bold">Part 2 Receipt</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={splitForm.receipt2}
                          readOnly
                        />
                        <small className="text-muted">Calculated automatically</small>
                      </div>
                      <div className="mb-3">
                        <label className="form-label font-weight-bold">Part 2 Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={splitForm.description2}
                          onChange={(e) => setSplitForm({ ...splitForm, description2: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4 pt-2 border-top">
                    <button
                      type="button"
                      onClick={() => setOpenSplitModal(false)}
                      className="btn btn-secondary me-2 mx-1"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Split Entry
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}
