import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
    title: "Bishopric Login",
    description:
        "Sign in to securely manage sacrament meeting programs and assignments.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) {
        redirect("/admin");
    }

    return (
        <section className="flex min-h-[75vh] items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 px-4 py-16">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
                        Authorized Access
                    </span>

                    <h1 className="mt-6 text-3xl font-bold text-blue-950">
                        Bishopric Login
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Sign in to manage sacrament meeting programs,
                        speakers, hymns, and assignments.
                    </p>
                </div>

                <LoginForm />

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-blue-900 hover:underline"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}