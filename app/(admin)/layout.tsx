import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/require-auth";
import { logout } from "@/lib/auth-actions";

export const metadata: Metadata = {
    title: "Administration",
    description:
        "Manage sacrament meeting programs, speakers, hymns, and assignments.",
    robots: {
        index: false,
        follow: false,
    },
};

interface AdminLayoutProps {
    children: ReactNode;
}

export default async function AdminLayout({
    children,
}: AdminLayoutProps) {
    const session = await requireAuth();

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-8 rounded-xl bg-blue-950 p-6 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Sacrament Meeting Administration
                            </h1>

                            <p className="mt-2 text-blue-100">
                                Manage meeting programs, speakers,
                                hymns, and assignments.
                            </p>

                            <p className="mt-3 text-sm text-blue-200">
                                Signed in as {session.user?.name}
                            </p>
                        </div>

                        <form action={logout}>
                            <button
                                type="submit"
                                className="rounded-lg border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>

                    <nav
                        aria-label="Admin navigation"
                        className="mt-5 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/admin"
                            className="font-medium text-white hover:underline"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/meetings/new"
                            className="font-medium text-white hover:underline"
                        >
                            Create Meeting
                        </Link>

                        <Link
                            href="/meetings"
                            className="font-medium text-white hover:underline"
                        >
                            View Public Meetings
                        </Link>
                    </nav>
                </header>

                <div>{children}</div>
            </div>
        </div>
    );
}