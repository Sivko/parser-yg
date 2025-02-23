
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');


const config = { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
async function getIdProducts(url) {
  try {
    
    const { data:content } = await axios.get(url, config);
    const $ = cheerio.load(content);

    let data = [];
    $(".e-catalog_series-list>li").each((i, el) => {
      const value = $(el).find(".series-procuct").attr("onclick").replace("javascript:goDetail('","").replace("');","");
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
//   const url = 'https://product.yg1.solutions/resource/e_catalog/series?root_category=1&category_idx=6&brand_idx=1102&unit=Metric&option_name=';
//   const result = await getIdProducts(url);
//   console.log(result);
// })();

module.exports = getIdProducts