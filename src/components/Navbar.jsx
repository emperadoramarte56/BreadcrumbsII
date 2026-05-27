import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAccount } from "../context/AccountContext";
import CartDrawer from "./CartDrawer";
import AccountModal from "./AccountModal";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user }       = useAccount();
  const navigate       = useNavigate();
  const [cartOpen,    setCartOpen]    = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [search,      setSearch]      = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?q=${encodeURIComponent(search.trim())}`);
      setSearch(""); setMenuOpen(false);
    }
  }

  return (
    <>
      <header className="bg-[var(--color-primary)] border-b border-[var(--color-accent)]/30 text-[var(--color-text)] sticky top-0 z-30 shadow-[0_2px_20px_rgba(255,0,63,0.15)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-sm flex items-center justify-center shadow-[0_0_12px_rgba(255,0,63,0.5)] group-hover:shadow-[0_0_20px_rgba(255,0,63,0.8)] transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="font-display text-2xl tracking-widest hidden sm:block">
              TERRIFIED<span className="text-[var(--color-accent)]"> ELECTRONICS</span>
            </span>
          </button>

          {/* Buscador */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch(e)}
                placeholder="Buscar productos..."
                className="w-full bg-[var(--color-primary-light)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 focus:border-[var(--color-accent)] rounded-sm px-4 py-2 text-sm placeholder:text-[var(--color-text-muted)] text-[var(--color-text)] focus:outline-none transition-all"/>
              <button onClick={handleSearch} className="absolute right-3 top-2.5">
                <svg className="w-4 h-4 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <button onClick={() => setAccountOpen(true)}
              className="hidden md:flex items-center gap-2 text-sm text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary-light)] px-3 py-2 rounded-sm transition-all border border-transparent hover:border-[var(--color-border)]">
              {user ? (
                <>
                  <div className="w-6 h-6 bg-[var(--color-accent)] rounded-sm flex items-center justify-center text-xs font-bold text-white">
                    {user.avatar}
                  </div>
                  <span>{user.name.split(" ")[0]}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>Mi Cuenta</span>
                </>
              )}
            </button>

            <button onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] shadow-[0_0_12px_rgba(255,0,63,0.4)] hover:shadow-[0_0_20px_rgba(255,0,63,0.7)] transition-all px-4 py-2 rounded-sm text-sm font-semibold text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span className="hidden sm:block">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[var(--color-accent)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="md:hidden text-[var(--color-text-dim)] hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[var(--color-primary)] border-t border-[var(--color-border)] px-6 py-4 flex flex-col gap-3 text-sm">
            <div className="relative">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch(e)}
                placeholder="Buscar..."
                className="w-full bg-[var(--color-primary-light)] border border-[var(--color-border)] rounded-sm px-4 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"/>
            </div>
            <button onClick={() => { setAccountOpen(true); setMenuOpen(false); }}
              className="text-[var(--color-text-dim)] hover:text-white py-1 text-left">
              {user ? user.name : "Mi Cuenta"}
            </button>
            {[["Inicio","/"],["Productos","/products"],["Nosotros","/about"],["FAQ","/faq"]].map(([l,h]) => (
              <button key={h} onClick={() => { navigate(h); setMenuOpen(false); }}
                className="text-[var(--color-text-dim)] hover:text-white py-1 text-left">
                {l}
              </button>
            ))}
          </div>
        )}
      </header>

      <CartDrawer  open={cartOpen}    onClose={() => setCartOpen(false)}/>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)}/>
    </>
  );
}
