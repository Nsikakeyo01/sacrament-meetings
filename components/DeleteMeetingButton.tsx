
"use client";

import { useFormStatus } from "react-dom";
import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingButtonProps {
    meetingId: number;
}

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="font-semibold text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? "Deleting..." : "Delete"}
        </button>
    );
}

export default function DeleteMeetingButton({
    meetingId,
}: DeleteMeetingButtonProps) {
    const deleteAction = deleteMeeting.bind(
        null,
        meetingId
    );

    return (
        <form
            action={deleteAction}
            onSubmit={(event) => {
                if (
                    !window.confirm(
                        "Are you sure you want to delete this meeting? This cannot be undone."
                    )
                ) {
                    event.preventDefault();
                }
            }}
        >
            <DeleteButton />
        </form>
    );
}
