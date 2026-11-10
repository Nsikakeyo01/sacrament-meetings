
export default function MeetingDetailLoading() {
    return (
        <main
            className="flex-1 bg-slate-50 px-4 py-10 md:px-6"
            role="status"
            aria-live="polite"
            aria-label="Loading meeting program"
        >
            <div className="mx-auto max-w-3xl animate-pulse">
                <div className="mb-6 h-5 w-40 rounded bg-slate-200" />

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                    <div className="mx-auto mb-4 h-5 w-48 rounded bg-blue-100" />
                    <div className="mx-auto mb-4 h-9 w-64 max-w-full rounded bg-slate-200" />
                    <div className="mx-auto mb-10 h-5 w-52 rounded bg-slate-200" />

                    {[1, 2, 3, 4].map((section) => (
                        <div key={section} className="mb-10">
                            <div className="mb-5 h-7 w-48 rounded bg-blue-100" />
                            <div className="mb-3 h-4 w-full rounded bg-slate-200" />
                            <div className="mb-3 h-4 w-4/5 rounded bg-slate-200" />
                            <div className="h-4 w-3/5 rounded bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>

            <p className="sr-only">
                Loading sacrament meeting program...
            </p>
        </main>
    );
}
