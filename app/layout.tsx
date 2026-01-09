import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | TaskMaster',
    default: 'TaskMaster - Efficient Intern Task Management System',
  },
  description: "TaskMaster is a powerful Intern Management System offering real-time task tracking, performance analytics, and automated reporting. Simplify your internship program today.",
  keywords: ["Task Management", "Internship Tracking", "Productivity Tool", "Admin Dashboard", "TaskMaster", "Intern Management"],
  authors: [{ name: "Ashwani Kushwaha" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'TaskMaster',
    title: 'TaskMaster - Efficient Intern Task Management',
    description: 'Streamline your internship program with TaskMaster. Assign, track, and review tasks seamlessly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaskMaster Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskMaster',
    description: 'The ultimate tool for managing intern tasks and productivity.',
    creator: '@taskmaster',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Provider from "@/components/SessionProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Navbar />
            <main className="p-4 max-w-7xl mx-auto w-full flex-1">
              {children}
            </main>
            <Footer />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
