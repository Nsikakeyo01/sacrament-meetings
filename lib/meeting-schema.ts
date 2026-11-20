
import { z } from "zod";

const requiredText = (label: string) =>
    z.string().trim().min(1, `${label} is required.`);

const hymnSchema = z.object({
    number: z.number().int().positive(),
    title: requiredText("Hymn title"),
});

const speakerSchema = z.object({
    name: requiredText("Speaker name"),
    topic: z.string().trim(),
    type: z.enum(["speaker", "musical-number"]),
});

export const meetingSchema = z.object({
    date: z.iso.date(),

    meetingType: z.enum([
        "testimony",
        "regular",
        "stake",
        "general",
        "special",
    ]),

    presiding: requiredText("Presiding officer"),
    conducting: requiredText("Conducting officer"),

    announcements: z.array(z.string().trim()).default([]),

    openingHymn: hymnSchema,
    openingPrayer: requiredText("Opening prayer"),

    wardBusiness: z.array(
        z.object({
            description: requiredText("Ward business description"),
        })
    ).default([]),

    stakeBusiness: z.boolean().default(false),

    sacramentHymn: hymnSchema,

    speakers: z.array(speakerSchema).default([]),

    closingHymn: hymnSchema,
    closingPrayer: requiredText("Closing prayer"),
});

export type MeetingFormValues = z.infer<typeof meetingSchema>;
