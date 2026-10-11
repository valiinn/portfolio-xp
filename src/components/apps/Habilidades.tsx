import { curriculo as c } from "@/data/curriculo";
import { Explorer, XpBox } from "../Explorer";
import { XpIcon } from "../XpIcon";

export function Habilidades() {
  const total = c.skills.reduce((n, s) => n + s.chips.length, 0);
  return (
    <Explorer
      path="C:\Windows\System32\habilidades.cpl"
      status={[`${c.skills.length} categorias · ${total} tecnologias`]}
    >
      {c.skills.map((s) => (
        <div key={s.title}>
          <div className="skills-cat"><XpIcon name={s.icon} />{s.title}</div>
          <div className="chips">
            {s.chips.map((chip) => (
              <span className={`chip chip-${s.color}`} key={chip}>{chip}</span>
            ))}
          </div>
          {s.level !== undefined && (
            <div className="xp-progress" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.title}>
              <div className="xp-progress-fill" style={{ width: `${s.level}%` }} />
            </div>
          )}
        </div>
      ))}
      <div className="sep" />
      <XpBox title="Idiomas" icon="language">
        {c.languages.map((l) => (
          <div className="info-row" key={l.name}>
            <XpIcon name={l.icon} size={28} />
            <div className="info-text">
              <strong>{l.name}</strong>
              <span>{l.level}</span>
            </div>
          </div>
        ))}
      </XpBox>
    </Explorer>
  );
}
