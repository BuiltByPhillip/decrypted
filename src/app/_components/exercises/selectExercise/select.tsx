"use client"

import Option from "~/app/_components/exercises/selectExercise/option"
import Button from "~/components/Button";
import Hint from "~/app/_components/exercises/selectExercise/hint";
import { useState } from "react";

type SelectExerciseProps = {
  numberOfOptions: number;
  options: string[];
  description: string;
  prompt: string;
  hint?: string;
}

export default function SelectExercise({numberOfOptions, options, description, prompt, hint}: SelectExerciseProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    selected.includes(index)
      ? setSelected(selected.filter(option => option !== index))
      : setSelected([...selected, index]);
  }

  return (
    <div className="flex flex-col items-center w-full">

      <div className="flex flex-col items-center text-2xl text-white p-8">
        {/* Description */}
        <span className="">{description}</span>

        {/* Prompt*/}
        <span className="">{prompt}</span>
      </div>

      {/* Multiple-choice option buttons */}
      <div className="grid w-full grid-cols-2 gap-4 pb-10">
        {Array(numberOfOptions)
          .fill(true)
          .map((_, i) => (
            <Option
              key={i}
              className="h-20 w-full"
              text={options[i]!}
              onClick={() => handleSelect(i)}
              selected={selected.includes(i)}
            />
          ))}
      </div>

      <div className="relative flex justify-center w-full">
        {/* Answer button */}
        <Button variant="secondary" className="w-100 py-2">answer</Button>

        {/* Hint button - conditionally rendered, positioned to the right */}
        {hint && (
          <div className="absolute right-0">
            <Hint hint={hint}/>
          </div>
        )}
      </div>

    </div>
  );
}