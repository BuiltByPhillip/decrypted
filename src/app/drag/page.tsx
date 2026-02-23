import type { Expr } from "~/app/hooks/parser";
import SelectExercise from "~/app/_components/exercises/selectExercise/select";
import DragAndDrop from "~/app/_components/exercises/construct/dragAndDrop";

export default function OptionsPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pattern p-8">
      <DragAndDrop/>
    </main>
  );
}