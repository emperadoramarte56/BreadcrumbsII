import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";

function PageShell({ title, crumbs, children }) {
  return (
    <div className="page-enter">
      <Breadcrumb crumbs={crumbs}/>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl tracking-widest text-[var(--color-text)] mb-8">{title}</h1>
        {children}
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-6 mb-4 hover:border-[var(--color-accent)]/20 transition-colors">
      {title && <h3 className="font-display tracking-widest text-[var(--color-accent)] text-sm mb-3">{title}</h3>}
      <div className="text-[var(--color-text-dim)] text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function About() {
  return (
    <PageShell title="SOBRE NOSOTROS" crumbs={[{label:"Home",href:"/"},{label:"Nosotros",href:"/about"}]}>
      <Section title="NUESTRA HISTORIA">
        <p>Terrified Electronics nació en 2020 con una misión simple: ofrecer la mejor tecnología al mejor precio, sin compromiso en calidad ni servicio.</p>
        <p>Somos un equipo apasionado por la tecnología que entiende lo que los usuarios realmente necesitan.</p>
      </Section>
      <Section title="NUESTRA MISIÓN">
        <p>Democratizar el acceso a la tecnología de punta. Creemos que todos merecen los mejores dispositivos, con garantía oficial y soporte de verdad.</p>
      </Section>
      <Section title="NÚMEROS">
        <div className="grid grid-cols-3 gap-4 mt-2">
          {[["50K+","Clientes"],["12K+","Productos"],["4.9★","Calificación"]].map(([n,l]) => (
            <div key={l} className="text-center border border-[var(--color-border)] rounded-sm p-4">
              <p className="font-display text-2xl tracking-wider text-[var(--color-accent)]">{n}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{l}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

export function Jobs() {
  const positions = [
    { title: "Frontend Developer",              area: "Tecnología",  type: "Full-time" },
    { title: "Especialista en Marketing Digital", area: "Marketing",  type: "Full-time" },
    { title: "Soporte al Cliente",              area: "Operaciones", type: "Part-time" },
    { title: "Gerente de Producto",             area: "Producto",    type: "Full-time" },
  ];
  return (
    /* ← Sin "Empresa" en el breadcrumb */
    <PageShell title="TRABAJA CON NOSOTROS" crumbs={[{label:"Home",href:"/"},{label:"Empleos",href:"/jobs"}]}>
      <p className="text-[var(--color-text-dim)] text-sm mb-8">
        Únete al equipo de Terrified Electronics. Buscamos personas apasionadas por la tecnología y el servicio.
      </p>
      {positions.map(pos => (
        <div key={pos.title} className="bg-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 rounded-sm p-5 mb-3 flex items-center justify-between transition-colors group cursor-pointer">
          <div>
            <p className="font-medium text-[var(--color-text)] group-hover:text-white text-sm">{pos.title}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{pos.area} · {pos.type}</p>
          </div>
          <span className="text-[var(--color-accent)] text-sm font-medium group-hover:translate-x-1 transition-transform">Aplicar →</span>
        </div>
      ))}
    </PageShell>
  );
}

export function Blog() {
  const posts = [
    { title: "Los 5 mejores smartphones del 2025", date: "12 Ene 2025", tag: "Smartphones" },
    { title: "¿Vale la pena el MacBook Air M3?",   date: "28 Ene 2025", tag: "Laptops"     },
    { title: "Guía completa de auriculares ANC",   date: "5 Feb 2025",  tag: "Audio"        },
  ];
  return (
    <PageShell title="BLOG" crumbs={[{label:"Home",href:"/"},{label:"Blog",href:"/blog"}]}>
      {posts.map(post => (
        <div key={post.title} className="bg-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 rounded-sm p-5 mb-3 cursor-pointer group transition-colors">
          <span className="text-xs text-[var(--color-accent)] font-semibold tracking-wider">{post.tag}</span>
          <p className="font-medium text-[var(--color-text)] group-hover:text-white mt-1 text-sm">{post.title}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{post.date}</p>
        </div>
      ))}
    </PageShell>
  );
}

export function Press() {
  const coverage = [
    { outlet: "TechMX",      title: "Terrified Electronics, la tienda que está revolucionando el comercio tech en México", date: "Marzo 2026" },
    { outlet: "Forbes MX",   title: "Las 10 startups de tecnología más prometedoras del año",                              date: "Enero 2026" },
    { outlet: "El Financiero", title: "Cómo Terrified Electronics conquistó al consumidor digital mexicano",              date: "Nov 2025"   },
    { outlet: "Expansión",   title: "El modelo de negocio que está cambiando cómo compramos gadgets",                     date: "Sep 2025"   },
  ];
  return (
    <PageShell title="PRENSA" crumbs={[{label:"Home",href:"/"},{label:"Prensa",href:"/press"}]}>
      <Section title="SOBRE TERRIFIED ELECTRONICS">
        <p>Fundada en 2020, Terrified Electronics es la plataforma líder en comercio electrónico de tecnología en México. Con más de 50,000 clientes activos y presencia en todo el país, nos especializamos en ofrecer los mejores dispositivos con garantía oficial y servicio de primera.</p>
      </Section>

      <h3 className="font-display tracking-widest text-[var(--color-text-dim)] text-sm mb-3 mt-6">MENCIONES EN MEDIOS</h3>
      {coverage.map(item => (
        <div key={item.title} className="bg-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 rounded-sm p-5 mb-3 transition-colors group cursor-pointer">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[var(--color-accent)] tracking-wider">{item.outlet}</span>
              <p className="text-[var(--color-text)] text-sm font-medium mt-1 group-hover:text-white leading-snug">{item.title}</p>
            </div>
            <span className="text-xs text-[var(--color-text-muted)] shrink-0 mt-1">{item.date}</span>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Section title="CONTACTO DE PRENSA">
          <p>Para entrevistas, notas de prensa y colaboraciones con medios:</p>
          <p className="text-[var(--color-accent)] font-medium mt-2">prensa@terrifiedelectronics.com</p>
          <p className="text-[var(--color-text-muted)] text-xs mt-1">Respuesta en menos de 24 horas</p>
        </Section>
        <Section title="KIT DE PRENSA">
          <p>Logos en alta resolución, fotos del equipo, hoja de datos y línea de tiempo de la empresa.</p>
          <button className="mt-3 border border-[var(--color-accent)]/50 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors">
            Descargar Kit
          </button>
        </Section>
      </div>
    </PageShell>
  );
}

export function Shipping() {
  return (
    <PageShell title="ENVÍOS" crumbs={[{label:"Home",href:"/"},{label:"Envíos",href:"/shipping"}]}>
      {[
        { title: "ENVÍO ESTÁNDAR",    body: "3–5 días hábiles. Gratis en pedidos mayores a $999." },
        { title: "ENVÍO EXPRESS",     body: "24–48 horas. Disponible en todas las ciudades principales. Costo: $149." },
        { title: "ENVÍO MISMO DÍA",   body: "Disponible en CDMX, GDL y MTY para pedidos antes de las 12:00 pm. Costo: $299." },
        { title: "SEGUIMIENTO",       body: "Todos los envíos incluyen número de rastreo enviado por correo electrónico al confirmar el pedido." },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

export function Returns() {
  return (
    <PageShell title="DEVOLUCIONES" crumbs={[{label:"Home",href:"/"},{label:"Devoluciones",href:"/returns"}]}>
      {[
        { title: "POLÍTICA DE 30 DÍAS", body: "Aceptamos devoluciones hasta 30 días después de la compra sin preguntas. El producto debe estar en su empaque original." },
        { title: "PROCESO",             body: "1. Contacta a nuestro soporte. 2. Genera tu etiqueta de devolución gratuita. 3. Envía el producto. 4. Reembolso en 3–5 días hábiles." },
        { title: "EXCEPCIONES",         body: "Productos con daño físico por mal uso, software desbloqueado o sin empaque original no son elegibles para devolución." },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

export function Warranty() {
  return (
    <PageShell title="GARANTÍAS" crumbs={[{label:"Home",href:"/"},{label:"Garantías",href:"/warranty"}]}>
      {[
        { title: "GARANTÍA OFICIAL",              body: "Todos los productos cuentan con garantía oficial del fabricante. Apple: 1 año. Samsung: 1 año. Sony: 1 año. Dell: 1 año." },
        { title: "GARANTÍA EXTENDIDA",            body: "Ofrecemos planes de garantía extendida de hasta 3 años en laptops y smartphones seleccionados." },
        { title: "CÓMO HACER VÁLIDA TU GARANTÍA", body: "Contacta a nuestro soporte con tu número de orden y descripción del problema. Te guiaremos en el proceso." },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

export function Contact() {
  return (
    <PageShell title="CONTACTO" crumbs={[{label:"Home",href:"/"},{label:"Contacto",href:"/contact"}]}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { icon: "📧", label: "Email",      value: "soporte@terrifiedelectronics.com" },
          { icon: "📞", label: "Teléfono",   value: "01-800 TERRIFIED" },
          { icon: "💬", label: "Chat en vivo", value: "Lun–Vie 9am–7pm" },
          { icon: "📍", label: "Dirección",  value: "San Luis Rio Colorado, Sonora, México" },
        ].map(c => (
          <div key={c.label} className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-4 flex items-start gap-3">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <p className="font-display tracking-wider text-[var(--color-accent)] text-xs">{c.label}</p>
              <p className="text-[var(--color-text)] text-sm mt-1">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
      <Section title="ENVÍANOS UN MENSAJE">
        <div className="space-y-3 mt-2">
          <input type="text"  placeholder="Tu nombre"  className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors"/>
          <input type="email" placeholder="Tu correo"  className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors"/>
          <textarea rows={4} placeholder="Tu mensaje..." className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors resize-none"/>
          <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest px-6 py-2.5 rounded-sm transition-all text-sm shadow-[0_0_12px_rgba(255,0,63,0.3)]">ENVIAR</button>
        </div>
      </Section>
    </PageShell>
  );
}

export function FAQ() {
  const faqs = [
    { q: "¿Cuánto tarda el envío?",          a: "Envíos express en 24–48 horas. Estándar 3–5 días hábiles." },
    { q: "¿Puedo devolver un producto?",      a: "Sí, hasta 30 días después de la compra sin preguntas." },
    { q: "¿Los productos tienen garantía?",   a: "Todos cuentan con garantía oficial de fábrica." },
    { q: "¿Qué métodos de pago aceptan?",     a: "Tarjetas de crédito/débito, transferencia bancaria y efectivo." },
    { q: "¿Hacen envíos internacionales?",    a: "Por ahora solo enviamos dentro de México." },
    { q: "¿Cómo rastro mi pedido?",           a: "Te enviamos un número de rastreo por correo al confirmar tu pedido." },
  ];
  return (
    <PageShell title="PREGUNTAS FRECUENTES" crumbs={[{label:"Home",href:"/"},{label:"FAQ",href:"/faq"}]}>
      {faqs.map(f => (
        <div key={f.q} className="bg-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/20 rounded-sm p-5 mb-3 transition-colors">
          <p className="font-display tracking-wider text-[var(--color-text)] text-sm mb-2">{f.q}</p>
          <p className="text-[var(--color-text-dim)] text-sm">{f.a}</p>
        </div>
      ))}
    </PageShell>
  );
}

export function Privacy() {
  return (
    <PageShell title="PRIVACIDAD" crumbs={[{label:"Home",href:"/"},{label:"Privacidad",href:"/privacy"}]}>
      {[
        { title: "DATOS QUE RECOPILAMOS", body: "Nombre, correo electrónico, dirección de envío y datos de pago. Nunca compartimos tu información con terceros sin tu consentimiento." },
        { title: "USO DE DATOS",          body: "Usamos tus datos exclusivamente para procesar pedidos, enviarte confirmaciones y mejorar tu experiencia de compra." },
        { title: "COOKIES",               body: "Usamos cookies técnicas necesarias para el funcionamiento del sitio y cookies analíticas opcionales para mejorar el servicio." },
        { title: "TUS DERECHOS",          body: "Puedes solicitar acceso, rectificación o eliminación de tus datos en cualquier momento escribiendo a privacidad@terrifiedelectronics.com" },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

export function Terms() {
  return (
    <PageShell title="TÉRMINOS Y CONDICIONES" crumbs={[{label:"Home",href:"/"},{label:"Términos",href:"/terms"}]}>
      {[
        { title: "USO DEL SITIO",          body: "Al usar Terrified Electronics aceptas estos términos. El contenido es propiedad de Terrified Electronics S.A. de C.V." },
        { title: "COMPRAS",                body: "Las compras están sujetas a disponibilidad de stock. Nos reservamos el derecho de cancelar pedidos en caso de error de precio." },
        { title: "PROPIEDAD INTELECTUAL",  body: "Todos los logos, imágenes y contenido del sitio son propiedad de Terrified Electronics." },
        { title: "MODIFICACIONES",         body: "Podemos actualizar estos términos en cualquier momento. El uso continuado del sitio implica aceptación de los cambios." },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

export function Cookies() {
  return (
    <PageShell title="POLÍTICA DE COOKIES" crumbs={[{label:"Home",href:"/"},{label:"Cookies",href:"/cookies"}]}>
      {[
        { title: "¿QUÉ SON LAS COOKIES?", body: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio." },
        { title: "COOKIES NECESARIAS",    body: "Esenciales para el funcionamiento del carrito, sesión de usuario y seguridad. No pueden desactivarse." },
        { title: "COOKIES ANALÍTICAS",    body: "Nos ayudan a entender cómo usas el sitio para mejorarlo. Puedes desactivarlas en cualquier momento." },
        { title: "GESTIÓN",               body: "Puedes controlar las cookies desde la configuración de tu navegador o contactando a cookies@terrifiedelectronics.com" },
      ].map(s => <Section key={s.title} title={s.title}><p>{s.body}</p></Section>)}
    </PageShell>
  );
}

/* ─── Páginas de usuario (desde AccountModal) ─── */

export function UserProfile({ user }) {
  return (
    <PageShell title="MI PERFIL" crumbs={[{label:"Home",href:"/"},{label:"Mi perfil",href:"/profile"}]}>
      <div className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm p-8 mb-4 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-[var(--color-accent)] rounded-sm flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_24px_rgba(255,0,63,0.4)]">
          {user?.avatar ?? "?"}
        </div>
        <div className="text-center">
          <p className="font-display text-2xl tracking-widest text-[var(--color-text)]">{user?.name?.toUpperCase() ?? "—"}</p>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">{user?.email ?? ""}</p>
        </div>
      </div>
      <Section title="DATOS DE CUENTA">
        <div className="space-y-3">
          {[
            { label: "Nombre",  value: user?.name  ?? "—" },
            { label: "Correo",  value: user?.email ?? "—" },
            { label: "Plan",    value: "Cuenta estándar" },
            { label: "Miembro desde", value: user?.memberSince ?? "Mayo 2026" },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-2 border-b border-[var(--color-border)] last:border-0 text-sm">
              <span className="text-[var(--color-text-muted)]">{r.label}</span>
              <span className="text-[var(--color-text)] font-medium">{r.value}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

export function UserOrders() {
  const orders = [
    { id: "#TE-00128", date: "15 mayo 2025",  total: "$25,999", status: "Entregado",  items: "iPhone 16 Pro × 1" },
    { id: "#TE-00097", date: "2 abril 2025",  total: "$7,499",  status: "Entregado",  items: "Sony WH-1000XM5 × 1" },
    { id: "#TE-00054", date: "10 marzo 2025", total: "$31,499", status: "Cancelado",  items: "MacBook Air M3 × 1" },
  ];
  return (
    <PageShell title="MIS PEDIDOS" crumbs={[{label:"Home",href:"/"},{label:"Mis pedidos",href:"/orders"}]}>
      {orders.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p className="text-4xl mb-4">📦</p>
          <p className="font-display tracking-widest text-[var(--color-text)]">AÚN NO TIENES PEDIDOS</p>
          <p className="text-sm mt-2">Cuando realices una compra aparecerá aquí.</p>
        </div>
      ) : orders.map(o => (
        <div key={o.id} className="bg-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 rounded-sm p-5 mb-3 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[var(--color-accent)] text-sm font-bold">{o.id}</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-sm ${
              o.status === "Entregado" ? "bg-green-900/40 text-green-400 border border-green-700/40" :
              o.status === "Cancelado" ? "bg-red-900/30 text-[var(--color-accent)] border border-[var(--color-accent)]/30" :
              "bg-amber-900/30 text-amber-400 border border-amber-700/30"
            }`}>{o.status}</span>
          </div>
          <p className="text-[var(--color-text-dim)] text-sm">{o.items}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[var(--color-text-muted)]">{o.date}</span>
            <span className="font-display tracking-wider text-[var(--color-text)] text-sm">{o.total}</span>
          </div>
        </div>
      ))}
    </PageShell>
  );
}

export function UserFavorites() {
  const { favorites } = useFavorites();
  const navigate      = useNavigate();
  return (
    <PageShell title="MIS FAVORITOS" crumbs={[{label:"Home",href:"/"},{label:"Favoritos",href:"/favorites"}]}>
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🤍</p>
          <p className="font-display tracking-widest text-[var(--color-text)] mb-2">AÚN NO TIENES FAVORITOS</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Guarda productos con el botón ♡ en cada tarjeta o en la página del producto.</p>
          <button onClick={() => navigate("/products")}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest text-sm px-6 py-3 rounded-sm transition-all shadow-[0_0_14px_rgba(255,0,63,0.3)]">
            VER PRODUCTOS
          </button>
        </div>
      ) : (
        <>
          <p className="text-[var(--color-text-muted)] text-sm mb-6">{favorites.length} producto{favorites.length !== 1 ? "s" : ""} guardado{favorites.length !== 1 ? "s" : ""}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </>
      )}
    </PageShell>
  );
}
