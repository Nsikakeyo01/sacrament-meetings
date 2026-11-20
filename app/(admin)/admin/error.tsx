
"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AdminError({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error("Admin route error:", error);
    }, [error]);

    return (
        <section
            role="alert"
            className="rounded-xl border border-red-200 bg-white p-8 shadow-sm"
        >
            <h2 className="text-2xl font-bold text-slate-900">
                Something went wrong
            </h2>

            <p className="mt-3 text-slate-600">
                We could not complete your request.
                Please try again.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                    Try Again
                </button>

                <Link
                    href="/admin"
                    className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
                >
                    Back to Dashboard
                </Link>
            </div>
        </section>
    );
}
