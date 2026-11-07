
import type { Metadata } from "next";
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export const metadata: Metadata = {
    title: "All Meetings | Sacrament Meeting Planner",
    description:
        "Browse sacrament meeting programs, dates, hymns, and speaker assignments.",
};

export default function MeetingsPage() {
    const meetings = getMeetings();

    return (
        <main className="flex-1">
            <section className="bg-blue-950 px-6 py-14 text-white">
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        All Sacrament Meetings
                    </h1>

                    <p className="mt-4 max-w-2xl text-blue-100">
                        Browse meeting programs and view the hymns, prayers,
                        speakers, and other details planned for each Sunday.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Meeting Programs
                        </h2>

                        <p className="mt-2 text-slate-600">
                            {meetings.length} meeting
                            {meetings.length === 1 ? "" : "s"} available
                        </p>
                    </div>
                </div>

                {meetings.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {meetings.map((meeting) => (
                            <MeetingCard
                                key={meeting.id}
                                meeting={meeting}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <h3 className="text-xl font-semibold text-slate-900">
                            No meetings available
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Meeting programs will appear here when they
                            become available.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
