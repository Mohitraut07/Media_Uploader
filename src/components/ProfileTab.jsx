import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const ProfileTab = ({ userData }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // State for profile fields
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to save profile changes
  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email:</label>
        <p className={!isEditing ? `bg-white`: `bg-slate-200`}>{user?.email}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Password:</label>
        <p className={!isEditing ? `bg-white`: `bg-slate-200`}>********</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Profile Picture:</label>
        {isEditing ? (
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="Profile picture URL"
          />
        ) : (
          <img
            src={photoURL || "/placeholder-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Display Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border rounded w-full"
          />
        ) : (
          <p>{displayName || "No display name set"}</p>
        )}
      </div>

      {/* Error or success messages */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Edit and Save buttons */}
      {isEditing ? (
        <button onClick={handleSave} className="btn-primary mt-4 hover:bg-black hover:text-white px-5 py-2 rounded-md active:text-blue-400">
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="btn-secondary mt-4 hover:bg-black hover:text-white px-5 py-2 rounded-md active:text-blue-400">
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileTab;
