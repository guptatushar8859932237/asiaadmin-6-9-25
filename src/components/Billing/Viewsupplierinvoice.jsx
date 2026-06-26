import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../Assests/logo.png";
import { exportEstimatePdf } from "../../utils/pdfExportUtils";

const getVatPercent = (vatTyp) => {
  if (!vatTyp) return 0;
  if (!isNaN(vatTyp) && !isNaN(parseFloat(vatTyp))) {
    return parseFloat(vatTyp);
  }
  const match = String(vatTyp).match(/(\d+(?:\.\d+)?)\s*%/);
  if (match) {
    return parseFloat(match[1]);
  }
  return 0;
};

const getVatLabel = (val) => {
  if (!val) return "";
  if (String(val) === "15") return "Standard Rate(15.00%)";
  if (String(val) === "100") return "Customs VAT(100.00%)";
  if (String(val) === "0") return "Zero Rate";
  return val;
};

const VAT_OPTIONS = [
  { value: "", label: "No Vat" },
  { value: "Standard Rate(15.00%)", label: "Standard Rate(15.00%)" },
  { value: "Standard Rate (Capital Goods) (15.00%)", label: "Standard Rate (Capital Goods) (15.00%)" },
  { value: "Zero Rate", label: "Zero Rate" },
  { value: "Zero Rate Exports(0.00%)", label: "Zero Rate Exports(0.00%)" },
  { value: "Exempt and Non-Suppliers(0.00%)", label: "Exempt and Non-Suppliers(0.00%)" },
  { value: "Export of Second Hands Goods(15.00%)", label: "Export of Second Hands Goods(15.00%)" },
  { value: "Change in Use(15.00%)", label: "Change in Use(15.00%)" },
  { value: "Customs VAT(100.00%)", label: "Customs VAT(100.00%)" },
  { value: "Goods and Services Imported(100.00%)", label: "Goods and Services Imported(100.00%)" },
  { value: "Capital Goods and Imported(100.00%)", label: "Capital Goods and Imported(100.00%)" },
  { value: "VAT Adjustment (100.00%)", label: "VAT Adjustment (100.00%)" },
  { value: "Domestic Reverse Charge (15.00%)", label: "Domestic Reverse Charge (15.00%)" },
  { value: "Manual VAT", label: "Manual VAT" },
  { value: "Manual VAT (Capital Goods)", label: "Manual VAT (Capital Goods)" }
];

export default function Viewsupplierinvoice({ hiddenPrintItem, onPrintComplete }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const [freight, setFreight] = useState({
    customer_invoice_no: "",
    invoice_for_country: "",
    due_date: "",
    final_base_currency: "Select",
    chargable_rate: "",
    company_id: "",
    company_address: null,
  });

  const [getdata, setGetdata] = useState({});

  // Dropdown Options state
  const [originDropdown, setOriginDropdown] = useState([]);
  const [freightDropdown, setFreightDropdown] = useState([]);
  const [transitDropdown, setTransitDropdown] = useState([]);
  const [destinationDropdown, setDestinationDropdown] = useState([]);
  const [adminDropdown, setAdminDropdown] = useState([]);
  const [customsDropdown, setCustomsDropdown] = useState([]);

  // Dynamic Rows state
  const [originRows, setOriginRows] = useState([]);
  const [freightRows, setFreightRows] = useState([]);
  const [transitRows, setTransitRows] = useState([]);
  const [destinationRows, setDestinationRows] = useState([]);
  const [adminRows, setAdminRows] = useState([]);
  const [customsRows, setCustomsRows] = useState([]);

  const viewItem = hiddenPrintItem || location.state?.item;
  const supplierShipmentInvoiceId = viewItem?.supplier_shipment_invoice_id || viewItem?.supplier_invoice_id || (typeof viewItem === "object" ? null : viewItem);
  const shipmentId = viewItem?.shipment_id;

  useEffect(() => {
    // Load dropdown options
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (supplierShipmentInvoiceId && shipmentId) {
      fetchInvoiceData();
    }
  }, [supplierShipmentInvoiceId, shipmentId]);

  const fetchDropdowns = async () => {
    const chargeTypes = [
      { type: "Origin Charges", setter: setOriginDropdown },
      { type: "Freight Charges", setter: setFreightDropdown },
      { type: "Transit Charges", setter: setTransitDropdown },
      { type: "Destination Charges", setter: setDestinationDropdown },
      { type: "Admin Charges", setter: setAdminDropdown },
      { type: "Customs Charges", setter: setCustomsDropdown },
    ];

    for (const item of chargeTypes) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}getAdminFrieghtComponentList`,
          { params: { type: item.type } }
        );
        if (response.data && response.data.success) {
          item.setter(response.data.data || []);
        }
      } catch (error) {
        console.error(`Error fetching dropdown for ${item.type}:`, error);
      }
    }
  };

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}GetSupplierShipmentInvoiceById`,
        {
          supplier_shipment_invoice_id: parseInt(supplierShipmentInvoiceId),
          shipment_id: parseInt(shipmentId)
        }
      );
      if (response.data && response.data.success && response.data.data) {
        const invoiceData = response.data.data;
        if (invoiceData) {
          setFreight({
            reference_no: invoiceData.reference_no || "",
            customer_invoice_no: invoiceData.customer_invoice_no || "",
            invoice_for_country: invoiceData.invoice_for_country || "",
            due_date: invoiceData.due_date ? invoiceData.due_date.split("T")[0] : "",
            final_base_currency: invoiceData.final_base_currency || "Select",
            chargable_rate: invoiceData.chargeable || "",
            company_id: invoiceData.company_id || "",
            company_address: invoiceData.company_address || null,
            created_at: invoiceData.created_at || "",
          });

          if (invoiceData.shipment_id) {
            apidataget(invoiceData.shipment_id, invoiceData);
          }

          const items = invoiceData.components || [];
          if (items.length > 0) {
            const mappedComponents = items.map((c) => ({
              id: c.id || Date.now() + Math.random(),
              db_id: c.id,
              admin_frieght_component_id: c.admin_frieght_component_id || "",
              description: c.description || c.component_description || "",
              qty: c.qty !== null && c.qty !== undefined ? c.qty : "",
              currency: c.currency || "Select",
              cost: c.cost !== null && c.cost !== undefined ? c.cost : "",
              unitType: c.unit_type === "L/S" ? "1" : (c.unit_type === "W/M" ? "2" : "Select"),
              gp_percent: c.gp_percent !== null && c.gp_percent !== undefined ? c.gp_percent : "",
              sales_price: c.sales_price !== null && c.sales_price !== undefined ? c.sales_price : "",
              roe: c.roe !== null && c.roe !== undefined ? c.roe : "",
              vatTyp: c.vat_type !== null && c.vat_type !== undefined ? getVatLabel(c.vat_type) : "",
              vat: c.vat !== null && c.vat !== undefined ? c.vat : "",
              discPercent: c.disc_percent !== null && c.disc_percent !== undefined ? c.disc_percent : "",
              comment: c.comment || "",
              name: c.name || c.section_name || ""
            }));

            const filterBySection = (name) => {
              return mappedComponents.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
            };

            setOriginRows(filterBySection("Origin Charges"));
            setFreightRows(filterBySection("Freight Charges"));
            setTransitRows(filterBySection("Transit Charges"));
            setDestinationRows(filterBySection("Destination Charges"));
            setAdminRows(filterBySection("Admin Charges"));
            setCustomsRows(filterBySection("Customs Charges"));
          } else {
            initializeDefaultRows();
          }
        }
      } else {
        initializeDefaultRows();
      }
    } catch (error) {
      console.error("Error loading supplier shipment invoice details:", error);
      initializeDefaultRows();
    }
  };

  const initializeDefaultRows = () => {
    setOriginRows([]);
    setFreightRows([]);
    setTransitRows([]);
    setDestinationRows([]);
    setAdminRows([]);
    setCustomsRows([]);
  };

  const apidataget = async (shipmentIdVal, initialInvoiceData = null) => {
    const payload = {
      shipment_id: shipmentIdVal,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}GetShipmentDetails`,
        payload
      );
      if (response.data && response.data.shipment) {
        const shipmentObj = { ...response.data.shipment };

        const clientName = shipmentObj.client_name
          || initialInvoiceData?.client_name
          || initialInvoiceData?.shipment?.client_name
          || response.data.details?.[0]?.client_name
          || response.data.clearance?.[0]?.client_name
          || response.data.details?.[0]?.client_address_1
          || response.data.clearance?.[0]?.client_address_1
          || "";

        const address1 = shipmentObj.address_1
          || initialInvoiceData?.address_1
          || initialInvoiceData?.shipment?.address_1
          || response.data.details?.[0]?.address_1
          || response.data.clearance?.[0]?.address_1
          || response.data.details?.[0]?.client_address_1
          || response.data.clearance?.[0]?.client_address_1
          || "";

        shipmentObj.client_name = clientName;
        shipmentObj.address_1 = address1;

        setGetdata(shipmentObj);
      }
    } catch (error) {
      console.error("Error loading shipment details:", error);
    }
  };

  const handleclicknav = () => {
    navigate(-1);
  };

  const downloadPDF1 = async () => {
    const element = pdfRef.current;
    if (!element) return;
    try {
      await exportEstimatePdf(element, "SupplierInvoice.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const isPrintingRef = useRef(false);

  useEffect(() => {
    if (getdata && Object.keys(getdata).length > 0 && (location.state?.autoPrint || hiddenPrintItem) && !isPrintingRef.current) {
      isPrintingRef.current = true;
      setTimeout(async () => {
        await downloadPDF1();
        if (onPrintComplete) {
          onPrintComplete();
        }
      }, 1500);
    }
  }, [getdata, location.state, hiddenPrintItem]);

  const shipmentValue = (...keys) => {
    for (const key of keys) {
      const value = getdata?.[key] ?? freight?.[key];
      if (value !== undefined && value !== null && value !== "") return value;
    }
    return "";
  };

  const shipmentDate = (...keys) => {
    const value = shipmentValue(...keys);
    if (!value || value === "0000-00-00") return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB");
  };

  const safeNumber = (val) => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  const formatMoney = (value) => safeNumber(value).toFixed(2);

  const resolveRowUnit = (unitType) => {
    if (!unitType || unitType === "Select") return 0;
    if (String(unitType) === "1") return 1;
    const rate = parseFloat(freight.chargable_rate);
    return Number.isNaN(rate) ? 0 : rate;
  };

  const calculateRowData = (row) => {
    const qty = parseFloat(row.qty) || 0;
    const cost = parseFloat(row.cost) || 0;
    const unit = resolveRowUnit(row.unitType);
    const tCost = (row.unitType && row.unitType !== "Select") ? cost * unit * qty : 0;
    const gpPercent = parseFloat(row.gp_percent) || 0;
    let salesPrice = tCost;
    if (gpPercent > 0 && gpPercent < 100) {
      salesPrice = tCost / (1 - gpPercent / 100);
    }
    const roe = parseFloat(row.roe) || 0;
    const finalAmt = salesPrice * roe;

    const discPercent = parseFloat(row.discPercent) || 0;
    const vatPercent = getVatPercent(row.vatTyp);

    const disc = (finalAmt * discPercent) / 100;
    const exclusive = finalAmt - disc;
    let vat = (exclusive * vatPercent) / 100;
    if (row.vatTyp === "Manual VAT" || row.vatTyp === "Manual VAT (Capital Goods)") {
      vat = parseFloat(row.vat) || 0;
    }
    const inclusive = exclusive + vat;

    return {
      unit,
      tCost,
      salesPrice,
      finalAmt,
      disc,
      exclusive,
      vat,
      inclusive,
    };
  };

  const originRowsData = originRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const totalChageswithOutExchange = originRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const totalChangeRoeOrigin = originRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const freightRowsData = freightRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const totalChageswithOutExchangeinsurance = freightRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const totalChangeRoeOriginaftercalcuinsurance = freightRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const transitRowsData = transitRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const totalChageswithOuTransit = transitRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const transitRoe = transitRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const destinationRowsData = destinationRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const totalChaDestinationTransit = destinationRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const totalChaDestinationTransitRoe = destinationRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const adminRowsData = adminRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const totaAdminransit = adminRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const totalAdminnsitRoe = adminRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const customsRowsData = customsRows.map((row) => ({
    row,
    calc: calculateRowData(row),
  }));
  const customsTotalTCost = customsRowsData.reduce((sum, item) => sum + item.calc.tCost, 0);
  const customsTotalFinalAmt = customsRowsData.reduce((sum, item) => sum + item.calc.finalAmt, 0);

  const sumofall =
    totaAdminransit +
    totalChaDestinationTransit +
    totalChageswithOuTransit +
    totalChageswithOutExchangeinsurance +
    totalChageswithOutExchange;

  const sumofRoe =
    totalAdminnsitRoe +
    totalChaDestinationTransitRoe +
    transitRoe +
    totalChangeRoeOriginaftercalcuinsurance +
    totalChangeRoeOrigin;

  const totalVatInclusive =
    originRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0) +
    freightRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0) +
    transitRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0) +
    destinationRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0) +
    adminRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0) +
    customsRowsData.reduce((sum, item) => sum + item.calc.inclusive, 0);

  const renderRowsForSection = (rowsData, rowsState, dropdownOptions, sectionTitle, totalTCost, totalFinalAmt) => {
    return (
      <>
        <tr className="estimate-section-row">
          <td colSpan={19}>
            <strong>
              {sectionTitle}
            </strong>
          </td>
        </tr>
        {rowsData.map(({ row, calc }) => (
          <tr key={row.id}>
            <td>
              <select
                className="supplier_form"
                value={row.admin_frieght_component_id || (row.description === "Note" ? "Note" : "")}
                disabled
              >
                <option value="">Select</option>
                <option value="Note">Note</option>
                {dropdownOptions.map((item) => (
                  <option
                    key={item.admin_frieght_component_id}
                    value={item.admin_frieght_component_id}
                  >
                    {item.code ? `${item.code} - ${item.description}` : item.description}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                type="text"
                className="supplier_form"
                disabled
                value={row.qty || ""}
                placeholder="0.00"
              />
            </td>
            <td>
              <select
                className="select_supplier"
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  paddingLeft: 5,
                  border: 0,
                }}
                disabled
                value={row.currency || "Select"}
              >
                <option value="Select">Select</option>
                <option value="RAND">RAND</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EURO">EURO</option>
              </select>
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                type="text"
                className="supplier_form"
                disabled
                value={row.cost || ""}
                placeholder="0.00"
              />
            </td>
            <td>
              <select
                className="select_supplier"
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  paddingLeft: 5,
                  border: 0,
                }}
                disabled
                value={row.unitType || "Select"}
              >
                <option value="Select">Select</option>
                <option value="1">L/S</option>
                <option value="2">W/M</option>
              </select>
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                type="text"
                className="supplier_form"
                disabled
                value={row.unitType === "1" ? "1" : (freight.chargable_rate || "")}
                placeholder="0.00"
              />
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                disabled
                type="text"
                className="supplier_form"
                value={formatMoney(calc.tCost)}
                placeholder="0.00"
              />
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                type="text"
                className="supplier_form"
                disabled
                value={row.gp_percent || ""}
                placeholder="0.00"
              />
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  fontWeight: 400,
                  border: "0px",
                  verticalAlign: "middle",
                }}
                disabled
                type="text"
                className="supplier_form"
                value={formatMoney(calc.salesPrice)}
                placeholder="0.00"
              />
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  border: "0px",
                  verticalAlign: "middle",
                }}
                disabled
                value={row.roe || ""}
                className="supplier_form"
                placeholder="1.00"
              />
            </td>
            <td>
              <input
                style={{
                  marginBottom: 0,
                  fontSize: 13,
                  color: "black",
                  border: "0px",
                  verticalAlign: "middle",
                }}
                disabled
                value={formatMoney(calc.finalAmt)}
                placeholder="0.00"
                className="supplier_form"
              />
            </td>
            <td>
              <select
                disabled
                value={row.vatTyp || ""}
              >
                {VAT_OPTIONS.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                className="supplier_form"
                value={row.discPercent || ""}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatMoney(calc.disc)}
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatMoney(calc.exclusive)}
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={
                  row.vatTyp === "Manual VAT" || row.vatTyp === "Manual VAT (Capital Goods)"
                    ? row.vat ?? ""
                    : formatMoney(calc.vat)
                }
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatMoney(calc.inclusive)}
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Comment"
                disabled
                value={row.comment || ""}
                className="supplier_form"
              />
            </td>
            <td></td>
          </tr>
        ))}
        <tr>
          <td colSpan={6}>
            <strong>Total - {sectionTitle}</strong>
          </td>
          <td colSpan={4}> {formatMoney(totalTCost)} </td>
          <td> {formatMoney(totalFinalAmt)} </td>
          <td colSpan={8}></td>
        </tr>
      </>
    );
  };

  return (
    <>
      <div
        className="wpWrapper "
        style={
          hiddenPrintItem
            ? {
                position: "absolute",
                top: "-9999px",
                left: "-9999px",
                width: "max-content",
                minWidth: "1200px",
                zIndex: -1000,
              }
            : {}
        }
      >
        <div className="container-fluid">
          {!hiddenPrintItem && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-3">
                <ArrowBackIcon onClick={handleclicknav} style={{ cursor: "pointer" }} />
                <h4 className="freight_hd mb-0">View Supplier Shipment Invoice</h4>
              </div>
              <div className="d-flex gap-3 align-items-center blueText">
                <i onClick={downloadPDF1} className="fa fa-download" style={{ cursor: "pointer" }} aria-hidden="true"></i>
              </div>
            </div>
          )}

          <section ref={pdfRef} style={{ margin: 0, padding: 0 }}>
            <div
              style={{
                width: "100%",
                padding: "10px",
                outline: "auto",
                height: "auto",
                background: "#fff",
              }}
              className="pdf-page"
            >
              <table
                style={{
                  width: "100%",
                  tableLayout: "fixed",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ width: "50%", paddingBottom: "10px" }}>
                      <div>
                        <img style={{ height: 55 }} src={logo} alt="logo" />
                      </div>
                    </td>
                    <td style={{ width: "50%", color: "#000", paddingBottom: "10px", textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          marginBottom: "unset",
                          borderBottom: "1px solid #cb191e",
                          display: "inline-block",
                        }}
                      >
                        Asia Direct - Africa
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          marginBottom: "unset",
                          lineHeight: "1.5",
                          marginTop: 10,
                        }}
                      >
                        {freight.company_address?.company_name || ""}<br />
                        {freight.company_address?.address_line || ""}
                      </p>
                      <p style={{ fontSize: 13 }}>
                        <span><b>Registration No.:-</b> {freight.company_address?.company_registration_no || ""}</span> <br />
                        <span><b>VAT No.:-</b> {freight.company_address?.tax_vat_no || ""}</span> <br />
                        <span><b>Importers code:-</b></span>{freight.company_address?.postal_code || ""}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  border: "1px solid #1b2245",
                  padding: "10px 20px",
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        background: "#1b2245",
                        textAlign: "center",
                        color: "white",
                        padding: "5px 0px",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      SUPPLIER SHIPMENT INVOICE
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        borderRight: "2px solid #1a2142",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    >
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ fontSize: 13, padding: "5px" }}>
                              <strong>
                                {getdata?.client_name}
                                <br />
                                {getdata?.address_1}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          background: "#1b2245",
                          width: "100%",
                          color: "white",
                          fontSize: 13,
                          textAlign: "center",
                          padding: 2,
                        }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ fontSize: 13 }}>
                              Shipment Details ISO Commodity
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "0px 10px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset" }}>
                                  <strong>Waybill</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset" }}>
                                  {getdata?.waybill || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Carrier</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.carrier || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Vessel</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.vessel || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>ETD</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {shipmentDate("ETD")}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>ATD</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {shipmentDate("ATD")}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Chargeable</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {freight.chargable_rate || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Status</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.status || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Origin Agent</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.origin_agent || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Freight</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.freight || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Final Base Currency</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5, fontWeight: "bold" }}>
                                  {freight.final_base_currency || ""}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td
                      style={{
                        width: "50%",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    >
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: 170, padding: "0px 10px 0px 10px", fontSize: 13 }}>
                              <strong>Invoice For</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingRight: 10, textAlign: "right" }}>
                              <select
                                name="invoice_for_country"
                                value={freight.invoice_for_country || ""}
                                disabled
                                style={{ width: "50%", padding: "2px", border: "1px solid #ccc" }}
                              >
                                <option value="">Select Country</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 170, padding: "5px 10px 0px 10px", fontSize: 13 }}>
                              <strong>Invoice No.</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              <input
                                type="text"
                                name="customer_invoice_no"
                                value={freight.customer_invoice_no || ""}
                                disabled
                                style={{ width: "50%", padding: "2px", border: "1px solid #ccc" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 170, padding: "5px 10px 0px 10px", fontSize: 13 }}>
                              <strong>Reference</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {freight.reference_no || ""}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 170, padding: "5px 10px 0px 10px", fontSize: 13 }}>
                              <strong>Quote Date</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {shipmentDate("created_at", "date")}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 170, padding: "5px 10px 0px 10px", fontSize: 13 }}>
                              <strong>Due Date</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              <input
                                type="date"
                                name="due_date"
                                value={freight.due_date || ""}
                                disabled
                                style={{ width: "50%", padding: "2px", border: "1px solid #ccc" }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          background: "#1b2245",
                          width: "100%",
                          color: "white",
                          fontSize: 13,
                          textAlign: "center",
                          margin: "5px 0px",
                          padding: 2,
                        }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ fontSize: 13 }}>
                              Shipment Details
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: "0px 10px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Port Of Loading</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.port_of_loading || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Port Of Discharge</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.port_of_discharge || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Destination Agent</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.destination_agent || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Container</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.container || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Load</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.load || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Release Type</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.release_type || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Origin Country Name</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.origin_country_name || ""}
                                </p>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  <strong>Destination Country Name</strong>
                                </p>
                                <p style={{ fontSize: 13, marginBottom: "unset", marginTop: 5 }}>
                                  {getdata?.destination_country_name || ""}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  background: "#1b2245",
                  width: "100%",
                  color: "white",
                  fontSize: 13,
                  textAlign: "center",
                  margin: "5px 0px",
                  padding: 2,
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ fontSize: 13 }}>SHIPMENT ESTIMATE</td>
                  </tr>
                </tbody>
              </table>

              <div className="table-responsive">
                <table className="cost-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>QTY</th>
                      <th>Currency</th>
                      <th>Cost</th>
                      <th>Unit type</th>
                      <th>Unit</th>
                      <th>T/ Cost</th>
                      <th>GP%</th>
                      <th>Sales/ P</th>
                      <th>ROE</th>
                      <th>Final Amount</th>
                      <th>VAT Type </th>
                      <th>Disc % </th>
                      <th>Discount </th>
                      <th>Exclusive </th>
                      <th>VAT </th>
                      <th>VAT Incl </th>
                      <th colSpan={2}>Comment </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderRowsForSection(originRowsData, originRows, originDropdown, "Origin Charges", totalChageswithOutExchange, totalChangeRoeOrigin)}
                    {renderRowsForSection(freightRowsData, freightRows, freightDropdown, "Freight Charges", totalChageswithOutExchangeinsurance, totalChangeRoeOriginaftercalcuinsurance)}
                    {renderRowsForSection(transitRowsData, transitRows, transitDropdown, "Transit Charges", totalChageswithOuTransit, transitRoe)}
                    {renderRowsForSection(destinationRowsData, destinationRows, destinationDropdown, "Destination Charges", totalChaDestinationTransit, totalChaDestinationTransitRoe)}
                    {renderRowsForSection(adminRowsData, adminRows, adminDropdown, "Admin Charges", totaAdminransit, totalAdminnsitRoe)}
                    {renderRowsForSection(customsRowsData, customsRows, customsDropdown, "Customs Charges", customsTotalTCost, customsTotalFinalAmt)}

                    <tr>
                      <td colSpan={6}>
                        <strong> Total - Charge</strong>
                      </td>
                      <td colSpan={4}> {formatMoney(sumofall)} </td>
                      <td> {formatMoney(sumofRoe)} </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> {formatMoney(totalVatInclusive)} </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
