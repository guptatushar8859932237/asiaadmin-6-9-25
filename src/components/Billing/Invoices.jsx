import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

const Invoices = () => {
    return (
        <div className="wpWrapper">
            <div className="container-fluid">
                <button
                    className="btn btn-secondary"
                >
                    Add Invoice
                </button>

                <div className="table-responsive tableResFixed mt-4">
                    <table className="table table-striped tableICon">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Customer Name</th>
                                <th>Waybill</th>
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
                            <tr>
                                <td>ADINV10001</td>
                                <td>SARS Customs</td>
                                <td>SIV0001401</td>
                                <td>2603JAI0035</td>
                                <td>12/05/2026</td>
                                <td>USD/ ZAR / GBP / ETC</td>
                                <td>2465.05</td>
                                <td>2465.05</td>
                                <td>Unpaid</td>
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
                                                className="dropdown-item">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Invoices
