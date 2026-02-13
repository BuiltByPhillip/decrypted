import SelectExercise from "~/app/_components/exercises/selectExercise/select";


export default function OptionsPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pattern p-8">
      <SelectExercise
        numberOfOptions={4}
        options={["Option A", "Option B", "Option C", "Option D"]}
        description={"Bob computes his public key B"}
        prompt={"Which expression does Bob use to calculate his public key B"}
        hint={"This is an example of a hint"}
        answers={[]}
      />

    </main>
  );
}