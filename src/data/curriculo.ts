import type { IconKey } from "./icons";
import { asset } from "../lib/asset";

export type Experience = {
  icon: IconKey;
  title: string;
  company: string;
  period: string;
  items: string[];
};

export type SkillGroup = {
  icon: IconKey;
  title: string;
  color: "blue" | "gray" | "green";
  level?: number;
  chips: string[];
};

export const curriculo = {
  name: "Luiz Vale",
  role: "Desenvolvedor de Software",
  location: "Brasília, DF",
  bio: "Estudante de Ciência da Computação no último ano, com experiência prática em desenvolvimento de software em ambiente profissional. Atuação em sistemas web e mobile, automação, dashboards e soluções com IA generativa. Perfil autodidata, focado em projetos funcionais e aprendizado contínuo.",
  contact: {
    phone: "+55 (61) 99640-4004",
    phoneHref: "tel:+5561996404004",
    email: "luizeduardo3000@gmail.com",
    github: "github.com/valiinn",
    githubHref: "https://github.com/valiinn",
    linkedin: "linkedin.com/in/luiz-eduardo-de-sousa-vale-8ba511269",
    linkedinHref: "https://www.linkedin.com/in/luiz-eduardo-de-sousa-vale-8ba511269",
    resumeHref: asset("/Curriculo_Luiz_Vale.pdf"),
  },
  experience: [
    {
      icon: "media",
      title: "Estagiário em Desenvolvimento de Software",
      company: "Record TV",
      period: "Out 2024 – Jan 2026",
      items: [
        "Desenvolvimento de aplicações reais utilizadas internamente na emissora",
        "Gerenciador de mídias para organização e controle de conteúdos",
        "Sistema de controle de playlists para vMix",
        "Aplicativo mobile de TV 3.0 no estilo Netflix",
        "Plataforma de prompts específicos com a API da OpenAI",
        "Sistema de relatórios diários com Grafana",
        "Stack: Node.js · Python · APIs REST · Android Studio · Kotlin",
      ],
    },
    {
      icon: "support",
      title: "Suporte Técnico / Help Desk",
      company: "Atacadão Dia a Dia",
      period: "Jun 2023 – Jan 2024",
      items: [
        "Atendimento e suporte técnico no dia a dia",
        "Resolução de problemas relacionados a sistema e controle de acessos",
        "Comunicação direta com usuários internos e equipe de TI",
      ],
    },
  ] satisfies Experience[],
  skills: [
    { icon: "terminal", title: "Linguagens de Programação", color: "blue", level: 85, chips: ["JavaScript", "Python", "Kotlin"] },
    { icon: "config", title: "Back-end", color: "gray", level: 80, chips: ["Node.js", "Django", "REST APIs"] },
    { icon: "phone", title: "Mobile", color: "green", level: 70, chips: ["Android Studio", "Android com Kotlin"] },
    { icon: "drive", title: "Banco de Dados", color: "gray", level: 72, chips: ["MongoDB", "PostgreSQL"] },
    { icon: "tools", title: "Ferramentas & Tecnologias", color: "blue", chips: ["Git & GitHub", "Docker", "Grafana", "Linux", "OpenAI API"] },
  ] satisfies SkillGroup[],
  languages: [
    { icon: "language" as const, name: "Inglês", level: "Avançado — leitura, escrita e comunicação técnica" },
    { icon: "language" as const, name: "Português", level: "Nativo" },
  ],
  education: {
    icon: "wordpad" as const,
    degree: "Bacharelado em Ciência da Computação",
    school: "Centro Universitário de Brasília (CEUB)",
    note: "Conclusão prevista: 2026",
  },
  objective:
    "Atuar como desenvolvedor júnior ou estagiário avançado, com foco em desenvolvimento web e mobile, buscando crescimento técnico em ambientes que valorizem inovação, aprendizado contínuo e aplicação real de tecnologia.",
};

export type Curriculo = typeof curriculo;
