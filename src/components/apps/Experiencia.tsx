"use client";

import { curriculo as c } from "@/data/curriculo";
import { Explorer, SidebarLink, SidebarSection } from "../Explorer";
import { useOs } from "../os-context";
import { XpIcon } from "../XpIcon";

export function Experiencia() {
  const { openApp } = useOs();
  return (
    <Explorer
      path="C:\Usuários\LuizVale\Portfólio\experiencia"
      status={[`${c.experience.length} objetos`, "Experiência: 2+ anos"]}
      sidebar={
        <>
          <SidebarSection title="Empregos" icon="briefcase">
            {c.experience.map((e) => (
              <SidebarLink
                key={e.company}
                icon={e.icon}
                onClick={() => document.getElementById(`exp-${e.company}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                {e.company}
              </SidebarLink>
            ))}
          </SidebarSection>
          <SidebarSection title="Detalhes" icon="explorer">
            <div className="sidebar-note">
              <div>{c.experience.length} registros</div>
              <div>2023 – 2026</div>
            </div>
          </SidebarSection>
          <SidebarSection title="Ir para" icon="folder">
            <SidebarLink icon="controlPanel" onClick={() => openApp("habilidades")}>Habilidades</SidebarLink>
          </SidebarSection>
        </>
      }
    >
      {c.experience.map((e) => (
        <article className="exp-item" key={e.company} id={`exp-${e.company}`}>
          <header className="exp-item-header">
            <div>
              <div className="exp-item-title"><XpIcon name={e.icon} size={20} />{e.title}</div>
              <div className="exp-item-company">{e.company}</div>
            </div>
            <span className="exp-badge">{e.period}</span>
          </header>
          <ul className="exp-list">
            {e.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
      ))}
    </Explorer>
  );
}
