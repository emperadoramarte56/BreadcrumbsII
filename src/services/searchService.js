import { PRODUCTS } from "../data/products";

let debounceTimer = null;

export function searchProducts(query) {
  if (debounceTimer) clearTimeout(debounceTimer);

  return new Promise((resolve) => {
    if (!query || query.trim().length < 2) {
      resolve([]);
      return;
    }

    debounceTimer = setTimeout(() => {
      const q = query.trim().toLowerCase();

      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.categorySlug && p.categorySlug.toLowerCase().includes(q))
      );

      matches.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts;
      });

      resolve(matches.slice(0, 5));
    }, 350);
  });
}
