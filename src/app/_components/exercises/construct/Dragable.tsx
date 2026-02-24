import { useRef } from "react";
import { type Expr } from "~/app/hooks/parser";

type DragableProps = {
  value: Expr;
  onDrop: (x: number, y: number) =>  DOMRect | null;
}

export default function Dragable({ value, onDrop }: DragableProps) {
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

  const renderValue = (value: Expr) => {
        switch (value.kind) {
          case "int":
          return <div>{value.value}</div>;
          case "var":
            return <div>{value.name}</div>;
          case "role":
            return <div>{value.name}</div>;
          case "placeholder":
            return <div>_{value.index}</div>;
          case "and":
            return <div>{/* handle left and right */}</div>
        }
  }

  return (
    <div
      ref={ref}
      onMouseDown={mouseDown}
      className="flex bg-dark fixed h-50 w-50 cursor-pointer border-2 border-muted-foreground justify-center items-center text-soft-white text-2xl"
    >
      {renderValue(value)}
    </div>
  );
}