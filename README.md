

# Step 1
Получить Бренды (getIdBrands)
https://product.yg1.solutions/resource/e_catalog/brand?root_category=1&category_idx=6&unit=Metric
# Step 2
Получить Продукты Бренда (getIdProducts)
https://product.yg1.solutions/resource/e_catalog/series?root_category=1&category_idx=6&brand_idx=1102&unit=Metric
# Step 3
Получить Продукт (getProduct)
https://product.yg1.solutions/resource/e_catalog/detail?root_category=2&category_idx=9&brand_idx=382&series_idx=1378&unit=Metric
И сделать API запрос для detail
POST https://product.yg1.solutions/resource/getEdpListForEcDetail
FORMDATA root_category: Holemaking|Threading|Milling|Turning,idx:$series_idx, type_idx:$

# Up
1. docker compose up -d
2. node index.js