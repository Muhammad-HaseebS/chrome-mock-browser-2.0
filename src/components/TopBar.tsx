import React from "react";
import Tabs, { Tab } from "./Tabs";
import { FaRegWindowMinimize, FaRegSquare } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuCopy } from "react-icons/lu";

type Props = {
  tabs: Tab[];
  activeId: number;
  onActivate: (id: number) => void;
  onCloseTab: (id: number) => void;

  onMinimize: () => void;
  onMaximize: () => void;
  onCloseWindow: () => void;
  isMaximized: boolean;
};

const CONTROL_WIDTH = 120; // reserve space so tabs don’t overlap

const TopBar: React.FC<Props> = ({
  tabs,
  activeId,
  onActivate,
  onCloseTab,
  onMinimize,
  onMaximize,
  onCloseWindow,
  isMaximized,
}) => (
  <div
    style={{
      position: "relative",               // <— lets us absolutely-position the controls
      display: "flex",
      alignItems: "center",
      height: 40,
      padding: "0 8px",
      background: "#ededf0",
      borderBottom: "1px solid #e0e0e0",
    }}
  >
    {/* Tabs strip (pad right so it never sits under the controls) */}
    <div style={{ flex: 1, minWidth: 0, paddingRight: CONTROL_WIDTH }}>
      <Tabs
        tabs={tabs}
        activeId={activeId}
        onActivate={onActivate}
        onCloseTab={onCloseTab}
      />
    </div>

    {/* Window controls — docked to the right, same row as tabs */}
    <div
      style={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <button
        title="Minimize"
        onClick={onMinimize}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#ffb300",
          fontSize: 16,
        }}
      >
        <FaRegWindowMinimize />
      </button>
      <button
        title={isMaximized ? "Restore" : "Maximize"}
        onClick={onMaximize}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#43a047",
          fontSize: 16,
        }}
      >
        {isMaximized ? <LuCopy /> : <FaRegSquare />}
      </button>
      <button
        title="Close"
        onClick={onCloseWindow}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#e53935",
          fontSize: 16,
        }}
      >
        <RxCross2 />
      </button>
    </div>
  </div>
);

export default TopBar;
