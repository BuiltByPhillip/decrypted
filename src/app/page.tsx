"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { linter, lintGutter } from "@codemirror/lint";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");

  const generateCode = () => {
    let userCode = JSON.parse(code);

    // Reset code inside the input field
    setCode("");
  }

  const jsonLinter = linter((view) => {
    const diagnostics: { from: number; to: number; severity: "error"; message: string }[] = [];
    try {
      JSON.parse(view.state.doc.toString());
    } catch (e: unknown) {
      const error = e as Error;
      const match = /at position (\d+)/.exec(error.message);
      if (match) {
        const pos = parseInt(match[1], 10);
        diagnostics.push({
          from: pos,
          to: pos,
          severity: "error",
          message: error.message,
        });
      }
    }
    return diagnostics;
  });

  const darkTheme = EditorView.theme({
    "&": {
      backgroundColor: "#DFD0B8",
      color: "#222831",
    },
    ".cm-content": {
      padding: "16px",
      caretColor: "#222831",
    },
    ".cm-focused": {
      outline: "none",
    },
    ".cm-editor": {
      borderRadius: "1rem",
    },
    ".cm-scroller": {
      fontFamily: "ui-monospace, SFMono-Regular, monospace",
    },
    ".cm-placeholder": {
      color: "#948979",
    },
    // JSON syntax highlighting
    ".cm-string": { color: "#628141" },
    ".cm-number": { color: "#393E46" },
    ".cm-atom": { color: "#393E46" },
    ".cm-keyword": { color: "#222831", fontWeight: "bold" },
    ".cm-property": { color: "#222831" },
    ".cm-punctuation": { color: "#948979" },
    // Error styling
    ".cm-diagnostic": {
      textDecoration: "underline wavy red",
    },
    ".cm-lintRange-error": {
      backgroundColor: "rgba(255, 0, 0, 0.1)",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-medium to-dark text-cream">
      <div className="flex flex-col items-center">
        <div className="w-200 h-128 rounded-2xl overflow-hidden">
          <CodeMirror
            height="518px"
            value={code}
            onChange={setCode}
            extensions={[json(), jsonLinter, lintGutter(), darkTheme]}
            placeholder="Enter your JSON here..."
            className="h-full"
          />
        </div>
        <button className="bg-cream rounded-md text-medium px-3 py-1 hover:opacity-70 hover:cursor-pointer mt-10" onClick={() => generateCode()}>
          Generate Code
        </button>
      </div>
    </main>
  );
}
