import React from "react";
import { FaArrowLeft, FaArrowRight, FaRedo, FaLock, FaStar, FaEllipsisV } from "react-icons/fa";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1
  },

  addressBar: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    padding: "0 12px",
    flex: 1,
    maxWidth: 500,
    minWidth: 300,
    height: 36
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 16,
    flex: 1,
    margin: "0 8px"
  },

  icon: {
    color: "#888",
    fontSize: 18,
    margin: "0 4px",
    cursor: "pointer"
  },

  lock: { color: "#4caf50" },
  star: { color: "#fbc02d" },
  menu: { marginLeft: 16 }
};

const AddressBar: React.FC = () => (
  <div style={styles.container}>
    <FaArrowLeft style={styles.icon} />
    <FaArrowRight style={styles.icon} />
    <FaRedo style={styles.icon} />
    <div style={styles.addressBar}>
      <FaLock style={{ ...styles.icon, ...styles.lock }} />
      <input
        type="text"
        style={styles.input}
        value="https://www.google.com"
        readOnly
      />
      <FaStar style={{ ...styles.icon, ...styles.star }} />
    </div>
    <FaEllipsisV style={{ ...styles.icon, ...styles.menu }} />
  </div>
);

export default AddressBar;