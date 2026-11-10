
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Meeting | Sacrament Meeting Planner",
    description: "Create a new sacrament meeting program.",
};

export default function NewMeetingPage() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
                Create New Meeting
            </h2>

            <p className="mt-4 text-slate-600">
                This page will allow administrators to create
                new sacrament meeting programs.
            </p>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
                <h3 className="font-semibold text-blue-950">
                    Coming in Week 04
                </h3>

                <p className="mt-2 text-blue-900">
                    The meeting creation form and database
                    submission functionality will be implemented
                    in a future assignment.
                </p>
            </div>

            <Link
                href="/admin"
                className="mt-8 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
                Back to Admin Dashboard
            </Link>
        </section>
    );
}
