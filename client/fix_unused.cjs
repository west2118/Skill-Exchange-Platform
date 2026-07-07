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

            // Remove unused token
            content = content.replace(/^[ \t]*const token = useAppSelector\(\(state: any\) => state\.user\.currentUserToken\);\r?\n?/gm, '');
            content = content.replace(/^[ \t]*const token = useAppSelector\(\(state\) => state\.user\.currentUserToken\);\r?\n?/gm, '');
            content = content.replace(/^[ \t]*const currentUserToken = useAppSelector\(\(state: any\) => state\.user\.currentUserToken\);\r?\n?/gm, '');
            content = content.replace(/^[ \t]*const currentUserToken = useAppSelector\(\(state\) => state\.user\.currentUserToken\);\r?\n?/gm, '');
            
            // Remove unused imports
            content = content.replace(/^[ \t]*import \{ CardSkeletonLoading \} from "@\/components\/app\/CardSkeletonLoading";\r?\n?/gm, '');
            content = content.replace(/^[ \t]*import \{ SessionModal \} from "@\/components\/app\/SessionModal";\r?\n?/gm, '');
            content = content.replace(/^[ \t]*import \{ AvatarImage \} from "\.\.\/ui\/avatar";\r?\n?/gm, '');
            content = content.replace(/^[ \t]*import \{ AvatarImage \} from "@\/components\/ui\/avatar";\r?\n?/gm, '');
            content = content.replace(/^[ \t]*import \{ Badge \} from "@\/components\/ui\/badge";\r?\n?/gm, '');
            content = content.replace(/^[ \t]*import SkillCard from "@\/components\/app\/SkillCard";\r?\n?/gm, '');

            // For imports that are part of a destructuring block, this simple regex won't work cleanly, 
            // but we can just comment out the line in the file directly for those, or let the user know.

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    }
}

traverseAndFix(srcDir);
