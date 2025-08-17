import React from "react";
import { FaRegWindowMinimize, FaRegSquare } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuCopy } from "react-icons/lu";
import Tabs from "./Tabs"; // you can remove this if TopBar renders Tabs now

interface Props {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

const WindowControls: React.FC<Props> = ({
  onMinimize, onMaximize, onClose, isMaximized,
}) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div /> {/* spacer so buttons align to the right */}
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 12px 0 0", gap: 8, alignItems: "center" }}>
      <button
        style={{ width: 24, height: 24, border: "none", background: "transparent", fontSize: 18, color: "#ffeb3b", cursor: "pointer" }}
        onClick={onMinimize}
        title="Minimize"
      >
        <FaRegWindowMinimize />
      </button>
      <button
        style={{ width: 24, height: 24, border: "none", background: "transparent", fontSize: 18, color: "#4caf50", cursor: "pointer" }}
        onClick={onMaximize}
        title={isMaximized ? "Restore" : "Maximize"}
      >
        {isMaximized ? <LuCopy /> : <FaRegSquare />}
      </button>
      <button
        style={{ width: 24, height: 24, border: "none", background: "transparent", fontSize: 18, color: "#f44336", cursor: "pointer" }}
        onClick={onClose}
        title="Close"
      >
        <RxCross2 />
      </button>
    </div>
  </div>
);

export default WindowControls;
