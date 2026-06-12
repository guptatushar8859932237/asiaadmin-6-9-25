const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../src/components/shipping estimate/ShippingEstimate.jsx",
);

let content = fs.readFileSync(filePath, "utf8");

content = content.replace(/\s*<th>Items<\/th>\n/, "\n");
content = content.replace(/colSpan=\{16\}/g, "colSpan={15}");

const tableStart = content.indexOf('<table class="cost-table">');
const tbodyStart = content.indexOf("<tbody>", tableStart);
const tbodyEnd = content.indexOf("</tbody>", tbodyStart);

if (tableStart === -1 || tbodyStart === -1 || tbodyEnd === -1) {
  throw new Error("Could not locate cost-table tbody.");
}

const before = content.slice(0, tbodyStart + "<tbody>".length);
const tbodyContent = content.slice(tbodyStart + "<tbody>".length, tbodyEnd);
const after = content.slice(tbodyEnd);

const isEmptyFirstCell = (line) =>
  /^\s*<td>\s*<\/td>\s*,?$/.test(line) || /^\s*<td><\/td>\s*,?$/.test(line);

const processRow = (rowLines) => {
  if (rowLines.some((line) => line.includes("estimate-section-row"))) {
    return rowLines;
  }

  for (let i = 0; i < rowLines.length; i += 1) {
    const trimmed = rowLines[i].trim();
    if (trimmed.startsWith("{/*")) continue;
    if (!trimmed.startsWith("<td")) continue;

    if (isEmptyFirstCell(rowLines[i])) {
      return rowLines.filter((_, index) => index !== i);
    }

    break;
  }

  return rowLines;
};

const lines = tbodyContent.split("\n");
const output = [];
let rowLines = [];
let inRow = false;

for (const line of lines) {
  if (line.trim() === "<tr>" || line.trim().startsWith("<tr ")) {
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

content = before + output.join("\n") + after;
fs.writeFileSync(filePath, content, "utf8");
console.log("Removed Items column from cost-table.");
