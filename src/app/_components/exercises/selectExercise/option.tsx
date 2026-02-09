import Button from "~/components/Button";
import type { ButtonHTMLAttributes } from "react";

type OptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
}

export default function Option({
  className = "",
  text = "",
                               }: OptionProps) {

  return (
    <Button variant="option" className={`${className}`}>
      {text}
    </Button>
  );
}