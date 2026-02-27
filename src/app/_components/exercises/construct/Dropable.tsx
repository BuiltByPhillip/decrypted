"use client"

import React, { forwardRef } from "react";

type DropableProps = {
  className?: string;
  children?: React.ReactNode;
}


export default forwardRef<HTMLDivElement, DropableProps>(function Dropable(props, ref) {
  const { className, children } = props;

  return (
    <div ref={ref} className={`w-50 h-50 border-3 border-dotted border-soft-white ${className ?? ''} `}>
      {children}
    </div>
  );
});