import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Popup from "@/components/Popup";
import Search from "./search";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VirtualGirls.ai",
  description: "Your #1 destination for everything AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Search/>
        {children}
      </body>
    </html>
  );
}
