const fs = require('fs');
const path = require('path');

const replacements = [
    [/bg-white shadow-sm sm:rounded-lg dark:bg-gray-800/g, 'bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md'],
    [/bg-white dark:bg-gray-800/g, 'bg-[#111] border border-white/5'],
    [/bg-gray-50 dark:bg-gray-700/g, 'bg-black/50'],
    [/text-gray-800 dark:text-gray-200/g, 'text-white font-black tracking-widest uppercase'],
    [/text-gray-500 dark:text-gray-300/g, 'text-gray-400'],
    [/text-gray-500 dark:text-gray-400/g, 'text-gray-400'],
    [/text-gray-900 dark:text-gray-100/g, 'text-white font-bold'],
    [/text-gray-900 dark:text-white/g, 'text-white font-bold'],
    [/bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700/g, 'bg-transparent divide-y divide-white/5'],
    [/divide-gray-200 dark:divide-gray-700/g, 'divide-white/5'],
    [/border-gray-200 dark:border-gray-700/g, 'border-white/5'],
    [/border-gray-300 dark:border-gray-700/g, 'border-white/10'],
    [/shadow-sm sm:rounded-lg/g, 'shadow-2xl sm:rounded-2xl'],
    // Replace Breeze Primary Button in forms/links
    [/px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150/g, 'px-6 py-3 bg-pink-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all hover:-translate-y-1'],
    // Link colors
    [/text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300/g, 'text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]'],
    // Delete buttons
    [/text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300/g, 'text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]']
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const adminFiles = walk('resources/js/Pages/Admin');
const dashboardFiles = ['resources/js/Pages/Dashboard.jsx'];
const authFiles = walk('resources/js/Pages/Auth');
const profileFiles = walk('resources/js/Pages/Profile');

const allFilesToProcess = [...adminFiles, ...dashboardFiles, ...authFiles, ...profileFiles];

let changedCount = 0;

for (const file of allFilesToProcess) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;

    for (const [pattern, replacement] of replacements) {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            hasChanges = true;
        }
    }

    if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log(`Updated ${file}`);
    }
}

console.log(`Done. Modified ${changedCount} files.`);
