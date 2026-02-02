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

type StepParse = {
  step: Step;
  currentI: number;
}

function parse(input: string, currentLineNumber: number): Code {
  const lines: string[] = input.split("\n");
  let code: Code = {
    information: { name: "", participants: []},
    step: []
  }

  let i: number = currentLineNumber;

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
      let result = stepParse(lines, i);
      i = result.currentI
      code.step.push(result.step)
    }
    else {
      throw new Error(`Line ${i} - Unexpected string: '${line}'`);
    }
    i++
  }

  return code;
}

function stepParse(lines: string[], currentLineNumber: number): StepParse {
  let i: number = currentLineNumber;

  let currentStep: StepParse = { step: { description: ""}, currentI: i}

  while (i < lines.length) {
    const line: string | undefined = lines[i]?.trim()

    if (line == undefined) {
      throw new Error(`Line ${line} - Line is undefined`);
    }

    if (line.startsWith("description:")) {
      currentStep.step.description = line.replace("description:", "").trim()
    }
    else if (line.startsWith("exercise:")) {
      line.replace("exercise:", "")
    }
    else {
      currentStep.currentI = i
      return currentStep
    }
    i++
  }
  currentStep.currentI = i
  return currentStep;
}


