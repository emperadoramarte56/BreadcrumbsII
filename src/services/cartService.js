const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function validateStockAndAdd(product, qty, addItemFn) {
  await delay(400 + Math.random() * 400);

  const available = product.stock ?? 0;

  if (available <= 0) {
    return { success: false, message: "Sin stock disponible en este momento." };
  }

  if (Math.random() < 0.08) {
    return { success: false, message: "Error al conectar. Intenta de nuevo." };
  }

  addItemFn(product, qty);

  return { success: true, message: "¡Agregado al carrito!" };
}
