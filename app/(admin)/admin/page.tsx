
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const meetings = await getMeetings();

    return (
        <section>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Admin Dashboard
                </h2>

                <p className="mt-2 text-slate-600">
                    View and manage sacrament meeting programs.
                </p>
            </div>

            <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                    Total Meeting Programs
                </h3>

                <p className="mt-3 text-4xl font-bold text-blue-900">
                    {meetings.length}
                </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-4">
                <Link
                    href="/admin/meetings/new"
                    className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                    Create New Meeting
                </Link>

                <Link
                    href="/meetings"
                    className="rounded-lg border border-blue-900 px-5 py-3 font-semibold text-blue-900 hover:bg-blue-50"
                >
                    View Public Meetings
                </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-900">
                        <tr>
                            <th scope="col" className="px-5 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Meeting Type
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Presiding
                            </th>
                            <th scope="col" className="px-5 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                        {meetings.map((meeting) => (
                            <tr key={meeting.id}>
                                <td className="px-5 py-4">
                                    {meeting.date}
                                </td>

                                <td className="px-5 py-4 capitalize">
                                    {meeting.meetingType}
                                </td>

                                <td className="px-5 py-4">
                                    {meeting.presiding}
                                </td>

                                <td className="px-5 py-4">
                                    <Link
                                        href={`/admin/meetings/${meeting.id}/edit`}
                                        className="font-semibold text-blue-900 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
