"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAuth } from "@/lib/require-auth";

import {
    createMeeting as insertMeeting,
    updateMeeting as saveMeeting,
    deleteMeeting as removeMeeting,
} from "@/lib/meetings-db";

import { meetingSchema } from "@/lib/meeting-schema";
import type { MeetingActionState } from "@/lib/action-state";

function getFieldErrors(
    error: z.ZodError
): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const field = issue.path.join(".");

        if (!errors[field]) {
            errors[field] = [];
        }

        errors[field].push(issue.message);
    }

    return errors;
}

function getText(
    formData: FormData,
    key: string
): string {
    return String(formData.get(key) ?? "").trim();
}

function parseMeetingForm(formData: FormData) {
    const announcements = getText(formData, "announcements")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    const wardBusiness = getText(formData, "wardBusiness")
        .split("\n")
        .map((description) => description.trim())
        .filter(Boolean)
        .map((description) => ({ description }));

    const speakers = getText(formData, "speakers")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const parts = line.split("|");

            const name = parts[0]?.trim() ?? "";
            const topic = parts[1]?.trim() ?? "";

            const type =
                parts[2]?.trim() === "musical-number"
                    ? "musical-number"
                    : "speaker";

            return {
                name,
                topic,
                type,
            };
        });

    const rawValues = {
        date: getText(formData, "date"),

        meetingType: getText(formData, "meetingType"),

        presiding: getText(formData, "presiding"),

        conducting: getText(formData, "conducting"),

        announcements,

        openingHymn: {
            number: Number(
                getText(formData, "openingHymnNumber")
            ),

            title: getText(formData, "openingHymnTitle"),
        },

        openingPrayer: getText(formData, "openingPrayer"),

        wardBusiness,

        stakeBusiness:
            formData.get("stakeBusiness") === "on",

        sacramentHymn: {
            number: Number(
                getText(formData, "sacramentHymnNumber")
            ),

            title: getText(formData, "sacramentHymnTitle"),
        },

        speakers,

        closingHymn: {
            number: Number(
                getText(formData, "closingHymnNumber")
            ),

            title: getText(formData, "closingHymnTitle"),
        },

        closingPrayer: getText(formData, "closingPrayer"),
    };

    return meetingSchema.safeParse(rawValues);
}

function isDuplicateDate(error: unknown): boolean {
    if (typeof error !== "object" || error === null) {
        return false;
    }

    const databaseError = error as {
        code?: string;
        message?: string;
    };

    return (
        databaseError.code === "23505" ||
        Boolean(
            databaseError.message?.includes(
                "meetings_date_key"
            )
        )
    );
}

function refreshMeetingPages(): void {
    revalidatePath("/admin");
    revalidatePath("/meetings");
    revalidatePath("/meetings/current");
}

export async function createMeeting(
    _previousState: MeetingActionState,
    formData: FormData
): Promise<MeetingActionState> {
    await requireAuth();

    const result = parseMeetingForm(formData);

    if (!result.success) {
        return {
            message: "Please correct the errors below.",
            errors: getFieldErrors(result.error),
            success: false,
        };
    }

    try {
        await insertMeeting(result.data);
    } catch (error) {
        if (isDuplicateDate(error)) {
            return {
                message: "A meeting already exists for this date.",
                errors: {
                    date: ["Please choose another meeting date."],
                },
                success: false,
            };
        }

        console.error("Create meeting failed:", error);

        return {
            message:
                "Unable to create the meeting. Please try again.",
            errors: {},
            success: false,
        };
    }

    refreshMeetingPages();

    redirect("/admin");
}

export async function updateMeeting(
    id: number,
    _previousState: MeetingActionState,
    formData: FormData
): Promise<MeetingActionState> {
    await requireAuth();

    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            message: "Invalid meeting ID.",
            errors: {},
            success: false,
        };
    }

    const result = parseMeetingForm(formData);

    if (!result.success) {
        return {
            message: "Please correct the errors below.",
            errors: getFieldErrors(result.error),
            success: false,
        };
    }

    try {
        const updated = await saveMeeting(id, result.data);

        if (!updated) {
            return {
                message: "Meeting not found.",
                errors: {},
                success: false,
            };
        }
    } catch (error) {
        if (isDuplicateDate(error)) {
            return {
                message: "Another meeting already uses this date.",
                errors: {
                    date: ["Please choose another meeting date."],
                },
                success: false,
            };
        }

        console.error("Update meeting failed:", error);

        return {
            message:
                "Unable to update the meeting. Please try again.",
            errors: {},
            success: false,
        };
    }

    refreshMeetingPages();

    revalidatePath(`/meetings/${id}`);
    revalidatePath(`/admin/meetings/${id}/edit`);

    redirect("/admin");
}

export async function deleteMeeting(
    id: number
): Promise<void> {
    await requireAuth();

    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new Error("Invalid meeting ID.");
    }

    try {
        const deleted = await removeMeeting(id);

        if (!deleted) {
            throw new Error("Meeting not found.");
        }
    } catch (error) {
        console.error("Delete meeting failed:", error);

        throw new Error(
            "Unable to delete this meeting. Please try again."
        );
    }

    refreshMeetingPages();

    revalidatePath(`/meetings/${id}`);

    redirect("/admin");
}