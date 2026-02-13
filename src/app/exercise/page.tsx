"use client"

import DefinitionsPicker from "~/app/_components/definition/DefinitionsPicker";
import { useEffect, useState } from "react";
import type { Code } from "~/app/hooks/parser";

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
    <main className="bg-pattern relative flex min-h-screen flex-col items-center justify-center">
      <span className="absolute top-30 text-white uppercase text-xl font-medium tracking-wider">define symbols for exercises</span>
      <DefinitionsPicker definitions={code.information.definition} />
    </main>
  );
}