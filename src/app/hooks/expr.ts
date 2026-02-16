import type { SelectedDefinitions } from "~/app/exercise/page";
import type { Expr } from "~/app/hooks/parser";

/* SubstituteRoles take an expressions containing role references ({generator}, {bob_secret}, etc) and replaces with actual user selected symbols */
export function substituteRoles(e: Expr, definitions: SelectedDefinitions): Expr {

  switch (e.kind) {
    case "role":
      return definitions[e.name] ?? e

    // Leaf nodes
    case "var":
    case "int":
    case "placeholder":
      return e;

    // Recursive case for pow expression
    case "pow":
      return {
        kind: e.kind,
        base: substituteRoles(e.base, definitions),
        exp: substituteRoles(e.exp, definitions)
      }

    // Recursive case for left and right expressions
    case "add":
    case "sub":
    case "mul":
    case "div":
    case "mod":
    case "equal":
    case "less":
    case "greater":
    case "and":
    case "or":
      return {
        kind: e.kind,
        left: substituteRoles(e.left, definitions),
        right: substituteRoles(e.right, definitions)
      };
  }
}

/* Checks if two expressions are structurally and mathematically equal */
export function exprEquals(a: Expr, b: Expr): boolean {
  if (a.kind !== b.kind) return false;

  switch (a.kind) {
    case "var":
      return b.kind === a.kind && b.name === a.name;
    case "role":
      return b.kind === a.kind && b.name === a.name;
    case "int":
      return b.kind === a.kind && b.value === a.value;
    case "placeholder":
      return b.kind === a.kind && b.index === a.index;
    case "pow":
      return b.kind === a.kind && b.base === a.base && b.exp === a.exp;

    // Commutative - check both orderings
    case "equal":
    case "add":
    case "mul":
    case "and":
    case "or":
      return b.kind === a.kind && (
        exprEquals(a.left, b.left) && exprEquals(a.right, b.right) ||
        exprEquals(a.left, b.right) && exprEquals(a.right, b.left)
      );

    // Non-commutative - order matters
    case "sub":
    case "mod":
    case "div":
    case "less":
    case "greater":
      return b.kind === a.kind && (
        exprEquals(a.left, b.left) && exprEquals(a.right, b.right)
      );
  }
}

export function exprToString(e: Expr): string {
  switch (e.kind) {
    case "var":
      return e.name;
    case "role":
      return `{${e.name}}`;  // shouldn't appear after substitution
    case "int":
      return String(e.value);
    case "placeholder":
      return `$${e.index}`;
    case "pow":
      return `${exprToString(e.base)}^${exprToString(e.exp)}`;
    case "mod":
      return `${exprToString(e.left)} mod ${exprToString(e.right)}`;
    case "mul":
      return `${exprToString(e.left)} * ${exprToString(e.right)}`;
    case "div":
      return `${exprToString(e.left)} / ${exprToString(e.right)}`;
    case "add":
      return `${exprToString(e.left)} + ${exprToString(e.right)}`;
    case "sub":
      return `${exprToString(e.left)} - ${exprToString(e.right)}`;
    case "less":
      return `${exprToString(e.left)} < ${exprToString(e.right)}`;
    case "greater":
      return `${exprToString(e.left)} > ${exprToString(e.right)}`;
    case "equal":
      return `${exprToString(e.left)} = ${exprToString(e.right)}`;
    case "and":
      return `${exprToString(e.left)} and ${exprToString(e.right)}`;
    case "or":
      return `${exprToString(e.left)} or ${exprToString(e.right)}`;
  }
}