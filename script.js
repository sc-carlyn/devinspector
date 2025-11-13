import { highlightCode } from "./highlight.js";

const input = document.getElementById("codeInput");

document.getElementById("themeToggle").onclick = () =>
    document.body.classList.toggle("light");

/* COPY */
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(input.value);
    alert("Copied!");
};

/* ANALYZE */
document.getElementById("analyzeBtn").onclick = () => {
    const code = input.value;

    const lines = code.split("\n");
    document.getElementById("lineCount").textContent = lines.length;

    const longest = Math.max(...lines.map(l => l.length));
    document.getElementById("longestLine").textContent = longest;

    const varRegex = /\b(let|const|var)\s+([a-zA-Z0-9_]+)/g;
    const vars = [...code.matchAll(varRegex)].map(v => v[2]);
    document.getElementById("varCount").textContent = vars.length;
    document.getElementById("varList").textContent = vars.join("\n") || "None";

    const funcRegex = /function\s+([a-zA-Z0-9_]+)|([a-zA-Z0-9_]+)\s*=\s*\(/g;
    const funcs = [];
    let m;
    while (m = funcRegex.exec(code)) funcs.push(m[1] ?? m[2]);

    document.getElementById("funcCount").textContent = funcs.length;
    document.getElementById("funcList").textContent = funcs.join("\n") || "None";

    const unused = vars.filter(v => {
        const r = new RegExp(`\\b${v}\\b`, "g");
        return code.match(r).length === 1;
    });
    document.getElementById("unusedList").textContent =
        unused.join("\n") || "None";

    const ifCount = (code.match(/\bif\b/g) || []).length;
    const loops = (code.match(/\b(for|while)\b/g) || []).length;
    const depth = (code.match(/{/g) || []).length;

    const score = ifCount + loops * 2 + depth * 1.5;

    document.getElementById("complexityBox").textContent =
        `Complexity Score: ${score}\nIf: ${ifCount}\nLoops: ${loops}\nDepth: ${depth}`;

    document.getElementById("highlightBox").innerHTML = highlightCode(code);
};

/* EXPORT JSON */
document.getElementById("exportBtn").onclick = () => {
    const data = {
        lines: document.getElementById("lineCount").textContent,
        functions: document.getElementById("funcCount").textContent,
        variables: document.getElementById("varCount").textContent,
        longest: document.getElementById("longestLine").textContent,
    };

    const blob = new Blob([JSON.stringify(data, null, 4)], {
        type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis.json";
    a.click();
};
