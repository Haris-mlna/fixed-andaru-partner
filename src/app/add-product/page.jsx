"use client";

import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { Button } from "@mui/material";

const AddProductPages = () => {
  const [binaryData, setBinaryData] = useState(null); // State to store binary data
  const [jsonData, setJsonData] = useState({
    // State for JSON data
    actionController: "ProductController",
    actionName: "ImportProduct",
    actionParam: {},
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate if the selected file is a CSV
      if (selectedFile.type !== "text/csv") {
        alert("Please upload a valid CSV file.");
        return;
      }
      setBinaryData(selectedFile); // Store the file directly in state
    }
  };

  const handleSubmit = async () => {
    if (!binaryData) return; // Check if a file has been selected
    const token = window.localStorage.getItem("token");

    const formData = new FormData();

    // Append JSON data as a string
    formData.append("jsonData", JSON.stringify(jsonData));

    // Append the selected file directly
    formData.append("file", binaryData);

    try {
      const response = await fetch("http://103.195.30.148:81/api/main/importdata", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Keep the Authorization header
          // Do NOT set Content-Type; let the browser set it automatically
        },
        body: formData, // Send the FormData
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        const errorText = await response.text(); // Capture error details
        console.error("File upload failed", errorText);
        alert(`Upload failed: ${errorText}`); // Alert the user
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again."); // Alert the user
    }
  };

  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <div className="w-full flex">
        <div className="flex flex-1 flex-col">
          <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[800px] h-[400px] bg-white shadow rounded p-4">
              <h1 className="font-outfit font-medium uppercase tracking-[2px]">
                Tambah Produk
              </h1>
              <div className="py-4">
                <input
                  type="file"
                  name="tambah produk"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
              <Button onClick={handleSubmit}>Submit</Button>
              {binaryData && (
                <div className="mt-4">
                  <p>File loaded: {binaryData.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPages;
