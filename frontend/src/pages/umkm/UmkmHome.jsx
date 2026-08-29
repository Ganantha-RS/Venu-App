import UmkmNavbar from "../../components/layout/UmkmNavbar";
import { useAuth } from "../../context/useAuth";

export default function UmkmHome() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-surface">
            <UmkmNavbar />

            <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
                <h1 className="text-3xl font-extrabold text-navy">
                    Selamat datang, {user?.name}
                </h1>

                <p className="mt-2 text-navy/60">
                    Ini adalah beranda untuk akun UMKM.
                </p>
            </main>
        </div>
    );
}