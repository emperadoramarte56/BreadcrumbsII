import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitNewsletterForm } from "../services/newsletterService";

const FOOTER_LINKS = {
  productos: [
    { label: "Smartphones",  href: "/products?categoria=smartphones" },
    { label: "Laptops",      href: "/products?categoria=laptops" },
    { label: "Tablets",      href: "/products?categoria=tablets" },
    { label: "Audio",        href: "/products?categoria=audio" },
    { label: "Monitores",    href: "/products?categoria=monitores" },
    { label: "Periféricos",  href: "/products?categoria=perifericos" },
  ],
  empresa: [
    { label: "Sobre Nosotros",       href: "/about" },
    { label: "Trabaja con Nosotros", href: "/jobs" },
    { label: "Blog",                 href: "/blog" },
    { label: "Prensa",               href: "/press" },
  ],
  soporte: [
    { label: "FAQ",           href: "/faq" },
    { label: "Envíos",        href: "/shipping" },
    { label: "Devoluciones",  href: "/returns" },
    { label: "Garantías",     href: "/warranty" },
    { label: "Contacto",      href: "/contact" },
  ],
};

export default function Footer() {
  const navigate = useNavigate();
  const [email,     setEmail]     = useState("");
  const [nlState,   setNlState]   = useState("idle");
  const [nlMessage, setNlMessage] = useState("");

  function go(href) { navigate(href); window.scrollTo(0, 0); }

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (nlState !== "idle") return;

    setNlState("loading");
    setNlMessage("");

    try {
      const result = await submitNewsletterForm(email);
      setNlMessage(result.message);
      setNlState("success");
      setEmail("");
    } catch (err) {
      setNlMessage(err.message);
      setNlState("error");
    } finally {
      setTimeout(() => { setNlState("idle"); setNlMessage(""); }, 4000);
    }
  }

  return (
    <footer className="bg-[var(--color-primary)] border-t border-[var(--color-accent)]/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-sm flex items-center justify-center shadow-[0_0_12px_rgba(255,0,63,0.4)]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span className="font-display text-xl tracking-widest text-[var(--color-text)]">
              TERRIFIED<span className="text-[var(--color-accent)]"> ELECTRONICS</span>
            </span>
          </div>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5">
            Tu tienda de tecnología de confianza. Los mejores productos al mejor precio.
          </p>
          <p className="text-[var(--color-text-dim)] text-xs font-semibold uppercase tracking-widest mb-2">Ofertas exclusivas</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              disabled={nlState === "loading" || nlState === "success"}
              className="w-full bg-[var(--color-primary-light)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-all disabled:opacity-50"
            />
            <button type="submit" disabled={nlState !== "idle"}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-sm transition-all flex items-center justify-center gap-2">
              {nlState === "loading" && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {nlState === "idle"    && "Suscribirse"}
              {nlState === "loading" && "Enviando..."}
              {nlState === "success" && "✓ Suscrito"}
              {nlState === "error"   && "Reintentar"}
            </button>
          </form>
          {nlMessage && (
            <p className={`text-xs mt-2 leading-tight ${nlState === "success" ? "text-green-400" : "text-[var(--color-accent)]"}`}>
              {nlMessage}
            </p>
          )}
        </div>

        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">PRODUCTOS</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.productos.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">{link.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">EMPRESA</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.empresa.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">{link.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">SOPORTE</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.soporte.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">{link.label}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-primary-light)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>© 2026 Terrified Electronicos. Todos los derechos reservados.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            {[["Privacidad","/privacy"],["Términos","/terms"],["Cookies","/cookies"]].map(([l,h]) => (
              <button key={l} onClick={() => go(h)} className="hover:text-[var(--color-text-dim)] transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
