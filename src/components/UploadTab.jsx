import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { getAuth } from "firebase/auth";

const UploadTab = () => {
  const [files, setFiles] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [error, setError] = useState("");
  const [totalStorageUsed, setTotalStorageUsed] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserFiles();
      fetchStorageUsage();
    }
  }, [user]);

  const fetchUserFiles = async () => {
    try {
      if (!user) {
        console.error("User is not authenticated");
        return;
      }
      const userFolderRef = ref(storage, `users/${user.uid}/`);
      const folderContents = await listAll(userFolderRef);

      const filePromises = folderContents.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return { name: itemRef.name, url, size: metadata.size };
      });

      const fileList = await Promise.all(filePromises);
      setFiles(fileList);
    } catch (error) {
      console.error("Error fetching user files:", error);
      setError("Error fetching files. Please try again.");
    }
  };

  const fetchStorageUsage = async () => {
    try {
      const userFolderRef = ref(storage, `users/${user.uid}/`);
      const folderContents = await listAll(userFolderRef);

      const totalSize = await Promise.all(
        folderContents.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          return metadata.size;
        })
      );

      const totalStorage = totalSize.reduce((acc, size) => acc + size, 0);
      setTotalStorageUsed(totalStorage);
    } catch (error) {
      console.error("Error calculating storage usage:", error);
    }
  };

  const handleUploadFile = async () => {
    if (!uploadingFile || !user) return;

    const fileSizeMB = uploadingFile.size / (1024 * 1024);
    const currentUsageMB = totalStorageUsed / (1024 * 1024);

    if (currentUsageMB + fileSizeMB > 60) {
      setError("You have reached your storage limit of 60MB.");
      return;
    }

    try {
      const fileRef = ref(storage, `users/${user.uid}/${uploadingFile.name}`);
      await uploadBytes(fileRef, uploadingFile);

      alert("File uploaded successfully!");
      setUploadingFile(null);
      setError("");

      fetchUserFiles();
      fetchStorageUsage();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("File upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-2xl lg:max-w-full mx-auto">
      {/* Title for Upload Tab */}
      <h2 className="text-2xl font-bold text-center mb-6">Upload and Manage Files</h2>
      
      {/* Upload File Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="file"
          onChange={(e) => setUploadingFile(e.target.files[0])}
          className="p-2 border rounded-lg w-full sm:w-auto"
        />
        <button
          onClick={handleUploadFile}
          className="w-full sm:w-auto bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Upload Media
        </button>
      </div>

      {/* Render Uploaded Files */}
      <div className="mt-4 space-y-2">
        {files.length === 0 && (
          <p className="text-gray-500 text-center">No files uploaded yet.</p>
        )}
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex justify-between items-center p-2 rounded-lg bg-gray-100"
          >
            <a
              href={file.url}
              download={file.name}
              className="text-blue-500 underline truncate"
            >
              {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </a>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Total Storage Used */}
      <p className="text-gray-700 mt-6 text-center sm:text-left">
        Total Storage Used: {(totalStorageUsed / (1024 * 1024)).toFixed(2)} MB
      </p>
    </div>
  );
};

export default UploadTab;
