"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { APP_COMPONENTS } from "./apps/registry";
import { APP_META, getMeta } from "./apps/meta";
import { IconButton } from "./IconButton";
import { OsContext } from "./os-context";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { TASKBAR_H } from "./types";
import type { WinState } from "./types";
import { Window } from "./Window";
import { curriculo as c } from "@/data/curriculo";
import { sounds } from "@/lib/sounds";

type Screen = "login" | "desktop" | "off";

const MOBILE_QUERY = "(max-width: 720px)";

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(MOBILE_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));

export function Desktop() {
  const [screen, setScreen] = useState<Screen>("login");
  const [wins, setWins] = useState<WinState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const zRef = useRef(10);
  const mobile = useIsMobile();

  useEffect(() => {
    void sounds.preload();
  }, []);

  const activeId = useMemo(() => {
    const visible = wins.filter((w) => !w.minimized);
    return visible.length ? visible.reduce((a, b) => (b.z > a.z ? b : a)).id : null;
  }, [wins]);

  const patch = useCallback((id: string, fn: (w: WinState) => Partial<WinState>) => {
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...fn(w) } : w)));
  }, []);

  const focus = useCallback(
    (id: string) => {
      const z = ++zRef.current;
      patch(id, () => ({ z }));
    },
    [patch],
  );

  const openApp = useCallback((id: string) => {
    const meta = getMeta(id);
    if (!meta) return;
    setStartOpen(false);
    if (meta.link) {
      window.open(meta.link, "_blank", "noopener,noreferrer");
      return;
    }
    const z = ++zRef.current;
    setWins((prev) => {
      if (prev.some((w) => w.id === id)) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z } : w));
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight - TASKBAR_H;
      const w = Math.min(meta.w, vw - 16);
      const h = Math.min(meta.h, vh - 16);
      const step = prev.length % 6;
      const x = clamp(Math.round((vw - w) / 2) + (step - 2) * 30 + 40, 8, vw - w - 8);
      const y = clamp(Math.round((vh - h) / 2) + (step - 2) * 26 - 10, 8, vh - h - 8);
      return [...prev, { id, x, y, w, h, z, minimized: false, maximized: false }];
    });
  }, []);

  const closeApp = useCallback((id: string) => setWins((prev) => prev.filter((w) => w.id !== id)), []);

  const moveWin = useCallback(
    (id: string, x: number, y: number) =>
      patch(id, (w) => ({
        x: clamp(x, 100 - w.w, window.innerWidth - 100),
        y: clamp(y, 0, window.innerHeight - TASKBAR_H - 30),
      })),
    [patch],
  );

  const minimize = (id: string) => {
    sounds.minimize();
    patch(id, () => ({ minimized: true }));
  };

  const onTaskClick = (id: string) => {
    const w = wins.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) sounds.restore();
    if (w.minimized || id !== activeId) openApp(id);
    else minimize(id);
  };

  useEffect(() => {
    const onResize = () =>
      setWins((prev) =>
        prev.map((w) => ({
          ...w,
          x: clamp(w.x, 100 - w.w, window.innerWidth - 100),
          y: clamp(w.y, 0, window.innerHeight - TASKBAR_H - 30),
        })),
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const login = () => {
    sounds.startup();
    setScreen("desktop");
    openApp("sobre");
  };

  const leave = (next: Screen) => {
    if (next === "off") sounds.shutdown();
    else sounds.logoff();
    setWins([]);
    setStartOpen(false);
    setScreen(next);
  };

  const toggleMute = () => {
    sounds.setMuted(!muted);
    setMuted(!muted);
  };

  if (screen === "login") {
    return (
      <div className="login">
        <div className="login-bar login-bar--top" />
        <div className="login-center">
          <div className="login-brand">
            <div className="start-logo start-logo--big" aria-hidden>
              <i /><i /><i /><i />
            </div>
            <div className="login-os">Portfólio <sup>xp</sup></div>
          </div>
          <button type="button" className="login-user" onClick={login} autoFocus>
            <span className="login-avatar">LV</span>
            <span>
              <strong>{c.name}</strong>
              <small>{c.role}</small>
            </span>
          </button>
        </div>
        <div className="login-bar login-bar--bottom">
          <span>Clique no usuário para entrar</span>
        </div>
      </div>
    );
  }

  if (screen === "off") {
    return (
      <button type="button" className="off" onClick={() => setScreen("login")} autoFocus>
        <span>Agora é seguro desligar o computador.</span>
        <small>Clique para ligar novamente</small>
      </button>
    );
  }

  return (
    <OsContext.Provider value={{ openApp, closeApp }}>
      <div
        className="desktop"
        onPointerDown={() => setStartOpen(false)}
        onClickCapture={(e) => {
          const el = e.target as HTMLElement;
          if (el.closest("button, a, [role=button]") && !el.closest(".wbtn, .task")) sounds.click();
        }}
      >
        <div className="workspace">
          <div className="icons">
            {APP_META.filter((a) => a.desktop).map((a) => (
              <IconButton key={a.id} icon={a.icon} label={a.label} onOpen={() => openApp(a.id)} />
            ))}
          </div>

          {wins.map((w) => {
            const App = APP_COMPONENTS[w.id];
            return (
              <Window
                key={w.id}
                state={w}
                active={w.id === activeId}
                mobile={mobile}
                onFocus={() => w.id !== activeId && focus(w.id)}
                onClose={() => closeApp(w.id)}
                onMinimize={() => minimize(w.id)}
                onToggleMax={() => patch(w.id, (s) => ({ maximized: !s.maximized }))}
                onMove={(x, y) => moveWin(w.id, x, y)}
                onResize={(r) => patch(w.id, () => r)}
              >
                <App />
              </Window>
            );
          })}
        </div>

        {startOpen && <StartMenu onOpen={openApp} onLogoff={() => leave("login")} onShutdown={() => leave("off")} />}
        <Taskbar
          wins={wins}
          activeId={activeId}
          startOpen={startOpen}
          muted={muted}
          onToggleStart={() => setStartOpen((o) => !o)}
          onToggleMute={toggleMute}
          onTaskClick={onTaskClick}
        />
      </div>
    </OsContext.Provider>
  );
}
