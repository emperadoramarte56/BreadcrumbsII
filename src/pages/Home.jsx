import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";
import TERRIFIED from "../assets/TERRIFIED.png"

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="page-enter">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }]}/>

      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] overflow-hidden grain border-b border-[var(--color-accent)]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,63,0.15),transparent_60%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,63,0.08),transparent_50%)]"/>
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <span className="inline-block border border-[var(--color-accent)]/50 text-[var(--color-accent)] text-xs font-semibold px-3 py-1 mb-6 tracking-widest">🔴 OFERTAS DE TEMPORADA</span>
            <h1 className="font-display text-6xl md:text-7xl leading-none tracking-wider mb-6 text-[var(--color-text)]">
              TECNOLOGÍA<br/><span className="text-[var(--color-accent)]">SIN LÍMITES</span>
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
              <div className="w-64 h-64 bg-[var(--color-primary)] rounded-sm flex items-center justify-center overflow-hidden border border-[var(--color-accent)]/20 shadow-[0_0_60px_rgba(255,0,63,0.2)]"><img src={TERRIFIED} alt="Terrified" className="w-full h-full object-cover" /></div>
              <div className="absolute -top-4 -right-4 bg-[var(--color-accent)] text-white text-sm font-bold px-3 py-2 shadow-[0_0_15px_rgba(255,0,63,0.5)]">Hasta 40% OFF</div>
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-primary)] border border-[var(--color-border)] text-[var(--color-text)] text-sm font-bold px-3 py-2">✓ Envío gratis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[var(--color-primary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { text: "Envío Express",  sub: "24–48 horas" },
            { text: "Pago Seguro",    sub: "SSL certificado" },
            { text: "Devoluciones",   sub: "30 días sin preguntas" },
            { text: "Garantía",       sub: "Oficial de fábrica" },
          ].map(item => (
            <div key={item.text} className="flex items-center justify-center gap-3 py-2">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-display tracking-wider text-[var(--color-text)] text-sm">{item.text}</p>
                <p className="text-[var(--color-text-muted)] text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl tracking-widest text-[var(--color-text)]">CATEGORÍAS</h2>
            <button onClick={() => navigate("/products")} className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">Ver todas →</button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => {
              const count = PRODUCTS.filter(p => p.categorySlug === cat.slug).length;
              if (count === 0) return null;
              return (
                <button key={cat.slug} onClick={() => navigate(`/products?categoria=${cat.slug}`)}
                  className="flex flex-col items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 rounded-sm p-3 transition-all duration-200 group hover:-translate-y-0.5">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-body font-medium text-[var(--color-text-dim)] group-hover:text-[var(--color-text)] text-xs text-center leading-tight transition-colors">{cat.label}</span>
                  <span className="text-[var(--color-text-muted)] text-xs">{count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl tracking-widest text-[var(--color-text)]">DESTACADOS</h2>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">Los más vendidos de esta semana</p>
            </div>
            <button onClick={() => navigate("/products")} className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors">Ver todos →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </section>

        {/* Flash Sale — productos reales con oferta */}
        {(() => {
          const offerProducts = PRODUCTS.filter(p => p.originalPrice !== null).slice(0, 4);
          const maxDiscount   = Math.max(...offerProducts.map(p => Math.round((1 - p.price / p.originalPrice) * 100)));
          return (
            <section className="relative bg-[var(--color-primary)] border border-[var(--color-accent)]/30 rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,63,0.12),transparent_55%)]"/>
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between px-8 pt-8 pb-5 border-b border-[var(--color-accent)]/20">
                <div>
                  <span className="text-[var(--color-accent)] text-xs font-semibold uppercase tracking-widest">⚡ Oferta especial</span>
                  <h3 className="font-display text-3xl tracking-wider text-[var(--color-text)] mt-1">FLASH SALE</h3>
                  <p className="text-[var(--color-text-dim)] text-sm mt-1">
                    Hasta <span className="text-[var(--color-accent)] font-bold">{maxDiscount}% OFF</span> en {offerProducts.length} productos seleccionados
                  </p>
                </div>
                <button
                  onClick={() => navigate("/products?oferta=1")}
                  className="shrink-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest text-sm px-5 py-3 rounded-sm transition-all shadow-[0_0_16px_rgba(255,0,63,0.4)] hover:shadow-[0_0_24px_rgba(255,0,63,0.6)]"
                >
                  Ver todas →
                </button>
              </div>
              {/* Product grid */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[var(--color-border)]">
                {offerProducts.map(p => {
                  const disc = Math.round((1 - p.price / p.originalPrice) * 100);
                  return (
                    <button
                      key={p.id}
                      onClick={() => navigate(`/products/${p.id}`)}
                      className="flex flex-col items-center gap-2 p-5 hover:bg-[var(--color-primary-light)] transition-colors group text-left"
                    >
                      <div className="relative w-full flex justify-center">
                        <span className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-0.5 rounded-sm">-{disc}%</span>
                        {p.img
                          ? <img src={p.img} alt={p.name} className="h-20 object-contain group-hover:scale-105 transition-transform drop-shadow-md"/>
                          : <span className="text-5xl group-hover:scale-110 transition-transform">{p.image}</span>
                        }
                      </div>
                      <p className="font-medium text-[var(--color-text)] text-xs leading-tight line-clamp-2 text-center group-hover:text-white">{p.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[var(--color-text)] text-sm">${p.price.toLocaleString()}</span>
                        <span className="text-[var(--color-text-muted)] text-xs line-through">${p.originalPrice.toLocaleString()}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })()}
      </main>
    </div>
  );
}
