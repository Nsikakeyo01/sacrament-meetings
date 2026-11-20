
import Link from "next/link";

export default function MeetingNotFound() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
                Meeting Not Found
            </h1>

            <p className="mt-3 text-slate-600">
                The meeting you are trying to edit
                does not exist or may have been deleted.
            </p>

            <Link
                href="/admin"
                className="mt-6 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
                Back to Admin Dashboard
            </Link>
        </section>
    );
}
