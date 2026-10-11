"use client";

import { getMeta } from "./apps/meta";
import { XpIcon } from "./XpIcon";
import { curriculo as c } from "@/data/curriculo";

type Props = {
  onOpen: (id: string) => void;
  onLogoff: () => void;
  onShutdown: () => void;
};

const LEFT = ["sobre", "experiencia", "habilidades", "formacao", "contato"];

export function StartMenu({ onOpen, onLogoff, onShutdown }: Props) {
  return (
    <div className="start-menu" onPointerDown={(e) => e.stopPropagation()}>
      <div className="sm-header">
        <div className="sm-avatar">LV</div>
        <strong>{c.name}</strong>
      </div>
      <div className="sm-cols">
        <div className="sm-left">
          {LEFT.map((id) => {
            const m = getMeta(id)!;
            return (
              <button type="button" className="sm-item" key={id} onClick={() => onOpen(id)}>
                <XpIcon name={m.icon} size={28} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
        <div className="sm-right">
          <button type="button" className="sm-item sm-item--r" onClick={() => onOpen("documentos")}>
            <XpIcon name="documents" size={28} />Meus Documentos
          </button>
          <a className="sm-item sm-item--r" href={c.contact.githubHref} target="_blank" rel="noopener noreferrer">
            <XpIcon name="web" size={28} />GitHub
          </a>
          <a className="sm-item sm-item--r" href={`mailto:${c.contact.email}`}>
            <XpIcon name="mail" size={28} />E-mail
          </a>
          <a className="sm-item sm-item--r" href={c.contact.resumeHref} target="_blank" rel="noopener noreferrer">
            <XpIcon name="textFile" size={28} />Currículo (PDF)
          </a>
          <button type="button" className="sm-item sm-item--r" onClick={() => onOpen("lixeira")}>
            <XpIcon name="trash" size={28} />Lixeira
          </button>
        </div>
      </div>
      <div className="sm-footer">
        <button type="button" className="sm-foot-btn" onClick={onLogoff}><XpIcon name="logoff" size={20} />Fazer logoff</button>
        <button type="button" className="sm-foot-btn" onClick={onShutdown}><XpIcon name="shutdown" size={20} />Desligar</button>
      </div>
    </div>
  );
}
