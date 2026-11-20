
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Meeting pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-blue-900 hover:bg-blue-50"
                >
                    Previous
                </Link>
            ) : (
                <span
                    aria-disabled="true"
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-600"
                >
                    Previous
                </span>
            )}

            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((pageNumber) => (
                <Link
                    key={pageNumber}
                    href={createPageURL(pageNumber)}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={
                        currentPage === pageNumber
                            ? "page"
                            : undefined
                    }
                    className={`rounded-lg border px-4 py-2 font-medium ${currentPage === pageNumber
                        ? "border-blue-900 bg-blue-900 text-white"
                        : "border-slate-300 bg-white text-blue-900 hover:bg-blue-50"
                        }`}
                >
                    {pageNumber}
                </Link>
            ))}

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-blue-900 hover:bg-blue-50"
                >
                    Next
                </Link>
            ) : (
                <span
                    aria-disabled="true"
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-600"
                >
                    Next
                </span>
            )}
        </nav>
    );
}
