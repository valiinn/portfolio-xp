import type { ComponentType } from "react";
import { Contato } from "./Contato";
import { Documentos } from "./Documentos";
import { Experiencia } from "./Experiencia";
import { Formacao } from "./Formacao";
import { Habilidades } from "./Habilidades";
import { Lixeira } from "./Lixeira";
import { Sobre } from "./Sobre";

export const APP_COMPONENTS: Record<string, ComponentType> = {
  sobre: Sobre,
  experiencia: Experiencia,
  habilidades: Habilidades,
  formacao: Formacao,
  contato: Contato,
  documentos: Documentos,
  lixeira: Lixeira,
};
