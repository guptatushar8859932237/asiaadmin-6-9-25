const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isEmptyPdfCellText = (text) => {
  const normalized = (text ?? "").replace(/\s+/g, " ").trim();
  if (!normalized) return true;
  if (normalized === "Select" || normalized === "No Vat") return true;
  if (/^(L\/S|W\/M|RAND|USD|INR|EURO)$/i.test(normalized)) return false;
  if (/vat|%|standard rate|zero rate|customs|manual/i.test(normalized)) return false;
  if (/^0+(\.0+)?$/.test(normalized)) return true;
  const num = Number(normalized.replace(/,/g, ""));
  if (!Number.isNaN(num) && num === 0) return true;
  return false;
};

const isCategoryColumn = (headers, index) => {
  const label = (headers[index] ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  return label === "currency" || label === "unit type" || label === "vat type";
};

const getSelectDisplayValue = (select) => {
  if (!select) return "";

  const value = (select.value ?? "").trim();
  if (!value || value === "Select") return "";

  const matchedOption = Array.from(select.options).find(
    (option) => option.value === value,
  );
  const optionText = (matchedOption?.textContent ?? select.options[select.selectedIndex]?.textContent ?? "")
    .replace(/\s+/g, " ")
    .trim();

  if (!optionText || optionText === "Select" || optionText === "No Vat") {
    return value;
  }

  return optionText;
};

const getCellPlainText = (cell) => {
  if (!cell) return "";

  const replacement = cell.querySelector("[data-pdf-text-replacement]");
  if (replacement) {
    const replacementText = replacement.textContent.replace(/\s+/g, " ").trim();
    if (replacementText) return replacementText;
  }

  const selectValue = getSelectDisplayValue(cell.querySelector("select"));
  if (selectValue) return selectValue;

  const input = cell.querySelector("input, textarea");
  if (input) {
    return (input.value ?? "").replace(/\s+/g, " ").trim();
  }

  cell
    .querySelectorAll("[data-pdf-input-hidden], input, select, textarea, option")
    .forEach((el) => {
      el.remove();
    });

  const rawText = cell.innerText ?? cell.textContent;
  return rawText.replace(/\s+/g, " ").trim();
};

const isGrandTotalRow = (row) => /Total\s*-\s*Charge/i.test(row.textContent ?? "");
const isSectionTotalRow = (row) =>
  /Total\s*-/i.test(row.textContent ?? "") && !isGrandTotalRow(row);

const normalizeHeaderLabel = (label) => {
  const text = (label ?? "").replace(/\s+/g, " ").trim();
  if (!text || text === "Select") return "Currency";
  return text;
};

const rowHasValues = (values, headers = null) =>
  values.some((value, index) => {
    if (index === 0) return false;
    if (headers && isCategoryColumn(headers, index)) return false;
    return !isEmptyPdfCellText(value);
  });

const normalizeRowValues = (values, columnCount) => {
  const normalized = Array(columnCount).fill("");
  values.forEach((value, index) => {
    if (index < columnCount) normalized[index] = value ?? "";
  });
  return normalized;
};

const parseDataRow = (row, columnCount) =>
  normalizeRowValues(
    [...row.querySelectorAll("td")].map((cell) => getCellPlainText(cell)),
    columnCount,
  );

const parseTotalRowByIndex = (row, columnCount) => {
  const values = Array(columnCount).fill("");
  let col = 0;

  [...row.querySelectorAll("td")].forEach((cell) => {
    const span = Number(cell.colSpan) || 1;
    const text = getCellPlainText(cell);

    if (/Total\s*-/i.test(text)) {
      values[0] = text;
    } else if (col < columnCount) {
      const normalized = text.replace(/\s+/g, " ").trim();
      if (normalized && normalized !== "Select" && normalized !== "No Vat") {
        values[col] = text;
      }
    }

    col += span;
  });

  return values;
};

const getColumnAlign = (headerIndex) => {
  if (headerIndex === 0) return "left";
  if ([2, 4, 9].includes(headerIndex)) return "center";
  return "right";
};

const getVisibleColumns = (headers, sections, grandTotal) => {
  const allDataRows = sections.flatMap((section) => section.rows);
  const allTotals = [
    ...sections.map((section) => section.total).filter(Boolean),
    grandTotal,
  ].filter(Boolean);

  return headers
    .map((_, index) => index)
    .filter((index) => {
      if (index === 0) return true;

      const hasValueInRows = allDataRows.some(
        (row) => !isEmptyPdfCellText(row[index]),
      );
      const hasValueInTotals = allTotals.some(
        (total) => !isEmptyPdfCellText(total?.[index]),
      );

      if (isCategoryColumn(headers, index)) {
        return true;
      }

      return hasValueInRows || hasValueInTotals;
    });
};

const buildColumnWidths = (visibleCount) => {
  if (visibleCount <= 0) return [];
  if (visibleCount === 1) return [100];

  const descriptionShare = 26;
  const otherShare = (100 - descriptionShare) / (visibleCount - 1);
  const widths = Array.from({ length: visibleCount }, (_, index) =>
    index === 0 ? descriptionShare : otherShare,
  );

  const sum = widths.reduce((total, width) => total + width, 0);
  widths[widths.length - 1] += 100 - sum;

  return widths;
};

const formatSectionTotalLabel = (section) =>
  (section.total?.[0] || `TOTAL ${section.title}`)
    .replace(/Total\s*-\s*/i, "TOTAL ")
    .toUpperCase();

const formatGrandTotalLabel = (grandTotal) =>
  (grandTotal?.[0] || "TOTAL CHARGE")
    .replace(/Total\s*-\s*/i, "TOTAL ")
    .toUpperCase();

const PDF_QUOTE_STYLE = `
[data-pdf-capture-host] .wpWrapper thead,
[data-pdf-capture-host] thead {
  background: #fff !important;
  color: #000 !important;
}
[data-pdf-capture-host] .pdf-quote-wrap {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000;
}
[data-pdf-capture-host] .pdf-quote-table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #000;
  border: 2px solid #000;
}
[data-pdf-capture-host] .pdf-quote-table th,
[data-pdf-capture-host] .pdf-quote-table td {
  border: 1px solid #000;
  padding: 6px 8px;
  vertical-align: middle;
  overflow: hidden;
  word-wrap: break-word;
  background: #fff;
  color: #000;
  box-sizing: border-box;
}
[data-pdf-capture-host] .pdf-quote-table .pdf-head-row th {
  font-weight: 400;
  font-size: 11px;
  background: #1b2245;
  color: #fff;
  border: 1px solid #000;
}
[data-pdf-capture-host] .pdf-quote-table .pdf-title-row td {
  text-align: center !important;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  font-size: 12px;
  font-weight: 700;
  background: #f7f8fb;
  color: #1b2245;
  border-top: 2px solid #1b2245;
  border-bottom: 2px solid #000;
  padding: 8px;
}
[data-pdf-capture-host] .pdf-quote-table .pdf-section-gap td {
  height: 14px;
  padding: 0;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-top: none;
  border-bottom: none;
  background: #fff;
  line-height: 0;
  font-size: 0;
}
[data-pdf-capture-host] .pdf-quote-table .pdf-total-row td,
[data-pdf-capture-host] .pdf-quote-table .pdf-grand-total-row td {
  font-weight: 700;
  background: #eef0f6;
  border-top: 2px solid #1b2245;
  border-bottom: 2px solid #1b2245;
}
[data-pdf-capture-host] .pdf-quote-table .pdf-grand-label td {
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  background: #f7f8fb;
  color: #1b2245;
  text-align: center !important;
  border-top: 2px solid #1b2245;
  border-bottom: 2px solid #000;
  padding: 8px;
}
`;

const buildColgroup = (columnWidths) =>
  `<colgroup>${columnWidths
    .map((width) => `<col style="width:${width}%;" />`)
    .join("")}</colgroup>`;

const cellStyle = (headerIndex, visibleIndex, columnWidths, bold = false, type = "body") => {
  const width = columnWidths[visibleIndex];
  const isTotal = type === "total";

  return [
    `width:${width}%`,
    `text-align:${getColumnAlign(headerIndex)}`,
    "padding:6px 8px",
    "vertical-align:middle",
    "overflow:hidden",
    "box-sizing:border-box",
    bold ? "font-weight:700" : "",
    isTotal ? "background:#eef0f6" : "",
  ]
    .filter(Boolean)
    .join(";");
};

const renderCells = (values, visibleColumns, headers, type, columnWidths) => {
  const isHead = type === "head";
  const tag = isHead ? "th" : "td";
  const bold = type === "total";

  return visibleColumns
    .map((headerIndex, visibleIndex) => {
      const text = isHead ? headers[headerIndex] : values[headerIndex] ?? "";
      return `<${tag} style="${cellStyle(headerIndex, visibleIndex, columnWidths, bold, type)}">${escapeHtml(text)}</${tag}>`;
    })
    .join("");
};

const buildUnifiedQuoteTableHtml = ({
  headers,
  sections,
  grandTotal,
  visibleColumns,
  columnWidths,
}) => {
  const colSpan = visibleColumns.length;
  const bodyRows = [];
  let renderedSectionCount = 0;

  sections.forEach((section) => {
    const dataRows = section.rows.filter((row) => rowHasValues(row, headers));
    const showTotal =
      section.total &&
      (rowHasValues(section.total, headers) || dataRows.length > 0);

    if (!dataRows.length && !showTotal) return;

    if (renderedSectionCount > 0) {
      bodyRows.push(
        `<tr class="pdf-section-gap"><td colspan="${colSpan}">&nbsp;</td></tr>`,
      );
    }

    bodyRows.push(
      `<tr class="pdf-title-row"><td colspan="${colSpan}" style="text-align:center;text-transform:uppercase;font-weight:700;padding:8px;border-top:2px solid #1b2245;border-bottom:2px solid #000;background:#f7f8fb;color:#1b2245;">${escapeHtml(section.title.toUpperCase())}</td></tr>`,
    );

    dataRows.forEach((row) => {
      bodyRows.push(
        `<tr>${renderCells(row, visibleColumns, headers, "body", columnWidths)}</tr>`,
      );
    });

    if (showTotal) {
      const totalValues = [...section.total];
      totalValues[0] = formatSectionTotalLabel(section);
      bodyRows.push(
        `<tr class="pdf-total-row">${renderCells(totalValues, visibleColumns, headers, "total", columnWidths)}</tr>`,
      );
    }

    renderedSectionCount += 1;
  });

  if (grandTotal && rowHasValues(grandTotal, headers)) {
    const totalValues = [...grandTotal];
    totalValues[0] = formatGrandTotalLabel(grandTotal);

    bodyRows.push(
      `<tr class="pdf-section-gap"><td colspan="${colSpan}">&nbsp;</td></tr>`,
      `<tr class="pdf-grand-label"><td colspan="${colSpan}" style="text-align:center;text-transform:uppercase;font-weight:700;padding:8px;border-top:2px solid #1b2245;border-bottom:2px solid #000;background:#f7f8fb;color:#1b2245;">QUOTE TOTAL ESTIMATION</td></tr>`,
      `<tr class="pdf-grand-total-row">${renderCells(totalValues, visibleColumns, headers, "total", columnWidths)}</tr>`,
    );
  }

  return `
    <table class="pdf-quote-table" width="100%" border="1" cellpadding="0" cellspacing="0">
      ${buildColgroup(columnWidths)}
      <thead>
        <tr class="pdf-head-row">${renderCells([], visibleColumns, headers, "head", columnWidths)}</tr>
      </thead>
      <tbody>
        ${bodyRows.join("")}
      </tbody>
    </table>`;
};

const buildQuoteHtml = ({ headers, sections, grandTotal }) => {
  const sectionsWithValues = sections
    .map((section) => ({
      ...section,
      rows: section.rows.filter((row) => rowHasValues(row, headers)),
    }))
    .filter(
      (section) =>
        section.rows.length > 0 ||
        (section.total && rowHasValues(section.total, headers)),
    );

  if (!sectionsWithValues.length) {
    return `<div class="pdf-quote-wrap"><p>No charge rows with values to display.</p></div>`;
  }

  const visibleColumns = getVisibleColumns(
    headers,
    sectionsWithValues,
    grandTotal,
  );
  const columnWidths = buildColumnWidths(visibleColumns.length);

  return `
    <style>${PDF_QUOTE_STYLE}</style>
    <div class="pdf-quote-wrap">
      ${buildUnifiedQuoteTableHtml({
        headers,
        sections: sectionsWithValues,
        grandTotal,
        visibleColumns,
        columnWidths,
      })}
    </div>`;
};

const parseQuoteTable = (table) => {
  const headers = [...table.querySelectorAll("thead th")].map((cell) =>
    normalizeHeaderLabel(getCellPlainText(cell)),
  );

  const sections = [];
  let current = null;
  let grandTotal = null;

  table.querySelectorAll("tbody tr").forEach((row) => {
    if (row.classList.contains("estimate-section-row")) {
      if (current) sections.push(current);
      current = {
        title: row.textContent.replace(/\s+/g, " ").trim(),
        rows: [],
        total: null,
      };
      return;
    }

    if (isGrandTotalRow(row)) {
      grandTotal = parseTotalRowByIndex(row, headers.length);
      return;
    }

    if (isSectionTotalRow(row)) {
      if (current) current.total = parseTotalRowByIndex(row, headers.length);
      return;
    }

    if (!current) return;

    const values = parseDataRow(row, headers.length);
    if (rowHasValues(values, headers)) {
      current.rows.push(values);
    }
  });

  if (current) sections.push(current);

  return {
    headers,
    sections: sections.filter((section) => section.rows.length > 0),
    grandTotal,
  };
};

export const extractQuoteTableData = (root) => {
  const table = root?.querySelector?.(".cost-table");
  if (!table) return null;
  return parseQuoteTable(table);
};

export const renderPdfQuoteLayout = (root, quoteData = null) => {
  const table = root?.querySelector(".cost-table");
  const tableWrap = table?.closest(".table-responsive");

  if (!tableWrap) return;

  const resolvedQuoteData = quoteData ?? (table ? parseQuoteTable(table) : null);
  if (!resolvedQuoteData) return;

  tableWrap.innerHTML = buildQuoteHtml(resolvedQuoteData);
  tableWrap.style.overflow = "visible";
  tableWrap.style.width = "100%";
  tableWrap.style.maxWidth = "100%";
  tableWrap.style.margin = "0";
  tableWrap.style.padding = "0";
};

export const injectPdfGlobalStyles = (root) => {
  const host = root.closest("[data-pdf-capture-host]") ?? root.parentElement;
  if (!host || host.querySelector("[data-pdf-global-style]")) return;

  const style = document.createElement("style");
  style.setAttribute("data-pdf-global-style", "true");
  style.textContent = `
    [data-pdf-capture-host] .wpWrapper thead,
    [data-pdf-capture-host] thead {
      background: #fff !important;
      color: #000 !important;
    }
    [data-pdf-capture-host] .wpWrapper th,
    [data-pdf-capture-host] .wpWrapper td {
      color: #000 !important;
    }
  `;
  host.prepend(style);
};
