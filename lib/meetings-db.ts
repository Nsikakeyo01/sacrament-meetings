
import { neon } from "@neondatabase/serverless";
import type {
    Hymn,
    MeetingType,
    SacramentMeeting,
    SpeakerItem,
    WardBusinessItem,
} from "./types";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
}

const sql = neon(databaseUrl);

interface MeetingRow {
    id: number;
    date: string;
    meeting_type: MeetingType;
    presiding: string;
    conducting: string;
    announcements: string[] | null;
    opening_hymn: Hymn;
    opening_prayer: string;
    ward_business: WardBusinessItem[] | null;
    stake_business: boolean | null;
    sacrament_hymn: Hymn;
    speakers: Partial<SpeakerItem>[] | null;
    closing_hymn: Hymn;
    closing_prayer: string;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
    return {
        id: row.id,
        date: row.date,
        meetingType: row.meeting_type,
        presiding: row.presiding,
        conducting: row.conducting,
        announcements: row.announcements ?? [],
        openingHymn: row.opening_hymn,
        openingPrayer: row.opening_prayer,
        wardBusiness: row.ward_business ?? [],
        stakeBusiness: row.stake_business ?? false,
        sacramentHymn: row.sacrament_hymn,
        speakers: (row.speakers ?? []).map((speaker) => ({
            name: speaker.name ?? "",
            topic: speaker.topic ?? "",
            type: speaker.type ?? "speaker",
        })),
        closingHymn: row.closing_hymn,
        closingPrayer: row.closing_prayer,
    };
}

export async function getMeetings(): Promise<SacramentMeeting[]> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        ORDER BY date DESC
    `;

    return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | undefined> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        WHERE id = ${id}
        LIMIT 1
    `;

    const meeting = rows[0] as unknown as MeetingRow | undefined;

    return meeting ? mapMeeting(meeting) : undefined;
}

export async function getMeetingByDate(
    date: string
): Promise<SacramentMeeting | undefined> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        WHERE date = ${date}::date
        LIMIT 1
    `;

    const meeting = rows[0] as unknown as MeetingRow | undefined;

    return meeting ? mapMeeting(meeting) : undefined;
}
