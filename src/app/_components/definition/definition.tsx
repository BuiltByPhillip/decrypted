"use client"

import Button from "~/components/Button";
import { useState } from "react";

type DefinitionProps = {
  choices: string[];
}

export default function Definition({choices}: DefinitionProps) {
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
    <div className="flex items-center">
      {/* Symbol name */}
      <span className="text-xl pr-4">Generator</span>
      {/* Element of sign */}
      <span className="text-xl pr-2">{elementOf}</span>
      {/* A button for each choice */}
      {choices.map(choice => (
        <Button
          key={choice}
          variant={"definition"}
          className={`w-15 h-15 mr-4 ${selected === choice ? "bg-green text-green-foreground" : "text-muted"}`}
          onClick={() => {select(choice)}}
        >
          {choice}
        </Button>
      ))}
    </div>
  );
}