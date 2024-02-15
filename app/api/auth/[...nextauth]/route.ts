import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import DiscordProvider from "next-auth/providers/discord";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: "https://stunner-production-c449.up.railway.app/",
          scope: "identify email guilds",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
