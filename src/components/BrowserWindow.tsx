import React from "react";
import WindowControls from "./WindowControls";
import TopBar from "./TopBar";

const BrowserWindow: React.FC = () => (
  <div className="browser-window">
    <WindowControls />
    <TopBar />
    <div className="browser-content">
      <div className="google-logo">Google</div>
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search Google or type a URL"
          disabled
        />
        <button className="search-btn" disabled>🔍</button>
      </div>
      <div className="quick-links">
        <div className="quick-link">Gmail</div>
        <div className="quick-link">Images</div>
        <div className="quick-link">YouTube</div>
        <div className="quick-link">Maps</div>
        <div className="quick-link">Add shortcut</div>
      </div>
    </div>
  </div>
);

export default BrowserWindow;