import type { PaletteItem } from "~/app/hooks/parser";
import Dragable from "~/app/_components/exercises/construct/Dragable";

type ContainerProps = {
  paletteItems: PaletteItem[]
  onDrop: (x: number, y: number) =>  DOMRect | null;
}


export default function ExprContainer({ paletteItems, onDrop }: ContainerProps) {

  return (
    <div className="bg-dark/70 border border-muted w-150 h-40 rounded-2xl overflow-hidden">
      {paletteItems.map((item, index) => (
        <Dragable onDrop={onDrop} paletteItem={item} key={index}/>
      ))}
    </div>
  );
}