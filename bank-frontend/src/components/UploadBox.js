import { useState } from "react";
import API from "../services/api";

function UploadBox() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("PDF Uploaded Successfully");

    } catch (error) {

      console.error(error);

      alert("Upload Failed");

    }
  };

  return (

    <div className="bg-white p-10 rounded-2xl shadow-lg mt-10 max-w-xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Upload Bank Statement
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-600"
      >
        Upload
      </button>

    </div>

  );
}

export default UploadBox;