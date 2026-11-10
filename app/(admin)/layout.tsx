
import type { ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-8 rounded-xl bg-blue-950 p-6 text-white">
                    <h1 className="text-2xl font-bold">
                        Sacrament Meeting Administration
                    </h1>

                    <p className="mt-2 text-blue-100">
                        Manage meeting programs, speakers, hymns,
                        and assignments.
                    </p>

                    <nav
                        aria-label="Admin navigation"
                        className="mt-5 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/admin"
                            className="font-medium text-white underline-offset-4 hover:underline"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/meetings/new"
                            className="font-medium text-white underline-offset-4 hover:underline"
                        >
                            Create Meeting
                        </Link>

                        <Link
                            href="/meetings"
                            className="font-medium text-white underline-offset-4 hover:underline"
                        >
                            View Public Meetings
                        </Link>
                    </nav>
                </header>

                <main>{children}</main>
            </div>
        </div>
    );
}
