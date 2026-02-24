"use client"

import { useRef, useState } from "react";
import Dragable from "~/app/_components/exercises/construct/Dragable";
import Dropable from "~/app/_components/exercises/construct/Dropable";
import ExprContainer from "~/app/_components/exercises/construct/ExprContainer";

export default function DragAndDrop() {
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
    <div className="flex flex-col items-center">
      <ExprContainer onDrop={checkDrop} expressions={[{kind: "int", value: 7}]}/>
      <Dropable ref={dropRef}/>
    </div>


  );
}