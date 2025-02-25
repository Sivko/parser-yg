const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const config = { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }

async function getProduct(url) {
  try {

    const { data: content } = await axios.get(url, config);
    const data = {};
    const $ = cheerio.load(content);


    data.name1 = $(".series-details-info span").text().trim();
    data.name2 = $(".series-details-info h3").text().trim();
    
    data.images = [];
    $('.series-details-img img').each((i, el) => {
      const src = $(el).attr('src');
      src && data.images.push(src);
    });
    // for (let i = 0; i < data.images.length; i++) {
    //   const urlParts = data.images[i].split('/');
    //   const originalFilename = urlParts[urlParts.length - 1];
    //   await downloadImage("https://product.yg1.solutions/"+data.images[i], 'images', originalFilename);
    // }

    data.video = $(".video-btn").attr("youtube");

    data.featureText = $('.series-details-subtit p').text().trim();

    data.options = [];
    $(".series-details-option li").each((i, el) => {
      const img = $(el).find("img").attr("src");
      data.options.push(img);
    })

    data.workMaterialList = [];
    $(".work-material-list li").each((i, el) => {
      const material = $(el).find(".graph-name").text().trim();
      const value = $(el).find(".progress-wrap ").attr("data-progress-percent");
      material && data.workMaterialList.push({ material, value });
    })


    // Регулярное выражение для извлечения JSON-объекта из вызова функции
    const scriptText = $('script').text();
    const regex = /commonAjax\("post","\/resource\/getEdpListForEcDetail",({.*?}),/s;
    const match = scriptText.match(regex);

    if (match) {
      try {
        // Парсим JSON-объект из строки
        const params = JSON.parse(match[1]);
        const formData = new FormData();
        formData.append("root_category", params.root_category);
        formData.append("idx", params.idx);
        formData.append("type_idx", params.type_idx);
        await axios.post("https://product.yg1.solutions/resource/getEdpListForEcDetail", formData, config).then((response) => {
          data.details = response.data.result;
        }).catch((error) => {
          console.log("error", error);
        })
      } catch (error) {
        console.error("Ошибка парсинга JSON:", error);
      }
    } else {
      console.log("Данные не найдены.");
    }



    return data;
  } catch (error) {
    console.error('Ошибка при парсинге:', error.message);
    return null;
  }
}

// Пример использования
// (async () => {
//   const url = 'https://product.yg1.solutions/resource/e_catalog/detail?root_category=2&category_idx=9&brand_idx=382&series_idx=1378&unit=Metric&option_name=hole_type&option_value=Through';
//   const result = await getProduct(url);
//   console.log(result);
// })();

module.exports = getProduct