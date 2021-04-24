const exec = require('child_process').exec;
const fs = require('fs');

const MAIN_PATH = 'src/assets/i18n/';
const SOURCE_FILES = ['en.json', 'fr.json', 'de.json', 'zh.json', 'pl.json'];
const TARGET_FOLDERS = ['en', 'fr', 'de', 'zh', 'pl'];

function copyFiles(path, sourceFiles, targetFolders) {

    for (let i = 0; i < sourceFiles.length; i++) {
        let source = path + sourceFiles[i];
        let target = path + targetFolders[i] + '/main.json';

        const dir = path + targetFolders[i];
        fs.mkdirSync(dir, { recursive: true }, err => {});

        fs.copyFileSync(source, target, err => {});
    }

    var cmd = exec('npx json-autotranslate -i src/assets/i18n -c translator-key.json');
    return new Promise(function (resolve, reject) {
        cmd.addListener("error", reject);
        cmd.addListener("exit", resolve);
    });
}

function updateFiles(path, sourceFiles, targetFolders) {
    for (let i = 0; i < sourceFiles.length; i++) {
        let toFile = path + sourceFiles[i];
        let fromFile = path + targetFolders[i] + '/main.json';

        fs.renameSync(fromFile, toFile, err => {});
    }
}

function clearFiles(path, sourceFiles, targetFolders) {
    for (let i = 0; i < sourceFiles.length; i++) {
        let deleted = path + targetFolders[i];

        fs.rmdirSync(deleted);
    }
}

copyFiles(MAIN_PATH, SOURCE_FILES, TARGET_FOLDERS).then(function() {
    updateFiles(MAIN_PATH, SOURCE_FILES, TARGET_FOLDERS);
    clearFiles(MAIN_PATH, SOURCE_FILES, TARGET_FOLDERS);
});
