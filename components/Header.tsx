import Link from "next/link";
import NavLinks from "./NavLinks";
import { auth } from "@/auth";
import { logout } from "@/lib/auth-actions";

export default async function Header() {
    const session = await auth();

    return (
        <header className="border-b border-slate-200 bg-white shadow-sm print:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-blue-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                    Sacrament Meeting Planner
                </Link>

                <div className="flex flex-wrap items-center gap-4">
                    <NavLinks />

                    {session?.user ? (
                        <>
                            <Link
                                href="/admin"
                                className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-200"
                            >
                                Dashboard
                            </Link>

                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Bishopric Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}