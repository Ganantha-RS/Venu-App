import { Bell } from "lucide-react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Beranda", to: "/" },
  { label: "Event", to: "/events" },
  { label: "UMKM", to: "/events" },
  { label: "AI Match", to: "/ai-match" },
];

export default function Navbar({ user }) {
  const isLoggedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="/" className="flex items-center gap-1 text-xl font-extrabold text-navy">
          <span className="text-accent">V</span>ENU
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-navy/70 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-accent pb-1 text-accent"
                    : "pb-1 hover:text-navy"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button aria-label="Notifikasi" className="text-navy/70 hover:text-navy">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="hidden text-left text-sm leading-tight md:block">
                  <p className="font-semibold text-navy">{user.name}</p>
                  <p className="text-xs text-navy/50">{user.roleLabel}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <a href="/login" className="text-sm font-semibold text-navy hover:text-accent">
                Masuk
              </a>
              <a href="/register" className="btn-accent px-5 py-2 text-sm">
                Daftar
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
