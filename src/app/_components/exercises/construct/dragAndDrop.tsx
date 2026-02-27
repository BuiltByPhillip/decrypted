"use client"

import { useRef, useState } from "react";
import Dropable from "~/app/_components/exercises/construct/Dropable";
import ExprContainer from "~/app/_components/exercises/construct/ExprContainer";
import type { PaletteItem as Item} from "~/app/hooks/parser";
import DragGhost from "~/app/_components/exercises/construct/DragGhost";
import PaletteItem from "~/app/_components/exercises/construct/PaletteItem";
import DroppedExpr from "~/app/_components/exercises/construct/DroppedExpr";

export default function DragAndDrop() {
  const dropRef = useRef<HTMLDivElement>(null);
  const [droppedItems, setDroppedItems] = useState<Item[]>([])
  const [dragState, setDragState] = useState<{
    item: Item;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const addItem = (item: Item) => {
    setDroppedItems([...droppedItems, item]);
  }

  const checkDrop = (x:number, y:number) :  DOMRect | null => {
    const bounds = dropRef.current?.getBoundingClientRect();
    if (!bounds) return null;

    const isInside = (
      x >= bounds.left &&
      x <= bounds.right &&
      y <= bounds.bottom &&
      y >= bounds.top
    );

    return isInside ? bounds : null;
  }

  const onStartDrag = (item: Item, x: number, y: number, offsetX: number, offsetY: number) => {
    setDragState({
      item: item,
      x: x,
      y: y,
      offsetX: offsetX,
      offsetY: offsetY,
    })
  }

  return (
    <div className="flex flex-col items-center">
      <ExprContainer
        paletteItems={[{kind: "operator", op: "div"}, {kind: "operator", op: "mul"}]}
        onStartDrag={onStartDrag}
      />
      {dragState && (
        <DragGhost
          paletteItem={dragState.item}
          startX={dragState.x}
          startY={dragState.y}
          offsetX={dragState.offsetX}
          offsetY={dragState.offsetY}
          onDrop={(x, y) => {
            const bounds = checkDrop(x, y);
            if (bounds) {
              addItem(dragState?.item)
            }
            setDragState(null)
          }}
        />
      )}
      <Dropable ref={dropRef}>
        {droppedItems.map((item, i) => (
          <DroppedExpr key={i} item={item} onStartDrag={onStartDrag}></DroppedExpr>
        ))}
      </Dropable>
    </div>


  );
}