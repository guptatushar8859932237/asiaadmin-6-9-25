import React from "react";
import { useLocation } from "react-router-dom";

export default function UploadImage() {
  const location = useLocation();
  const auth = location?.state?.accessToken;

  function uploadFile() {
    const fileInput = document?.getElementById("fileInput")?.files[0];

    if (!fileInput) {
      alert("Please select a file to upload.");
      return;
    }

    if (!auth) {
      alert("User is not authenticated. Please login first.");
      return;
    }

    const metadata = {
      name: fileInput.name,
      mimeType: fileInput.type,
    };
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", fileInput);
    fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${auth}`,
        }),
        body: form,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("File uploaded:", data);
        alert("File uploaded successfully!");
      })
      .catch((err) => console.error("Upload error:", err));
  }

  return (
    <div>
      <input type="file" id="fileInput" />
      <button onClick={uploadFile}>Upload to Google Drive</button>
    </div>
  );
}
