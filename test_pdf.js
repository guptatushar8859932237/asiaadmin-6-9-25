const { JSDOM } = require("jsdom");

// Mock window and document
const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <div class="table-responsive">
    <table class="cost-table">
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
          <th colSpan="2">Comment </th>
        </tr>
      </thead>
      <tbody>
        <tr class="estimate-section-row">
          <td colSpan="19"><strong>Origin Charges</strong></td>
        </tr>
        <tr>
          <td>
            <select class="supplier_form">
              <option value="23" selected>OAQ - Acquital fees</option>
            </select>
          </td>
          <td><input type="text" class="supplier_form" value="10.00" /></td>
          <td>
            <select class="select_supplier">
              <option value="RAND" selected>RAND</option>
            </select>
          </td>
          <td><input type="text" class="supplier_form" value="10.00" /></td>
          <td>
            <select class="select_supplier">
              <option value="1" selected>L/S</option>
            </select>
          </td>
          <td><input type="text" class="supplier_form" value="1" /></td>
          <td><input type="text" class="supplier_form" value="100.00" /></td>
          <td><input type="text" class="supplier_form" value="20.00" /></td>
          <td><input type="text" class="supplier_form" value="125.00" /></td>
          <td><input type="text" class="supplier_form" value="10.00" /></td>
          <td><input type="text" class="supplier_form" value="1250.00" /></td>
          <td>
            <select>
              <option value="15" selected>Standard Rate(15.00%)</option>
            </select>
          </td>
          <td><input type="text" class="supplier_form" value="50.00" /></td>
          <td><input type="text" class="supplier_form" value="625.00" /></td>
          <td><input type="text" class="supplier_form" value="625.00" /></td>
          <td><input type="text" class="supplier_form" value="625.00" /></td>
          <td><input type="text" class="supplier_form" value="1250.00" /></td>
          <td><input type="text" class="supplier_form" value="test" /></td>
          <td><i class="fa fa-trash"></i></td>
        </tr>
        <tr>
          <td colSpan="6"><strong>Total - Origin Charges</strong></td>
          <td colSpan="4">100.00</td>
          <td>1250.00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</body></html>`);

global.window = dom.window;
global.document = dom.window.document;

const pdfQuoteLayout = require("./src/utils/pdfQuoteLayout");

const root = dom.window.document.querySelector("body");
const data = pdfQuoteLayout.extractQuoteDataFromRoot(root);

console.log("PARSED DATA:", JSON.stringify(data, null, 2));

const html = pdfQuoteLayout.renderPdfQuoteLayout(root, data);
console.log("RENDER SUCCESS:", html);
console.log("MODIFIED HTML:", root.innerHTML);
