
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return NextResponse.json(
                {
                    error: "Invalid meeting ID. Please provide a positive integer.",
                },
                { status: 400 }
            );
        }

        const meetingId = Number(id);

        if (!Number.isSafeInteger(meetingId)) {
            return NextResponse.json(
                { error: "Invalid meeting ID." },
                { status: 400 }
            );
        }

        // Retrieve the meeting from Neon PostgreSQL
        const meeting = await getMeetingById(meetingId);

        if (!meeting) {
            return NextResponse.json(
                { error: "Meeting not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(meeting, { status: 200 });
    } catch (error) {
        console.error("Error fetching meeting:", error);

        return NextResponse.json(
            { error: "Failed to fetch meeting." },
            { status: 500 }
        );
    }
}
