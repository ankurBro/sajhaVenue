import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import AuthProvider from "@/app/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SajhaVenue — Green Venue Booking",
  description:
    "Find, filter, and book venues across Nepal. Demo with user, owner, admin roles.",
  themeColor: "#16a34a",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <AuthProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
