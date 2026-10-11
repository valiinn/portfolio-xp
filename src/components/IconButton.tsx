"use client";

import type { IconKey } from "@/data/icons";
import { XpIcon } from "./XpIcon";

type Props = {
  icon: IconKey;
  label: string;
  onOpen: () => void;
  variant?: "desktop" | "light";
};

/** Duplo clique abre (como no XP); em telas de toque, um toque basta. Foco = seleção. */
export function IconButton({ icon, label, onOpen, variant = "desktop" }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`ibtn ibtn--${variant}`}
      onClick={() => {
        if (window.matchMedia("(pointer: coarse)").matches) onOpen();
      }}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <span className="ibtn-img">
        <XpIcon name={icon} size={variant === "desktop" ? 40 : 36} />
      </span>
      <span className="ibtn-label">{label}</span>
    </div>
  );
}
