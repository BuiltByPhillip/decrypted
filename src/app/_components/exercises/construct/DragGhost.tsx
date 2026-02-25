import { useEffect, useRef } from "react";
import { operatorSymbol, type PaletteItem } from "~/app/hooks/parser";

type DragGhostProps = {
  paletteItem: PaletteItem;
  startX: number;
  startY: number;
  onDrop: (x: number, y: number) => void;
}

export default function DragGhost({ paletteItem, onDrop, startX, startY }: DragGhostProps) {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ startX, startY });
  const onDropRef = useRef(onDrop);

  useEffect(() => {
    ref.current!.style.left = startX + "px";
    ref.current!.style.top = startY + "px";

    const mousemove = (event: MouseEvent) => {
      const deltaX = posRef.current.startX - event.clientX;
      const deltaY = posRef.current.startY - event.clientY;

      posRef.current.startX = event.clientX;
      posRef.current.startY = event.clientY;

      ref.current!.style.top = (ref.current!.offsetTop - deltaY) + "px";
      ref.current!.style.left = (ref.current!.offsetLeft - deltaX) + "px";
    };

    const mouseup = (event: MouseEvent) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      onDropRef.current(event.clientX, event.clientY);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      ref={ref}
      className="flex bg-dark fixed h-10 w-10 cursor-pointer rounded-2xl justify-center items-center text-muted text-2xl select-none"
    >
      {/* Remember to render the Expr type with the map operatorSymbol inside Parser.ts */}
      {renderValue(paletteItem)}
    </div>
  );
}