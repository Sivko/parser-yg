const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const config = { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }

async function downloadImage(url, folder = 'images', filename = 'downloaded_image.jpg') {
    try {
        // Создаем папку, если её нет
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        // Путь сохранения файла
        const filePath = path.join(folder, filename);

        // Запрос изображения
        const response = await axios({
            url,
            responseType: 'stream',
            httpsAgent: agent,
        }, config);

        // Записываем изображение в файл
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        // Ожидаем завершения записи
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // console.log(`Изображение успешно сохранено: ${filePath}`);
    } catch (error) {
        // console.error('Ошибка при загрузке изображения:', error.message);
    }
}

// Пример использования
// const imageUrl = 'https://example.com/image.jpg'; // Замените на реальную ссылку
// downloadImage(imageUrl);

module.exports = downloadImage