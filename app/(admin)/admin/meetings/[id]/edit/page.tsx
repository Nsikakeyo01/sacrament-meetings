
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeeting } from "@/lib/actions";
import MeetingForm from "@/components/MeetingForm";

interface EditMeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (
        !/^[1-9]\d*$/.test(id) ||
        !Number.isSafeInteger(meetingId)
    ) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    const updateMeetingAction = updateMeeting.bind(
        null,
        meetingId
    );

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <Link
                href="/admin"
                className="text-sm font-semibold text-blue-900 hover:underline"
            >
                Back to Admin Dashboard
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
                Edit Meeting Program
            </h1>

            <p className="mb-8 mt-3 text-slate-600">
                Update the sacrament meeting scheduled for{" "}
                {meeting.date}.
            </p>

            <MeetingForm
                meeting={meeting}
                action={updateMeetingAction}
            />
        </section>
    );
}
