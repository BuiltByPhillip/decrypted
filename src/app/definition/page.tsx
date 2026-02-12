import Definition, { DefinitionList } from "~/app/_components/definition/definition";


export default function definitionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-medium to-dark p-8">
      <DefinitionList>
        <Definition
          name="generator"
          choices={["g", "x", "a", "b"]}
        />
        <Definition
          name="prime"
          choices={["p", "n", "m", "q"]}
        />
        <Definition
          name="alice_secret"
          choices={["a", "s", "x"]}
        />
        <Definition
          name="bob_secret"
          choices={["b", "t", "y"]}
        />
      </DefinitionList>
    </main>
  );
}