import type { PaletteItem as Item } from "~/app/hooks/parser";
import PaletteItem from "~/app/_components/exercises/construct/PaletteItem";

type ContainerProps = {
  paletteItems: Item[]
  onStartDrag: (item: Item, x: number, y: number, offsetX: number, offsetY: number) => void;
}


export default function ExprContainer({ paletteItems, onStartDrag }: ContainerProps) {

  return (
    <div className="grid grid-cols-13 gap-1 p-2 bg-dark/70 border border-muted w-150 h-40 rounded-2xl overflow-hidden">
      {paletteItems.map((item, index) => (
        <PaletteItem item={item} onStartDrag={onStartDrag} key={index} />
      ))}
    </div>
  );
}