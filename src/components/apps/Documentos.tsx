"use client";

import { Explorer } from "../Explorer";
import { IconButton } from "../IconButton";
import { useOs } from "../os-context";
import { APP_META } from "./meta";

export function Documentos() {
  const { openApp } = useOs();
  const docs = APP_META.filter((a) => a.doc);
  return (
    <Explorer path="C:\Usuários\LuizVale\Meus Documentos" status={[`${docs.length} objetos`, "Dê dois cliques para abrir"]}>
      <div className="file-grid">
        {docs.map((d) => (
          <IconButton key={d.id} variant="light" icon={d.icon} label={d.label} onOpen={() => openApp(d.id)} />
        ))}
      </div>
    </Explorer>
  );
}
