import type { PaletteItem } from "~/app/hooks/parser";
import ExprBlock from "~/app/_components/exercises/construct/ExprBlock";

type DroppedExprProps = {
  item: PaletteItem;
  className?: string;
  onStartDrag: (item: PaletteItem, x: number, y: number, offsetX: number, offsetY: number) => void;
}

export default function DroppedExpr({ item, className, onStartDrag }: DroppedExprProps) {

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    onStartDrag(item, e.clientX, e.clientY, offsetX, offsetY);
  };

  return (
    <div className={`${className}`} onMouseDown={handleMouseDown}>
      <ExprBlock item={item}/>
    </div>
  );
}