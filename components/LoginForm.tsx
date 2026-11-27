"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/auth-actions";

export default function LoginForm() {
    const [errorMessage, formAction, isPending] =
        useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Email Address
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={8}
                    maxLength={72}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your password"
                />
            </div>

            {errorMessage && (
                <p
                    role="alert"
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}