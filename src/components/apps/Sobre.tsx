"use client";

import { curriculo as c } from "@/data/curriculo";
import { Explorer, SidebarLink, SidebarSection, XpBox } from "../Explorer";
import { useOs } from "../os-context";
import { XpIcon } from "../XpIcon";

export function Sobre() {
  const { openApp } = useOs();
  return (
    <Explorer
      path="C:\Usuários\LuizVale\Portfólio\sobre.html"
      status={["Pronto", "Portfólio", "Zona: Internet"]}
      sidebar={
        <>
          <SidebarSection title="Seções" icon="folder">
            <SidebarLink icon="briefcase" onClick={() => openApp("experiencia")}>Experiência</SidebarLink>
            <SidebarLink icon="controlPanel" onClick={() => openApp("habilidades")}>Habilidades</SidebarLink>
            <SidebarLink icon="wordpad" onClick={() => openApp("formacao")}>Formação</SidebarLink>
            <SidebarLink icon="favorite" onClick={() => openApp("formacao")}>Objetivo</SidebarLink>
          </SidebarSection>
          <SidebarSection title="Links" icon="web">
            <SidebarLink icon="web" href={c.contact.githubHref}>GitHub</SidebarLink>
            <SidebarLink icon="network" href={c.contact.linkedinHref}>LinkedIn</SidebarLink>
            <SidebarLink icon="mail" href={`mailto:${c.contact.email}`}>E-mail</SidebarLink>
            <SidebarLink icon="phone" href={c.contact.phoneHref}>Telefone</SidebarLink>
          </SidebarSection>
        </>
      }
    >
      <div className="hero">
        <div className="hero-avatar">LV</div>
        <div className="hero-info">
          <h1>{c.name}</h1>
          <div className="role"><XpIcon name="computer" />{c.role} — {c.location}</div>
          <p className="bio">{c.bio}</p>
        </div>
      </div>
      <div className="sep" />
      <XpBox title="Contato & Links" icon="outlook">
        <div className="contact-grid">
          <a className="contact-item" href={c.contact.phoneHref}><XpIcon name="phone" />{c.contact.phone}</a>
          <a className="contact-item" href={`mailto:${c.contact.email}`}><XpIcon name="mail" />{c.contact.email}</a>
          <a className="contact-item" href={c.contact.githubHref} target="_blank" rel="noopener noreferrer"><XpIcon name="web" />{c.contact.github}</a>
          <a className="contact-item" href={c.contact.linkedinHref} target="_blank" rel="noopener noreferrer"><XpIcon name="network" />{c.contact.linkedin}</a>
          <span className="contact-item"><XpIcon name="network" />{c.location}</span>
        </div>
      </XpBox>
    </Explorer>
  );
}
