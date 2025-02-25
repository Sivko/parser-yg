const axios = require('axios');

async function fetchAllProducts(baseUrl) {
    let allProducts = [];
    let slice = 1;
    let total = 0;
  
    try {
        while (true) {
            const url = `${baseUrl}&slice=${slice}`;
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            if (!data.products || data.products.length === 0) {
                break; // Если больше нет товаров, выходим
            }

            allProducts = allProducts.concat(data.products); // Добавляем товары в общий массив
            total = data.total; // Общее количество товаров

            console.log(`Загружено ${allProducts.length} из ${total}`);

            if (allProducts.length >= total) {
                break; // Если все товары загружены, выходим
            }

            slice++; // Увеличиваем slice для следующей страницы
        }

        console.log(`✅ Всего загружено продуктов: ${allProducts.length}`);
        return allProducts;
    } catch (error) {
        console.error('Ошибка:', error.message);
        return [];
    }
}

// Запуск с нужным URL
// const baseUrl = 'https://store.tildaapi.com/api/getproductslist/?storepartuid=813184749392&getparts=true&getoptions=true&filters[storepartuid][0]=Alpha-GX фрезы';
// fetchAllProducts(baseUrl).then(products => {
//     console.log('Пример первых 3 товаров:', products.slice(0, 3));
// });

module.exports = fetchAllProducts