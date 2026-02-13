"use client"

import DefinitionsPicker from "~/app/_components/definition/DefinitionsPicker";
import { useEffect, useState } from "react";
import type { Code } from "~/app/hooks/parser";
import SelectExercise from "~/app/_components/exercises/selectExercise/select";

export default function ExercisePage() {
  const [code, setCode] = useState<Code | null>(null);

  useEffect(() => {
    const rawData = sessionStorage.getItem("exerciseData");
    if (rawData) {
      setCode(JSON.parse(rawData) as Code);
    }
  }, []);

  if (!code) {
    return <div>Loading...</div>;
  }
  return (
    <main className="bg-pattern relative flex min-h-screen flex-col items-center pt-40 pb-20" data-lenis-prevent>
      <span className="absolute top-30 text-gray uppercase text-xl font-medium tracking-wider">define symbols for exercises</span>
      <DefinitionsPicker definitions={code.information.definition} />
      {code.step.map((step, i) => {
        if (step.exercise?.type === "select" && step.exercise.options) {
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