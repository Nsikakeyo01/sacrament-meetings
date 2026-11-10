
import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        // Retrieve meetings from Neon PostgreSQL
        const meetings = await getMeetings();

        // Filter meetings by date if provided
        if (date) {
            const filteredMeetings = meetings.filter(
                (meeting) => meeting.date === date
            );

            return NextResponse.json(filteredMeetings);
        }

        // Return all meetings
        return NextResponse.json(meetings);
    } catch (error) {
        console.error("Error fetching meetings:", error);

        return NextResponse.json(
            { error: "Failed to fetch meetings" },
            { status: 500 }
        );
    }
}
