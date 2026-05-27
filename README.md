# TiendaElectronicos

Tienda de electrónicos construida con **React + Vite + Tailwind CSS v4**.

## Stack

- ⚡ [Vite 6](https://vitejs.dev/) — bundler ultrarrápido
- ⚛️ [React 19](https://react.dev/) — UI declarativa
- 🎨 [Tailwind CSS v4](https://tailwindcss.com/) — estilos utilitarios (plugin `@tailwindcss/vite`)
- 🔀 [React Router v7](https://reactrouter.com/) — enrutamiento

## Estructura

```
src/
├── assets/          # Imágenes, íconos, SVGs
│   └── slash.svg    # Separador del breadcrumb
├── components/
│   ├── Breadcrumb.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
├── pages/
│   └── Home.jsx
├── App.css
├── App.jsx
├── index.css        # Importa Tailwind v4 con @import "tailwindcss"
└── main.jsx
```

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Comandos

| Comando         | Descripción                    |
|-----------------|--------------------------------|
| `npm run dev`   | Servidor de desarrollo         |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar build          |
| `npm run lint`  | Linter ESLint                  |

## Rutas

| Ruta         | Página        |
|--------------|---------------|
| `/`          | Home          |
| `/products`  | Productos     |
| `/about`     | Nosotros      |
| `/faq`       | FAQ           |

## Breadcrumb

El componente `Breadcrumb` acepta un arreglo `crumbs`:

```jsx
<Breadcrumb crumbs={[
  { label: "Home",      href: "/" },
  { label: "Productos", href: "/products" },
  { label: "Laptops",   href: "/products/laptops" },
]} />
```

Si no se pasan `crumbs`, muestra los 4 items por defecto (Home, Products, About, FAQ).
