
"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function MeetingsError({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error("Meetings route error:", error);
    }, [error]);

    return (
        <section
            role="alert"
            className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-white p-8 shadow-sm"
        >
            <h1 className="text-2xl font-bold text-slate-900">
                Unable to Load Meetings
            </h1>

            <p className="mt-3 text-slate-600">
                Something went wrong while loading
                the meeting information.
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
                    href="/meetings"
                    className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
                >
                    Back to Meetings
                </Link>
            </div>
        </section>
    );
}
