import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

const ManageCollectionDelivery = () => {
    const [collection, setCollection] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagenationData, setPagenationData] = useState(1);
    const [limit, setLimit] = useState("");
    const [loader, setLoader] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ item: null, type: "", status: "" });
    const [supplierList, setSupplierList] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const userid = JSON.parse(localStorage.getItem("data123"))?.id;
    const usertype = JSON.parse(localStorage.getItem("data123"))?.user_type;

    const FetchCollectDeliveryList = async (page = 1, search = "") => {
        try {
            setLoader(true);
            const payload = {
                user_id: userid,
                user_type: usertype,
                search: search,
                page: page
            };
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}GetReadyFreightAdmin`, payload
            );
            console.log(response.data);
            setCollection(response.data.data);
            setLimit(response.data.limit);
            setPagenationData({
                total: response.data.total,
                page: response.data.page,
                limit: response.data.limit
            });
        } catch (error) {
            console.error("error");
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        FetchCollectDeliveryList(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}supplier-list`);
                if (res.data.success) {
                    setSupplierList(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching suppliers", err);
            }
        };
        fetchSuppliers();
    }, []);

    const handleStatusChange = (item, type, e) => {
        const newStatus = e.target.value;
        if (newStatus === "Assigned") {
            setModalData({ item, type, status: newStatus });
            setModalOpen(true);
            setSelectedSupplier("");
        } else {
            const existingSupplierId = type === "collection" ? item.collection_supplier_id : item.delivery_supplier_id;
            updateStatus(item.freight_id, type, newStatus, existingSupplierId || "");
        }
    };

    const updateStatus = async (freight_id, type, status, supplier_id) => {
        try {
            setLoader(true);
            const payload = {
                freight_id: String(freight_id),
                type: type,
                status: status,
                supplier_id: String(supplier_id),
                user_id: String(userid)
            };
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}ManageFreightStatus`, payload);
            toast.success(response.data?.message || "Status updated successfully");
            FetchCollectDeliveryList(currentPage, searchQuery);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoader(false);
            setModalOpen(false);
        }
    };

    const totalPages = pagenationData?.total && pagenationData?.limit
        ? Math.ceil(pagenationData.total / pagenationData.limit)
        : 1;

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
        FetchCollectDeliveryList(1, value)
    };

    return (
        <>
            <div className="wpWrapper">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between my-3">
                        <h4 className="freight_hd">Collection and Delivery
                            Module</h4>
                        <div className="d-flex">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-2 py-1"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    {/* ---------------- TABLE ---------------- */}
                    {loader ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p className="loader-text">Updating...
                                This may take some time</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Freight Number</th>
                                        <th>Freight</th>
                                        <th>Type</th>
                                        <th>Client Name</th>
                                        <th>Collection</th>
                                        <th>Status</th>
                                        <th>Collection Supplier</th>
                                        <th>Delivery</th>
                                        <th>Status</th>
                                        <th>Delivery Supplier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        collection.map((item, index) => (
                                            <tr>
                                                <td>{(currentPage - 1) * limit + index + 1}</td>
                                                <td>{item.freight_number}</td>
                                                <td>{item.freight}</td>
                                                <td>{item.type}</td>
                                                <td>{item.client_name}</td>
                                                <td>{item.ready_for_collection}</td>
                                                <td>
                                                    {item.ready_for_collection?.toLowerCase() === "yes" ? (
                                                        <select
                                                            value={item.ready_for_collection_status || "Pending"}
                                                            onChange={(e) => handleStatusChange(item, "collection", e)}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Assigned">Assigned</option>
                                                            <option value="Complete">Complete</option>
                                                        </select>
                                                    ) : (
                                                        item.ready_for_collection_status || "-"
                                                    )}
                                                </td>
                                                <td>{item.collection_supplier_name || "-"}</td>
                                                <td>{item.require_for_delivery}</td>
                                                <td>
                                                    {item.require_for_delivery?.toLowerCase() === "yes" ? (
                                                        <select
                                                            value={item.require_for_delivery_status || "Pending"}
                                                            onChange={(e) => handleStatusChange(item, "delivery", e)}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Assigned">Assigned</option>
                                                            <option value="Complete">Complete</option>
                                                        </select>
                                                    ) : (
                                                        item.require_for_delivery_status || "-"
                                                    )}
                                                </td>
                                                <td>{item.delivery_supplier_name || "-"}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end align-items-end my-3">
                                <button
                                    disabled={currentPage === 1}
                                    className="bg_page"
                                    onClick={() => {
                                        setCurrentPage(currentPage - 1);
                                    }}
                                >
                                    <i class="fi fi-rr-angle-small-left page_icon"></i>
                                </button>
                                <span className="mx-2">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    disabled={currentPage === totalPages}
                                    className="bg_page"
                                    onClick={() => {
                                        setCurrentPage(currentPage + 1);
                                    }}
                                >
                                    <i class="fi fi-rr-angle-small-right page_icon"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modalOpen && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Assign Supplier</h5>
                                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Select Supplier</label>
                                    <select
                                        className="form-select"
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                    >
                                        <option value="">-- Select Supplier --</option>
                                        {supplierList.map(sup => (
                                            <option key={sup.id} value={sup.id}>{sup.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => updateStatus(modalData.item.freight_id, modalData.type, modalData.status, selectedSupplier)} disabled={!selectedSupplier}>Assign & Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>

    )
}

export default ManageCollectionDelivery;