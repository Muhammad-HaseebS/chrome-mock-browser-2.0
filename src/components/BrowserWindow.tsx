import React, { useState } from "react";
import WindowControls from "./WindowControls";
import TopBar from "./TopBar";
import { CiSearch } from "react-icons/ci";
import { FaEnvelope, FaYoutube, FaMapMarkedAlt, FaPlus } from "react-icons/fa";

const initialStyle: React.CSSProperties = {
  width: 900,
  minHeight: 500,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  overflow: "hidden",
  position: "relative",
  transition: "all 0.3s",
  display: "flex",
  flexDirection: "column",
};

const minimizedStyle: React.CSSProperties = {
  ...initialStyle,
  height: 40,
  minHeight: 0,
  overflow: "hidden",
};

const maximizedStyle: React.CSSProperties = {
  ...initialStyle,
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  borderRadius: 0,
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 999,
};

const shortcuts = [
  { label: "Gmail", icon: <FaEnvelope size={24} /> },
  { label: "YouTube", icon: <FaYoutube size={24} /> },
  { label: "Maps", icon: <FaMapMarkedAlt size={24} /> },
  { label: "Add shortcut", icon: <FaPlus size={24} /> },
];

const BrowserWindow: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  let style = initialStyle;
  if (minimized) style = minimizedStyle;
  else if (maximized) style = maximizedStyle;

  return (
    <div style={style}>
      <WindowControls
        onMinimize={() => {
          setMinimized((prev) => !prev);
          setMaximized(false);
        }}
        onMaximize={() => {
          setMaximized((prev) => !prev);
          setMinimized(false);
        }}
        onClose={() => setClosed(true)}
        isMaximized={maximized}
      />

      {!minimized && (
        <>
          <TopBar />
          <div style={{ padding: 32, flex: 1 }}>
            <div style={{
              fontSize: 32,
              color: "#b5a200",
              margin: "40px 0 24px 0",
              textAlign: "center"
            }}>
              Google
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 32
            }}>
              <input
                style={{
                  width: 500,
                  height: 44,
                  borderRadius: 24,
                  border: "1px solid #e0e0e0",
                  padding: "0 20px",
                  fontSize: 18,
                  background: "#f8f9fa",
                  outline: "none",
                }}
                placeholder="Search Google or type a URL"
                disabled
              />
              <button
                style={{
                  marginLeft: -40,
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  color: "#b5a200",
                  cursor: "not-allowed",
                }}
                disabled
              >
                <CiSearch />
              </button>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 32,
              marginTop: 24
            }}>
              {shortcuts.map(({ label, icon }) => (
                <div
                  key={label}
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "50%",
                    width: 64,
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    flexDirection: "column",
                  }}
                >
                  {icon}
                  <span style={{ fontSize: 12, marginTop: 4 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowserWindow;
