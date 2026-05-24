import { useState } from "react";
import API from "../services/api";

function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF or CSV first");
      return;
    }

    // ✅ File type check
    const allowedExtensions = [".pdf", ".csv"];
    const fileExt = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      alert("❌ Invalid file type! Only PDF and CSV files are allowed.");
      return;
    }

    // ✅ File size check (10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("❌ File too large! Maximum size is 10MB.");
      return;
    }

    setLoading(true);
    try {
      const result = await API.uploadPDF(file);

      if (result.detail) {
        alert("❌ " + result.detail);
        return;
      }

      if (result.error) {
        alert("❌ " + result.error);
        return;
      }

      onUploadSuccess(result);
      alert("✅ Uploaded Successfully!");

    } catch (error) {
      alert("❌ Upload Failed — is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📤 Upload Bank Statement</h2>

      <input
        type="file"
        accept=".pdf,.csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full"
      />

      {/* Show file info */}
      {file && (
        <div className="mt-3 text-sm text-gray-500">
          📄 {file.name} — {(file.size / 1024).toFixed(1)} KB
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600 disabled:opacity-50 w-full"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
    </div>
  );
}

export default UploadBox;