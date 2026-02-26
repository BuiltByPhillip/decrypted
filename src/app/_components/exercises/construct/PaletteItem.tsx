import { operatorSymbol, type PaletteItem } from "~/app/hooks/parser";

type PaletteItemProps = {
  item: PaletteItem;
  onStartDrag: (item: PaletteItem, x: number, y: number, offsetX: number, offsetY: number) => void;
}

export default function PaletteItem({ item, onStartDrag }: PaletteItemProps) {

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    onStartDrag(item, e.clientX, e.clientY, offsetX, offsetY);
  };

  const renderValue = (item: PaletteItem) => {
    switch (item.kind) {
      case "int":
        return <div>{item.value}</div>;
      case "var":
        return <div>{item.name}</div>;
      case "role":
        return <div>{item.name}</div>;
      case "operator":
        return <div>{operatorSymbol[item.op]}</div>
    }
  }

  return (
    <div
      className="flex bg-dark h-10 w-10 cursor-pointer rounded-2xl justify-center items-center text-muted text-2xl select-none"
      onMouseDown={handleMouseDown}
    >
      {renderValue(item)}
    </div>
  );
}