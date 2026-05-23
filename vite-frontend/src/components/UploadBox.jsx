import { useState } from "react";
import API from "../services/api";

function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF first");
      return;
    }

    setLoading(true);

    try {
      const result = await API.uploadPDF(file);   // ✅ matches your api.js

      if (result.error) {
        alert("Backend error: " + result.error);
        return;
      }

      console.log("Transactions received:", result.transactions);
      onUploadSuccess(result.transactions);        // ✅ sends data to Dashboard
      alert("PDF Uploaded Successfully!");

    } catch (error) {
      console.error(error);
      alert("Upload Failed — is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Upload Bank Statement</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadBox;