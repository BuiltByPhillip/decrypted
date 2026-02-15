import Definition, { DefinitionList } from "~/app/_components/definition/Definition";
import type { Definition as DefinitionType, Expr } from "~/app/hooks/parser";
import type { SelectedDefinitions } from "~/app/exercise/page";
import { useState } from "react";

type DefinitionProps = {
  definitions: DefinitionType[];
  selectedDefinitions: (s: SelectedDefinitions) => void;
}

export default function DefinitionsPicker({ definitions, selectedDefinitions }: DefinitionProps) {
  const [selected, setSelected] = useState<SelectedDefinitions>({});

  const updateDefinitions = (role: string, symbol: Expr) => {
    setSelected((prev) => ({ ...prev, [role]: symbol }));
    selectedDefinitions(selected);
  }


    return (
    <DefinitionList>
      {definitions.map((definition, i) => (
        <Definition
          key={i}
          name={definition.role}
          choices={definition.symbols}
          onChange={updateDefinitions}
        />
      ))}
    </DefinitionList>
  );
}