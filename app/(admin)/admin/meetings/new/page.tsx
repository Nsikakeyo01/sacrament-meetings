import Link from "next/link";
import type { Metadata } from "next";
import MeetingForm from "@/components/MeetingForm";
import { requireAuth } from "@/lib/require-auth";

export const metadata: Metadata = {
    title: "Create Meeting",
    description: "Create a new sacrament meeting program.",
};

export default async function NewMeetingPage() {
    await requireAuth();

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
                <Link
                    href="/admin"
                    className="text-sm font-semibold text-blue-900 hover:underline"
                >
                    Back to Admin Dashboard
                </Link>

                <h1 className="mt-5 text-3xl font-bold text-slate-900">
                    Create New Meeting
                </h1>

                <p className="mt-3 text-slate-600">
                    Complete the form below to create a new
                    sacrament meeting program.
                </p>
            </div>

            <MeetingForm />
        </section>
    );
}