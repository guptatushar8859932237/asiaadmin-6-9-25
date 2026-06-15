const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../src/components/shipping estimate/ShippingEstimate.jsx",
);

let content = fs.readFileSync(filePath, "utf8");

const tableStart = content.indexOf('<table class="cost-table">');
const tbodyStart = content.indexOf("<tbody>", tableStart);
const tbodyEnd = content.indexOf("</tbody>", tbodyStart);

if (tableStart === -1 || tbodyStart === -1 || tbodyEnd === -1) {
  throw new Error("Could not locate cost-table tbody.");
}

const before = content.slice(0, tbodyStart + "<tbody>".length);
const tbodyContent = content.slice(tbodyStart + "<tbody>".length, tbodyEnd);
const after = content.slice(tbodyEnd);

const SECTION_LABELS = new Set([
  "Origin Charges",
  "Freight Charges",
  "Transit Charges",
  "Destination Charges",
  " Admin Charges",
  "Customs Charges",
]);

const normalizeSectionLabel = (value) => {
  const trimmed = (value ?? "").trim();
  if (trimmed === "Description") return "Customs Charges";
  if (!trimmed) return null;
  if (trimmed === "Insurance") return "Freight Charges";
  if (trimmed === "Destination Charges") return "Destination Charges ";
  if (SECTION_LABELS.has(value) || SECTION_LABELS.has(trimmed)) {
    return SECTION_LABELS.has(value) ? value : trimmed;
  }
  if (trimmed === "Origin Charges") return "Origin Charges";
  if (trimmed === "Freight Charges") return "Freight Charges";
  if (trimmed === "Transit Charges") return "Transit Charges";
  if (trimmed === "Customs Charges") return "Customs Charges";
  return null;
};

const isTotalRow = (rowLines) =>
  rowLines.some((line) => /Total\s*-/.test(line)) &&
  rowLines.some((line) => line.includes("colSpan"));

const getIndent = (line) => line.match(/^(\s*)/)?.[1] ?? "                          ";

const processRow = (rowLines, currentSection) => {
  if (isTotalRow(rowLines)) {
    return { rowLines, currentSection };
  }

  let firstTdIndex = -1;
  for (let i = 0; i < rowLines.length; i += 1) {
    const trimmed = rowLines[i].trim();
    if (trimmed.startsWith("<td")) {
      firstTdIndex = i;
      break;
    }
  }

  if (firstTdIndex === -1) {
    return { rowLines, currentSection };
  }

  const firstTdLine = rowLines[firstTdIndex];
  if (firstTdLine.includes("colSpan")) {
    return { rowLines, currentSection };
  }

  const match = firstTdLine.match(/^(\s*)<td>([\s\S]*?)<\/td>\s*$/);
  if (!match) {
    return { rowLines, currentSection };
  }

  const indent = match[1];
  const cellValue = match[2];
  const sectionLabel = normalizeSectionLabel(cellValue);

  if (sectionLabel) {
    const updated = [...rowLines];
    updated[firstTdIndex] = `${indent}<td>${sectionLabel}</td>`;
    return { rowLines: updated, currentSection: sectionLabel };
  }

  if (!cellValue.trim() && currentSection) {
    const updated = [...rowLines];
    updated[firstTdIndex] = `${indent}<td>${currentSection}</td>`;
    return { rowLines: updated, currentSection };
  }

  return { rowLines, currentSection };
};

const lines = tbodyContent.split("\n");
const output = [];
let currentSection = "";
let rowLines = [];
let inRow = false;

for (const line of lines) {
  if (line.trim() === "<tr>") {
    inRow = true;
    rowLines = [line];
    continue;
  }

  if (inRow) {
    rowLines.push(line);
    if (line.trim() === "</tr>") {
      if (currentSection === "" && rowLines.some((l) => l.includes("Origin Charges"))) {
        currentSection = "Origin Charges";
      }

      const processed = processRow(rowLines, currentSection);
      currentSection = processed.currentSection;
      output.push(...processed.rowLines);
      inRow = false;
      rowLines = [];
    }
    continue;
  }

  output.push(line);
}

const updatedContent = before + output.join("\n") + after;
fs.writeFileSync(filePath, updatedContent, "utf8");
console.log("Filled Items column with section names for all charge rows.");
