'use strict';

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const projectConfig = require('./projectConfig.json');

const dirs = {
    "source": "./src/",
    "build": "./build/",
    "blocksName": "components",
    "pageName": "pages"
};
const mkdirp = require('mkdirp');

const blockName = process.argv[2]; // получим имя блока
const pageName = process.argv[3];
const defaultExtensions = ['scss', 'pug', 'js']; // расширения по умолчанию
let argNumber = pageName ? 4 : 3
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(argNumber))); // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if (blockName) {
    const dirPath = pageName ? `${dirs.source + dirs.pageName}/${blockName}/` : `${dirs.source + dirs.blocksName}/${blockName}/`; // полный путь к создаваемой папке блока
    mkdirp(dirPath, (err) => { // создаем
        // Если какая-то ошибка — покажем
        if (err) {
            console.error(`Отмена операции: ${err}`);
        }

        // Нет ошибки, поехали!
        else {
            console.log(`Создание папки ${dirPath} (если отсутствует)`);
            // Обходим массив расширений и создаем файлы, если они еще не созданы
            extensions.forEach((extention) => {
                const filePath = `${dirPath + blockName}.${extention}`; // полный путь к создаваемому файлу
                let fileContent = ''; // будущий контент файла
                let fileCreateMsg = ''; // будущее сообщение в консоли при создании файла

                // Если это SCSS
                if (extention === 'scss') {
                    fileContent = `// В этом файле должны быть стили только для БЭМ-блока ${blockName}, его элементов, \n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Не пишите здесь другие селекторы.\n\n.${blockName} {\n  \n}\n`;
                    // fileCreateMsg = '';

                    // Добавим созданный файл
                    let hasThisBlock = false;
                    var projectConfigBlocks = pageName ? projectConfig.pages : projectConfig.components
                    for (const block in projectConfigBlocks) {
                        if (block === blockName) {
                            hasThisBlock = true;
                            break;
                        }
                    }
                    if (!hasThisBlock) {
                        projectConfigBlocks[blockName] = [];                            
                        const newPackageJson = JSON.stringify(projectConfig, '', 2);
                        fs.writeFileSync('./projectConfig.json', newPackageJson);
                        fileCreateMsg = ' Подключение блока добавлено в projectConfig.json';
                    }
                }

                // Если это Jade
                else if (extention === 'jade') {
                    fileContent = `//--DEV Для шаблонизации использован Jade\nsection.${blockName} Content\n`;
                    // fileCreateMsg = '';
                }

                // Если это JS
                else if (extention === 'js') {
                    fileContent = '// document.addEventListener(\'DOMContentLoaded\', function(){});\n// (function(){\n// код\n// }());\n';
                }

                // Если нужна подпапка для картинок
                else if (extention === 'img') {
                    const imgFolder = `${dirPath}img/`;
                    if (fileExist(imgFolder) === false) {
                        mkdirp(imgFolder, (err) => {
                            if (err) console.error(err);
                            else console.log(`Создание папки: ${imgFolder} (если отсутствует)`);
                        });
                    } else {
                        console.log(`Папка ${imgFolder} НЕ создана (уже существует) `);
                    }
                }

                // Создаем файл, если он еще не существует
                if (fileExist(filePath) === false && extention !== 'img') {
                    fs.writeFile(filePath, fileContent, (err) => {
                        if (err) {
                            return console.log(`Файл НЕ создан: ${err}`);
                        }
                        console.log(`Файл создан: ${filePath}`);
                        if (fileCreateMsg) {
                            console.warn(fileCreateMsg);
                        }
                    });
                } else if (extention !== 'img') {
                    console.log(`Файл НЕ создан: ${filePath} (уже существует)`);
                }
            });
        }
    });
} else {
    console.log('Отмена операции: не указан блок');
}

// Оставить в массиве только уникальные значения (убрать повторы)
function uniqueArray(arr) {
    const objectTemp = {};
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        objectTemp[str] = true; // запомнить строку в виде свойства объекта
    }
    return Object.keys(objectTemp);
}

// Проверка существования файла
function fileExist(path) {
    const fs = require('fs');
    try {
        fs.statSync(path);
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}