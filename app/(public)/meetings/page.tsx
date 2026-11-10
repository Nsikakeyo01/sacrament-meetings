
import type { Metadata } from "next";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";

export const metadata: Metadata = {
    title: "All Meetings | Sacrament Meeting Planner",
    description:
        "Browse and search sacrament meeting programs, dates, hymns, and speaker assignments.",
};

interface MeetingsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

const ITEMS_PER_PAGE = 5;

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const params = await searchParams;

    const query = (params.query ?? "").trim().toLowerCase();

    const requestedPage = Number(params.page ?? "1");

    // Retrieve meeting records from Neon PostgreSQL.
    const meetings = await getMeetings();

    // Filter meetings based on the search query.
    const filteredMeetings = meetings.filter((meeting) => {
        const searchableText = [
            meeting.date,
            meeting.meetingType,
            meeting.presiding,
            meeting.conducting,
            meeting.openingHymn.title,
            meeting.sacramentHymn.title,
            meeting.closingHymn.title,
            ...meeting.speakers.flatMap((speaker) => [
                speaker.name,
                speaker.topic,
            ]),
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(query);
    });

    // Calculate pagination.
    const totalPages = Math.ceil(
        filteredMeetings.length / ITEMS_PER_PAGE
    );

    const currentPage =
        Number.isSafeInteger(requestedPage) && requestedPage > 0
            ? Math.min(requestedPage, Math.max(totalPages, 1))
            : 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const paginatedMeetings = filteredMeetings.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <main className="flex-1">
            <section className="bg-blue-950 px-6 py-14 text-white">
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        All Sacrament Meetings
                    </h1>

                    <p className="mt-4 max-w-2xl text-blue-100">
                        Browse meeting programs and view the hymns,
                        prayers, speakers, and other details planned
                        for each Sunday.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Meeting Programs
                        </h2>

                        <p className="mt-2 text-slate-600">
                            {filteredMeetings.length} meeting
                            {filteredMeetings.length === 1
                                ? ""
                                : "s"}{" "}
                            available
                        </p>
                    </div>

                    <MeetingSearch />
                </div>

                {paginatedMeetings.length > 0 ? (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {paginatedMeetings.map((meeting) => (
                                <MeetingCard
                                    key={meeting.id}
                                    meeting={meeting}
                                />
                            ))}
                        </div>

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    </>
                ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <h3 className="text-xl font-semibold text-slate-900">
                            No meetings found
                        </h3>

                        <p className="mt-3 text-slate-600">
                            Try another search term or clear the
                            search box to see all meeting programs.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
