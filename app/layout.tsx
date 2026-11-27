import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Sacrament Meeting Planner";

const description =
  "Plan, manage, and view sacrament meeting programs, including hymns, prayers, speakers, ward business, and announcements.";

const siteUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteName,
    template: "%s | Sacrament Meeting Planner",
  },

  description,

  applicationName: siteName,

  keywords: [
    "Sacrament Meeting",
    "Meeting Planner",
    "Sunday Worship",
    "Bishopric",
    "Meeting Programs",
    "Hymns",
    "Speakers",
  ],

  authors: [
    {
      name: "Nsikak Christopher Eyo",
    },
  ],

  openGraph: {
    title: siteName,
    description,
    siteName,
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        <Header />

        <main id="main-content" className="w-full flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}