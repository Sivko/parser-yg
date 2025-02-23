const fs = require('fs');

/**
 * Функция для дозаписи JSON-объекта в файл, содержащий массив JSON-объектов
 * @param {string} filePath - Путь к JSON-файлу
 * @param {Object} newObject - Новый объект для добавления
 */
function appendJsonObject(filePath, newObject) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        let jsonArray = [];

        if (!err && data) {
            try {
                jsonArray = JSON.parse(data); // Читаем существующий массив
                if (!Array.isArray(jsonArray)) {
                    throw new Error('Файл должен содержать JSON-массив');
                }
            } catch (parseErr) {
                console.error('Ошибка парсинга JSON:', parseErr);
                return;
            }
        }

        jsonArray.push(newObject); // Добавляем новый объект

        fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Ошибка записи файла:', writeErr);
            } else {
                // console.log('Объект успешно добавлен в JSON-файл.');
            }
        });
    });
}

// // Пример использования
// const newEntry = { id: 1, name: 'Пример', timestamp: new Date().toISOString() };
// appendJsonObject('data.json', newEntry);

module.exports = appendJsonObject