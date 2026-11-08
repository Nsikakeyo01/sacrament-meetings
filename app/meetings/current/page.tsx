
import { redirect } from "next/navigation";
import { getMeetingByDate, getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
    // Get today's date in Nigeria's time zone.
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    // Convert the date into a UTC date for safe calculations.
    const currentDate = new Date(`${today}T12:00:00Z`);

    // Find the most recent Sunday.
    const daysSinceSunday = currentDate.getUTCDay();

    currentDate.setUTCDate(
        currentDate.getUTCDate() - daysSinceSunday
    );

    const sundayDate = currentDate.toISOString().slice(0, 10);

    // Find the meeting scheduled for that Sunday.
    const currentMeeting = getMeetingByDate(sundayDate);

    if (currentMeeting) {
        redirect(`/meetings/${currentMeeting.id}`);
    }

    // Otherwise, open the latest available meeting.
    const meetings = getMeetings();

    if (meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    }

    // If there are no meetings, return to the meetings list.
    redirect("/meetings");
}
