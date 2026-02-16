import Definition, { DefinitionList } from "~/app/_components/definition/Definition";
import type { Definition as DefinitionType, Expr } from "~/app/hooks/parser";
import type { SelectedDefinitions } from "~/app/exercise/page";

type DefinitionProps = {
  definitions: DefinitionType[];
  onSelect: (role: string, symbol: Expr | null) => void;
  selected: SelectedDefinitions;
}

export default function DefinitionsPicker({ definitions, onSelect, selected }: DefinitionProps) {

    return (
    <DefinitionList>
      {definitions.map((definition, i) => (
        <Definition
          key={i}
          name={definition.role}
          choices={definition.symbols}
          onChange={onSelect}
          selected={selected[definition.role]}
        />
      ))}
    </DefinitionList>
  );
}