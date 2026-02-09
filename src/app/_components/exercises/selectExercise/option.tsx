import Button from "~/components/Button";
import type { ButtonHTMLAttributes } from "react";

type OptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  selected?: boolean;
}

export default function Option({
  className = "",
  text = "",
  selected,
  ...props
}: OptionProps) {

  return (
    <Button
      variant="option"
      className={`${className}`}
      selected={selected}
      {...props}
    >
      {text}
    </Button>
  );
}