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

            // Remove token argument from useFetchData usages
            content = content.replace(/,\s*token\b/g, '');
            // Sometimes it's the second argument followed by a comma: `token, `
            content = content.replace(/\btoken\s*,/g, '');

            // Fix the user's manual typo in ActiveDealTab.tsx where they left out a comma:
            // `http://localhost:8080/api/deal/${currentUserID}`
            // [refreshKey]
            content = content.replace(/(`http:\/\/localhost:8080\/api\/deal\/\$\{currentUserID\}`)\s+\[refreshKey\]/g, '$1, [refreshKey]');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed token usage in', fullPath);
            }
        }
    }
}

traverseAndFix(srcDir);
