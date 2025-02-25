const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');


const config = { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
async function getIdBrands(url) {
  try {

    const { data: content } = await axios.get(url, config);
    const $ = cheerio.load(content);

    let data = [];
    $(".e-catalog-brand-list>li").each((i, el) => {
      const value = $(el).find(".brand-list-info-top").attr("onclick").replace("javascript:goSeries('", "").replace("');", "");
      data.push(value);
    });

    return data;
  } catch (error) {
    console.error('Ошибка при парсинге:', error.message);
    return null;
  }
}

// Пример использования
// (async () => {
//   const url = 'https://product.yg1.solutions/resource/e_catalog/brand?root_category=1&category_idx=6&unit=Metric';
//   const result = await getIdBrands(url);
//   console.log(result);
// })();

module.exports = getIdBrands