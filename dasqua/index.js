const getProduct = require("./getProduct");
const navigation = require('./navigation')


async function init() {
  for (let i = 0; i < navigation.length; i++) {
    console.log("Catalog " + i)
    await getProduct(navigation[i]);
  }
}

init();