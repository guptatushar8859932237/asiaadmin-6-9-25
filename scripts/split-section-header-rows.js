const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../src/components/shipping estimate/ShippingEstimate.jsx",
);

const SECTION_PATTERN =
  /^(Origin Charges|Freight Charges|Transit Charges|Destination Charges\s*|Admin Charges|Customs Charges)$/i;

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

const isTotalRow = (rowLines) =>
  rowLines.some((line) => /Total\s*-/.test(line)) &&
  rowLines.some((line) => line.includes("colSpan"));

const processRow = (rowLines) => {
  if (isTotalRow(rowLines)) {
    return rowLines;
  }

  let firstTdIndex = -1;
  let secondTdIndex = -1;

  for (let i = 0; i < rowLines.length; i += 1) {
    const trimmed = rowLines[i].trim();
    if (!trimmed.startsWith("<td")) continue;
    if (trimmed.includes("colSpan")) continue;

    if (firstTdIndex === -1) {
      firstTdIndex = i;
      continue;
    }

    secondTdIndex = i;
    break;
  }

  if (firstTdIndex === -1 || secondTdIndex === -1) {
    return rowLines;
  }

  const firstMatch = rowLines[firstTdIndex].match(/^(\s*)<td>([\s\S]*?)<\/td>\s*$/);
  if (!firstMatch) {
    return rowLines;
  }

  const indent = firstMatch[1];
  const sectionName = firstMatch[2].trim();

  if (!SECTION_PATTERN.test(sectionName)) {
    return rowLines;
  }

  const updated = [...rowLines];
  updated[firstTdIndex] = `${indent}<td></td>`;

  const rowIndent = rowLines[0].match(/^(\s*)/)?.[1] ?? "                        ";

  return [
    `${rowIndent}<tr className="estimate-section-row">`,
    `${indent}<td colSpan={16}>`,
    `${indent}  <strong>${sectionName}</strong>`,
    `${indent}</td>`,
    `${rowIndent}</tr>`,
    ...updated,
  ];
};

const lines = tbodyContent.split("\n");
const output = [];
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
      output.push(...processRow(rowLines));
      inRow = false;
      rowLines = [];
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync(filePath, before + output.join("\n") + after, "utf8");
console.log("Section headers moved to their own row above descriptions.");
