
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: MeetingPageProps): Promise<Metadata> {
    const { id } = await params;
    const meetingId = Number(id);

    const meeting =
        Number.isInteger(meetingId) && meetingId > 0
            ? getMeetingById(meetingId)
            : undefined;

    if (!meeting) {
        return {
            title: "Meeting Not Found | Sacrament Meeting Planner",
        };
    }

    return {
        title: `${meeting.date} Meeting | Sacrament Meeting Planner`,
        description: `View the sacrament meeting program for ${meeting.date}, including hymns, prayers, and speakers.`,
    };
}

export default async function MeetingPage({
    params,
}: MeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!/^\d+$/.test(id) || !Number.isSafeInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <main className="flex-1 bg-slate-50 px-4 py-10 md:px-6">
            <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-4 print:hidden">
                <Link
                    href="/meetings"
                    className="font-semibold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
                >
                    ← Back to All Meetings
                </Link>

                <p className="text-sm text-slate-600">
                    To print this program, use Ctrl + P.
                </p>
            </div>

            <MeetingDetail meeting={meeting} />
        </main>
    );
}
