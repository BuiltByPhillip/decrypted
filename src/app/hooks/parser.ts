type Code = {
  information: Information;
  step: Step[];
}

type Information = {
  name: string;
  participants: string[];
}

type Step = {
  description: string;
  exercise?: Exercise;
}

type Exercise = {
  type: ExerciseType;
  prompt: string;
  hint?: string;
  palette?: Expr[];
  options?: string[];
  answer: Expr[];
}

type Expr =
  | { kind: "var"; name: string }
  | { kind: "int"; value: number}
  | { kind: "pow"; base: Expr; exp: Expr }
  | { kind: "mod"; left: Expr; right: Expr }

type ExerciseType =
  | "construct"
  | "fill"
  | "select"
  | "calculate"


