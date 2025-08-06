import React from "react";

const WindowControls: React.FC = () => (
  <div className="window-controls">
    <button className="window-btn minimize">–</button>
    <button className="window-btn maximize">□</button>
    <button className="window-btn close">×</button>
  </div>
);

export default WindowControls;