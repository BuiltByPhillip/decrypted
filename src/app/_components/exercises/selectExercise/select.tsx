"use client"

import Option from "~/app/_components/exercises/selectExercise/option"
import Button from "~/components/Button";
import Hint from "~/app/_components/exercises/selectExercise/hint";
import { useState } from "react";
import type { Expr } from "~/app/hooks/parser"

type SelectExerciseProps = {
  numberOfOptions: number;
  options: string[];
  description: string;
  prompt: string;
  hint?: string;
  answers: Expr[];
}

export default function SelectExercise({numberOfOptions, options, description, prompt, hint, answers}: SelectExerciseProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    selected.includes(index)
      ? setSelected(selected.filter(option => option !== index))
      : setSelected([...selected, index]);
  }

  return (
    <div className="flex flex-col items-center w-full">

      <div className="flex flex-col items-center p-8 gap-3">
        {/* Description */}
        <span className="text-4xl font-bold text-gray">
          {description}
        </span>

        {/* Prompt*/}
        <span className="text-xl text-gray/70">{prompt}</span>
      </div>

      {/* Multiple-choice option buttons */}
      <div className="grid w-full grid-cols-2 gap-4 pb-10 px-20">
        {Array(numberOfOptions)
          .fill(true)
          .map((_, i) => (
            <Option
              key={i}
              className={`h-20 w-full ${selected.includes(i) ? "bg-amber text-amber-foreground" : "text-muted border bg-dark border-muted opacity-70"} hover:border-amber`}
              text={options[i]!}
              onClick={() => handleSelect(i)}
              selected={selected.includes(i)}
            />
          ))}
      </div>

      <div className="relative flex justify-center w-full">
        {/* Answer button */}
        <Button variant="submit" className="w-100 py-3">Answer</Button>

        {/* Hint button - conditionally rendered, positioned to the right */}
        {hint && (
          <div className="absolute right-0 py-3">
            <Hint hint={hint}/>
          </div>
        )}
      </div>

    </div>
  );
}