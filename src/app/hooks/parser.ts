import { options } from "prettier-plugin-tailwindcss";

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
  palette?: PaletteItem[];
  options?: string[];
  answer: Expr[];
}

type Expr =
  | { kind: "var"; name: string }
  | { kind: "int"; value: number}
  | { kind: "pow"; base: Expr; exp: Expr }
  | { kind: "mod"; left: Expr; right: Expr }
  | { kind: "less"; left: Expr; right: Expr }
  | { kind: "greater"; left: Expr; right: Expr }
  | { kind: "equal"; left: Expr; right: Expr }

type PaletteItem =
  | { kind: "var"; name: string }
  | { kind: "int"; value: number }
  | { kind: "operator"; op: "add" | "sub" | "pow" | "div" | "mod" | "mul" | "less" | "greater" | "equal" };

const EXERCISE_TYPES = [
  "construct",
  "fill",
  "select",
  "calculate"
] as const;

type ExerciseType = typeof EXERCISE_TYPES[number];

function evaluate(input: string): Expr {
  const s = input.trim();

  // Integer
  if (/^\d+$/.test(s)) {
    return { kind: "int", value: Number(s) };
  }

  // Variable (including $1, a, p, etc.)
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)) {
    return { kind: "var", name: s };
  }

  // Expression is invalid and not currently supported
  throw new Error(`Invalid expression: '${input}'`);
}

function parsePaletteItem(input: string): PaletteItem {
  const s = input.trim();

  // Operators
  if (s === "+") return { kind: "operator", op: "add"};
  if (s === "-") return { kind: "operator", op: "sub" };
  if (s === "^") return { kind: "operator", op: "pow"}
  if (s === "/") return { kind: "operator", op: "div" };
  if (s === "mod") return { kind: "operator", op: "mod" };
  if (s === "*") return { kind: "operator", op: "mul" };
  if (s === "<") return { kind: "operator", op: "less" };
  if (s === ">") return { kind: "operator", op: "greater" };
  if (s === "=" || s === "==") return { kind: "operator", op: "equal" };

  // Integer
  if (/^\d+$/.test(s)) {
    return { kind: "int", value: Number(s) };
  }

  // Variable
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)) {
    return { kind: "var", name: s };
  }

  throw new Error(`Invalid palette item: '${input}'`);

}

export function parse(input: string, startIndex: number): Code {
  const lines: string[] = input.split("\n");
  let code: Code = {
    information: { name: "", participants: []},
    step: []
  }

  let i: number = startIndex;

  while (i < lines.length) {
    const line: string | undefined = lines[i]?.trim()

    if (line == undefined) {
      throw new Error(`Line ${line} - Line is undefined`);
    }

    if (line.startsWith("protocol:")) {
      code.information.name = line.replace("protocol:", "").trim();
    }
    else if (line.startsWith("participants:")) {
      code.information.participants =
        line.replace("participants:", "")
          .split(",")
          .map(p => p.trim())
    }
    else if (line.startsWith("step")) {
      const [step, nextI] = stepParse(lines, i);
      i = nextI
      code.step.push(step)
      continue
    }
    else if (line.trim() === "") {
      // Empty line
    }
    else {
      throw new Error(`Line ${i} - Unexpected string: '${line}'`);
    }
    i++
  }

  return code;
}

function stepParse(lines: string[], startIndex: number): [Step, number] {
  let i: number = startIndex + 1;

  let currentStep: Step = { description: "" }

  while (i < lines.length) {
    const line: string | undefined = lines[i]?.trim()

    if (line === "") {
      // Skip empty line
      i++
      continue
    }

    if (line == undefined) {
      throw new Error(`Line ${line} - Line is undefined`);
    }

    if (line.startsWith("description:")) {
      currentStep.description = line.replace("description:", "").trim()
    }
    else if (line.startsWith("exercise:")) {
      const rest = line.replace("exercise:", "").trim()

      if (rest.length > 0) {
        throw new Error(`Line ${i} - Line is undefined`);
      }

      const [exercise, nextI] = exerciseParse(lines, i+1)
      i = nextI
      currentStep.exercise = exercise
      continue
    }
    else {
      return [currentStep, i]
    }
    i++
  }
  return [currentStep, i]
}

function exerciseParse(lines: string[], startIndex: number): [Exercise, number] {
  let i: number = startIndex;
  let pendingExercise: Partial<Exercise> = {};

  while (i < lines.length) {
    const line: string | undefined = lines[i]?.trim()

    if (line == undefined) {
      throw new Error(`Line ${i} - Line is undefined`);
    }

    if (line.startsWith("type:")) {
      const rest = line.replace("type:", "").trim()
      if (!isExerciseType(rest)) {
        throw new Error(`Line ${i} - Invalid exercise type ${line}`)
      }
      pendingExercise.type = rest
    }
    else if (line.startsWith("prompt:")) {
      pendingExercise.prompt = line.replace("prompt:", "").trim()
    }
    else if (line.startsWith("hint")) {
      pendingExercise.hint = line.replace("hint:", "").trim()
    }
    else if (line.startsWith("palette:")) {
      pendingExercise.palette = line.replace("palette:", "").trim()
        .split(",")
        .map(p => parsePaletteItem(p.trim()))
    }
    else if (line.startsWith("options:")) {
      const [options, nextI] = optionsParse(lines, i+1)
      i = nextI
      if (options.length == 0) {
        throw new Error(`Line ${i} - No options for exercise type select`);
      }
      pendingExercise.options = options;
      continue
    }
    else if (line.startsWith("answer:")) {
      pendingExercise.answer = [] // Temp
      // TODO: Parse options into expression
    }
    else {
      return [finalizeExercise(pendingExercise, startIndex), i]
    }
    i++
  }
  return [finalizeExercise(pendingExercise, startIndex), i]
}

function optionsParse(lines: string[], startIndex: number): [string[], number] {
  let i: number = startIndex;
  let options: string[] = [];

  while (i < lines.length) {
    const line: string | undefined = lines[i]?.trim()

    if (line == undefined) {
      throw new Error(`Line ${i} - Line is undefined`);
    }

    if (line.startsWith("-")) {
      options.push(line.replace("-", "").trim())
    }
    else {
      return [options, i]
    }
    i++
  }
  return [options, i]
}

function finalizeExercise(fields: Partial<Exercise>, line: number): Exercise {
  if (!fields.type) {
    throw new Error(`Line: ${line} - Exercise type must be specified`)
  }
  if (!fields.prompt) {
    throw new Error(`Line: ${line} - Exercise must have a prompt`)
  }
  if (!fields.answer) {
    throw new Error(`Line: ${line} - Exercise must have an answer`)
  }

  // Type-specific requirements
  if (fields.type === "construct" && !fields.palette) {
    throw new Error(`Line: ${line} - Exercise type construct must have a palette`)
  }

  return fields as Exercise
}

function isExerciseType(value: string): value is ExerciseType {
  return (EXERCISE_TYPES as readonly string[]).includes(value);
}


