
import Link from "next/link";

export default function MeetingsNotFound() {
    return (
        <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
                Meeting Not Found
            </h1>

            <p className="mt-3 text-slate-600">
                The requested meeting could not be found.
            </p>

            <Link
                href="/meetings"
                className="mt-6 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
                Back to Meetings
            </Link>
        </section>
    );
}
