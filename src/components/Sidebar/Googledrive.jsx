// import React from 'react'
// import GoogleAuth from './GoogleAuth'

// export default function Googledrive({clientId}) {
//   return (
//     <div>
//       <GoogleAuth clientId={clientId} />
//     </div>
//   )
// }
import React, { useState } from "react";
export default function Googledrive() {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [documents, setDocuments] = useState({});
  const documentTypes = [
    "Shipper Invoice",
    "Customs Document",
    "Packing List",
    "Bill of Lading",
    "Insurance",
    "Certificate of Origin",
    "Health Certificate",
    "Transport Document",
    "Other"
  ];
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [selectedDocType]: [...(prevDocs[selectedDocType] || []), ...files],
    }));
  };
  return (
    <div className="p-3">
      <select
        className="form-select mb-3"
        value={selectedDocType}
        onChange={(e) => setSelectedDocType(e.target.value)}
      >
        <option value="">-- Select Document Type --</option>
        {documentTypes.map((doc) => (
          <option key={doc} value={doc}>
            {doc}
          </option>
        ))}
      </select>
      {selectedDocType && (
        <input
          type="file"
          className="form-control mb-3"
          multiple
          onChange={handleFileChange}
        />
      )}
      <div>
        {Object.keys(documents).map((docType) => (
          <div key={docType} className="mb-2">
            <strong>{docType}:</strong>
            <ul>
              {documents[docType].map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}