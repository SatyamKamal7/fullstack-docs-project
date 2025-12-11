import React, { useEffect, useState } from "react";
import UploadDocument from "./components/UploadDocument";
import DocumentList from "./components/DocumentList";
import { api } from "./api";

function App() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    const res = await api.get("/documents/");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-maroon mb-6">
          Document Manager
        </h1>

        <UploadDocument onUploadSuccess={fetchDocuments} />

        <DocumentList documents={documents} refresh={fetchDocuments} />
      </div>
    </div>
  );
}

export default App;