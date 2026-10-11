"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useOs } from "./os-context";
import { getMeta } from "./apps/meta";
import { XpIcon } from "./XpIcon";
import { MIN_H, MIN_W } from "./types";
import type { WinState } from "./types";

type Rect = Pick<WinState, "x" | "y" | "w" | "h">;

type Props = {
  state: WinState;
  active: boolean;
  mobile: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (r: Rect) => void;
  children: ReactNode;
};

const DIRS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;

export function Window({ state, active, mobile, onFocus, onClose, onMinimize, onToggleMax, onMove, onResize, children }: Props) {
  const meta = getMeta(state.id)!;
  const { openApp } = useOs();
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ dir: string; px: number; py: number; start: Rect } | null>(null);
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fixed = state.maximized || mobile;

  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menu]);

  const menus: Record<string, { label: string; run: () => void }[]> = {
    Arquivo: [
      { label: "Abrir Meus Documentos", run: () => openApp("documentos") },
      { label: "Fechar", run: onClose },
    ],
    Exibir: [
      { label: "Minimizar", run: onMinimize },
      { label: state.maximized ? "Restaurar" : "Maximizar", run: onToggleMax },
    ],
    Ajuda: [{ label: "Sobre Luiz Vale", run: () => openApp("sobre") }],
  };

  function titleDown(e: React.PointerEvent<HTMLDivElement>) {
    onFocus();
    if (fixed || e.button !== 0 || (e.target as HTMLElement).closest(".wbtn")) return;
    drag.current = { dx: e.clientX - state.x, dy: e.clientY - state.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setBusy(true);
  }

  function titleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current) onMove(e.clientX - drag.current.dx, e.clientY - drag.current.dy);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    drag.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setBusy(false);
  }

  function resizeDown(e: React.PointerEvent<HTMLDivElement>, dir: string) {
    if (e.button !== 0) return;
    e.stopPropagation();
    onFocus();
    resize.current = { dir, px: e.clientX, py: e.clientY, start: { x: state.x, y: state.y, w: state.w, h: state.h } };
    e.currentTarget.setPointerCapture(e.pointerId);
    setBusy(true);
  }

  function resizeMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = resize.current;
    if (!r) return;
    const dx = e.clientX - r.px;
    const dy = e.clientY - r.py;
    const next = { ...r.start };
    if (r.dir.includes("e")) next.w = Math.max(MIN_W, r.start.w + dx);
    if (r.dir.includes("s")) next.h = Math.max(MIN_H, r.start.h + dy);
    if (r.dir.includes("w")) {
      next.w = Math.max(MIN_W, r.start.w - dx);
      next.x = r.start.x + r.start.w - next.w;
    }
    if (r.dir.includes("n")) {
      next.h = Math.max(MIN_H, r.start.h - dy);
      next.y = r.start.y + r.start.h - next.h;
    }
    onResize(next);
  }

  function endResize(e: React.PointerEvent<HTMLDivElement>) {
    if (!resize.current) return;
    resize.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setBusy(false);
  }

  const cls = ["win", active && "win--active", state.minimized && "win--min", fixed && "win--fixed", busy && "win--busy"]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cls}
      style={{
        zIndex: state.z,
        ...(fixed ? {} : { left: state.x, top: state.y, width: state.w, height: state.h }),
      }}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={meta.title}
      aria-hidden={state.minimized}
    >
      <div
        className="titlebar"
        onPointerDown={titleDown}
        onPointerMove={titleMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => !mobile && onToggleMax()}
      >
        <span className="titlebar-icon"><XpIcon name={meta.icon} /></span>
        <span className="titlebar-text">{meta.title}</span>
        <div className="wbtns">
          <button type="button" className="wbtn" aria-label="Minimizar" onClick={onMinimize}>
            <svg viewBox="0 0 10 10" width="10" height="10"><rect x="1" y="7" width="6" height="2" fill="#fff" /></svg>
          </button>
          {!mobile && (
            <button type="button" className="wbtn" aria-label={state.maximized ? "Restaurar" : "Maximizar"} onClick={onToggleMax}>
              {state.maximized ? (
                <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1.4">
                  <rect x="1.7" y="3.7" width="5" height="4.6" />
                  <path d="M3.7 3.7V1.7h4.6v4.6h-1.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1.6">
                  <rect x="1.2" y="1.5" width="7.6" height="7" />
                </svg>
              )}
            </button>
          )}
          <button type="button" className="wbtn wbtn-close" aria-label="Fechar" onClick={onClose}>
            <svg viewBox="0 0 10 10" width="10" height="10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="win-body">
        <div className="menubar" ref={menuRef}>
          {Object.entries(menus).map(([name, items]) => (
            <div className="menu" key={name}>
              <button
                type="button"
                className={`menu-item${menu === name ? " menu-item--open" : ""}`}
                onClick={() => setMenu(menu === name ? null : name)}
                onMouseEnter={() => menu && setMenu(name)}
              >
                {name}
              </button>
              {menu === name && (
                <div className="dropdown">
                  {items.map((it) => (
                    <button
                      type="button"
                      key={it.label}
                      className="dropdown-item"
                      onClick={() => {
                        setMenu(null);
                        it.run();
                      }}
                    >
                      {it.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="win-client">{children}</div>
      </div>

      {!fixed && DIRS.map((d) => (
        <div
          key={d}
          className={`rz rz-${d}`}
          onPointerDown={(e) => resizeDown(e, d)}
          onPointerMove={resizeMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        />
      ))}
    </div>
  );
}
