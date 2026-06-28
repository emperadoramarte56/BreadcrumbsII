import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/products";
import TERRIFIED from "../assets/TERRIFIED.png";
import { fetchFeaturedProducts, fetchFlashSaleProducts } from "../services/productService";

function ProductSkeleton() {
  return (
    <div className="bg-[var(--color-primary)] rounded-sm border border-[var(--color-border)] overflow-hidden animate-pulse">
      <div className="h-48 bg-[var(--color-primary-light)]" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-[var(--color-primary-light)] rounded-sm w-3/4" />
        <div className="h-3 bg-[var(--color-primary-light)] rounded-sm w-1/2" />
        <div className="h-8 bg-[var(--color-primary-light)] rounded-sm mt-3" />
      </div>
    </div>
  );
}

function FlashSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-5 animate-pulse">
      <div className="w-20 h-20 bg-[var(--color-primary-light)] rounded-sm" />
      <div className="h-3 bg-[var(--color-primary-light)] rounded-sm w-24" />
      <div className="h-3 bg-[var(--color-primary-light)] rounded-sm w-16" />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [featured,  setFeatured]  = useState([]);
  const [flashSale, setFlashSale] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        const [featuredData, flashData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchFlashSaleProducts(),
        ]);
        setFeatured(featuredData);
        setFlashSale(flashData);
      } catch (err) {
        setError(err.message ?? "No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const maxDiscount =
    flashSale.length > 0
      ? Math.max(...flashSale.map((p) => p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0))
      : 0;

  return (
    <div className="page-enter">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }]} />

      <section className="relative bg-[var(--color-primary)] overflow-hidden grain border-b border-[var(--color-accent)]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,63,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,63,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <span className="inline-block border border-[var(--color-accent)]/50 text-[var(--color-accent)] text-xs font-semibold px-3 py-1 mb-6 tracking-widest">
              🔴 OFERTAS DE TEMPORADA
            </span>
            <h1 className="font-display text-6xl md:text-7xl leading-none tracking-wider mb-6 text-[var(--color-text)]">
              TECNOLOGÍA<br />
              <span className="text-[var(--color-accent)]">SIN LÍMITES</span>
            </h1>
            <p className="text-[var(--color-text-dim)] text-lg mb-8 max-w-md leading-relaxed">
              Los últimos smartphones, laptops y gadgets. Garantía oficial, envío express.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate("/products")} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-6 py-3 rounded-sm transition-all shadow-[0_0_20px_rgba(255,0,63,0.4)] hover:shadow-[0_0_30px_rgba(255,0,63,0.7)]">
                Ver Productos →
              </button>
              <button onClick={() => navigate("/about")} className="border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 text-[var(--color-text-dim)] hover:text-[var(--color-text)] font-semibold px-6 py-3 rounded-sm transition-all">
                Conoce más
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center z-10">
            <div className="relative">
              <div className="w-64 h-64 bg-[var(--color-primary)] rounded-sm flex items-center justify-center overflow-hidden border border-[var(--color-accent)]/20 shadow-[0_0_60px_rgba(255,0,63,0.2)]">
                <img src={TERRIFIED} alt="Terrified" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 bg-[var(--color-accent)] text-white text-sm font-bold px-3 py-2 shadow-[0_0_15px_rgba(255,0,63,0.5)]">Hasta 40% OFF</div>
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-primary)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-bold px-3 py-2">✓ Envío gratis</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-primary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { text: "Envío Express",  sub: "24–48 horas" },
            { text: "Pago Seguro",    sub: "SSL certificado" },
            { text: "Devoluciones",   sub: "30 días sin preguntas" },
            { text: "Garantía",       sub: "Oficial de fábrica" },
          ].map((item) => (
            <div key={item.text} className="flex items-center justify-center gap-3 py-2">
              <div>
                <p className="font-display tracking-wider text-[var(--color-text)] text-sm">{item.text}</p>
                <p className="text-[var(--color-text-muted)] text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl tracking-widest text-[var(--color-text)]">CATEGORÍAS</h2>
            <button onClick={() => navigate("/products")} className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">Ver todas →</button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <button key={cat.slug} onClick={() => navigate(`/products?categoria=${cat.slug}`)}
                className="flex flex-col items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 rounded-sm p-3 transition-all duration-200 group hover:-translate-y-0.5">
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-body font-medium text-[var(--color-text-dim)] group-hover:text-[var(--color-text)] text-xs text-center leading-tight transition-colors">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {error && (
          <div className="mb-8 border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 rounded-sm px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-accent)] text-xl">⚠</span>
              <p className="text-[var(--color-text-dim)] text-sm">{error}</p>
            </div>
            <button onClick={() => window.location.reload()} className="text-xs text-[var(--color-accent)] border border-[var(--color-accent)]/40 px-3 py-1 rounded-sm hover:bg-[var(--color-accent)]/10 transition-colors shrink-0">
              Reintentar
            </button>
          </div>
        )}

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl tracking-widest text-[var(--color-text)]">DESTACADOS</h2>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">Los más vendidos de esta semana</p>
            </div>
            <button onClick={() => navigate("/products")} className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">Ver todos →</button>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>

        <section className="relative bg-[var(--color-primary)] border border-[var(--color-accent)]/30 rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,63,0.12),transparent_55%)]" />
          <div className="relative z-10 flex items-center justify-between px-8 pt-8 pb-5 border-b border-[var(--color-accent)]/20">
            <div>
              <span className="text-[var(--color-accent)] text-xs font-semibold uppercase tracking-widest">⚡ Oferta especial</span>
              <h3 className="font-display text-3xl tracking-wider text-[var(--color-text)] mt-1">FLASH SALE</h3>
              {!loading && flashSale.length > 0 && (
                <p className="text-[var(--color-text-dim)] text-sm mt-1">
                  Hasta <span className="text-[var(--color-accent)] font-bold">{maxDiscount}% OFF</span> en {flashSale.length} productos seleccionados
                </p>
              )}
            </div>
            <button onClick={() => navigate("/products?oferta=1")} className="shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest text-sm px-5 py-3 rounded-sm transition-all shadow-[0_0_16px_rgba(255,0,63,0.4)] hover:shadow-[0_0_24px_rgba(255,0,63,0.6)]">
              Ver todas →
            </button>
          </div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[var(--color-border)]">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <FlashSkeleton key={i} />)
              : flashSale.map((p) => {
                  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
                  return (
                    <button key={p.id} onClick={() => navigate(`/products/${p.id}`)}
                      className="flex flex-col items-center gap-2 p-5 hover:bg-[var(--color-primary-light)] transition-colors group text-left">
                      <div className="relative w-full flex justify-center">
                        {disc > 0 && (
                          <span className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-0.5 rounded-sm">-{disc}%</span>
                        )}
                        {p.img
                          ? <img src={p.img} alt={p.name} className="h-20 object-contain group-hover:scale-105 transition-transform drop-shadow-md" />
                          : <span className="text-5xl group-hover:scale-110 transition-transform">{p.image}</span>
                        }
                      </div>
                      <p className="font-medium text-[var(--color-text)] text-xs leading-tight line-clamp-2 text-center group-hover:text-white">{p.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[var(--color-text)] text-sm">${p.price.toLocaleString()}</span>
                        {p.originalPrice && <span className="text-[var(--color-text-muted)] text-xs line-through">${p.originalPrice.toLocaleString()}</span>}
                      </div>
                    </button>
                  );
                })
            }
          </div>
        </section>
      </main>
    </div>
  );
}
