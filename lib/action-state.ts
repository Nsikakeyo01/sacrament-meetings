
export interface MeetingActionState {
    message: string;
    errors: Record<string, string[]>;
    success: boolean;
}

export const initialMeetingState: MeetingActionState = {
    message: "",
    errors: {},
    success: false,
};
