import type { PaletteItem as Item } from "~/app/hooks/parser";
import PaletteItem from "~/app/_components/exercises/construct/PaletteItem";

type ContainerProps = {
  paletteItems: Item[]
  onDrop: (x: number, y: number) =>  DOMRect | null;
  onStartDrag: (item: Item, x: number, y: number) => void;
}


export default function ExprContainer({ paletteItems, onDrop, onStartDrag }: ContainerProps) {

  return (
    <div className="bg-dark/70 border border-muted w-150 h-40 rounded-2xl overflow-hidden">
      {paletteItems.map((item, index) => (
        /*<Dragable onDrop={onDrop} paletteItem={item} key={index}/>*/
        <PaletteItem item={item} onStartDrag={onStartDrag} key={index} />
      ))}
    </div>
  );
}