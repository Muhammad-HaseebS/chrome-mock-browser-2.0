import React from "react";
import { RxCross2 } from "react-icons/rx";

export type Tab = { id: number; title: string; url: string };

type Props = {
  tabs: Tab[];
  activeId: number;
  onActivate: (id: number) => void;
  onCloseTab: (id: number) => void;
};

const Tabs: React.FC<Props> = ({ tabs, activeId, onActivate, onCloseTab }) => {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <div
          key={t.id}
          className={`tab${activeId === t.id ? " active" : ""}`}
          onClick={() => onActivate(t.id)}
          title={t.url}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span>{t.title}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onCloseTab(t.id); }}
            title="Close tab"
            style={{
              border: "none", background: "transparent", cursor: "pointer",
              width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <RxCross2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
