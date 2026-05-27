import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

const SORT_OPTIONS = [
  { value: "relevance",  label: "Relevancia" },
  { value: "price-asc",  label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating",     label: "Mejor valorados" },
  { value: "newest",     label: "Más nuevos" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("categoria") || "";
  const query = searchParams.get("q") || "";
  const onlyOffersParam = searchParams.get("oferta") === "1";
  const [sort, setSort] = useState("relevance");
  const [onlyOffers, setOnlyOffers] = useState(onlyOffersParam);
  const activeCat = CATEGORIES.find(c => c.slug === categorySlug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Productos", href: "/products" },
    ...(activeCat ? [{ label: activeCat.label, href: `/products?categoria=${activeCat.slug}` }] : []),
    ...(query ? [{ label: `"${query}"`, href: `/products?q=${query}` }] : []),
  ];

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (categorySlug) list = list.filter(p => p.categorySlug === categorySlug);
    if (query) list = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
    if (onlyOffers) list = list.filter(p => p.originalPrice !== null);
    switch (sort) {
      case "price-asc":  return [...list].sort((a,b) => a.price - b.price);
      case "price-desc": return [...list].sort((a,b) => b.price - a.price);
      case "rating":     return [...list].sort((a,b) => b.rating - a.rating || b.reviews - a.reviews);
      case "newest":     return [...list].sort((a,b) => b.id - a.id);
      default:           return list;
    }
  }, [categorySlug, query, sort, onlyOffers]);

  function setCategory(slug) {
    const p = new URLSearchParams();
    if (slug) p.set("categoria", slug);
    setSearchParams(p);
  }

  return (
    <div className="page-enter">
      <Breadcrumb crumbs={crumbs}/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl tracking-widest text-[var(--color-text)]">
            {query ? `RESULTADOS: "${query}"` : activeCat ? activeCat.label.toUpperCase() : "TODOS LOS PRODUCTOS"}
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-52 shrink-0">
            <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-5 sticky top-20">
              <h3 className="font-display tracking-widest text-[var(--color-accent)] text-sm mb-4">CATEGORÍAS</h3>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => setCategory("")}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors flex items-center justify-between ${!categorySlug ? "bg-[var(--color-accent)] text-white font-semibold" : "text-[var(--color-text-dim)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-text)]"}`}>
                    <span>Todos</span><span className="text-xs opacity-60">{PRODUCTS.length}</span>
                  </button>
                </li>
                {CATEGORIES.map(cat => {
                  const count = PRODUCTS.filter(p => p.categorySlug === cat.slug).length;
                  if (count === 0) return null;
                  return (
                    <li key={cat.slug}>
                      <button onClick={() => setCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors flex items-center justify-between ${categorySlug === cat.slug ? "bg-[var(--color-accent)] text-white font-semibold" : "text-[var(--color-text-dim)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-text)]"}`}>
                        <span>{cat.icon} {cat.label}</span><span className="text-xs opacity-60">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <hr className="my-4 border-[var(--color-border)]"/>
              <h3 className="font-display tracking-widest text-[var(--color-accent)] text-sm mb-3">FILTROS</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={onlyOffers} onChange={e => setOnlyOffers(e.target.checked)} className="accent-[var(--color-accent)] w-4 h-4"/>
                <span className="text-sm text-[var(--color-text-dim)]">Solo ofertas</span>
              </label>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[var(--color-text-muted)] hidden md:block">Mostrando <strong className="text-[var(--color-text)]">{filtered.length}</strong> resultado{filtered.length !== 1 ? "s" : ""}</p>
              <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm text-[var(--color-text-muted)]">Ordenar:</label>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="border border-[var(--color-border)] bg-[var(--color-primary)] rounded-sm px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer">
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4 opacity-30">🔍</div>
                <h3 className="font-display text-2xl tracking-widest text-[var(--color-text)] mb-2">SIN RESULTADOS</h3>
                <p className="text-[var(--color-text-muted)]">Intenta con otros filtros.</p>
                <button onClick={() => { setSearchParams({}); setOnlyOffers(false); }}
                  className="mt-4 bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
