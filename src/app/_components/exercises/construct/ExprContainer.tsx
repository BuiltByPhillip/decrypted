import type { Expr } from "~/app/hooks/parser";
import Dragable from "~/app/_components/exercises/construct/Dragable";

type ContainerProps = {
  expressions: Expr[]
  onDrop: (x: number, y: number) =>  DOMRect | null;
}


export default function ExprContainer({ expressions, onDrop }: ContainerProps) {

  return (
    <div className="bg-dark w-150 h-40">
      {expressions.map((expr, index) => (
        <Dragable onDrop={onDrop} expr={expr} key={index}/>
      ))}
    </div>
  );
}