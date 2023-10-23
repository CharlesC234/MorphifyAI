import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import PatreonProvider from "next-auth/providers/patreon";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    PatreonProvider({
      clientId: process.env.PATREON_CLIENT_ID,
      clientSecret: process.env.PATREON_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
