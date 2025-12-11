import React, { useState } from "react";
import { api } from "../api";

function UploadDocument({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("title", file.name);
    formData.append("file", file);

    try {
      await api.post("/documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUploadSuccess();
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-maroon font-semibold mb-2">
        Upload a Document
      </label>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-300 rounded-lg p-3 w-full mb-4 shadow-sm"
      />

      <button
        onClick={handleUpload}
        className="bg-maroon hover:bg-maroonLight text-white py-2 px-4 rounded-lg shadow-md w-full transition"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadDocument;