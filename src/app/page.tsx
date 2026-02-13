"use client";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useState } from "react";
import { parse } from "~/app/hooks/parser"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleClick = () => {
    let userCode = parse(code, 0);
    console.log(userCode);
    sessionStorage.setItem("exerciseData", JSON.stringify(userCode))

    // Navigate to /exercise
    router.push("/exercise");
  }
  const darkTheme = EditorView.theme({
    "&": {
      backgroundColor: "rgba(34, 40, 49, 0.7) !important",
      color: "#94a3b8 !important",
    },
    ".cm-content": {
      padding: "16px",
      paddingLeft: "0",
      caretColor: "#94a3b8",
      color: "#94a3b8 !important",
    },
    ".cm-focused": {
      outline: "none",
    },
    ".cm-editor": {
      borderRadius: "1rem",
    },
    ".cm-scroller": {
      fontFamily: "ui-monospace, SFMono-Regular, monospace",
      scrollbarWidth: "thin",
      scrollbarColor: "#393E46 transparent",
    },
    ".cm-scroller::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    ".cm-scroller::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    ".cm-scroller::-webkit-scrollbar-thumb": {
      backgroundColor: "#393E46",
      borderRadius: "5px",
    },
    ".cm-scroller::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#94a3b8",
    },
    ".cm-scroller::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
    ".cm-placeholder": {
      color: "#94a3b8",
    },
    // Line numbers / gutter
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "#94a3b8",
      border: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      color: "#94a3b8",
      paddingRight: "8px",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(57, 62, 70, 0.3)",
      boxShadow: "12px 0 0 rgba(57, 62, 70, 0.3)",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(57, 62, 70, 0.3)",
    },
    // Text / syntax highlighting
    ".cm-line": {
      color: "#94a3b8 !important",
    },
    ".cm-string": { color: "#22c55e" },
    ".cm-number": { color: "#f59e0b" },
    ".cm-atom": { color: "#f59e0b" },
    ".cm-keyword": { color: "#94a3b8", fontWeight: "bold" },
    ".cm-property": { color: "#94a3b8" },
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-pattern text-cream">
      <div className="flex flex-col items-center">
        <div className="w-200 h-128 rounded-2xl overflow-hidden">
          <CodeMirror
            height="518px"
            value={code}
            onChange={setCode}
            theme="none"
            extensions={[darkTheme]}
            placeholder="Enter your code here..."
            className="h-full"
          />
        </div>
        <button
          className="bg-cream rounded-md text-medium px-3 py-1 hover:opacity-70 hover:cursor-pointer mt-10"
          onClick={() => handleClick()}
        >
          Generate Code
        </button>
      </div>
    </main>
  );
}
