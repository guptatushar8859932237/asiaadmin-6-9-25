import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
export default function BillingTable() {
  const [tableData, setTableData] = useState([]);
  const [dropdownData, setDropdownData] = useState({});
  const [selectedDueDates, setSelectedDueDates] = useState({});
  const [searchdata, setSearchdata] = useState({
    search: "",
  });
  const [selectedInvoices, setSelectedInvoices] = useState({});
  const [pagenation, setPagenation] = useState({});
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getTableData();
  }, []);
  const getTableData = async (page) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}OrderInvoiceList?page=${
          page == undefined ? currentPage : page
        }`
      );
      const data = response.data.data || [];
      console.log(response.data);
      setTableData(response.data.data);
      setPagenation(response.data.pagination);
      setLoader(false);
      const uniqueOrderIDs = [...new Set(data.map((item) => item.order_ID))];
      if (uniqueOrderIDs.length > 0) {
        fetchDropdownData(uniqueOrderIDs);
      }
    } catch (error) {
      setLoader(false);
      console.error(
        "Error fetching table data:",
        error.response?.data || error.message
      );
    }
  };
  const fetchDropdownData = async (orderIDs) => {
    try {
      setLoader(true);
      const dropdownResponses = await Promise.all(
        orderIDs.map((orderID) =>
          axios.get(`${process.env.REACT_APP_BASE_URL}GetSageInvoiceList`, {
            params: { order_ID: orderID },
          })
        )
      );
      const dropdownResults = {};
      orderIDs.forEach((orderID, index) => {
        dropdownResults[orderID] = dropdownResponses[index].data.data || [];
      });
      setLoader(false);
      setDropdownData(dropdownResults);
    } catch (error) {
      console.error("Error fetching dropdown data:", error.message);
      setLoader(false);
    }
  };
  const handleDropdownChange = (field, value, item) => {
    const updatedInvoice = {
      ...selectedInvoices[item.invoice_id],
      [field]: value,
    };
    setSelectedInvoices((prev) => ({
      ...prev,
      [item.invoice_id]: updatedInvoice,
    }));
    handleInvoiceSelection(item, updatedInvoice);
  };
  const handleInvoiceSelection = (item, updatedInvoice) => {
    const invoiceDetails = {
      invoice_id: item.invoice_id,
      date: item.created_at,
      transaction: updatedInvoice.transaction || item.transaction,
      order_id: item.order_ID,
      client_id: item.client_id,
      sage_invoice_id: updatedInvoice.sage_invoice_id || item.sage_invoice_id,
      invoice_amt: item.invoice_amt,
      due_date: selectedDueDates[item.invoice_id],
      payment: item.payment,
      invoice_currency:
        updatedInvoice.invoice_currency || item.invoice_currency,
    };
    sendInvoiceDetails(invoiceDetails);
  };
  // const sendInvoiceDetails = async (invoiceDetails) => {
  //   try {
  //     setLoader(true);
  //     await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}AddInvoiceDetails`,
  //       invoiceDetails
  //     );
  //     getTableData();
  //     setLoader(false);
  //     toast.success("Invoice details submitted successfully");

  //   } catch (error) {
  //     console.error( error.response?.data.message || error.message);
  //     setLoader(false);
  //     toast.error("Error submitting invoice details111");
  //   }
  // };
  const sendInvoiceDetails = async (invoiceDetails) => {
    try {
      setLoader(true);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}AddInvoiceDetails`,
        invoiceDetails
      );
      getTableData();
      setLoader(false);
      toast.success("Invoice details submitted successfully");
    } catch (error) {
      setLoader(false);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Unexpected error occurred";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    getTableData(page);
  };
  const totalPage = pagenation.pageSize;
  const startIndex = (currentPage - 1) * pagenation.pageSize;
  const endIndex = startIndex + pagenation.pageSize;
  const currentData = tableData.slice(startIndex, endIndex);
  const handleDueDateChange = (e, item) => {
    const newDate = e.target.value;
    setSelectedDueDates((prev) => ({
      ...prev,
      [item.invoice_id]: newDate,
    }));
    const updatedInvoice = {
      ...selectedInvoices[item.invoice_id],
      invoice_id: item.invoice_id,
      due_date: newDate,
    };
    setSelectedInvoices((prev) => ({
      ...prev,
      [item.invoice_id]: updatedInvoice,
    }));
    sendInvoiceDetails(updatedInvoice);
  };
  const getAvailableOptions = (item) => {
    const selectedSageInvoiceIds = Object.values(selectedInvoices).map(
      (invoice) => invoice.sage_invoice_id
    );
    return (
      dropdownData[item.order_ID]?.filter(
        (option) => !selectedSageInvoiceIds.includes(option.id)
      ) || []
    );
  };
  const handlechnage = (e) => {
    const { name, value } = e.target;
    setSearchdata({ ...searchdata, [name]: value });
  };
  const hadleclick = async (page) => {
    setLoader(true);
    if (!searchdata) {
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}OrderInvoiceList?search=${searchdata.search}`
      );
      const data = response.data.data || [];
      console.log(response.data);
      setSearchdata({ search: "" });
      setTableData(response.data.data);
      setPagenation(response.data.pagination);
      setLoader(false);
      const uniqueOrderIDs = [...new Set(data.map((item) => item.order_ID))];
      if (uniqueOrderIDs.length > 0) {
        fetchDropdownData(uniqueOrderIDs);
      }
    } catch (error) {
      setLoader(false);
      console.error(
        "Error fetching table data:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <>
      {loader ? (
        <div class="loader-container">
          <div class="loader"></div>
          <p class="loader-text">Updating... Invoice may take some time</p>
        </div>
      ) : (
        <div className="wpWrapper">
          <div className="container-fluid manageFreight">
            <div>
              <div className="d-flex mt-3 justify-content-end">
                <input
                  name="search"
                  placeholder="search..."
                  className="px-2 rounded"
                  onChange={handlechnage}
                ></input>
                <button className="mx-2 btn btn-secondary" onClick={hadleclick}>
                  search
                </button>
              </div>
              <div className="card-body">
                <table className="table  table-responsive table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction</th>
                      <th>Shipment Ref</th>
                      <th>Customer</th>
                      <th>Invoice Ref</th>
                      <th>Invoice Amount</th>
                      <th>Due Date</th>
                      <th>Currency</th>
                      <th>Payment</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData &&
                      tableData.length > 0 &&
                      tableData.map((item) => {
                        console.log(item);
                        return (
                          <>
                            <tr key={item.invoice_id}>
                              <td>
                                {new Date(item.date).toLocaleDateString(
                                  "en-GB"
                                ) == "01/01/1970"
                                  ? ""
                                  : new Date(item.date).toLocaleDateString(
                                      "en-GB"
                                    )}
                              </td>
                              <td>
                                <select
                                  value={
                                    selectedInvoices[item.invoice_id]
                                      ?.transaction || item.transaction
                                  }
                                  onChange={(e) =>
                                    handleDropdownChange(
                                      "transaction",
                                      e.target.value,
                                      item
                                    )
                                  }
                                >
                                  <option value="Select">Select</option>
                                  {item.invoice_amt > 0 ? (
                                    <option value="Invoice">INV</option>
                                  ) : (
                                    ""
                                  )}
                                  {item.invoice_amt < 0 ? (
                                    <option value="Credit Note">CRN</option>
                                  ) : (
                                    ""
                                  )}
                                  {item.invoice_amt > 0 ? (
                                    <option value="Adjustment">ADJ</option>
                                  ) : (
                                    ""
                                  )}
                                  {item.invoice_amt < 0 ? (
                                    <option value="Write-off">WO</option>
                                  ) : (
                                    ""
                                  )}
                                </select>
                              </td>
                              <td>{item.order_number || "N/A"}</td>
                              <td>{item.client_name || "N/A"}</td>
                              <td>
                                <select
                                  value={
                                    selectedInvoices[item.invoice_id]
                                      ?.sage_invoice_id || item.sage_invoice_id
                                  }
                                  onChange={(e) =>
                                    handleDropdownChange(
                                      "sage_invoice_id",
                                      e.target.value,
                                      item
                                    )
                                  }
                                >
                                  <option value="Select">Select</option>
                                  {getAvailableOptions(item).map(
                                    (option, index) => (
                                      <option key={index} value={option.id}>
                                        {option.document_number}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>
                              <td>{item.invoice_amt}</td>
                              <td>
                                {item.invoice_id === null ? (
                                  ""
                                ) : (
                                  <input
                                    type="date"
                                    value={
                                      selectedDueDates[item.invoice_id] ||
                                      (item.due_date
                                        ? new Date(item.due_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : "")
                                    }
                                    onChange={(e) =>
                                      handleDueDateChange(e, item)
                                    }
                                  />
                                )}
                              </td>
                              <td>
                                {item.invoice_id === null ? (
                                  ""
                                ) : (
                                  <select
                                    value={
                                      selectedInvoices[item.invoice_id]
                                        ?.invoice_currency ||
                                      item.invoice_currency
                                    }
                                    onChange={(e) =>
                                      handleDropdownChange(
                                        "invoice_currency",
                                        e.target.value,
                                        item
                                      )
                                    }
                                  >
                                    <option value="Select">Select</option>
                                    <option value="ZAR">ZAR</option>
                                    <option value="USD">USD</option>
                                    <option value="Euro">Euro</option>
                                    <option value="GBP">GBP</option>
                                    <option value="KWA">KWA</option>
                                  </select>
                                )}
                              </td>
                              <td>{item.payment}</td>
                              <td>
                                {/* {item.balance === 0
                                  ? item.invoice_amt
                                  : item.balance} */}
                                   {item.balance}
                              </td>
                            </tr>
                          </>
                        );
                      })}
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
                  <span className="mx-2">{`Page ${currentPage} of ${pagenation.totalPages}`}</span>
                  <button
                    disabled={currentPage === pagenation.totalPage}
                    className="bg_page"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i className="fi fi-rr-angle-small-right page_icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
