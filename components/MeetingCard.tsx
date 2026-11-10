
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({
    meeting,
}: MeetingCardProps) {
    const formattedDate = new Date(
        `${meeting.date}T12:00:00`
    ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const meetingTypeLabels: Record<
        SacramentMeeting["meetingType"],
        string
    > = {
        regular: "Regular Sacrament Meeting",
        testimony: "Fast and Testimony Meeting",
        stake: "Stake Conference",
        general: "General Conference",
        special: "Special Sacrament Meeting",
    };

    return (
        <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900">
                    {meetingTypeLabels[meeting.meetingType]}
                </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
                {formattedDate}
            </h2>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                    <span className="font-semibold text-slate-800">
                        Presiding:
                    </span>{" "}
                    {meeting.presiding}
                </p>

                <p>
                    <span className="font-semibold text-slate-800">
                        Conducting:
                    </span>{" "}
                    {meeting.conducting}
                </p>

                <p>
                    <span className="font-semibold text-slate-800">
                        Opening Hymn:
                    </span>{" "}
                    {meeting.openingHymn.title}
                </p>
            </div>

            <div className="mt-auto pt-6">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="inline-flex rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                    View Meeting Program
                </Link>
            </div>
        </article>
    );
}
