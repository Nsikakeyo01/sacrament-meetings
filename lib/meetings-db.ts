
import { neon } from "@neondatabase/serverless";

import type {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "@/lib/types";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL environment variable is missing."
  );
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
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

function mapMeeting(
  row: MeetingRow
): SacramentMeeting {
  return {
    id: Number(row.id),
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
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export type MeetingInput = Omit<
  SacramentMeeting,
  "id"
>;

export async function getMeetings(): Promise<
  SacramentMeeting[]
> {
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

  return rows.map((row) =>
    mapMeeting(row as unknown as MeetingRow)
  );
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  if (
    !Number.isSafeInteger(id) ||
    id <= 0
  ) {
    return null;
  }

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

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(
    rows[0] as unknown as MeetingRow
  );
}

export async function getMeetingByDate(
  date: string
): Promise<SacramentMeeting | null> {
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

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(
    rows[0] as unknown as MeetingRow
  );
}

export async function createMeeting(
  meeting: MeetingInput
): Promise<number> {
  const rows = await sql`
        INSERT INTO meetings (
            date,
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
        )
        VALUES (
            ${meeting.date}::date,
            ${meeting.meetingType},
            ${meeting.presiding},
            ${meeting.conducting},
            ${meeting.announcements ?? []}::text[],
            ${JSON.stringify(meeting.openingHymn)}::jsonb,
            ${meeting.openingPrayer},
            ${JSON.stringify(meeting.wardBusiness)}::jsonb,
            ${meeting.stakeBusiness},
            ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
            ${JSON.stringify(meeting.speakers)}::jsonb,
            ${JSON.stringify(meeting.closingHymn)}::jsonb,
            ${meeting.closingPrayer}
        )
        RETURNING id
    `;

  return Number(rows[0].id);
}

export async function updateMeeting(
  id: number,
  meeting: MeetingInput
): Promise<boolean> {
  const rows = await sql`
        UPDATE meetings
        SET
            date = ${meeting.date}::date,
            meeting_type = ${meeting.meetingType},
            presiding = ${meeting.presiding},
            conducting = ${meeting.conducting},
            announcements = ${meeting.announcements ?? []}::text[],
            opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
            opening_prayer = ${meeting.openingPrayer},
            ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
            stake_business = ${meeting.stakeBusiness},
            sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
            speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
            closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
            closing_prayer = ${meeting.closingPrayer}
        WHERE id = ${id}
        RETURNING id
    `;

  return rows.length > 0;
}

export async function deleteMeeting(
  id: number
): Promise<boolean> {
  const rows = await sql`
        DELETE FROM meetings
        WHERE id = ${id}
        RETURNING id
    `;

  return rows.length > 0;
}
