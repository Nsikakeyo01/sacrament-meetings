
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-slate-50 print:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
                <p className="text-sm text-slate-600">
                    &copy; {new Date().getFullYear()} Sacrament Meeting Planner.
                    All rights reserved.
                </p>

                <p className="text-sm text-slate-500">
                    Helping ward members stay informed and connected.
                </p>

                <Link
                    href="/meetings"
                    className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    View Meeting Programs
                </Link>
            </div>
        </footer>
    );
}
