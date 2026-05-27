import { useState }    from "react";
import { useNavigate } from "react-router-dom";
import { useCart }      from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAccount }   from "../context/AccountContext";
import AccountModal     from "./AccountModal";

export default function ProductCard({ product }) {
  const { id, name, price, originalPrice, image, img, badge, rating, reviews, stock } = product;
  const navigate                       = useNavigate();
  const { addItem }                    = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user }                       = useAccount();
  const [accountOpen, setAccountOpen]  = useState(false);
  const fav      = isFavorite(id);
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;

  return (
    <>
      <div
        onClick={() => navigate(`/products/${id}`)}
        className="bg-[var(--color-primary)] rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(255,0,63,0.2)] transition-all duration-300 group border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative bg-[var(--color-primary-light)] h-48 flex items-center justify-center overflow-hidden">
          {badge && (
            <span className={`absolute top-3 left-3 font-display text-xs tracking-widest px-2 py-1 z-10 ${
              badge === "Nuevo"  ? "bg-[var(--color-accent)] text-white" :
              badge === "Oferta" ? "bg-white text-[var(--color-primary)]" :
              "bg-[#333] text-[var(--color-text)]"
            }`}>{badge.toUpperCase()}</span>
          )}
          {discount && (
            <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
              -{discount}%
            </span>
          )}

          {/* Botón favorito */}
          <button
            onClick={e => { e.stopPropagation(); toggleFavorite(product, user, () => setAccountOpen(true)); }}
            className={`absolute bottom-2 right-2 z-10 w-8 h-8 rounded-sm flex items-center justify-center border transition-all duration-200 ${
              fav
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_0_10px_rgba(255,0,63,0.5)]"
                : "bg-[var(--color-primary)]/80 border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
            }`}
            title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg className="w-4 h-4" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          {img
            ? <img src={img} alt={name} className="h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300 select-none drop-shadow-lg"/>
            : <div className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none filter drop-shadow-lg">{image}</div>
          }
        </div>

        <div className="p-4">
          <h3 className="font-body font-medium text-[var(--color-text)] text-sm leading-tight mb-1 line-clamp-2 group-hover:text-white">{name}</h3>
          <div className="flex items-center gap-1 mb-3">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className={`w-3 h-3 ${i <= rating ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
            <span className="text-xs text-[var(--color-text-muted)] ml-1">({reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-body font-bold text-[var(--color-text)] text-lg">${price.toLocaleString()}</span>
              {originalPrice && <span className="text-xs text-[var(--color-text-muted)] line-through ml-2">${originalPrice.toLocaleString()}</span>}
            </div>
            <button
              onClick={e => { e.stopPropagation(); addItem(product, 1); }}
              disabled={stock === 0}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-border)] disabled:text-[var(--color-text-muted)] text-white text-xs font-semibold px-3 py-2 rounded-sm transition-all duration-200 shadow-[0_0_8px_rgba(255,0,63,0.3)] hover:shadow-[0_0_14px_rgba(255,0,63,0.6)]"
            >
              {stock === 0 ? "Agotado" : "Agregar"}
            </button>
          </div>
        </div>
      </div>

      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)}/>
    </>
  );
}
