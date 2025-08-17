import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaRedo, FaLock, FaStar, FaEllipsisV } from "react-icons/fa";

type Props = {
  url: string;
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onNavigate: (nextUrl: string) => void;
};

const styles: { [k: string]: React.CSSProperties } = {
  container: { display: "flex", alignItems: "center", gap: 12, flex: 1 },
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
    height: 36,
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 16,
    flex: 1,
    margin: "0 8px",
  },
  icon: { color: "#888", fontSize: 18, margin: "0 4px", cursor: "pointer" },
  lock: { color: "#4caf50" },
  star: { color: "#fbc02d" },
  menu: { marginLeft: 16 },
};

const isLikelyUrl = (value: string) => {
  // treat strings with protocol OR with a dot as a URL; otherwise a search
  if (/^[a-z]+:\/\//i.test(value)) return true;
  return value.includes(".") && !value.includes(" ");
};

const toUrl = (value: string) => {
  if (!value) return "about:blank";
  if (isLikelyUrl(value)) {
    // add https:// if missing a scheme
    return /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;
  }
  const q = encodeURIComponent(value);
  return `https://www.google.com/search?q=${q}`;
};

const AddressBar: React.FC<Props> = ({ url, onNavigate, onBack, onForward, onReload, canBack, canForward }) => {
  const [draft, setDraft] = useState(url);

  useEffect(() => setDraft(url), [url]);

  const submit = () => onNavigate(toUrl(draft.trim()));

  return (
    <div style={styles.container}>
      <FaArrowLeft style={{ ...styles.icon, opacity: canBack ? 1 : 0.4 }} onClick={canBack ? onBack : undefined} />
      <FaArrowRight style={{ ...styles.icon, opacity: canForward ? 1 : 0.4 }} onClick={canForward ? onForward : undefined} />
      <FaRedo style={styles.icon} onClick={onReload} />
      <div style={styles.addressBar}>
        <FaLock style={{ ...styles.icon, ...styles.lock }} />
        <input
          type="text"
          style={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search Google or type a URL"
        />
        <FaStar style={{ ...styles.icon, ...styles.star }} />
      </div>
      <FaEllipsisV style={{ ...styles.icon, ...styles.menu }} />
    </div>
  );
};

export default AddressBar;
