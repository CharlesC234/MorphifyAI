import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Popup from "@/components/Popup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VirtualGirls.ai",
  description: "Your #1 destination for everything AI",
};

export default function RootLayout({ children, searchParams }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
