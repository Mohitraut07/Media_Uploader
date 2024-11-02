import React, { useState, useEffect } from "react";
import { storage } from "../firebase"; // Ensure this is configured in firebase.js
import { ref, listAll, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import { getAuth } from "firebase/auth";

const MediaTab = () => {
  const [files, setFiles] = useState([]); // Array to hold uploaded files
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [shareMessage, setShareMessage] = useState(""); // Share feedback message

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserFiles();
    }
  }, [user]);

  // Fetch user files and metadata
  const fetchUserFiles = async () => {
    try {
      setLoading(true);
      setError("");
      setShareMessage("");

      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      const userFolderRef = ref(storage, `users/${user.uid}/`);
      const folderContents = await listAll(userFolderRef);

      const filePromises = folderContents.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return { name: itemRef.name, url, ref: itemRef, size: metadata.size };
      });

      const fileList = await Promise.all(filePromises);
      setFiles(fileList);
    } catch (error) {
      console.error("Error fetching user files:", error);
      setError("Error fetching files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file deletion
  const handleDelete = async (fileRef) => {
    try {
      await deleteObject(fileRef);
      alert("File deleted successfully!");
      fetchUserFiles(); // Refresh files list after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file. Please try again.");
    }
  };

  // Handle sharing file URL
  const handleShare = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 2000); // Clear message after 2 seconds
      })
      .catch((err) => {
        console.error("Error copying link:", err);
        setShareMessage("Failed to copy link. Try again.");
      });
  };

  return (
    <div className="p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">My Media</h2>
      
      {loading ? (
        <p>Loading files...</p>
      ) : files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-200 rounded-lg">
              
              {/* Download Link */}
              <a href={file.url} download={file.name} className="text-blue-500 underline sm:mb-0 mb-2">
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </a>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Share Button */}
                <button
                  onClick={() => handleShare(file.url)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                  Share
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(file.ref)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {/* Share confirmation message */}
      {shareMessage && <p className="text-green-500 mt-4">{shareMessage}</p>}
    </div>
  );
};

export default MediaTab;
