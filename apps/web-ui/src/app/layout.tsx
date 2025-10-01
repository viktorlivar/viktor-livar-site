import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viktorlivar.com'),
  title: {
    default: 'Viktor Livar • Full-Stack MVP Development & Fractional CTO',
    template: '%s | Viktor Livar',
  },
  description:
    'Hands-on full-stack expertise to take your idea from concept to market-ready MVP quickly and efficiently.',
  openGraph: {
    type: 'website',
    url: 'https://viktorlivar.com/',
    title: 'Viktor Livar — Rapid MVP Development for Early-Stage Startups',
    description: 'AWS • Node.js • React • PostgreSQL. Consulting and Fractional CTO services.',
    siteName: 'Viktor Livar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Viktor Livar — MVP Development & Fractional CTO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Viktor21663863',
    site: '@Viktor21663863',
    title: 'Viktor Livar — Rapid MVP Development',
    description: 'Hands-on full-stack expertise to ship MVPs fast.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://viktorlivar.com/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
