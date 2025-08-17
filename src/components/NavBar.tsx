import React from "react";
import { FaArrowLeft, FaArrowRight, FaRedo, FaLock, FaStar, FaEllipsisV, FaPlus } from "react-icons/fa";

type Props = {
  url: string;
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onNavigate: (nextUrl: string) => void;
  onNewTab: () => void;
};

const likelyUrl = (value: string) => {
  if (/^[a-z]+:\/\//i.test(value)) return true;
  return value.includes(".") && !value.includes(" ");
};
const toUrl = (value: string) => {
  const v = value.trim();
  if (!v) return "about:blank";
  if (likelyUrl(v)) return /^[a-z]+:\/\//i.test(v) ? v : `https://${v}`;
  return `https://www.google.com/search?q=${encodeURIComponent(v)}`;
};

const NavBar: React.FC<Props> = ({
  url, canBack, canForward, onBack, onForward, onReload, onNavigate, onNewTab
}) => {
  const [draft, setDraft] = React.useState(url);
  React.useEffect(() => setDraft(url), [url]);

  const submit = () => onNavigate(toUrl(draft));

  return (
    <div
      style={{
        display: "flex", alignItems: "center",
        padding: "6px 10px", background: "#f5f5f7",
        borderBottom: "1px solid #e0e0e0", gap: 10
      }}
    >
      <FaArrowLeft
        onClick={canBack ? onBack : undefined}
        style={{ opacity: canBack ? 1 : 0.3, cursor: canBack ? "pointer" : "default" }}
        title="Back"
      />
      <FaArrowRight
        onClick={canForward ? onForward : undefined}
        style={{ opacity: canForward ? 1 : 0.3, cursor: canForward ? "pointer" : "default" }}
        title="Forward"
      />
      <FaRedo onClick={onReload} style={{ cursor: "pointer" }} title="Reload" />

      <div
        style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "#fff", borderRadius: 20,
          padding: "0 12px", height: 34, boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}
      >
        <FaLock style={{ color: "#4caf50", marginRight: 6 }} />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search Google or type a URL"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 15, background: "transparent" }}
        />
        <FaStar style={{ color: "#fbc02d", marginLeft: 6 }} />
      </div>

      <FaEllipsisV style={{ cursor: "pointer" }} title="Menu" />
      <FaPlus onClick={onNewTab} style={{ cursor: "pointer" }} title="New Tab" />
    </div>
  );
};

export default NavBar;
