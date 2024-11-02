import React, { useState, useEffect } from "react";
import { storage } from "../firebase"; // Ensure storage is configured in firebase.js
import { ref, listAll, getMetadata } from "firebase/storage";
import { getAuth } from "firebase/auth";

const StorageTab = () => {
  const [totalStorageUsed, setTotalStorageUsed] = useState(0); // Total storage used in bytes
  const [videoStorageUsed, setVideoStorageUsed] = useState(0); // Video storage used in bytes
  const [otherStorageUsed, setOtherStorageUsed] = useState(0); // Other files storage used in bytes
  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser; // Retrieve the authenticated user
  const MAX_STORAGE_LIMIT_MB = 60; // Storage limit in MB

  useEffect(() => {
    if (user) {
      fetchStorageUsage();
    }
  }, [user]);

  const fetchStorageUsage = async () => {
    try {
      const userFolderRef = ref(storage, `users/${user.uid}/`);
      const folderContents = await listAll(userFolderRef);

      let totalVideoSize = 0;
      let totalOtherSize = 0;

      await Promise.all(
        folderContents.items.map(async (itemRef) => {
          const metadata = await getMetadata(itemRef);
          const fileType = metadata.contentType;

          if (fileType && fileType.startsWith("video")) {
            totalVideoSize += metadata.size;
          } else {
            totalOtherSize += metadata.size;
          }
        })
      );

      setVideoStorageUsed(totalVideoSize);
      setOtherStorageUsed(totalOtherSize);
      setTotalStorageUsed(totalVideoSize + totalOtherSize);
    } catch (error) {
      console.error("Error calculating storage usage:", error);
      setError("Failed to fetch storage usage. Please try again.");
    }
  };

  const totalUsagePercentage = ((totalStorageUsed / (MAX_STORAGE_LIMIT_MB * 1024 * 1024)) * 100).toFixed(2);
  const videoUsagePercentage = ((videoStorageUsed / (MAX_STORAGE_LIMIT_MB * 1024 * 1024)) * 100).toFixed(2);
  const otherUsagePercentage = ((otherStorageUsed / (MAX_STORAGE_LIMIT_MB * 1024 * 1024)) * 100).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Storage Usage</h2>

      {/* Progress Bar */}
      <div className="w-full h-6 bg-gray-300 rounded-lg overflow-hidden mb-4 flex">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${videoUsagePercentage}%` }}
          title={`Videos: ${videoUsagePercentage}%`}
        ></div>
        <div
          className="h-full bg-green-500"
          style={{ width: `${otherUsagePercentage}%`, borderLeft: '1px solid white' }} // Adding border for visibility
          title={`Other Files: ${otherUsagePercentage}%`}
        ></div>
      </div>

      {/* Display individual storage usage */}
      <p>Video Storage Used: {(videoStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
      <p>Other Files Storage Used: {(otherStorageUsed / (1024 * 1024)).toFixed(2)} MB</p>
      <p>Total Storage Used: {(totalStorageUsed / (1024 * 1024)).toFixed(2)} MB of {MAX_STORAGE_LIMIT_MB} MB</p>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Percentage of storage used */}
      <div className="text-sm text-gray-600 mt-4">
        <p>
          Total Usage: <span className="font-semibold">{totalUsagePercentage}%</span> of 60MB limit
        </p>
        <p>
          Remaining Storage:{" "}
          <span className="font-semibold">
            {(MAX_STORAGE_LIMIT_MB - totalStorageUsed / (1024 * 1024)).toFixed(2)} MB
          </span>
        </p>
      </div>
    </div>
  );
};

export default StorageTab;
