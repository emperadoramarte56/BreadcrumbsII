import { PRODUCTS } from "../data/products";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(filters = {}) {
  await delay(300 + Math.random() * 400);

  if (Math.random() < 0.05) {
    throw new Error("Error de red: no se pudo conectar al servidor de productos.");
  }

  let results = [...PRODUCTS];

  if (filters.categorySlug) {
    results = results.filter((p) => p.categorySlug === filters.categorySlug);
  }
  if (filters.onSale) {
    results = results.filter((p) => p.originalPrice !== null);
  }
  if (filters.limit) {
    results = results.slice(0, filters.limit);
  }

  return results;
}

export async function fetchFeaturedProducts() {
  return fetchProducts({ limit: 8 });
}

export async function fetchFlashSaleProducts() {
  return fetchProducts({ onSale: true, limit: 4 });
}
