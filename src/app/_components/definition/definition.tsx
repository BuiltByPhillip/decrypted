"use client"

import Button from "~/components/Button";
import { useState, type ReactNode } from "react";

type DefinitionListProps = {
  children: ReactNode;
}

// Wrapper component that establishes the shared grid
export function DefinitionList({children}: DefinitionListProps) {
  return (
    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-y-4">
      {children}
    </div>
  );
}

type DefinitionProps = {
  name: string;
  choices: string[];
}

// Uses display:contents so children participate in parent grid
export default function Definition({choices, name}: DefinitionProps) {
  let [selected, setSelected] = useState<string>("");
  const elementOf = "\u2208";

  const select = (choice: string) => {
    if (selected === choice) {
      setSelected("");
      return
    }
    setSelected(choice);
  }

  return (
    <div className="contents">
      {/* Column 1: name, right-aligned */}
      <span className="text-xl font-bold text-right pr-2 bg-gradient-to-r from-cream to-light bg-clip-text text-transparent">{name}</span>
      {/* Column 2: element-of sign */}
      <span className="text-xl font-bold pr-4 bg-gradient-to-r from-cream to-light bg-clip-text text-transparent">{elementOf}</span>
      {/* Column 3: buttons */}
      <div className="flex items-center">
        {choices.map(choice => (
          <Button
            key={choice}
            variant={"definition"}
            className={`w-15 h-15 mr-4 ${selected === choice ? "bg-green text-green-foreground -translate-y-1 scale-105" : "text-muted"}`}
            onClick={() => {select(choice)}}
          >
            {choice}
          </Button>
        ))}
      </div>
    </div>
  );
}