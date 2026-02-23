"use client"

import { useRef, useState } from "react";
import Dragable from "~/app/_components/exercises/construct/Dragable";
import Dropable from "~/app/_components/exercises/construct/Dropable";

export default function DragAndDrop() {
  const [isDropped, setIsDropped] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

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

  return (
    <div>
      <Dragable onDrop={checkDrop}/>
      <Dropable ref={dropRef}/>
    </div>


  );
}