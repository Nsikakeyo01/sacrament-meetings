
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    context: RouteContext
) {
    const { id } = await context.params;

    if (!/^[1-9]\d*$/.test(id)) {
        return NextResponse.json(
            { error: "Invalid meeting ID. Please provide a positive integer." },
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

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        return NextResponse.json(
            { error: "Meeting not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(meeting, { status: 200 });
}
