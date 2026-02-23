"use client"

import { forwardRef, type ReactNode, useRef } from "react";


export default forwardRef<HTMLDivElement>(function Dropable(props, ref) {

  return (
    <div ref={ref} className="w-50 h-50 border-3 border-dotted border-soft-white">

    </div>
  );
});