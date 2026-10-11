import type { IconKey } from "@/data/icons";
import { curriculo } from "@/data/curriculo";

export type AppMeta = {
  id: string;
  icon: IconKey;
  label: string;
  title: string;
  w: number;
  h: number;
  /** Aparece como ícone na área de trabalho */
  desktop?: boolean;
  /** Aparece como arquivo em "Meus Documentos" */
  doc?: boolean;
  /** Em vez de abrir uma janela, abre este link */
  link?: string;
};

export const APP_META: AppMeta[] = [
  { id: "sobre", icon: "user", label: "Sobre Mim", title: "Luiz Vale — Desenvolvedor de Software", w: 720, h: 470, desktop: true, doc: true },
  { id: "experiencia", icon: "briefcase", label: "Experiência", title: "Experiência Profissional — Windows Explorer", w: 700, h: 480, desktop: true, doc: true },
  { id: "habilidades", icon: "controlPanel", label: "Habilidades", title: "Habilidades Técnicas — Propriedades do Sistema", w: 620, h: 500, desktop: true, doc: true },
  { id: "formacao", icon: "wordpad", label: "Formação", title: "Formação Acadêmica & Objetivo", w: 560, h: 400, desktop: true, doc: true },
  { id: "contato", icon: "outlook", label: "Contato", title: "Contato — Outlook Express", w: 520, h: 360, desktop: true, doc: true },
  { id: "documentos", icon: "documents", label: "Meus Documentos", title: "Meus Documentos", w: 600, h: 400, desktop: true },
  { id: "github", icon: "web", label: "GitHub", title: "GitHub", w: 0, h: 0, desktop: true, link: curriculo.contact.githubHref },
  { id: "linkedin", icon: "network", label: "LinkedIn", title: "LinkedIn", w: 0, h: 0, desktop: true, link: curriculo.contact.linkedinHref },
  { id: "lixeira", icon: "trash", label: "Lixeira", title: "Lixeira", w: 460, h: 300, desktop: true },
];

export const getMeta = (id: string) => APP_META.find((a) => a.id === id);
