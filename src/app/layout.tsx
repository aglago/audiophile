
import React from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { getAuthSession } from '@/lib/session';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import './globals.css';
import { ClientSessionProvider } from '@/providers/ClientSessionProvider';
import { headers } from 'next/headers';

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audiophile - Premium Audio Equipment",
  description:
    "Discover premium audio equipment including headphones, speakers, and earphones. Experience the best in audio quality with Audiophile.",
  keywords:
    "headphones, speakers, earphones, audio equipment, premium audio, audiophile",
  authors: [{ name: "Audiophile Team" }],
  creator: "Audiophile",
  publisher: "Audiophile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://audiophile.com",
    title: "Audiophile - Premium Audio Equipment",
    description:
      "Discover premium audio equipment including headphones, speakers, and earphones.",
    siteName: "Audiophile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audiophile - Premium Audio Equipment",
    description:
      "Discover premium audio equipment including headphones, speakers, and earphones.",
    creator: "@audiophile",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
    const pathname = (await headers()).get("x-invoke-path") || "";
    const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className={manrope.variable}>
        <ClientSessionProvider session={session}>
          <div className="min-h-screen flex flex-col">
            {!isHomePage && <Header />}
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                border: '1px solid #e5e7eb',
              },
            }}
          />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
