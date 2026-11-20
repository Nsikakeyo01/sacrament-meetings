
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createMeeting } from "@/lib/actions";

import {
    initialMeetingState,
    type MeetingActionState,
} from "@/lib/action-state";

import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
    meeting?: SacramentMeeting;
    action?: (
        state: MeetingActionState,
        formData: FormData
    ) => Promise<MeetingActionState>;
}

interface FieldProps {
    name: string;
    label: string;
    type?: string;
    defaultValue?: string | number;
    required?: boolean;
    error?: string;
}

const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200";

const labelClass =
    "block text-sm font-semibold text-slate-800";

function Field({
    name,
    label,
    type = "text",
    defaultValue = "",
    required = false,
    error,
}: FieldProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className={labelClass}
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                required={required}
                min={type === "number" ? 1 : undefined}
                aria-invalid={Boolean(error)}
                aria-describedby={`${name}-error`}
                className={inputClass}
            />

            <p
                id={`${name}-error`}
                aria-live="polite"
                className="mt-1 text-sm text-red-700"
            >
                {error ?? ""}
            </p>
        </div>
    );
}

function SubmitButton({
    editing,
}: {
    editing: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending
                ? "Saving..."
                : editing
                    ? "Update Meeting"
                    : "Create Meeting"}
        </button>
    );
}

export default function MeetingForm({
    meeting,
    action = createMeeting,
}: MeetingFormProps) {
    const [state, formAction] = useActionState(
        action,
        initialMeetingState
    );

    const errors = state?.errors ?? {};

    const getError = (name: string) =>
        errors[name]?.[0];

    return (
        <form
            action={formAction}
            className="space-y-8"
        >
            <div aria-live="polite">
                {state?.message && (
                    <p
                        role={
                            state.success
                                ? "status"
                                : "alert"
                        }
                        className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800"
                    >
                        {state.message}
                    </p>
                )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    name="date"
                    label="Meeting Date"
                    type="date"
                    defaultValue={meeting?.date}
                    required
                    error={getError("date")}
                />

                <div>
                    <label
                        htmlFor="meetingType"
                        className={labelClass}
                    >
                        Meeting Type
                    </label>

                    <select
                        id="meetingType"
                        name="meetingType"
                        defaultValue={
                            meeting?.meetingType ??
                            "regular"
                        }
                        aria-invalid={Boolean(
                            getError("meetingType")
                        )}
                        aria-describedby="meetingType-error"
                        className={inputClass}
                    >
                        <option value="regular">
                            Regular
                        </option>
                        <option value="testimony">
                            Testimony
                        </option>
                        <option value="stake">
                            Stake
                        </option>
                        <option value="general">
                            General
                        </option>
                        <option value="special">
                            Special
                        </option>
                    </select>

                    <p
                        id="meetingType-error"
                        aria-live="polite"
                        className="mt-1 text-sm text-red-700"
                    >
                        {getError("meetingType") ?? ""}
                    </p>
                </div>

                <Field
                    name="presiding"
                    label="Presiding Officer"
                    defaultValue={meeting?.presiding}
                    required
                    error={getError("presiding")}
                />

                <Field
                    name="conducting"
                    label="Conducting Officer"
                    defaultValue={meeting?.conducting}
                    required
                    error={getError("conducting")}
                />

                <Field
                    name="openingHymnNumber"
                    label="Opening Hymn Number"
                    type="number"
                    defaultValue={
                        meeting?.openingHymn.number
                    }
                    required
                    error={getError(
                        "openingHymn.number"
                    )}
                />

                <Field
                    name="openingHymnTitle"
                    label="Opening Hymn Title"
                    defaultValue={
                        meeting?.openingHymn.title
                    }
                    required
                    error={getError(
                        "openingHymn.title"
                    )}
                />

                <Field
                    name="openingPrayer"
                    label="Opening Prayer"
                    defaultValue={
                        meeting?.openingPrayer
                    }
                    required
                    error={getError("openingPrayer")}
                />

                <Field
                    name="sacramentHymnNumber"
                    label="Sacrament Hymn Number"
                    type="number"
                    defaultValue={
                        meeting?.sacramentHymn.number
                    }
                    required
                    error={getError(
                        "sacramentHymn.number"
                    )}
                />

                <Field
                    name="sacramentHymnTitle"
                    label="Sacrament Hymn Title"
                    defaultValue={
                        meeting?.sacramentHymn.title
                    }
                    required
                    error={getError(
                        "sacramentHymn.title"
                    )}
                />

                <Field
                    name="closingHymnNumber"
                    label="Closing Hymn Number"
                    type="number"
                    defaultValue={
                        meeting?.closingHymn.number
                    }
                    required
                    error={getError(
                        "closingHymn.number"
                    )}
                />

                <Field
                    name="closingHymnTitle"
                    label="Closing Hymn Title"
                    defaultValue={
                        meeting?.closingHymn.title
                    }
                    required
                    error={getError(
                        "closingHymn.title"
                    )}
                />

                <Field
                    name="closingPrayer"
                    label="Closing Prayer"
                    defaultValue={meeting?.closingPrayer}
                    required
                    error={getError("closingPrayer")}
                />
            </div>

            <div>
                <label
                    htmlFor="announcements"
                    className={labelClass}
                >
                    Announcements (one per line)
                </label>

                <textarea
                    id="announcements"
                    name="announcements"
                    rows={4}
                    defaultValue={
                        meeting?.announcements?.join(
                            "\n"
                        ) ?? ""
                    }
                    className={inputClass}
                />
            </div>

            <div>
                <label
                    htmlFor="wardBusiness"
                    className={labelClass}
                >
                    Ward Business (one item per line)
                </label>

                <textarea
                    id="wardBusiness"
                    name="wardBusiness"
                    rows={3}
                    defaultValue={
                        meeting?.wardBusiness
                            .map(
                                (item) =>
                                    item.description
                            )
                            .join("\n") ?? ""
                    }
                    className={inputClass}
                />
            </div>

            <div>
                <label
                    htmlFor="speakers"
                    className={labelClass}
                >
                    Speakers (Name | Topic | Type)
                </label>

                <p
                    id="speakers-help"
                    className="mt-1 text-sm text-slate-600"
                >
                    Enter one person per line.
                    Use &quot;speaker&quot; or
                    &quot;musical-number&quot; as the type.
                </p>

                <textarea
                    id="speakers"
                    name="speakers"
                    rows={5}
                    defaultValue={
                        meeting?.speakers
                            .map(
                                (speaker) =>
                                    `${speaker.name} | ${speaker.topic} | ${speaker.type}`
                            )
                            .join("\n") ?? ""
                    }
                    placeholder="John Smith | Faith | speaker"
                    aria-describedby="speakers-help speakers-error"
                    aria-invalid={Boolean(
                        getError("speakers")
                    )}
                    className={inputClass}
                />

                <p
                    id="speakers-error"
                    aria-live="polite"
                    className="mt-1 text-sm text-red-700"
                >
                    {getError("speakers") ?? ""}
                </p>
            </div>

            <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
                <input
                    type="checkbox"
                    name="stakeBusiness"
                    defaultChecked={
                        meeting?.stakeBusiness ??
                        false
                    }
                    className="h-4 w-4"
                />
                Include Stake Business
            </label>

            <SubmitButton
                editing={Boolean(meeting)}
            />
        </form>
    );
}
