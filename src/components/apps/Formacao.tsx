import { curriculo as c } from "@/data/curriculo";
import { Explorer, XpBox } from "../Explorer";
import { XpIcon } from "../XpIcon";

export function Formacao() {
  return (
    <Explorer path="C:\Usuários\LuizVale\Portfólio\formacao.doc" status={["Pronto", "© 2026 Luiz Vale"]}>
      <XpBox title="Graduação" icon="wordpad">
        <div className="info-row">
          <XpIcon name={c.education.icon} size={32} />
          <div className="info-text">
            <strong>{c.education.degree}</strong>
            <span>{c.education.school} — {c.education.note}</span>
          </div>
        </div>
      </XpBox>
      <XpBox title="Objetivo Profissional" icon="favorite">
        <p className="objective">{c.objective}</p>
      </XpBox>
    </Explorer>
  );
}
