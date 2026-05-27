import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useAccount } from "../context/AccountContext";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import AccountModal from "../components/AccountModal";
import ProductCard from "../components/ProductCard";
import { getProductById, PRODUCTS } from "../data/products";

/* Estrellas clicables */
function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <svg
            className={`w-7 h-7 transition-colors ${i <= (hover || value) ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}`}
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

/* Botón de favorito */
function FavBtn({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user }                       = useAccount();
  const [accOpen, setAccOpen]          = useState(false);
  const fav = isFavorite(product.id);
  return (
    <>
      <button
        onClick={() => toggleFavorite(product, user, () => setAccOpen(true))}
        title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`w-10 h-10 rounded-sm flex items-center justify-center border transition-all duration-200 ${
          fav
            ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-[0_0_12px_rgba(255,0,63,0.5)]"
            : "border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
        }`}
      >
        <svg className="w-5 h-5" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
      <AccountModal open={accOpen} onClose={() => setAccOpen(false)}/>
    </>
  );
}

/* Reseñas iniciales de ejemplo */
const INITIAL_REVIEWS = {
  1: [{ id: 1, author: "Carlos López",   avatar: "CL", rating: 5, date: "12 mayo 2025", text: "Increíble teléfono, la cámara es bestial. Vale cada peso." }],
  3: [{ id: 1, author: "María González", avatar: "MG", rating: 4, date: "3 abril 2025",  text: "La cancelación de ruido es sorprendente. Muy recomendado." }],
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAccount();
  const product = getProductById(id);

  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);

  /* ── Valoraciones ── */
  const [reviews, setReviews] = useState(INITIAL_REVIEWS[parseInt(id)] || []);
  const [myRating, setMyRating]     = useState(0);
  const [myComment, setMyComment]   = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  const alreadyReviewed = reviews.some(r => r.author === user?.name);
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : (product?.rating ?? 0);

  function submitReview(e) {
    e.preventDefault();
    if (!myRating || !myComment.trim()) return;
    const newReview = {
      id: Date.now(),
      author: user.name,
      avatar: user.avatar,
      rating: myRating,
      date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
      text: myComment.trim(),
    };
    setReviews(prev => [newReview, ...prev]);
    setMyRating(0);
    setMyComment("");
    setReviewSent(true);
  }

  if (!product) return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="text-6xl mb-4 opacity-30">🔍</div>
      <h1 className="font-display text-3xl tracking-widest text-[var(--color-text)] mb-2">PRODUCTO NO ENCONTRADO</h1>
      <button onClick={() => navigate("/products")}
        className="mt-4 bg-[var(--color-accent)] text-white px-6 py-3 rounded-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors">
        Ver todos los productos
      </button>
    </div>
  );

  const { name, category, categorySlug, price, originalPrice, image, badge, rating, stock, brand, sku, description, specs } = product;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;
  const related  = PRODUCTS.filter(p => p.categorySlug === categorySlug && p.id !== product.id).slice(0, 4);

  const crumbs = [
    { label: "Home",       href: "/" },
    { label: "Productos",  href: "/products" },
    { label: category,     href: `/products?categoria=${categorySlug}` },
    { label: name,         href: `/products/${id}` },
  ];

  function handleAdd() { addItem(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }

  return (
    <div className="page-enter">
      <Breadcrumb crumbs={crumbs}/>
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Tarjeta principal ── */}
        <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm overflow-hidden mb-8 hover:border-[var(--color-accent)]/20 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Imagen */}
            <div className="relative bg-[var(--color-primary)] flex items-center justify-center p-12 min-h-72 border-b md:border-b-0 md:border-r border-[var(--color-border)]">
              {badge && (
                <span className={`absolute top-5 left-5 font-display tracking-widest text-xs px-3 py-1.5 ${badge === "Nuevo" ? "bg-[var(--color-accent)] text-white" : badge === "Oferta" ? "bg-white text-[var(--color-primary)]" : "bg-[#333] text-[var(--color-text)]"}`}>
                  {badge.toUpperCase()}
                </span>
              )}
              {discount && <span className="absolute top-5 right-5 text-xs font-bold px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30">-{discount}%</span>}
              {/* Imagen real si existe, emoji si no */}
              {product.img
                ? <img src={product.img} alt={name} className="max-h-60 max-w-full object-contain select-none drop-shadow-2xl"/>
                : <div className="text-[9rem] select-none drop-shadow-2xl">{image}</div>
              }
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">{brand}</span>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">SKU: {sku}</span>
                </div>
                <h1 className="font-display text-2xl tracking-wider text-[var(--color-text)] leading-tight mb-3">{name.toUpperCase()}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating)) ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[var(--color-text-muted)]">{avgRating} · {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}</span>
                </div>

                <p className="text-[var(--color-text-dim)] text-sm leading-relaxed mb-6">{description}</p>

                <div className="flex items-end gap-3 mb-2">
                  <span className="font-display text-4xl tracking-wider text-[var(--color-text)]">${price.toLocaleString()}</span>
                  {originalPrice && <span className="text-[var(--color-text-muted)] line-through text-lg mb-1">${originalPrice.toLocaleString()}</span>}
                </div>
                {discount && <p className="text-[var(--color-accent)] text-sm font-semibold mb-4">Ahorras ${(originalPrice - price).toLocaleString()} ({discount}% OFF)</p>}

                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${stock > 10 ? "bg-green-500" : stock > 0 ? "bg-amber-400" : "bg-[var(--color-accent)]"} shadow-[0_0_6px_currentColor]`}/>
                  <span className="text-sm text-[var(--color-text-dim)]">{stock > 10 ? "En stock" : stock > 0 ? `Solo ${stock} unidades` : "Agotado"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[var(--color-border)] rounded-sm overflow-hidden bg-[var(--color-primary)]">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-[var(--color-text-dim)] hover:text-white hover:bg-[var(--color-accent)] transition-colors font-bold">−</button>
                  <span className="w-10 text-center font-semibold text-[var(--color-text)] text-sm">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(stock, q + 1))} className="w-10 h-10 flex items-center justify-center text-[var(--color-text-dim)] hover:text-white hover:bg-[var(--color-accent)] transition-colors font-bold">+</button>
                </div>
                <button onClick={handleAdd} disabled={stock === 0}
                  className={`flex-1 py-3 rounded-sm font-display tracking-widest text-sm transition-all duration-200 ${added ? "bg-green-600 text-white" : stock === 0 ? "bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed" : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-[0_0_15px_rgba(255,0,63,0.4)] hover:shadow-[0_0_25px_rgba(255,0,63,0.6)]"}`}>
                  {added ? "✓ AGREGADO" : "AGREGAR AL CARRITO"}
                </button>
                <FavBtn product={product}/>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-[var(--color-border)]">
                {[{ icon:"🚚", text:"Envío express" }, { icon:"🔒", text:"Pago seguro" }, { icon:"↩️", text:"30 días dev." }].map(b => (
                  <div key={b.text} className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]"><span>{b.icon}</span><span>{b.text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Especificaciones ── */}
        <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-8 mb-8">
          <h2 className="font-display text-2xl tracking-widest text-[var(--color-text)] mb-5">ESPECIFICACIONES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
            {[specs.slice(0, Math.ceil(specs.length/2)), specs.slice(Math.ceil(specs.length/2))].map((col, ci) => (
              <div key={ci} className={ci === 1 ? "md:pl-8" : "md:pr-8"}>
                {col.map((spec, i) => (
                  <div key={spec.label} className={`flex py-3 text-sm ${i < col.length - 1 ? "border-b border-[var(--color-primary-light)]" : ""}`}>
                    <span className="w-40 shrink-0 text-[var(--color-text-muted)] font-medium">{spec.label}</span>
                    <span className="text-[var(--color-text)] font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Reseñas ── */}
        <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl tracking-widest text-[var(--color-text)]">RESEÑAS</h2>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating)) ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
              <span className="text-[var(--color-text-muted)] text-sm">{avgRating} de 5 · {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Formulario para nueva reseña */}
          {user ? (
            alreadyReviewed || reviewSent ? (
              <div className="bg-[var(--color-primary-light)] border border-[var(--color-border)] rounded-sm px-5 py-4 mb-6 flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Ya dejaste tu reseña para este producto. ¡Gracias!
              </div>
            ) : (
              <div className="bg-[var(--color-primary-light)] border border-[var(--color-border)] rounded-sm p-5 mb-6">
                <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wider mb-4">DEJA TU RESEÑA</p>
                <div className="mb-3">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">Tu calificación</p>
                  <StarPicker value={myRating} onChange={setMyRating}/>
                </div>
                <textarea
                  value={myComment}
                  onChange={e => setMyComment(e.target.value)}
                  placeholder="Cuéntanos tu experiencia con el producto..."
                  rows={3}
                  className="w-full bg-[var(--color-primary)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors resize-none mb-3"
                />
                <button
                  onClick={submitReview}
                  disabled={!myRating || !myComment.trim()}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-border)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed text-white font-display tracking-widest text-sm px-5 py-2.5 rounded-sm transition-all"
                >
                  PUBLICAR RESEÑA
                </button>
              </div>
            )
          ) : (
            <div className="bg-[var(--color-primary-light)] border border-[var(--color-border)] border-dashed rounded-sm px-5 py-4 mb-6 text-sm text-[var(--color-text-muted)] text-center">
              <span>Inicia sesión para dejar una reseña</span>
            </div>
          )}

          {/* Lista de reseñas */}
          {reviews.length === 0 ? (
            <p className="text-[var(--color-text-muted)] text-sm text-center py-6">Aún no hay reseñas. ¡Sé el primero!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="border border-[var(--color-border)] rounded-sm p-5 hover:border-[var(--color-accent)]/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--color-accent)] rounded-sm flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {r.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text)]">{r.author}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? "text-[var(--color-accent)]" : "text-[var(--color-border)]"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Relacionados ── */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl tracking-widest text-[var(--color-text)]">MÁS EN {category.toUpperCase()}</h2>
              <button onClick={() => navigate(`/products?categoria=${categorySlug}`)}
                className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">Ver todos →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
