"use client";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useState } from "react";
import { parse } from "~/app/hooks/parser"

export default function Home() {
  const [code, setCode] = useState("");

  const generateCode = () => {
    let userCode = parse(code, 0);
    console.log(userCode);

    // Reset code inside the input field
    setCode("");
  }
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
            extensions={[darkTheme]}
            placeholder="Enter your code here..."
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
