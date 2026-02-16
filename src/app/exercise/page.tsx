"use client"

import DefinitionsPicker from "~/app/_components/definition/DefinitionsPicker";
import { useEffect, useState } from "react";
import type { Code, Expr } from "~/app/hooks/parser";
import SelectExercise from "~/app/_components/exercises/selectExercise/select";
import Button from "~/components/Button";

// Map of <Role, Symbol>
export type SelectedDefinitions = Record<string, Expr>

export default function ExercisePage() {
  const [code, setCode] = useState<Code | null>(null);
  const [showExercises, setShowExercises] = useState<boolean>(false);
  const [definitions, setDefinitions] = useState<SelectedDefinitions>({});

  useEffect(() => {
    const rawData = sessionStorage.getItem("exerciseData");
    if (rawData) {
      setCode(JSON.parse(rawData) as Code);
    }
  }, []);

  const updateDefinitions = (role: string, symbol: Expr | null) => {
    if (symbol === null) {
      const { [role]: _, ...rest } = definitions; // Removes the key
      setDefinitions(rest);
    } else {
      setDefinitions({ ...definitions, [role]: symbol });
    }
  }

  if (!code) {
    return <div>Loading...</div>;
  }
  return (
    <main className="bg-pattern relative flex min-h-screen flex-col items-center pt-40 pb-20" data-lenis-prevent>

      {/* Definition selection */}
      <div className="flex items-center justify-center flex-col">
        <span className="pb-5 text-gray uppercase text-xl font-medium tracking-wider">define symbols for exercises</span>
        <DefinitionsPicker
          definitions={code.information.definition}
          onSelect={updateDefinitions}
          selected={definitions}
        />
        <Button
          variant="submit"
          className="m-10 w-50"
          onClick={() => setShowExercises(true)}>Continue</Button>
      </div>


      {code.step.map((step, i) => {
        if (step.exercise?.type === "select" && step.exercise.options && showExercises) {
          return (
            <SelectExercise
              key={i}
              numberOfOptions={step.exercise.options.length}
              options={step.exercise.options}
              description={step.description}
              prompt={step.exercise.prompt}
              answers={step.exercise.answer}/>
          );

        }
      })}

    </main>
  );
}