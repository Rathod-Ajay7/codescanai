import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export async function analyzeCode(code, language) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Add line numbers to code for AI to reference
  const codeWithLineNumbers = code
    .split("\n")
    .map((line, index) => `${index + 1}: ${line}`)
    .join("\n");

  const prompt = `You are an expert code reviewer specializing in ${language}.

VALIDATION: First verify the code is written in ${language}. If NOT, respond with:
{"error": "Code language does not match selected language. Please select the correct language."}

IF CODE IS ${language}, analyze and respond with ONLY this JSON (no markdown, no extra text):
{
  "bugs": ["Line X: bug description", "Line Y: another bug"],
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "suggestion": "One short optimization tip"
}

CODE TO ANALYZE (Line numbers are shown on the left):
${codeWithLineNumbers}

RULES:
- bugs: EMPTY ARRAY [] if NO BUGS.
- FIRST check for syntax, parsing, compilation, and build errors before any other analysis.
- Any syntax error MUST be reported in the bugs array.
- Never return an empty bugs array when syntax, compilation, or runtime errors exist.
- bugs should ONLY include:
  1. Syntax errors
  2. Compilation/build errors
  3. Runtime errors
  4. Logical errors that produce incorrect results
  5. Security vulnerabilities
  6. Missing edge cases that cause incorrect behavior
- Do NOT report style issues, formatting issues, naming issues, code quality issues, or performance optimizations as bugs.
- Performance concerns belong in the suggestion field, not the bugs array.
- For each bug, reference the line number EXACTLY as shown on the left of the code.
- Start every bug with "Line X:" where X is the exact line number from the code.
- Missing brackets, parentheses, braces, quotes, imports, declarations, or invalid language syntax are bugs and must be reported.
- If code would fail to compile, parse, or execute, report the exact line causing the failure.
- Do not report a bug unless you are confident the code produces incorrect behavior.If a section of code is unusual but logically correct, do not report it as a bug.
- Function names, variable names, spelling mistakes, and naming conventions are NOT bugs unless they cause compilation errors or incorrect behavior.
- Do NOT report typos in identifiers if they are used consistently throughout the code.
- Do NOT assume code is incorrect because it differs from common or textbook implementations.
- Analyze the actual behavior of the code, not the naming of functions or variables.
- Before reporting a logical error, verify that the code can produce an incorrect result for at least one valid input and mentally test that input against the code.
- If a piece of code is logically correct but can be simplified, place the recommendation in the suggestion field, not the bugs array.
- Do NOT report readability, maintainability, or code quality concerns as bugs.
- Never report a bug solely because a cleaner, faster, or more standard implementation exists.
- For algorithmic problems, evaluate correctness against the problem being solved rather than comparing to common solutions.
- If confidence that an issue is a real bug is below 80%, do not include it in the bugs array.
- NEVER report naming, spelling, grammar, readability, maintainability, or style issues as bugs.
- Before reporting a logical bug, identify a specific input that would produce an incorrect result. If no concrete failing input can be found, do not report the issue as a bug.
- MUST include the exact Line number for every bug so it can be highlighted in the editor.`;

  
const result = await model.generateContent(prompt);
 const response = result.response.text();

  const match = response.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON found in AI response");
  }

  return JSON.parse(match[0]);
}

export async function generateFixedCode(code, language) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `You are an expert ${language} code fixer.

TASK: Fix ALL bugs, errors, and issues in the code below and return ONLY the corrected code.

RULES:
- Return ONLY the fixed code, nothing else (no markdown, no backticks, no explanations)
- Keep the same structure and logic, just fix all issues
- Fix syntax errors, missing semicolons, undefined variables, type mismatches, etc.
- Do NOT change the overall algorithm or functionality
- Use proper ${language} syntax
- Fix EVERY bug found in the code.
- If you identify multiple bugs, the returned code must resolve all of them.
- Ensure the final code handles all edge cases mentioned in the analysis.
- Return code that would pass the review with an empty bugs array.

BUGGY CODE:
${code}

FIXED CODE (return only the code):`;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  const clean = response.replace(/```[\w]*|```/g, "").trim();
  return clean;
}
