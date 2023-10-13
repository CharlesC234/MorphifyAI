import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Popup from "@/components/Popup";
import Search from "./search";
import EnterEmail from "@/components/EnterEmail";
import Email from "./email";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "xpixels.io",
  description: "Generate Perfection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "06437586e39741fb9a3aac42441f03d7"}'
        ></Script>
        <meta
          name="6a97888e-site-verification"
          content="02bb476294a0bb08b105b26439708083"
        />
      </head>
      <body className={inter.className}>
        <Email />
        <Search />
        {children}
        <Footer />
      </body>
    </html>
  );
}
