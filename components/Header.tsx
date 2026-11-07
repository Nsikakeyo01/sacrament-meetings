
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white shadow-sm print:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-blue-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                    Sacrament Meeting Planner
                </Link>

                <NavLinks />
            </div>
        </header>
    );
}
