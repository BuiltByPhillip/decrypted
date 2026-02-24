"use client"

import { forwardRef, type ReactNode, useRef } from "react";

type DropableProps = {
  className?: string;
}


export default forwardRef<HTMLDivElement, DropableProps>(function Dropable(props, ref) {
  const { className } = props;

  return (
    <div ref={ref} className={`w-50 h-50 border-3 border-dotted border-soft-white ${className ?? ''} `}>

    </div>
  );
});