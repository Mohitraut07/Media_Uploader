import React, { useState } from "react";
import SideNav from "./SideNav";
import Profile from "./ProfileTab";
import UploadTab from "./UploadTab";
import MediaTab from "./MediaTab";
import StorageTab from "./StorageTab";

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "profile" && <Profile />}
        {activeTab === "upload" && <UploadTab user={user} />}
        {activeTab === "media" && <MediaTab user={user} />}
        {activeTab === "storage" && <StorageTab user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
