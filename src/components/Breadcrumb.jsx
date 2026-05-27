import { useNavigate } from "react-router-dom";
import SlashImg from "../assets/slash.svg";

export default function Breadcrumb({ crumbs = [] }) {
  const navigate = useNavigate();
  const items = crumbs.length > 0 ? crumbs : [{ label: "Home", href: "/" }];
  return (
    <div className="bg-[var(--color-primary)] border-b border-[var(--color-border)]">
      <ul className="max-w-7xl mx-auto px-6 flex gap-2 text-sm text-[var(--color-text-dim)] items-center py-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <button
              onClick={() => navigate(item.href)}
              className={`hover:text-[var(--color-accent)] transition-colors py-1 px-2 rounded-sm ${
                index === items.length - 1
                  ? "text-[var(--color-text)] font-medium cursor-default pointer-events-none"
                  : "hover:bg-[var(--color-primary-light)]"
              }`}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <img src={SlashImg} className="w-3 h-3 opacity-30 invert" alt=""/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
