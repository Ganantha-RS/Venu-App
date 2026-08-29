import { Bell } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const NAV_ITEMS = [
    { label: "Beranda", to: "/umkm" },
    { label: "AI Match", to: "/umkm/ai-match" },
    { label: "Event", to: "/events" },
    { label: "Analitik", to: "/umkm/analytics" },
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
            <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link
                    to="/umkm"
                    className="flex shrink-0 items-center gap-1 text-xl font-extrabold tracking-tight text-navy"
                    aria-label="VENU Beranda"
                >
                    <span className="text-accent">V</span>ENU
                </Link>

                {/* Navigation */}
                <ul className="hidden items-center gap-8 text-sm font-medium text-navy/80 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/umkm"}
                                className={({ isActive }) =>
                                    [
                                        "relative py-1 transition-colors",
                                        isActive
                                            ? "font-semibold text-navy after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                                            : "hover:text-navy",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* User */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Notifikasi"
                        className="text-navy/70 transition-colors hover:text-navy"
                    >
                        <Bell size={18} strokeWidth={1.8} />
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                        aria-label="Akun pengguna"
                    >
                        <img
                            src={user?.avatarUrl || "/default-avatar.png"}
                            alt={user?.name || "Pengguna"}
                            className="h-7 w-7 rounded-full object-cover"
                        />

                        <div className="hidden text-left leading-tight md:block">
                            <p className="text-xs font-semibold text-navy">
                                {user?.name || "Pengguna"}
                            </p>

                            <p className="text-[9px] text-navy/45">
                                Pemilik Usaha
                            </p>
                        </div>
                    </button>
                </div>
            </nav>
        </header>
    );
}