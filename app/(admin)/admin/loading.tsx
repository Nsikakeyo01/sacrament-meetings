
export default function AdminLoading() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        >
            <div className="flex items-center gap-4">
                <div
                    aria-hidden="true"
                    className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-900"
                />

                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Loading Administration
                    </h2>

                    <p className="mt-1 text-slate-600">
                        Please wait while we load the meeting information.
                    </p>
                </div>
            </div>
        </div>
    );
}
