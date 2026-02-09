import Button from "~/components/Button";
import { CircleQuestionMark } from "lucide-react";

type HintProps = {
  hint: string;
}

export default function Hint({hint}: HintProps) {

  return (
      <Button variant="ghost">
        <CircleQuestionMark size={25} />
      </Button>
  );
}