import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Popup from "@/components/Popup";
import Search from "./search";
import EnterEmail from "@/components/EnterEmail";
import Email from "./email";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "xxxpixels.co",
  description: "Your #1 destination for everything AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD
        <Search />
=======
        <Email/>
        <Search/>
>>>>>>> b7aae2e283d655e56db8c79754ae921760987a6e
        {children}
      </body>
    </html>
  );
}
