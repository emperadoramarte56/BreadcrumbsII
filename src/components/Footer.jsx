import { useNavigate } from "react-router-dom";

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

  function go(href) { navigate(href); window.scrollTo(0, 0); }

  return (
    <footer className="bg-[var(--color-primary)] border-t border-[var(--color-accent)]/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
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
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">Tu tienda de tecnología de confianza. Los mejores productos al mejor precio.</p>
        </div>

        {/* Productos */}
        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">PRODUCTOS</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.productos.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">EMPRESA</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.empresa.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 className="font-display text-base tracking-widest text-[var(--color-accent)] mb-4">SOPORTE</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.soporte.map(link => (
              <li key={link.label}>
                <button onClick={() => go(link.href)} className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] text-sm transition-colors hover:translate-x-1 inline-block duration-200">
                  {link.label}
                </button>
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
