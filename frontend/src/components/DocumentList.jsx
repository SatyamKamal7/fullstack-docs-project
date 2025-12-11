import React from "react";
import { api } from "../api";

function DocumentList({ documents, refresh }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/documents/${id}/`);
      refresh();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-maroon mb-4">
        Uploaded Documents
      </h2>

      {documents.length === 0 ? (
        <p className="text-gray-500 text-center">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <a
                href={`http://127.0.0.1:8000${doc.file}`}
                target="_blank"
                className="text-maroon font-medium hover:underline"
              >
                {doc.title}
              </a>

              <button
                onClick={() => handleDelete(doc.id)}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg shadow transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentList;