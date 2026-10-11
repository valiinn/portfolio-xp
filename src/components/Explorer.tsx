import type { ReactNode } from "react";
import type { IconKey } from "@/data/icons";
import { XpIcon } from "./XpIcon";

type Props = {
  path: string;
  sidebar?: ReactNode;
  status?: string[];
  children: ReactNode;
};

export function Explorer({ path, sidebar, status = [], children }: Props) {
  return (
    <div className="explorer">
      <div className="addr">
        <span className="addr-label">Endereço:</span>
        <div className="addr-bar" title={path}>
          {path}
        </div>
      </div>
      <div className="explorer-content">
        {sidebar && <aside className="sidebar">{sidebar}</aside>}
        <main className="main">{children}</main>
      </div>
      <div className="statusbar">
        {status.map((s) => (
          <span className="status-panel" key={s}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SidebarSection({ title, icon, children }: { title: string; icon: IconKey; children: ReactNode }) {
  return (
    <section className="sidebar-section">
      <div className="sidebar-heading">
        <XpIcon name={icon} />
        {title}
      </div>
      {children}
    </section>
  );
}

type LinkProps = { icon: IconKey; children: ReactNode; onClick?: () => void; href?: string };

export function SidebarLink({ icon, children, onClick, href }: LinkProps) {
  const content = (
    <>
      <XpIcon name={icon} />
      {children}
    </>
  );
  if (href) {
    const external = href.startsWith("http");
    return (
      <a className="sidebar-link" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className="sidebar-link" onClick={onClick}>
      {content}
    </button>
  );
}

export function XpBox({ title, icon, children }: { title: string; icon: IconKey; children: ReactNode }) {
  return (
    <div className="xp-box">
      <div className="xp-box-title">
        <XpIcon name={icon} />
        {title}
      </div>
      <div className="xp-box-body">{children}</div>
    </div>
  );
}
