import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 8,
    },

    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const parsed = z.object({
                    email: z.string().email(),
                    password: z.string().min(8).max(72),
                }).safeParse(credentials);

                if (!parsed.success) {
                    return null;
                }

                const { email, password } = parsed.data;

                const adminEmail = process.env.ADMIN_EMAIL;
                const passwordHash = process.env.ADMIN_PASSWORD_HASH;

                if (!adminEmail || !passwordHash) {
                    return null;
                }

                if (email.toLowerCase() !== adminEmail.toLowerCase()) {
                    return null;
                }

                const validPassword = await bcrypt.compare(
                    password,
                    passwordHash
                );

                if (!validPassword) {
                    return null;
                }

                return {
                    id: "bishopric-admin",
                    name: "Bishopric Administrator",
                    email: adminEmail,
                };
            },
        }),
    ],
});