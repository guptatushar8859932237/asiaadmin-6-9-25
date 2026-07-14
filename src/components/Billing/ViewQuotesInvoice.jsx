import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../Assests/logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { exportEstimatePdf } from "../../utils/pdfExportUtils";
import { FaDownload } from "react-icons/fa";

const cleanParseFloat = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  const cleaned = String(val).replace(/,/g, '').replace(/%/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

const formatValue = (val, dec = 2, isPercent = false) => {
  if (val === null || val === undefined || val === "") {
    return isPercent ? "0.00 %" : "0.00";
  }
  const cleanVal = String(val).replace(/,/g, '').replace(/%/g, '').trim();
  const num = parseFloat(cleanVal);
  if (isNaN(num)) {
    return val;
  }
  const formatted = num.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });
  return isPercent ? `${formatted} %` : formatted;
};

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

// ── Terms & Conditions content ──────────────────────────────────────────────
// Kept as plain data (not JSX) on purpose: today it's a hard-coded default,
// but the shape below (intro string + numbered {label, text} items) is exactly
// what an admin-configurable / API-driven terms list would look like too.
// To make this dynamic later: fetch this same shape from the backend and feed
// it into the `termsAndConditions` state below (see the TODO near its useState)
// — no changes needed to the rendering or PDF logic.
const DEFAULT_TERMS_AND_CONDITIONS = {
  intro:
    "All business is undertaken subject to our General Trading Conditions, a copy of which is available on request. (E&OE) Errors and Omissions Excepted.",
  items: [
    {
      label: "Insurance",
      text: "All goods are shipped at the customer's risk. If insurance is required, it must be arranged and paid for by the customer.",
    },
    {
      label: "Weight and Dimensions",
      text: "Changes in the actual weight, dimensions of the goods from the initial quote may affect the final pricing at billing. The customer will be notified of any price adjustments.",
    },
    {
      label: "Misdeclaration of Goods",
      text: "Any misdeclaration of goods will result in additional charges and potential legal consequences. Misdeclaration may include cargo description, costs, hazardous e.t.c.",
    },
    {
      label: "Customs Duties & VAT",
      text: "The customer is responsible for all customs duties and VAT applicable to their shipment.",
    },
    {
      label: "Customs Stops & Inspections",
      text: "Any costs incurred due to customs stops and inspections will be billed to the customer.",
    },
    {
      label: "Late Collection & Storage Fees",
      text: "Goods not collected within the agreed timeframe will incur storage fees. These fees are payable by the customer.",
    },
    {
      label: "Late Payment of Invoices",
      text: "Late payment of invoices will attract interest charges as per the company's policy.",
    },
    {
      label: "Abandoned Cargo",
      text: "Cargo not collected within 28 days will be regarded abandoned, the customer will be liable for any disposal costs and associated fees.",
    },
  ],
};

export default function ViewQuotesInvoice({ hiddenPrintItem, onPrintComplete }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const [freight, setFreight] = useState({
    reference_no: "",
    customer_invoice_no: "",
    invoice_for_country: "",
    due_date: "",
    final_base_currency: "Select",
    chargable_rate: "",
    company_id: "",
    company_address: null,
    bank_details: null,
    created_at: "",
  });

  const [getdata, setGetdata] = useState({});

  // TODO (future): replace this default with data fetched from the backend
  // (e.g. an admin-managed "terms & conditions" endpoint) inside fetchDropdowns
  // or its own effect — just call setTermsAndConditions with the same
  // { intro, items: [{ label, text }] } shape and everything below keeps working.
  const [termsAndConditions, setTermsAndConditions] = useState(DEFAULT_TERMS_AND_CONDITIONS);

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
  const isInvoice = location.state?.isInvoice || !!viewItem?.quote_invoice_id || !!hiddenPrintItem?.isInvoice;
  const quoteInvoiceId = viewItem?.freight_quote_estimate_id || viewItem?.quote_invoice_id || (typeof viewItem === "object" ? null : viewItem);
  const freightId = viewItem?.freight_id;

  useEffect(() => {
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (quoteInvoiceId) {
      fetchInvoiceData();
    }
  }, [quoteInvoiceId, freightId]);

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
      const apiEndpoint = isInvoice ? "GetNewFreightQuoteInvoiceById" : "GetFreightQuoteEstimateById";
      const payload = isInvoice
        ? {
          quote_invoice_id: parseInt(quoteInvoiceId),
          freight_id: (freightId && parseInt(freightId) !== 0) ? parseInt(freightId) : null
        }
        : {
          freight_quote_estimate_id: parseInt(quoteInvoiceId),
          freight_id: (freightId && parseInt(freightId) !== 0) ? parseInt(freightId) : null
        };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}${apiEndpoint}`,
        payload
      );
      if (response.data && response.data.success && response.data.data) {
        const rawData = response.data.data;
        const invoiceData = Array.isArray(rawData)
          ? (rawData.find((item) => String(item.id || item.freight_quote_estimate_id || item.quote_invoice_id) === String(quoteInvoiceId)) || rawData[0])
          : rawData;
        if (invoiceData) {
          setFreight({
            reference_no: invoiceData.reference_no || "",
            customer_invoice_no: invoiceData.customer_invoice_no || "",
            invoice_for_country: invoiceData.invoice_for_country || "",
            due_date: invoiceData.due_date || invoiceData.date ? (invoiceData.due_date || invoiceData.date).split("T")[0] : "",
            final_base_currency: invoiceData.final_base_currency || "Select",
            chargable_rate: invoiceData.chargeable || "",
            company_id: invoiceData.company_id || "",
            company_address: invoiceData.company_address || null,
            bank_details: invoiceData.bank_details || null,
            created_at: invoiceData.created_at || "",
          });

          if (invoiceData.freight_id && parseInt(invoiceData.freight_id) !== 0) {
            apidataget(invoiceData.freight_id, invoiceData);
          } else {
            setGetdata(invoiceData);
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
              cost: c.cost !== null && c.cost !== undefined ? formatValue(c.cost, 2) : "",
              unitType: c.unit_type || "Select",
              gp_percent: c.gp_percent !== null && c.gp_percent !== undefined ? c.gp_percent : "",
              sales_price: c.sales_price !== null && c.sales_price !== undefined ? formatValue(c.sales_price, 2) : "",
              roe: c.roe !== null && c.roe !== undefined ? formatValue(c.roe, 4) : "",
              vatTyp: c.vat_type !== null && c.vat_type !== undefined ? getVatLabel(c.vat_type) : "",
              vat: c.vat !== null && c.vat !== undefined ? formatValue(c.vat, 2) : "",
              discPercent: c.disc_percent !== null && c.disc_percent !== undefined ? formatValue(c.disc_percent, 2, true) : "",
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
      console.error("Error loading freight quote invoice details:", error);
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

  const apidataget = async (freightIdVal, initialInvoiceData = null) => {
    const payload = {
      freight_id: freightIdVal,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}freight-list-byId`,
        payload
      );
      if (response.data && response.data.data && response.data.data[0]) {
        const freightObj = { ...response.data.data[0] };
        setGetdata(freightObj);
      } else {
        setGetdata(initialInvoiceData || {});
      }
    } catch (error) {
      console.error("Error loading freight details:", error);
      setGetdata(initialInvoiceData || {});
    }
  };

  const handleclicknav = () => {
    navigate(-1);
  };

  // ── PDF helpers (same pattern as Viewsupplierinvoice.jsx) ──────────────────

  const loadImageAsDataUrl = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Could not load logo for PDF:", err);
      return null;
    }
  };

  // Bold label left, plain value right-aligned within width
  const drawLabelValueRow = (doc, x, y, width, label, value) => {
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    const valStr = String(value ?? "");
    const labelStr = String(label ?? "");
    doc.setFont("helvetica", "normal");
    const valW = valStr ? doc.getTextWidth(valStr) : 0;
    const maxLabelW = width - valW - 3;
    doc.setFont("helvetica", "bold");
    const truncated = doc.splitTextToSize(labelStr, maxLabelW > 0 ? maxLabelW : width)[0] ?? "";
    doc.text(truncated, x, y);
    doc.setFont("helvetica", "normal");
    if (valStr) doc.text(valStr, x + width, y, { align: "right" });
  };

  // Navy filled bar with centred white bold text
  const drawSectionBar = (doc, x, y, width, height, text) => {
    doc.setFillColor(27, 34, 69);
    doc.rect(x, y, width, height, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(text, x + width / 2, y + height / 2 + 1.2, { align: "center" });
    doc.setTextColor(20, 20, 20);
  };

  // ── PDF export (jsPDF + autoTable, A4 landscape) ───────────────────────────

  const downloadPDF1 = async () => {
    try {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();   // 297 mm
      const pageHeight = doc.internal.pageSize.getHeight();  // 210 mm
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const colSplitX = margin + contentWidth / 2;

      // ── 1. LOGO + COMPANY INFO ───────────────────────────────────────────────
      let cursorY = margin;

      const logoDataUrl = await loadImageAsDataUrl(logo);
      if (logoDataUrl) {
        try {
          const imgFmt = (logoDataUrl.split(";")[0].split("/")[1] || "PNG").toUpperCase();
          doc.addImage(logoDataUrl, imgFmt, margin, cursorY, 38, 17);
        } catch (err) {
          console.error("Could not embed logo:", err);
        }
      }
      const companyX = margin + 150;
      const addr = freight.company_address;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(20, 20, 20);
      doc.text("Asia Direct - Africa", companyX, cursorY + 5);
      doc.setDrawColor(200, 40, 40);
      doc.setLineWidth(0.6);
      doc.line(companyX, cursorY + 6.5, companyX + 38, cursorY + 6.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      let infoY = cursorY + 11;
      const companyLines = [
        addr?.company_name || "",
        addr?.address_line || "",
      ].filter(Boolean);
      companyLines.forEach((line) => { doc.text(line, companyX, infoY); infoY += 3.6; });

      doc.setFont("helvetica", "bold");
      doc.text("Registration No.:- ", companyX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(addr?.company_registration_no || "", companyX + 28, infoY);
      infoY += 3.6;
      doc.setFont("helvetica", "bold");
      doc.text("VAT No.:- ", companyX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(addr?.tax_vat_no || "", companyX + 14, infoY);
      infoY += 3.6;
      doc.setFont("helvetica", "bold");
      doc.text("Importers code:- ", companyX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(addr?.postal_code || "", companyX + 24, infoY);

      cursorY = margin + 28;

      // ── 2. "FREIGHT INVOICE" / "FREIGHT ESTIMATE" title bar ─────────────────
      const titleText = isInvoice ? "FREIGHT INVOICE" : "FREIGHT ESTIMATE";
      doc.setDrawColor(27, 34, 69);
      doc.setLineWidth(0.5);
      doc.rect(margin, cursorY, contentWidth, 7);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(titleText, pageWidth / 2, cursorY + 4.8, { align: "center" });
      cursorY += 7;

      // ── 3. TWO-COLUMN INFO BOX ───────────────────────────────────────────────
      const rowH = 4.5;
      const barH = 5.5;
      const pad = 3;
      const lPad = 3;
      const lW = contentWidth / 2 - lPad * 2;
      const rW = contentWidth / 2 - lPad * 2;
      const drawRow = (doc, x, rowTop, width, label, value) => {
        const baseline = rowTop + rowH * 0.68;
        drawLabelValueRow(doc, x, baseline, width, label, value);
      };

      const boxTop = cursorY;

      // ── LEFT COLUMN: client / ISO commodity / rate of exchange ─────────────
      let ly = boxTop + pad;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text(String(getdata?.client_name || ""), margin + lPad, ly + 2.5);
      ly += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(String(getdata?.address_1 || ""), margin + lPad, ly + 2.5, { maxWidth: lW });
      ly += 5;

      drawSectionBar(doc, margin, ly, contentWidth / 2, barH, "Shipment Details ISO Commodity");
      ly += barH;

      const leftFields = [
        ["No. of Packages", getdata?.no_of_packages || ""],
        ["Package Type", getdata?.package_type || ""],
        ["Weight", getdata?.weight || ""],
        ["M3", getdata?.m3 || ""],
        ["Volumetric (kgs)", getdata?.volumetric_weight || ""],
        ["Chargeable", freight.chargable_rate || ""],
        ["Commodity", getdata?.commodity || ""],
        ["Hazardous", getdata?.hazardous || ""],
        ["Incoterm", getdata?.incoterm || ""],
        ["Freight", getdata?.freight || ""],
      ];
      leftFields.forEach(([label, value]) => {
        drawRow(doc, margin + lPad, ly, lW, label, value);
        ly += rowH;
      });

      drawSectionBar(doc, margin, ly, contentWidth / 2, barH, "Rate of Exchange");
      ly += barH;

      drawRow(doc, margin + lPad, ly, lW, "Final Base Currency", freight.final_base_currency || "");
      ly += rowH;
      ly += pad;

      // ── RIGHT COLUMN: invoice info / shipment details ────────────────────────
      let ry = boxTop + pad - 0.7;
      const rightColX = colSplitX + lPad;

      const invoiceFields = [
        ["Invoice For", freight.invoice_for_country || ""],
        ["Invoice No.", freight.customer_invoice_no || ""],
        ["Reference", freight.reference_no || ""],
        ["Quote Date", shipmentDate("quote_invoice_date", "date")],
      ];
      invoiceFields.forEach(([label, value]) => {
        drawRow(doc, rightColX, ry, rW, label, value);
        ry += rowH;
      });

      drawSectionBar(doc, colSplitX, ry, contentWidth / 2, barH, "Shipment Details");
      ry += barH + 2;

      const shipmentFields = [
        ["Country of Origin", getdata?.country_of_origin || ""],
        ["Place of Receipt", getdata?.place_of_receipt || ""],
        ["Port of Loading", getdata?.port_of_loading || ""],
        ["Port of Discharge", getdata?.port_of_discharge || ""],
        ["Place of Delivery", getdata?.place_of_delivery || ""],
        ["Freight Collect Accepted", getdata?.freight_collect_accepted || ""],
        ["Date", shipmentDate("created_at")],
      ];
      shipmentFields.forEach(([label, value]) => {
        drawRow(doc, rightColX, ry, rW, label, value);
        ry += rowH;
      });
      ry += pad;

      // ── BORDERS drawn after content so heights are exact ─────────────────────
      const leftBoxH = ly - boxTop;
      const rightBoxH = ry - boxTop;
      const outerBoxH = Math.max(leftBoxH, rightBoxH);

      doc.setDrawColor(27, 34, 69);
      doc.setLineWidth(0.5);
      doc.rect(margin, boxTop, contentWidth, outerBoxH);
      doc.line(colSplitX, boxTop, colSplitX, boxTop + outerBoxH);
      if (leftBoxH < outerBoxH)
        doc.line(margin, boxTop + leftBoxH, colSplitX, boxTop + leftBoxH);
      if (rightBoxH < outerBoxH)
        doc.line(colSplitX, boxTop + rightBoxH, margin + contentWidth, boxTop + rightBoxH);

      cursorY = boxTop + outerBoxH + 4;

      // ── 4. "SHIPMENT ESTIMATE" label ────────────────────────────────────────
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(20, 20, 20);
      doc.text("SHIPMENT ESTIMATE", margin, cursorY);
      cursorY += 3;

      // ── 5. CHARGES TABLE (autoTable) ──────────────────────────────────────────

      const getPercentageOnly = (value) => {
        if (!value) return "";
        if (!isNaN(value) && !isNaN(parseFloat(value)))
          return parseFloat(value).toFixed(2);
        const match = String(value).match(/(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]).toFixed(2) : "";
      };

      const formatValuePDF = (val) => {
        const num = parseFloat(val);
        if (isNaN(num) || num === 0) return "-";
        return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };

      const sectionStyle = { fillColor: [240, 242, 245], fontStyle: "bold", halign: "left", textColor: [20, 20, 20] };
      const totalStyle = { fillColor: [250, 250, 250], fontStyle: "bold", textColor: [20, 20, 20] };
      const styledCell = (content, styles) => ({ content: content ?? "", styles });

      const buildSectionRows = (title, rowsData, totals) => {
        if (!rowsData || rowsData.length === 0) return [];
        const rows = [];

        // Section header row
        rows.push([{ content: title, colSpan: 17, styles: sectionStyle }]);

        rowsData.forEach(({ row, calc }) => {
          const vatPctStr = formatValue(getVatPercent(row.vatTyp), 2, true);
          const vatDisplay = (row.vatTyp === "Manual VAT" || row.vatTyp === "Manual VAT (Capital Goods)")
            ? formatValue(row.vat, 2)
            : formatValue(calc.vat, 2);

          rows.push([
            row.description || "",
            row.qty !== "" ? String(row.qty) : "",
            row.currency && row.currency !== "Select" ? row.currency : "",
            formatValue(row.cost, 2),
            row.unitType && row.unitType !== "Select" ? row.unitType : "",
            formatValue(calc.unit, 2),
            formatValue(calc.tCost, 2),
            row.gp_percent !== "" ? String(row.gp_percent) : "",
            formatValue(calc.salesPrice, 2),
            formatValue(row.roe, 4),
            formatValue(calc.finalAmt, 2),
            vatPctStr,
            formatValue(row.discPercent, 2, true),
            formatValue(calc.disc, 2),
            formatValue(calc.exclusive, 2),
            vatDisplay,
            formatValue(calc.inclusive, 2),
          ]);

          // Comment row beneath the item row (only when a comment exists)
          if (row.comment && String(row.comment).trim() !== "") {
            rows.push([
              {
                content: `Comment: ${row.comment}`,
                colSpan: 17,
                styles: {
                  fontStyle: "italic",
                  textColor: [90, 90, 90],
                  cellWidth: "auto",
                  overflow: "linebreak",
                  halign: "left",
                },
              },
            ]);
          }
        });

        // Section total row
        rows.push([
          { content: `Total - ${title}`, colSpan: 6, styles: { ...totalStyle, halign: "left" } },
          styledCell(formatValue(totals.tCost, 2), { ...totalStyle, halign: "right" }),
          styledCell("", totalStyle),
          styledCell("", totalStyle),
          styledCell(formatValue(totals.finalAmt, 2), { ...totalStyle, halign: "right" }),
          styledCell("", totalStyle),
          styledCell("", totalStyle),
          styledCell("", totalStyle),
          styledCell("", totalStyle),
          styledCell(formatValue(totals.disc, 2), { ...totalStyle, halign: "right" }),
          styledCell(formatValue(totals.exclusive, 2), { ...totalStyle, halign: "right" }),
          styledCell(formatValue(totals.vat, 2), { ...totalStyle, halign: "right" }),
        ]);

        return rows;
      };

      const sumField = (rowsData, key) => rowsData.reduce((s, i) => s + i.calc[key], 0);

      const tableBody = [
        ...buildSectionRows("Origin Charges", originRowsData, { tCost: totalChageswithOutExchange, finalAmt: totalChangeRoeOrigin, disc: sumField(originRowsData, "disc"), exclusive: sumField(originRowsData, "exclusive"), vat: sumField(originRowsData, "vat") }),
        ...buildSectionRows("Freight Charges", freightRowsData, { tCost: totalChageswithOutExchangeinsurance, finalAmt: totalChangeRoeOriginaftercalcuinsurance, disc: sumField(freightRowsData, "disc"), exclusive: sumField(freightRowsData, "exclusive"), vat: sumField(freightRowsData, "vat") }),
        ...buildSectionRows("Transit Charges", transitRowsData, { tCost: totalChageswithOuTransit, finalAmt: transitRoe, disc: sumField(transitRowsData, "disc"), exclusive: sumField(transitRowsData, "exclusive"), vat: sumField(transitRowsData, "vat") }),
        ...buildSectionRows("Destination Charges", destinationRowsData, { tCost: totalChaDestinationTransit, finalAmt: totalChaDestinationTransitRoe, disc: sumField(destinationRowsData, "disc"), exclusive: sumField(destinationRowsData, "exclusive"), vat: sumField(destinationRowsData, "vat") }),
        ...buildSectionRows("Admin Charges", adminRowsData, { tCost: totaAdminransit, finalAmt: totalAdminnsitRoe, disc: sumField(adminRowsData, "disc"), exclusive: sumField(adminRowsData, "exclusive"), vat: sumField(adminRowsData, "vat") }),
        ...buildSectionRows("Customs Charges", customsRowsData, { tCost: customsTotalTCost, finalAmt: customsTotalFinalAmt, disc: sumField(customsRowsData, "disc"), exclusive: sumField(customsRowsData, "exclusive"), vat: sumField(customsRowsData, "vat") }),

        // Grand total
        [
          { content: "GRAND TOTAL", colSpan: 10, styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "left", textColor: [20, 20, 20] } },
          { content: formatValue(sumofRoe, 2), styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "right", textColor: [20, 20, 20] } },
          { content: "", styles: { fillColor: [226, 232, 240] } },
          { content: "", styles: { fillColor: [226, 232, 240] } },
          { content: formatValue([...originRowsData, ...freightRowsData, ...transitRowsData, ...destinationRowsData, ...adminRowsData, ...customsRowsData].reduce((s, i) => s + i.calc.disc, 0), 2), styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "right" } },
          { content: formatValue([...originRowsData, ...freightRowsData, ...transitRowsData, ...destinationRowsData, ...adminRowsData, ...customsRowsData].reduce((s, i) => s + i.calc.exclusive, 0), 2), styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "right" } },
          { content: formatValue([...originRowsData, ...freightRowsData, ...transitRowsData, ...destinationRowsData, ...adminRowsData, ...customsRowsData].reduce((s, i) => s + i.calc.vat, 0), 2), styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "right" } },
          { content: formatValue(totalVatInclusive, 2), styles: { fillColor: [226, 232, 240], fontStyle: "bold", halign: "right", textColor: [20, 20, 20] } },
        ],
      ];

      autoTable(doc, {
        startY: cursorY,
        margin: { left: margin, right: margin, top: margin, bottom: 14 },
        head: [[
          "Description", "QTY", "Currency", "Cost", "Unit Type", "Unit",
          "T/ Cost", "GP%", "Sales/ P", "ROE", "Total",
          "Vat %", "Disc %", "Discount", "Exclusive", "VAT", "Total",
        ]],
        body: tableBody,
        theme: "grid",
        styles: {
          fontSize: 7.5,
          cellPadding: 1.6,
          valign: "middle",
          lineColor: [28, 28, 28],
          lineWidth: 0.1,
          textColor: [20, 20, 20],
        },
        headStyles: {
          fillColor: [27, 34, 69],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "left",
          lineColor: [255, 255, 255],
        },
        rowPageBreak: "avoid",
        showHead: "everyPage",
      });

      // ── 6. TERMS & CONDITIONS + BANKING DETAILS (dynamic, page-break aware) ──
      // Visual design follows the bordered header-bar + content-box pattern used
      // elsewhere in this document (e.g. "SHIPMENT ESTIMATE"). The box's height is
      // measured from its actual content, and the whole box — like Banking
      // Details below it — moves to a fresh page as a unit whenever it doesn't
      // fit in the remaining space, so longer/variable content (e.g. once this
      // is fetched dynamically) never gets cut off or overlaps the footer.
      const bottomLimit = pageHeight - 15;
      const boxWidth = pageWidth - margin * 2;
      const innerWidth = boxWidth - 6; // 3mm padding each side
      const lineHeight = 3.6;

      const ensureSpace = (y, neededHeight) => {
        if (y + neededHeight > bottomLimit) {
          doc.addPage();
          return margin;
        }
        return y;
      };

      // Lays out "<boldLead> <text>" as one paragraph: the bold lead starts the
      // first line, the rest of the text wraps normally beneath it.
      const layoutBoldLeadParagraph = (boldLead, text, maxWidth) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        const leadWidth = doc.getTextWidth(`${boldLead} `);
        doc.setFont("helvetica", "normal");
        const words = String(text ?? "").split(" ");
        let firstLine = "";
        let i = 0;
        const firstLineMaxWidth = maxWidth - leadWidth;
        while (i < words.length) {
          const candidate = firstLine ? `${firstLine} ${words[i]}` : words[i];
          if (!firstLine || doc.getTextWidth(candidate) <= firstLineMaxWidth) {
            firstLine = candidate;
            i++;
          } else break;
        }
        const restLines = i < words.length ? doc.splitTextToSize(words.slice(i).join(" "), maxWidth) : [];
        return { leadWidth, firstLine, restLines, height: (1 + restLines.length) * lineHeight };
      };

      // ── Measure content first so the box can be drawn at its exact height ──
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const introWrapped = doc.splitTextToSize(termsAndConditions.intro, innerWidth);
      const introHeight = introWrapped.length * lineHeight;

      const itemLayouts = termsAndConditions.items.map((item, index) => ({
        boldLead: `${index + 1}. ${item.label}:`,
        layout: layoutBoldLeadParagraph(`${index + 1}. ${item.label}:`, item.text, innerWidth),
      }));
      const itemsHeight = itemLayouts.reduce((sum, { layout }) => sum + layout.height + 1.5, 0);

      const headerH = 7;
      const topPad = 4;
      const bottomPad = 3;
      const contentHeight = topPad + introHeight + 2 + itemsHeight + bottomPad;
      const boxHeight = headerH + contentHeight;

      let termsY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 8 : cursorY + 20;
      termsY = ensureSpace(termsY, boxHeight);

      // ── Header bar (bordered, matches the on-screen "TERMS & CONDITIONS" label) ──
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.rect(margin, termsY, boxWidth, headerH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text("TERMS & CONDITIONS", margin + 3, termsY + headerH / 2 + 1.3);

      // ── Content box ──
      doc.rect(margin, termsY + headerH, boxWidth, contentHeight);

      let ty = termsY + headerH + topPad;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(60, 60, 60);
      introWrapped.forEach((line) => {
        doc.text(line, margin + 3, ty);
        ty += lineHeight;
      });
      ty += 2;

      itemLayouts.forEach(({ boldLead, layout }) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(20, 20, 20);
        doc.text(`${boldLead} `, margin + 3, ty);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        doc.text(layout.firstLine, margin + 3 + layout.leadWidth, ty);
        let innerTy = ty + lineHeight;
        layout.restLines.forEach((line) => {
          doc.text(line, margin + 3, innerTy);
          innerTy += lineHeight;
        });
        ty += layout.height + 1.5;
      });

      // ── Banking Details — kept as one block; moves to a new page if it won't fit ──
      let bankingStartY = termsY + boxHeight + 10;
      const bankingFields = [
        ["Account Name", freight?.bank_details?.account_name || ""],
        ["Bank Name", freight?.bank_details?.bank_name || ""],
        ["Branch Code", freight?.bank_details?.branch_code || ""],
        ["Account Number", freight?.bank_details?.account_no || ""],
        ["Swift Code", freight?.bank_details?.swift_code || ""],
      ];

      const noteText = freight?.bank_details?.note || "";
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7);
      const noteLines = noteText ? doc.splitTextToSize(noteText, 80) : [];

      const bankingBlockH = 5 + bankingFields.length * 4.2 + 2 + (noteLines.length > 0 ? (noteLines.length * 3.5 + 2) : 0);

      bankingStartY = ensureSpace(bankingStartY, bankingBlockH);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text("Banking Details", margin, bankingStartY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);
      bankingFields.forEach(([label, value], index) => {

        const fieldY = bankingStartY + 5 + index * 4.2;
        doc.setFont("helvetica", "bold");

        doc.text(`${label}:`, margin + 2, fieldY);
        doc.setFont("helvetica", "normal");

        if (value) {
          doc.text(String(value), margin + 32, fieldY);
        }

      });

      if (noteLines.length > 0) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        let noteY = bankingStartY + 5 + bankingFields.length * 4.2 + 2;
        noteLines.forEach((line) => {
          doc.text(line, margin + 2, noteY);
          noteY += 3.5;
        });
      }

      // ── Page numbers on every page (added after pagination is finalized) ──
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: "right" });
      }

      doc.save(isInvoice ? "FreightInvoice.pdf" : "FreightQuoteEstimate.pdf");
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
    if (unitType === "L/S") return 1;
    if (unitType === "PCS") return cleanParseFloat(getdata?.no_of_packages) || 1;
    if (unitType === "CBM") return cleanParseFloat(getdata?.m3) || 1;
    if (unitType === "W/M") {
      const rate = cleanParseFloat(freight.chargable_rate);
      return rate;
    }
    return 1;
  };

  const calculateRowData = (row) => {
    const qty = cleanParseFloat(row.qty) || 0;
    const cost = cleanParseFloat(row.cost) || 0;
    const unit = resolveRowUnit(row.unitType);
    const tCost = (row.unitType && row.unitType !== "Select") ? cost * unit * qty : 0;
    const gpPercent = cleanParseFloat(row.gp_percent) || 0;
    let salesPrice = tCost;
    if (gpPercent > 0 && gpPercent < 100) {
      salesPrice = tCost / (1 - gpPercent / 100);
    }
    const roe = cleanParseFloat(row.roe) || 0;
    const finalAmt = salesPrice * roe;

    const discPercent = cleanParseFloat(row.discPercent) || 0;
    const vatPercent = getVatPercent(row.vatTyp);

    const disc = (finalAmt * discPercent) / 100;
    const exclusive = finalAmt - disc;
    let vat = (exclusive * vatPercent) / 100;
    if (row.vatTyp === "Manual VAT" || row.vatTyp === "Manual VAT (Capital Goods)") {
      vat = cleanParseFloat(row.vat) || 0;
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

  const renderRowsForSection = (rowsData, dropdownOptions, sectionTitle, totalTCost, totalFinalAmt) => {
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
                value={formatValue(row.cost, 2)}
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
                <option value="L/S">L/S</option>
                <option value="W/M">W/M</option>
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
                value={formatValue(calc.unit, 2)}
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
                value={formatValue(calc.tCost)}
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
                value={formatValue(calc.salesPrice)}
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
                value={formatValue(row.roe, 4)}
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
                value={formatValue(calc.finalAmt, 2)}
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
                placeholder="0.00%"
                disabled
                className="supplier_form"
                value={formatValue(row.discPercent, 2, true)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatValue(calc.disc)}
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatValue(calc.exclusive)}
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
                    ? formatValue(row.vat, 2)
                    : formatValue(calc.vat)
                }
                className="supplier_form"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                disabled
                value={formatValue(calc.inclusive)}
                className="supplier_form"
              />
            </td>
            <td colSpan={2}>
              <input
                type="text"
                placeholder="Comment"
                disabled
                value={row.comment || ""}
                className="supplier_form"
              />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={6}>
            <strong>Total - {sectionTitle}</strong>
          </td>
          <td colSpan={4}> {formatValue(totalTCost)} </td>
          <td> {formatValue(totalFinalAmt, 2)} </td>
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
                <h4 className="freight_hd mb-0">{isInvoice ? "View Freight Invoice" : "View Freight Quote Invoice"}</h4>
              </div>
              <div className="d-flex gap-3 align-items-center blueText">
                <FaDownload onClick={downloadPDF1} style={{ cursor: "pointer" }} />
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
                      {isInvoice ? "FREIGHT INVOICE" : "FREIGHT ESTIMATE"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  border: "1px solid #1b2245",
                  borderTop: "unset",
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "50%",
                        borderRight: "1px solid #1a2142",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                fontSize: 13,
                                padding: "5px 10px"
                              }}
                            >
                              <strong>
                                {getdata?.client_name || "-"}
                                <br />
                                {getdata?.address_1 || "-"}
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
                            <td style={{ padding: "10px" }}>
                              <div className="d-flex justify-content-between my-1">
                                <strong>No. of Packages</strong>
                                <span>{getdata?.no_of_packages || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Package Type</strong>
                                <span>{getdata?.package_type || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Weight</strong>
                                <span>{getdata?.weight || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>M3</strong>
                                <span>{getdata?.m3 || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Volumetric (kgs)</strong>
                                <span>{getdata?.volumetric_weight || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Chargeable</strong>
                                <span>{freight.chargable_rate || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Commodity</strong>
                                <span>{getdata?.commodity || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Hazardous</strong>
                                <span>{getdata?.hazardous || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Incoterm</strong>
                                <span>{getdata?.incoterm || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Freight</strong>
                                <span>{getdata?.freight || "-"}</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#1b2245",
                                color: "white",
                                fontSize: 13,
                                textAlign: "center",
                                padding: 2,
                              }}
                              colSpan={2}
                            >
                              Rate of Exchange
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "10px" }} colSpan={2}>
                              <div className="d-flex justify-content-between">
                                <strong>Final Base Currency</strong>
                                <span>{freight.final_base_currency || "-"}</span>
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
                            <td style={{
                              width: 170,
                              padding: "0px 10px 0px 10px",
                              fontSize: 13,
                            }}>
                              <strong>Invoice For</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingRight: 10, textAlign: "right" }}>
                              {freight.invoice_for_country || "-"}
                            </td>
                          </tr>
                          {/* <tr>
                            <td style={{
                              width: 170,
                              padding: "5px 10px 0px 10px",
                              fontSize: 13,
                            }}>
                              <strong>Due Date</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {shipmentDate("due_date") || "-"}
                            </td>
                          </tr> */}
                          <tr>
                            <td style={{
                              width: 170,
                              padding: "5px 10px 0px 10px",
                              fontSize: 13,
                            }}>
                              <strong>Invoice No.</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {freight.customer_invoice_no || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td style={{
                              width: 170,
                              padding: "5px 10px 0px 10px",
                              fontSize: 13,
                            }}>
                              <strong>Reference</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {freight.reference_no || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td style={{
                              width: 170,
                              padding: "5px 10px 0px 10px",
                              fontSize: 13,
                            }}>
                              <strong>Quote Date</strong>
                            </td>
                            <td style={{ fontSize: 13, paddingTop: "5px", paddingRight: 10, textAlign: "right" }}>
                              {shipmentDate("quote_invoice_date", "date") || "-"}
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
                              <div className="d-flex justify-content-between my-1">
                                <strong>Country of Origin</strong>
                                <span>{getdata?.country_of_origin || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Place of Receipt</strong>
                                <span>{getdata?.place_of_receipt || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Port of Loading</strong>
                                <span>{getdata?.port_of_loading || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Port of Discharge</strong>
                                <span>{getdata?.port_of_discharge || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Place of Delivery</strong>
                                <span>{getdata?.place_of_delivery || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Freight Collect Accepted</strong>
                                <span>{getdata?.freight_collect_accepted || "-"}</span>
                              </div>
                              <div className="d-flex justify-content-between my-1">
                                <strong>Date</strong>
                                <span>{shipmentDate("created_at") || "-"}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: 0, borderRight: "1px solid black" }}>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "33%",
                          borderBottom: "0px solid transparent",
                          height: 22,
                          borderTop: "unset",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            paddingLeft: 5,
                          }}
                        >
                          SHIPMENT ESTIMATE
                        </p>
                      </div>
                    </td>
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
                      <th>Total</th>
                      <th>Vat %</th>
                      <th>Disc %</th>
                      <th>Discount</th>
                      <th>Exclusive</th>
                      <th>VAT</th>
                      <th>Total</th>
                      <th colSpan={2}>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderRowsForSection(originRowsData, originDropdown, "Origin Charges")}
                    {renderRowsForSection(freightRowsData, freightDropdown, "Freight Charges")}
                    {renderRowsForSection(transitRowsData, transitDropdown, "Transit Charges")}
                    {renderRowsForSection(destinationRowsData, destinationDropdown, "Destination Charges")}
                    {renderRowsForSection(adminRowsData, adminDropdown, "Admin Charges")}
                    {renderRowsForSection(customsRowsData, customsDropdown, "Customs Charges")}

                    <tr>
                      <td colSpan={6}>
                        <strong>Total - Charge</strong>
                      </td>
                      <td colSpan={4}> {formatValue(sumofall)} </td>
                      <td> {formatValue(sumofRoe, 2)} </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> {formatValue(totalVatInclusive)} </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Terms & Conditions ── */}
              <table
                style={{ width: "100%", marginTop: 20, breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: 0 }}>
                      <div
                        style={{
                          border: "1px solid black",
                          width: "33%",
                          borderBottom: "0px solid transparent",
                          height: 22,
                          borderTop: "unset",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            paddingLeft: 5,
                          }}
                        >
                          TERMS & CONDITIONS
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", borderTop: "unset", padding: "10px 12px", verticalAlign: "top" }}>
                      <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>
                        <div style={{ marginBottom: 6 }}>{termsAndConditions.intro}</div>
                        {termsAndConditions.items.map((item, index) => (
                          <div key={index} style={{ marginBottom: 4 }}>
                            {index + 1}. <strong>{item.label}</strong>: {item.text}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* ── Banking Details — kept together; flows to the next printed page as a
                     whole block whenever there isn't enough room left on the current one ── */}
              <div style={{ marginTop: 16, breakInside: "avoid", pageBreakInside: "avoid" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Banking Details</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12, maxWidth: 700 }}>
                  {[
                    ["Account Name", freight?.bank_details?.account_name || ""],
                    ["Bank Name", freight?.bank_details?.bank_name || ""],
                    ["Branch Code", freight?.bank_details?.branch_code || ""],
                    ["Account Number", freight?.bank_details?.account_no || ""],
                    ["Swift Code", freight?.bank_details?.swift_code || ""],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ fontSize: 12, marginBottom: 4 }}>{label}</div>
                      <div style={{ borderBottom: "1px solid #ccc", height: 18, fontSize: 12, fontWeight: 500 }}>
                        {value || ""}
                      </div>
                    </div>
                  ))}
                </div>
                {freight?.bank_details?.note && (
                  <div style={{ marginTop: 12, fontSize: 12, color: "#666", whiteSpace: "pre-line", fontStyle: "italic", lineHeight: 1.5 }}>
                    {freight?.bank_details?.note}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
