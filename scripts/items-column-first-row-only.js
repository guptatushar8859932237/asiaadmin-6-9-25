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

const before = content.slice(0, tbodyStart + "<tbody>".length);
const tbodyContent = content.slice(tbodyStart + "<tbody>".length, tbodyEnd);
const after = content.slice(tbodyEnd);

const SECTION_NAMES = [
  "Origin Charges",
  "Freight Charges",
  "Transit Charges",
  "Destination Charges ",
  " Admin Charges",
  "Customs Charges",
];

const isSectionName = (value) =>
  SECTION_NAMES.some((name) => value === name || value.trim() === name.trim());

const isTotalRow = (rowLines) =>
  rowLines.some((line) => /Total\s*-/.test(line)) &&
  rowLines.some((line) => line.includes("colSpan"));

const processRow = (rowLines, sectionActive) => {
  if (isTotalRow(rowLines)) {
    return { rowLines, sectionActive: false };
  }

  let firstTdIndex = -1;
  for (let i = 0; i < rowLines.length; i += 1) {
    if (rowLines[i].trim().startsWith("<td")) {
      firstTdIndex = i;
      break;
    }
  }

  if (firstTdIndex === -1) {
    return { rowLines, sectionActive };
  }

  const firstTdLine = rowLines[firstTdIndex];
  if (firstTdLine.includes("colSpan")) {
    return { rowLines, sectionActive };
  }

  const match = firstTdLine.match(/^(\s*)<td>([\s\S]*?)<\/td>\s*$/);
  if (!match) {
    return { rowLines, sectionActive };
  }

  const indent = match[1];
  const cellValue = match[2];

  if (isSectionName(cellValue)) {
    if (sectionActive) {
      const updated = [...rowLines];
      updated[firstTdIndex] = `${indent}<td></td>`;
      return { rowLines: updated, sectionActive: true };
    }

    return { rowLines, sectionActive: true };
  }

  return { rowLines, sectionActive };
};

const lines = tbodyContent.split("\n");
const output = [];
let sectionActive = false;
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
      const processed = processRow(rowLines, sectionActive);
      sectionActive = processed.sectionActive;
      output.push(...processed.rowLines);
      inRow = false;
      rowLines = [];
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync(filePath, before + output.join("\n") + after, "utf8");
console.log("Items column: section name kept only on first row per group.");
