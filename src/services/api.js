export async function getCategories() {
  const resultado = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const object = await resultado.json();
  // console.log(object);
  return object;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const resultado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const object = await resultado.json();
  // console.log(object);
  return object;
}

export async function getProducts($QUERY) {
  const response = await fetch(`https://api.mercadolibre.com//items?ids=${$QUERY}`);
  const data = await response.json();
  return data;
}
