"use client";

import { useEffect, useState } from "react";
import { getMeta } from "./apps/meta";
import { XpIcon } from "./XpIcon";
import type { WinState } from "./types";

type Props = {
  wins: WinState[];
  activeId: string | null;
  startOpen: boolean;
  muted: boolean;
  onToggleStart: () => void;
  onToggleMute: () => void;
  onTaskClick: (id: string) => void;
};

export function Taskbar({ wins, activeId, startOpen, muted, onToggleStart, onToggleMute, onTaskClick }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const time = now?.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) ?? "";
  const date = now?.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="taskbar" onPointerDown={(e) => e.stopPropagation()}>
      <button type="button" className={`start-btn${startOpen ? " start-btn--open" : ""}`} onClick={onToggleStart}>
        <span className="start-logo" aria-hidden>
          <i /><i /><i /><i />
        </span>
        <span className="start-text">iniciar</span>
      </button>
      <div className="tasks">
        {wins.map((w) => {
          const meta = getMeta(w.id)!;
          const isActive = w.id === activeId;
          return (
            <button
              type="button"
              key={w.id}
              className={`task${isActive ? " task--active" : ""}`}
              onClick={() => onTaskClick(w.id)}
              title={meta.title}
            >
              <XpIcon name={meta.icon} />
              <span className="task-text">{meta.label}</span>
            </button>
          );
        })}
      </div>
      <div className="tray">
        <span className="tray-icons">
          <button type="button" className="tray-btn" onClick={onToggleMute} aria-pressed={muted} title={muted ? "Ativar som" : "Silenciar"}>
            <XpIcon name={muted ? "mute" : "sound"} />
          </button>
          <XpIcon name="network" />
          <XpIcon name="security" />
        </span>
        <span className="clock" title={date}>{time}</span>
      </div>
    </div>
  );
}
