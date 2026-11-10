
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "All Meetings" },
    { href: "/meetings/current", label: "Current Meeting" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center gap-3 sm:gap-6">
                {navigationLinks.map((link) => {
                    const isActive =
                        link.href === "/"
                            ? pathname === "/"
                            : link.href === "/meetings"
                                ? pathname === "/meetings" ||
                                (/^\/meetings\/\d+$/.test(pathname))
                                : pathname === link.href;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isActive
                                        ? "bg-blue-100 text-blue-900"
                                        : "text-slate-700 hover:bg-slate-100 hover:text-blue-800"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
