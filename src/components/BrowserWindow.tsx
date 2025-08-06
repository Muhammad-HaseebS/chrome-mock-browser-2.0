import React, { useState } from "react";
import WindowControls from "./WindowControls";
import TopBar from "./TopBar";
import { CiSearch } from "react-icons/ci";
import { FaEnvelope, FaYoutube, FaMapMarkedAlt, FaPlus } from "react-icons/fa";

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
  const [search, setSearch] = useState(""); 

  if (closed) return null;
  const style: React.CSSProperties = {
    width: maximized ? "100vw" : 900,
    height: maximized ? "60vh" : 400,
    borderRadius: maximized ? 0 : 16,
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: maximized ? 0 : "20px auto",
  };

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
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button
                style={{
                  marginLeft: -40,
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  color: "#b5a200",
                  cursor: "pointer",
                }}
                onClick={() => alert(`Searching for: ${search}`)}
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