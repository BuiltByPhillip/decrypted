import { useRef } from "react";
import { operatorSymbol, type PaletteItem } from "~/app/hooks/parser";

type DragableProps = {
  paletteItem: PaletteItem;
  onDrop: (x: number, y: number) =>  DOMRect | null;
}

export default function Dragable({ paletteItem, onDrop }: DragableProps) {
  const posRef = useRef({ newX: 0, newY: 0, startX: 0, startY: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const mouseDown = (event: React.MouseEvent) => {
    posRef.current.startX = event.clientX;
    posRef.current.startY = event.clientY;

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  const mousemove = (event: MouseEvent) => {
    posRef.current.newX = posRef.current.startX - event.clientX;
    posRef.current.newY = posRef.current.startY - event.clientY;

    posRef.current.startX = event.clientX;
    posRef.current.startY = event.clientY;

    ref.current!.style.top =
      ref.current!.offsetTop - posRef.current.newY + "px";
    ref.current!.style.left =
      ref.current!.offsetLeft - posRef.current.newX + "px";
  };

  const mouseup = (event: MouseEvent) => {
    document.removeEventListener("mousemove", mousemove);
    const bounds = onDrop(event.clientX, event.clientY);
    if (bounds) {
      ref.current!.style.top = bounds.top + "px";
      ref.current!.style.left = bounds.left + "px";
    }

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
            return <div>{item.op}</div>
        }
  }

  return (
    <div
      ref={ref}
      onMouseDown={mouseDown}
      className="flex bg-dark fixed h-10 w-10 cursor-pointer rounded-2xl justify-center items-center text-soft-white text-2xl select-none"
    >
      {/* Remember to render the Expr type with the map operatorSymbol inside Parser.ts */}
      {renderValue(paletteItem)}
    </div>
  );
}