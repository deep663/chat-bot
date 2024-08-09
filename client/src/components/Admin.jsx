import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Logo from "../assets/chat-bot.png"

const AdminPage = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    const csvFiles = acceptedFiles.filter((file) => file.type === "text/csv");
    setFiles(csvFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/upload/csv",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage(response.data);
      setFiles([]);
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {"text/csv":['.csv']}
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full flex justify-center items-center mb-8">
        <div className="flex justify-around">
          <img src={Logo} width="64px" alt="DB chat" />
          <h2 className="text-center text-3xl font-extrabold my-auto mx-2">
            Chat Bot Admin
          </h2>
        </div>
        </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Upload
        </h1>
        <div className="flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="size-32"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
        </div>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer mb-4"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">
            Drag & drop CSV files or{" "}
            <span className="text-blue-500">Browse</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Upload your file in csv format only
          </p>
        </div>
        {files.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Uploading - {files.length}/{files.length} files
            </h2>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span className="text-sm text-gray-600">{file.name}</span>
                <progress
                  className="w-full h-2 rounded bg-blue-200"
                  value="100"
                  max="100"
                />
              </div>
            ))}
          </div>
        )}
        {message && (
          <p
            className={`text-center ${
              message === "Upload failed" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <button
          className={`w-full py-2 px-4 rounded-md transition duration-200 mt-4 ${files.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          onClick={handleUpload}
          disabled={files.length === 0}
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
