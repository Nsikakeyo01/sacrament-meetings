
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";

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

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
                Edit Meeting Program
            </h2>

            <p className="mt-3 text-slate-600">
                Meeting scheduled for {meeting.date}
            </p>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                    Current Meeting Information
                </h3>

                <p className="mt-3 text-slate-700">
                    <strong>Meeting Type:</strong>{" "}
                    {meeting.meetingType}
                </p>

                <p className="mt-2 text-slate-700">
                    <strong>Presiding:</strong>{" "}
                    {meeting.presiding}
                </p>

                <p className="mt-2 text-slate-700">
                    <strong>Conducting:</strong>{" "}
                    {meeting.conducting}
                </p>
            </div>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-5">
                <h3 className="font-semibold text-blue-950">
                    Editing Available in Week 04
                </h3>

                <p className="mt-2 text-blue-900">
                    The meeting editing form and database update
                    functionality will be implemented in a future
                    assignment.
                </p>
            </div>

            <Link
                href="/admin"
                className="mt-8 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
                Back to Admin Dashboard
            </Link>
        </section>
    );
}
