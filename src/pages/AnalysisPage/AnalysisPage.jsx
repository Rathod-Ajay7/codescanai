import Header from "../Home/Header";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { analyzeCode, generateFixedCode } from "../../api/analyze";
import Editor from "@monaco-editor/react";
function AnalysisPage({ isDark, setIsDark, user }) {
  const [language, setlanguage] = useState("");
  const [code, setcode] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fixedCode, setFixedCode] = useState(null);
  const [isLoadingFixed, setIsLoadingFixed] = useState(false);
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
  const lastAnalyzedCodeRef = useRef("");

  const handleAnalyze = async () => {
    if (!code || !language) return;
    setIsLoading(true);
    setError(null);
    setFixedCode(null);
    lastAnalyzedCodeRef.current = code;
    try {
      const data = await analyzeCode(code, language);
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred during analysis.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFixed = async () => {
    if (!code || !language) return;
    setIsLoadingFixed(true);
    try {
      const fixed = await generateFixedCode(code, language);
      setFixedCode(fixed);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingFixed(false);
    }
  };

  const copyToClipboard = () => {
    if (fixedCode) {
      navigator.clipboard.writeText(fixedCode);
      alert("Fixed code copied to clipboard!");
    }
  };
  // Add bug decorations to the editor
  useEffect(() => {
    if (editorRef.current && result && result.bugs && result.bugs.length > 0) {
      const newDecorations = result.bugs.map((bug, index) => {
        // Extract line number from "Line X:" format
        const lineMatch = bug.match(/Line\s+(\d+)/);
        const model = editorRef.current.getModel();
        const maxLines = model ? model.getLineCount() : 1;

        let lineNumber = lineMatch ? parseInt(lineMatch[1], 10) : index + 1;

        lineNumber = Math.max(1, Math.min(lineNumber, maxLines));

        return {
          range: {
            startLineNumber: lineNumber,
            startColumn: 1,
            endLineNumber: lineNumber,
            endColumn: 1000,
          },
          options: {
            isWholeLine: true,
            className: "bug-highlight",
            glyphMarginClassName: "codicon codicon-error",
            glyphMarginHoverMessage: { value: `${bug}` },
            minimap: {
              color: "#ff0000",
              position: 2,
            },
          },
        };
      });

      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );
    } else if (editorRef.current) {
      // Clear decorations if no bugs
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        []
      );
    }
  }, [result]);

  // Clear error highlights when the user changes the code
  useEffect(() => {
    if (code !== lastAnalyzedCodeRef.current) {
      if (editorRef.current) {
        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          []
        );
      }
    }
  }, [code]);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };
  const hasBugs = Array.isArray(result?.bugs) && result.bugs.length > 0;
  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "Python", value: "python" },
    { name: "Java", value: "java" },
    { name: "C++", value: "cpp" },
    { name: "C#", value: "csharp" },
    { name: "C", value: "c" },
    { name: "Go", value: "go" },
    { name: "Rust", value: "rust" },
    { name: "HTML", value: "html" },
    { name: "CSS", value: "css" },
    { name: "SQL", value: "sql" },
    { name: "PHP", value: "php" },
    { name: "Ruby", value: "ruby" },
    { name: "Swift", value: "swift" },
    { name: "Kotlin", value: "kotlin" },
    { name: "Shell / Bash", value: "shell" },
  ];

  return (
    <div className=" min-h-screen  dark:bg-[#17171d] ">
      <Header isDark={isDark} setIsDark={setIsDark} user={user} />
      <select
        onChange={(e) => setlanguage(e.target.value)}
        className="flex mx-auto bg-transparent dark:bg-black dark:text-white"
        value={language}
      >
        <option
          value=""
          disabled
          className="text-[#17171d] bg-transparent dark:text-white"
        >
          select Language
        </option>
        {languages.map((lang) => {
          return (
            <option
              key={lang.value}
              value={lang.value}
              className="text-[#17171d] bg-transparent dark:text-gray-50"
            >

              {lang.name}
            </option>
          );
        })}
      </select>
      <div className="flex">
        <div className="mx-2 w-1/2 mt-3 border border-gray-400">
          <Editor
            height="85vh"
            language={language}
            value={code}
            onChange={(value) => setcode(value || "")}
            theme={isDark ? "vs-dark" : "vs"}
            onMount={handleEditorMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              glyphMargin: true,
              overviewRulerLanes: 1,
            }}
          />
        </div>
        <div
          className="border border-gray-400 mt-3 w-[48%] mx-1 p-4 overflow-y-auto"
          style={{ height: "85vh" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-blue-400 animate-pulse text-lg">
                Analyzing...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <span className="text-5xl">⚠️</span>
              <p className="text-red-400 text-center">{error}</p>
            </div>
          ) : !result ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <span className="text-5xl">🔍</span>
              <p className="text-gray-500 text-center">
                Paste your code and click Analyze
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Bugs */}
              <div>
                <h3 className="text-black dark:text-white font-semibold text-lg mb-3">
                  Bugs Found
                </h3>
                {!hasBugs ? (
                  <p className="text-green-600">No bugs found!</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {result.bugs.map((bug, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-black dark:border-gray-200 bg-gray-300 dark:bg-slate-600 px-4 py-2 rounded-r-lg "
                      >
                        <p className="text-black dark:text-white text-sm">
                          {bug}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {hasBugs && (
                <div className="flex justify-start">
                  <Button
                    variant="outline"
                    className="bg-green-600 text-white px-5 hover:bg-green-700"
                    onClick={handleGenerateFixed}
                    disabled={isLoadingFixed}
                  >
                    {isLoadingFixed ? "Generating..." : "Generate Fixed Code"}
                  </Button>
                </div>
              )}

              {/* Complexity */}
              <div>
                <h3 className="text-black dark:text-white  font-semibold text-lg mb-3">
                  Complexity
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-300 dark:bg-slate-600 rounded-lg p-4 border border-gray-700 dark:border-gray-200">
                    <p className="text-black dark:text-white  mb-1">
                      Time Complexity
                    </p>
                    <p className="text-black dark:text-white  text-xl">
                      {result.timeComplexity}
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-300 dark:bg-slate-600 rounded-lg p-4 border border-gray-700 dark:border-gray-200">
                    <p className="text-black dark:text-white  mb-1">
                      Space Complexity
                    </p>
                    <p className="text-black  dark:text-white text-xl">
                      {result.spaceComplexity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggestion */}
              <div>
                <h3 className="text-black  dark:text-white font-semibold text-lg mb-3">
                  Suggestion
                </h3>
                <div className="border-l-4 border-black  dark:border-gray-200 bg-gray-300 dark:bg-slate-600  px-4 py-3 rounded-r-lg">
                  <p className="text-black  dark:text-white text-sm whitespace-pre-wrap">
                    {result.suggestion}
                  </p>
                </div>
              </div>

              {/* Fixed Code */}
              {fixedCode && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-black  dark:text-white font-semibold text-lg">
                      ✨ Fixed Code
                    </h3>
                    <Button
                      className="bg-purple-600 text-white px-3 py-1 text-sm"
                      onClick={copyToClipboard}
                    >
                      📋 Copy
                    </Button>
                  </div>
                  <div className="border-l-4 border-green-500  bg-gray-300 dark:bg-slate-600  px-4 py-3 rounded-r-lg">
                    <p className="text-black  dark:text-white text-sm whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                      {fixedCode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-3 mb-4">
        <Button
          variant="outline"
          className="bg-blue-600 text-white px-10"
          onClick={handleAnalyze}
          disabled={!code || !language || isLoading}
        >
          {isLoading ? "Analyzing..." : "Analysis"}
        </Button>
      </div>
    </div>
  );
}
export default AnalysisPage;
