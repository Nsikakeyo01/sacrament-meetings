
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        // Return to the first page when searching.
        params.set("page", "1");

        if (term.trim()) {
            params.set("query", term.trim());
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="w-full max-w-md">
            <label
                htmlFor="meeting-search"
                className="mb-2 block text-sm font-semibold text-slate-800"
            >
                Search Meeting Programs
            </label>

            <input
                id="meeting-search"
                type="search"
                placeholder="Search meetings..."
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(event) => handleSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}
