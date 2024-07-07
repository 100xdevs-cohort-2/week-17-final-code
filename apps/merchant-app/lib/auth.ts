import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (!user || !user.email) {
          return false;
        }

        try {
          await db.merchant.upsert({
            where: {
              email: user.email
            },
            create: {
              email: user.email,
              name: user.name || "",
              auth_type: account.provider === "google" ? "Google" : "Github"
            },
            update: {
              name: user.name || "",
              auth_type: account.provider === "google" ? "Google" : "Github"
            },
            select: {
              id: true
            }
          });
          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
};
