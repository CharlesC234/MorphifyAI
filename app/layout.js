import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Popup from "@/components/Popup";
import Search from "./search";
import EnterEmail from "@/components/EnterEmail";
import Email from "./email";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "xpixels.io",
  description: "Your #1 destination for everything AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Email />
        <Search />
        {children}
        <Footer />
      </body>
    </html>
  );
}
