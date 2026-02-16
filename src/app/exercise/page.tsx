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

  const updateDefinitions = (role: string, symbol: Expr) => {
    setDefinitions({ ...definitions, [role]: symbol });
  }

  const isFullyDefined = (): boolean => {
    if (!code) {
      return false;
    }
    return code.information.definition.length === Object.keys(definitions).length;
  }

  if (!code) {
    return <div>Loading...</div>;
  }
  return (
    <main
      className="bg-pattern relative flex min-h-screen flex-col items-center justify-center pt-40 pb-20"
      data-lenis-prevent
    >
      {/* Definition selection */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-gray pb-5 text-xl font-medium tracking-wider uppercase">
          define symbols for exercises
        </span>
        <DefinitionsPicker
          definitions={code.information.definition}
          onSelect={updateDefinitions}
          selected={definitions}
        />
        <Button
          variant="submit"
          className={`m-10 w-50 transition delay-150 ${!isFullyDefined() ? `pointer-events-none opacity-50` : `opacity-100`}`}
          onClick={() => setShowExercises(true)}
        >
          Continue
        </Button>
      </div>

      {/* Each exercise/step */}
      {code.step.map((step, i) => {
        if (
          step.exercise?.type === "select" &&
          step.exercise.options &&
          showExercises
        ) {
          return (
            <SelectExercise
              key={i}
              numberOfOptions={step.exercise.options.length}
              options={step.exercise.options}
              description={step.description}
              prompt={step.exercise.prompt}
              answers={step.exercise.answer}
            />
          );
        }
      })}
    </main>
  );
}