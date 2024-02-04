import "./globals.css";
import { Inter } from "next/font/google";
import Search from "./search";
import Email from "./email";
import Footer from "../components/layout/Footer";
import Script from "next/script";
import { getServerSession } from "next-auth/next"
import Provider from "./context/client-provider"
import { authOptions } from "./api/auth/[...nextauth]/route.ts"
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "xpixels.io",
  description: "Generate Perfection",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"Token": "06437586e39741fb9a3aac42441f03d7"}'
        ></Script>
        <Script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async>
        </Script>
        <meta
          name="6a97888e-site-verification"
          content="02bb476294a0bb08b105b26439708083"
        />
      </head>
      <body className={inter.className}>
      <Provider session={session}>
        <Email />
        <Search />
        {children}
        <Footer />
        </Provider>
      </body>
    </html>
  );
}
