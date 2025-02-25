const getProduct = require('./getProduct')
const getCatalog = require('./getCatalog')
const navigation = require('./navigation')
const { insertData, checkSeriesId } = require('../lib/mongoClient')


async function init() {
  for (let i = 0; i < navigation.length; i++) {
    console.log("Catalog " + i)
    const _products =  await getCatalog(navigation[i]);
    const products = _products.map(item => ({ url: item.url, id: item.uid }));
    for (product of products) {
      console.log(product.id)
      if (await checkSeriesId('products', 'newcenter', product.id)) {
        console.log("Ignore insert product " + product.id);
        continue
      };
      const productData = await getProduct(product.url);
      insertData('products', 'newcenter', { id: product.id, ...productData, catalog: navigation[i].replace(`https://store.tildaapi.com/api/getproductslist/?storepartuid=813184749392&getparts=true&getoptions=true&filters[storepartuid][0]=`,'') });
    }
  }

}


init();