import { operatorSymbol, type PaletteItem } from "~/app/hooks/parser";

type PaletteItemProps = {
  item: PaletteItem;
  onStartDrag: (item: PaletteItem, x: number, y: number) => void;
}

export default function PaletteItem({ item, onStartDrag }: PaletteItemProps) {

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
      onClick={() => onStartDrag}
    >
      {renderValue(item)}
    </div>
  );
}