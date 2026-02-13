import Definition, { DefinitionList } from "~/app/_components/definition/Definition";
import type { Definition as DefinitionType } from "~/app/hooks/parser";

type DefinitionProps = {
  definitions: DefinitionType[];
}

export default function DefinitionsPicker({definitions}: DefinitionProps) {
  return (
    <DefinitionList>
      {definitions.map((definition, i) => (
        <Definition
          key={i}
          name={definition.role}
          choices={definition.symbols}
        />
      ))}
    </DefinitionList>
  );
}