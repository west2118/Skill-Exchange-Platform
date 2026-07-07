const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function traverseAndFix(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseAndFix(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Remove token from useFetchData invocations
            // e.g. useFetchData<[]>(url, token, [deps]) -> useFetchData<[]>(url, [deps])
            content = content.replace(/useFetchData(.*)\(\s*([^,]+),\s*token,\s*([^)]+)\s*\)/g, 'useFetchData$1($2, $3)');
            
            // e.g. useFetchData<[]>(url, token) -> useFetchData<[]>(url)
            content = content.replace(/useFetchData(.*)\(\s*([^,]+),\s*token\s*\)/g, 'useFetchData$1($2)');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed useFetchData usage in', fullPath);
            }
        }
    }
}

traverseAndFix(srcDir);
