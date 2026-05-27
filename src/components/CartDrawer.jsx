import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();

  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}/>
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-primary)] border-l border-[var(--color-border)] z-50 shadow-[-4px_0_40px_rgba(255,0,63,0.15)] flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <h2 className="font-display text-xl tracking-widest text-[var(--color-text)]">CARRITO</h2>
            {totalItems > 0 && <span className="bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-0.5 rounded-sm">{totalItems}</span>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--color-primary-light)] rounded-sm transition-colors text-[var(--color-text-dim)] hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-7xl opacity-30">🛒</div>
              <p className="font-display text-xl tracking-widest text-[var(--color-text-muted)]">CARRITO VACÍO</p>
              <button onClick={onClose} className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-sm font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-colors">
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 bg-[var(--color-primary)] rounded-sm p-4 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors">
                  {/* Imagen del producto */}
                  <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-sm flex items-center justify-center shrink-0 border border-[var(--color-border)] overflow-hidden">
                    {product.img
                      ? <img src={product.img} alt={product.name} className="w-full h-full object-contain p-1"/>
                      : <span className="text-3xl">{product.image}</span>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text)] text-sm leading-tight line-clamp-2 mb-1">{product.name}</p>
                    <span className="font-bold text-[var(--color-text)] text-sm">${product.price.toLocaleString()}</span>
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty — mínimo 1, máximo stock */}
                      <div className="flex items-center border border-[var(--color-border)] rounded-sm overflow-hidden bg-[var(--color-primary)]">
                        <button
                          onClick={() => updateQty(product.id, Math.max(1, qty - 1))}
                          disabled={qty <= 1}
                          className="w-7 h-7 flex items-center justify-center text-[var(--color-text-dim)] hover:text-white hover:bg-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-sm"
                        >−</button>
                        <span className="w-7 text-center text-sm font-semibold text-[var(--color-text)]">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, Math.min(product.stock, qty + 1))}
                          disabled={qty >= product.stock}
                          className="w-7 h-7 flex items-center justify-center text-[var(--color-text-dim)] hover:text-white hover:bg-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-sm"
                        >+</button>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)] px-6 py-5 bg-[var(--color-primary)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-dim)] text-sm">Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})</span>
              <span className="font-display text-2xl tracking-wider text-[var(--color-text)]">${totalPrice.toLocaleString()}</span>
            </div>
            <button className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest py-3.5 rounded-sm transition-all shadow-[0_0_20px_rgba(255,0,63,0.4)] hover:shadow-[0_0_30px_rgba(255,0,63,0.6)] text-sm">
              PROCEDER AL PAGO →
            </button>
            <button onClick={clearCart} className="w-full text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
