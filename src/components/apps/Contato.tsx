import { curriculo as c } from "@/data/curriculo";
import type { IconKey } from "@/data/icons";
import { Explorer, XpBox } from "../Explorer";
import { XpIcon } from "../XpIcon";

export function Contato() {
  const rows: { icon: IconKey; label: string; text: string; href: string }[] = [
    { icon: "mail", label: "E-mail", text: c.contact.email, href: `mailto:${c.contact.email}` },
    { icon: "phone", label: "Telefone", text: c.contact.phone, href: c.contact.phoneHref },
    { icon: "web", label: "GitHub", text: c.contact.github, href: c.contact.githubHref },
    { icon: "textFile", label: "Currículo (PDF)", text: "Luiz_Vale_Resume_EN.pdf", href: c.contact.resumeHref },
  ];
  return (
    <Explorer path="C:\Usuários\LuizVale\Contatos" status={[`${rows.length} contatos`, c.location]}>
      <XpBox title="Vamos conversar?" icon="outlook">
        {rows.map((r) => (
          <a
            key={r.label}
            className="contact-row"
            href={r.href}
            {...(r.href.startsWith("http") || r.href.startsWith("/") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <XpIcon name={r.icon} size={32} />
            <span className="info-text">
              <strong>{r.label}</strong>
              <span>{r.text}</span>
            </span>
          </a>
        ))}
      </XpBox>
    </Explorer>
  );
}
