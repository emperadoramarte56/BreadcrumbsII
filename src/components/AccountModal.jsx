import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";

export default function AccountModal({ open, onClose }) {
  const { user, login, logout, error, setError } = useAccount();
  const navigate = useNavigate();
  const [tab, setTab]           = useState("login");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) { onClose(); setEmail(""); setPassword(""); }
  }

  function handleClose() {
    setError(""); setEmail(""); setPassword(""); onClose();
  }

  function goTo(path) { handleClose(); navigate(path); }

  if (!open) return null;
  return (
    <>
      {/* Overlay: cierra al hacer click fuera */}
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 z-40"/>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          onClick={e => e.stopPropagation()}
          className="bg-[var(--color-primary)] border border-[var(--color-border)] rounded-sm shadow-[0_0_60px_rgba(255,0,63,0.2)] w-full max-w-sm overflow-hidden pointer-events-auto"
        >
          {user ? (
            /* ── Usuario logueado ── */
            <div>
              <div className="bg-[var(--color-primary)] border-b border-[var(--color-border)] px-6 py-8 text-center relative">
                <button onClick={handleClose}
                  className="absolute top-4 right-4 p-1.5 hover:bg-[var(--color-primary-light)] rounded-sm transition-colors text-[var(--color-text-muted)] hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-sm flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3 shadow-[0_0_20px_rgba(255,0,63,0.5)]">
                  {user.avatar}
                </div>
                <p className="font-display text-xl tracking-widest text-[var(--color-text)]">{user.name.toUpperCase()}</p>
                <p className="text-[var(--color-text-muted)] text-sm mt-1">{user.email}</p>
              </div>

              <div className="p-6 space-y-2">
                {[
                  {
                    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    label: "Mi perfil",
                    path: "/profile",
                  },
                  {
                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                    label: "Mis pedidos",
                    path: "/orders",
                  },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    label: "Favoritos",
                    path: "/favorites",
                  },
                ].map(item => (
                  <button key={item.label} onClick={() => goTo(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[var(--color-primary-light)] transition-colors text-[var(--color-text-dim)] hover:text-[var(--color-text)] font-medium text-sm border border-transparent hover:border-[var(--color-border)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                    </svg>
                    {item.label}
                  </button>
                ))}

                <hr className="border-[var(--color-primary-light)] my-2"/>

                <button onClick={() => { logout(); handleClose(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[var(--color-accent)]/10 transition-colors text-[var(--color-accent)] font-medium text-sm border border-transparent hover:border-[var(--color-accent)]/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>

          ) : (
            /* ── Login / Registro ── */
            <div>
              <div className="bg-[var(--color-primary)] border-b border-[var(--color-border)] px-6 pt-8 pb-0 relative">
                <button onClick={handleClose}
                  className="absolute top-4 right-4 p-1.5 hover:bg-[var(--color-primary-light)] rounded-sm transition-colors text-[var(--color-text-muted)] hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[var(--color-accent)] rounded-sm flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(255,0,63,0.5)]">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="font-display text-lg tracking-widest text-[var(--color-text)]">TERRIFIED ELECTRONICS</p>
                  <p className="text-[var(--color-text-muted)] text-sm mt-1">
                    {tab === "login" ? "Inicia sesión en tu cuenta" : "Crea tu cuenta gratis"}
                  </p>
                </div>
                <div className="flex border-b border-[var(--color-border)]">
                  {["login","register"].map(t => (
                    <button key={t} onClick={() => { setTab(t); setError(""); }}
                      className={`flex-1 py-3 text-sm font-semibold transition-colors font-display tracking-widest ${
                        tab === t
                          ? "border-b-2 border-[var(--color-accent)] text-[var(--color-text)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-dim)]"
                      }`}>
                      {t === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {tab === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1.5 tracking-wider">NOMBRE COMPLETO</label>
                    <input type="text" placeholder="Tu nombre"
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors"/>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1.5 tracking-wider">CORREO ELECTRÓNICO</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={tab === "login" ? "lemurya@demo.com" : "tu@email.com"}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors"
                    required/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1.5 tracking-wider">CONTRASEÑA</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-accent)] rounded-sm px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none transition-colors"
                    required/>
                </div>
                {error && (
                  <p className="text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-2 rounded-sm">{error}</p>
                )}
                {tab === "login" && (
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Demo: <span className="font-mono text-[var(--color-text-dim)]">lemurya@demo.com / 123456</span>
                  </p>
                )}
                <button onClick={tab === "login" ? handleLogin : e => e.preventDefault()}
                  className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest py-3 rounded-sm transition-all shadow-[0_0_15px_rgba(255,0,63,0.3)] hover:shadow-[0_0_25px_rgba(255,0,63,0.5)] text-sm">
                  {tab === "login" ? "INICIAR SESIÓN" : "CREAR CUENTA"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
