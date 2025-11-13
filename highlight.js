export function highlightCode(code) {
    return code
        // comments
        .replace(/(\/\/.*)/g, `<span class="com">$1</span>`)
        // strings
        .replace(/(\".*?\"|\'.*?\')/g, `<span class="str">$1</span>`)
        // keywords
        .replace(/\b(function|return|const|let|var|if|else|for|while|class|new|import|export|try|catch|throw)\b/g,
            `<span class="kw">$1</span>`)
        // numbers
        .replace(/\b([0-9]+)\b/g, `<span class="num">$1</span>`);
}
