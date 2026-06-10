import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  // Cuenta regresiva que regresa al home
  useEffect(() => {
    if (count <= 0) { navigate("/"); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center page-enter">

      {/* Número grande */}
      <div className="relative mb-6 select-none">
        <span
          className="font-display text-[10rem] leading-none tracking-widest text-[var(--color-primary-light)]"
          style={{ WebkitTextStroke: "2px var(--color-border)" }}
        >
          404
        </span>
        {/* Rayo encima */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-[var(--color-accent)] rounded-sm flex items-center justify-center shadow-[0_0_40px_rgba(255,0,63,0.7)]">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Texto */}
      <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
        Señal perdida
      </p>
      <h1 className="font-display text-3xl md:text-4xl tracking-widest text-[var(--color-text)] mb-3">
        PÁGINA NO ENCONTRADA
      </h1>
      <p className="text-[var(--color-text-dim)] text-sm max-w-sm mb-10">
        La página que buscas no existe, fue movida o escribiste mal la URL.
      </p>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <button
          onClick={() => navigate("/")}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display tracking-widest px-7 py-3 rounded-sm transition-all shadow-[0_0_16px_rgba(255,0,63,0.4)] hover:shadow-[0_0_26px_rgba(255,0,63,0.6)] text-sm"
        >
          IR AL INICIO
        </button>
        <button
          onClick={() => navigate("/products")}
          className="border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 text-[var(--color-text-dim)] hover:text-[var(--color-text)] font-display tracking-widest px-7 py-3 rounded-sm transition-all text-sm"
        >
          VER PRODUCTOS
        </button>
        <button
          onClick={() => navigate(-1)}
          className="border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 text-[var(--color-text-dim)] hover:text-[var(--color-text)] font-display tracking-widest px-7 py-3 rounded-sm transition-all text-sm"
        >
          ← VOLVER
        </button>
      </div>

      {/* Cuenta regresiva */}
      <p className="text-[var(--color-text-muted)] text-xs">
        Redirigiendo al inicio en{" "}
        <span className="font-mono text-[var(--color-accent)] font-bold">{count}s</span>
      </p>

    </div>
  );
}