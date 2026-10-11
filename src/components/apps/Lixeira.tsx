import { Explorer } from "../Explorer";
import { XpIcon } from "../XpIcon";

export function Lixeira() {
  return (
    <Explorer path="C:\Lixeira" status={["0 objetos"]}>
      <div className="empty">
        <XpIcon name="trash" size={56} />
        <strong>A Lixeira está vazia.</strong>
        <span>Nenhum código ruim por aqui.</span>
      </div>
    </Explorer>
  );
}
