
const { navigation } = require('./navigation')
const getIdBrands = require('./getIdBrands')
const getIdProducts = require('./getIdProducts')
const getProduct = require('./getProduct')
const appendJsonObject = require('../lib/appendJsonObject')
const { insertData, checkSeriesIdx } = require('../lib/mongoClient')

async function init() {
  for (let i = 0; i < navigation.length; i++) {
    console.log("Категрия " + i)
    const brands = await getIdBrands(navigation[i]);
    for (let j = 0; j < brands.length; j++) {
      console.log("Brand " + j)
      const productsURL = (navigation[i] + `&brand_idx=${brands[j]}`).replace("brand?", "series?");
      const products = await getIdProducts(productsURL);
      for (let k = 0; k < products.length; k++) {
        if (await checkSeriesIdx('products', 'yg', products[k])) {
          console.log("Ignore insert product " + products[k]);
          continue
        };
        const productURL = (navigation[i] + `&brand_idx=${brands[j]}&series_idx=${products[k]}`).replace("brand?", "detail?");
        const product = await getProduct(productURL);
        insertData('products', 'yg', { brand_idx: brands[j], series_idx: products[k], ...product });
      }
    }
  }

  // const productsURL = (navigation[0]+`&brand_idx=1102`).replace("brand?", "series?");
  // const products = await getIdProducts(productURL);

  // const productURL = (navigation[0]+`&brand_idx=1102&series_idx=23435`).replace("brand?", "detail?");
  // const product = await getProduct(productURL);
  // appendJsonObject('data.json', product);
}


init()
