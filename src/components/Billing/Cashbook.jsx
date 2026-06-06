import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box } from "@mui/material";
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
  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Updating... Cashbook may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid manageFreight">
            <div className="card-body">
              <div className="col-12 d-flex justify-content-end">
                <input
                  className="py-1 rounded ps-1 mx-2"
                  type="text"
                  name="search"
                  onChange={handlelearch}
                  placeholder="Search"
                />
                <button className="btn btn-secondary" onClick={handlecjh}>
                  Search
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
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
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}
