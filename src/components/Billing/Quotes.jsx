import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Quotes = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        getQuotes(currentPage);
    }, [currentPage]);

    const getQuotes = async (pageNo = 1) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}getAllFreightQuoteList?page=${pageNo}&limit=${limit}`
            );
            console.log(response.data);
            setData(response.data.data || []);
            setTotalPage(
                Math.ceil((response.data.total || 1) / limit)
            );
        } catch (error) {
            console.error(
                "Error fetching clients:",
                error.message
            );
        }
    };

    const handlePageChange = (page) => {
        console.log("Selected Page =>", page);
        setCurrentPage(page);
    };

    const naviagetpage = () => {
        navigate("/Admin/addquotesinvoice");
    };


    return (
        <div className="wpWrapper">
            <div className="container-fluid">
                <button
                    className="btn btn-secondary"
                    onClick={naviagetpage}
                >
                    Add New Invoice
                </button>
                <div className="table-responsive tableResFixed mt-4">
                    <table className="table table-striped tableICon">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Customer Name</th>
                                <th>Freight Number</th>
                                <th>Customer Invoice Number</th>
                                <th>Inv Date</th>
                                <th>Currency</th>
                                <th>Total</th>
                                <th>Amount Due</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => {
                                    return (
                                        <tr key={item.quote_estimate_id}>
                                            <td>{item.reference_no || "-"}</td>
                                            <td>{item.client_name || "-"}</td>
                                            <td>{item.freight_number || "-"}</td>
                                            <td>{item.customer_invoice_no || "-"}</td>
                                            <td>{new Date(item.quote_date).toLocaleDateString("en-GB") || "-"}</td>
                                            <td>{item.final_base_currency || "-"}</td>
                                            <td>{item.quote_total || "0"}</td>
                                            <td>{item.quote_total || "0"}</td>
                                            <td>-</td>
                                            <td>
                                                <div type="button"
                                                    data-bs-toggle="dropdown">
                                                    <BsThreeDotsVertical />
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            View
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            Print
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            Copy
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item text-danger">
                                                            Delete
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            Create Supplier Adjust
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button"
                                                            className="dropdown-item">
                                                            Create Invoice
                                                        </button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="text-center d-flex justify-content-end align-items-center mt-3">
                        <button
                            disabled={currentPage === 1}
                            className="bg_page"
                            onClick={() =>
                                handlePageChange(currentPage - 1)
                            }
                        >
                            <i className="fi fi-rr-angle-small-left page_icon"></i>
                        </button>
                        <span className="mx-3">
                            {`Page ${currentPage} of ${totalPage}`}
                        </span>
                        <button
                            disabled={currentPage === totalPage}
                            className="bg_page"
                            onClick={() =>
                                handlePageChange(currentPage + 1)
                            }
                        >
                            <i className="fi fi-rr-angle-small-right page_icon"></i>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Quotes;