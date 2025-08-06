import React, { useState } from "react";

const tabList = [
  { id: 1, title: "New Tab" },
  // { id: 2, title: "+" },
];

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="tabs">
      {tabList.map((tab) => (
        <div
          key={tab.id}
          className={`tab${activeTab === tab.id ? " active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default Tabs;