import Button from "~/components/Button";
import type { Expr } from "~/app/hooks/parser"
import { type ReactNode } from "react";

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
  choices: Expr[];
  onChange: (role: string, symbol: Expr) => void;
  selected?: Expr;
}

// Uses display:contents so children participate in parent grid
export default function Definition({ choices, name, onChange, selected }: DefinitionProps) {
  const elementOf = "\u2208";
  const selectedName = selected?.kind === "var" ? selected.name : undefined;

  return (
    <div className="contents">
      {/* Column 1: name, right-aligned */}
      <span className="text-xl font-bold text-left pr-2 text-gray">{name}</span>
      {/* Column 2: element-of sign */}
      <span className="text-xl font-bold pr-4 text-gray">{elementOf}</span>
      {/* Column 3: buttons */}
      <div className="flex items-center">
        {choices.map(choice => {
          if (choice.kind === "var") {
            const isSelected: boolean = selectedName === choice.name;
            return (
              <Button
                key={choice.name}
                variant={"definition"}
                className={`mr-4 h-15 w-15
                ${isSelected ? "bg-green text-green-foreground -translate-y-1 scale-105" : "text-muted border border-muted"}
                ${selectedName && !isSelected ? "opacity-50" : ""}
                `}
                onClick={() => onChange(name, choice)}
              >
                {choice.name}
              </Button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}