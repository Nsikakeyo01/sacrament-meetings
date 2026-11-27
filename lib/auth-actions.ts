"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    _previousState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return "Invalid email or password.";
            }

            return "Unable to sign in. Please try again.";
        }

        throw error;
    }
}

export async function logout(): Promise<void> {
    await signOut({
        redirectTo: "/login",
    });
}