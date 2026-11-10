
import type { ReactNode } from "react";

interface MeetingsLayoutProps {
    children: ReactNode;
}

export default function MeetingsLayout({
    children,
}: MeetingsLayoutProps) {
    return (
        <div className="flex min-h-full flex-1 flex-col bg-slate-50">
            {children}
        </div>
    );
}
