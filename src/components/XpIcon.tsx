import { ICONS } from "@/data/icons";
import type { IconKey } from "@/data/icons";
import { asset } from "@/lib/asset";

type Props = { name: IconKey; size?: number; className?: string };

export function XpIcon({ name, size = 16, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/icons/${ICONS[name]}.webp`)}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`xpi${className ? ` ${className}` : ""}`}
    />
  );
}
