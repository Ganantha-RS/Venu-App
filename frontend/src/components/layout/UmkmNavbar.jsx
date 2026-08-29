import { Bell, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const NAV_ITEMS = [
    { label: "Beranda", to: "/umkm" },
    { label: "Cari Event", to: "/events" },
    { label: "Lamaran Saya", to: "/umkm/applications" },
    { label: "AI Match", to: "/umkm/ai-match" },
    { label: "Profil", to: "/umkm/profile" },
];

export default function UmkmNavbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/", { replace: true });
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
                <NavLink
                    to="/umkm"
                    className="flex items-center gap-1 text-xl font-extrabold text-navy"
                >
                    <span className="text-accent">V</span>ENU
                </NavLink>

                <ul className="hidden items-center gap-8 text-sm font-medium text-navy/70 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/umkm"}
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
                    <button
                        type="button"
                        aria-label="Notifikasi"
                        className="text-navy/70 hover:text-navy"
                    >
                        <Bell size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right text-sm leading-tight md:block">
                            <p className="font-semibold text-navy">{user?.name}</p>
                            <p className="text-xs text-navy/50">UMKM</p>
                        </div>

                        <img
                            src={user?.avatarUrl || "/default-avatar.png"}
                            alt={user?.name || "User"}
                            className="h-9 w-9 rounded-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-navy/50 transition hover:text-red-500"
                            title="Keluar"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}