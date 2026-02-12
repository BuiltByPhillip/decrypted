import SelectExercise from "~/app/_components/exercises/selectExercise/select";
import Definition from "~/app/_components/definition/definition";


export default function definitionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-medium to-dark p-8">
      <Definition
        choices={["g", "x", "a", "b"]}
      />

    </main>
  );
}