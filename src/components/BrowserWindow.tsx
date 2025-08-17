import React, { useMemo, useRef, useState } from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import { CiSearch } from "react-icons/ci";
import { FaEnvelope, FaYoutube, FaMapMarkedAlt, FaPlus } from "react-icons/fa";
import type { Tab } from "./Tabs";

type TabState = Tab & {
  history: string[];
  index: number;
  reloadTick: number;
};

const DEFAULT_URL = "https://www.google.com";

const makeTab = (id: number, url = DEFAULT_URL): TabState => ({
  id,
  title: "New Tab",
  url,
  history: [url],
  index: 0,
  reloadTick: 0,
});

const shortcuts = [
  { label: "Gmail", url: "https://mail.google.com", icon: <FaEnvelope size={24} /> },
  { label: "YouTube", url: "https://www.youtube.com", icon: <FaYoutube size={24} /> },
  { label: "Maps", url: "https://maps.google.com", icon: <FaMapMarkedAlt size={24} /> },
  { label: "Add shortcut", url: DEFAULT_URL, icon: <FaPlus size={24} /> },
];

const BrowserWindow: React.FC = () => {
  // window state
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);

  const [tabs, setTabs] = useState<TabState[]>([makeTab(1)]);
  const [activeId, setActiveId] = useState<number>(1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const active = useMemo(() => tabs.find(t => t.id === activeId)!, [tabs, activeId]);

  const style: React.CSSProperties = {
    width: (maximized ? "100%" : 1100) as any,
    height: (maximized ? "100%" : 600) as any,
    borderRadius: maximized ? 0 : 10,
    overflow: "hidden",
    boxShadow: minimized ? "none" : "0 8px 40px rgba(0,0,0,0.18)",
    background: "#fff",
    display: minimized ? "none" : "flex",
    flexDirection: "column",
    position: "relative",
    margin: maximized ? 0 : "20px auto",
    border: "1px solid #e0e0e0",
  };

  const updateActive = (fn: (t: TabState) => TabState) => {
    setTabs(prev => prev.map(t => (t.id === activeId ? fn({ ...t }) : t)));
  };

  const normalizeInputToUrlOrSearch = (value: string) => {
    const v = value.trim();
    if (!v) return active.url;
    try {
      return new URL(v).toString();
    } catch {
      if (/^[\w-]+\.[\w.-]+(\/.*)?$/.test(v)) return `https://${v}`;
      return `https://www.google.com/search?q=${encodeURIComponent(v)}`;
    }
  };

  const navigate = (next: string) => {
    const nextUrl = normalizeInputToUrlOrSearch(next);
    updateActive(t => {
      const history = t.history.slice(0, t.index + 1).concat(nextUrl);
      const index = history.length - 1;
      let title = "New Tab";
      try { title = new URL(nextUrl).host || "New Tab"; } catch {}
      return { ...t, url: nextUrl, history, index, title };
    });
  };

  const back = () =>
    updateActive(t => (t.index === 0 ? t : { ...t, index: t.index - 1, url: t.history[t.index - 1] }));

  const forward = () =>
    updateActive(t => (t.index >= t.history.length - 1 ? t : { ...t, index: t.index + 1, url: t.history[t.index + 1] }));

  const reload = () => updateActive(t => ({ ...t, reloadTick: t.reloadTick + 1 }));

  const newTab = (initialUrl = DEFAULT_URL) => {
    setTabs(prev => {
      const id = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      const next = [...prev, makeTab(id, initialUrl)];
      setActiveId(id);
      return next;
    });
  };

  const closeTab = (id: number) => {
    setTabs(prev => {
      const idx = prev.findIndex(t => t.id === id);
      if (idx === -1) return prev;
      const next = prev.filter(t => t.id !== id);
      if (!next.length) {
        const t = makeTab(1);
        setActiveId(1);
        return [t];
      }
      if (id === activeId) {
        const neighbor = next[Math.max(0, idx - 1)];
        setActiveId(neighbor.id);
      }
      return next;
    });
  };

  const canBack = active.index > 0;
  const canForward = active.index < active.history.length - 1;

  if (closed) return null;

  return (
    <div style={style}>
      {/* Row 1: Top bar with tabs + window controls */}
      <TopBar
        tabs={tabs}
        activeId={activeId}
        onActivate={setActiveId}
        onCloseTab={closeTab}
        // window controls live here now
        onMinimize={() => { setMinimized(p => !p); setMaximized(false); }}
        onMaximize={() => { setMaximized(p => !p); setMinimized(false); }}
        onCloseWindow={() => setClosed(true)}
        isMaximized={maximized}
      />

      {/* Row 2: Nav (no window controls) */}
      <NavBar
        url={active.url}
        canBack={canBack}
        canForward={canForward}
        onBack={back}
        onForward={forward}
        onReload={reload}
        onNavigate={navigate}
        onNewTab={() => newTab()}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", padding: 24, gap: 24, flex: 1 }}>
        <div style={{ fontSize: 32, color: "#b5a200", margin: "8px 0 0 0", textAlign: "center" }}>
          Google
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <input
            ref={searchInputRef}
            style={{
              width: 500, height: 44, borderRadius: 24, border: "1px solid #e0e0e0",
              padding: "0 20px", fontSize: 18, background: "#f8f9fa", outline: "none"
            }}
            placeholder="Search Google or type a URL"
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === "Enter") navigate(target.value);
            }}
          />
          <button
            style={{ marginLeft: -40, background: "none", border: "none", fontSize: 20, color: "#b5a200", cursor: "pointer" }}
            onClick={() => {
              const v = searchInputRef.current?.value ?? "";
              navigate(v);
            }}
            title="Use Enter to search"
            aria-label="Search"
          >
            <CiSearch />
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {shortcuts.map(({ label, icon, url }) => (
            <div
              key={label}
              onClick={() => navigate(url)}
              style={{
                background: "#f8f9fa", borderRadius: "50%", width: 64, height: 64,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer", flexDirection: "column",
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(url)}
            >
              {icon}
              <span style={{ fontSize: 12, marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
          <iframe
            key={`${active.id}-${active.reloadTick}-${active.url}`}
            src={active.url}
            title={`tab-${active.id}`}
            style={{ width: "100%", height: "100%", border: 0 }}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
