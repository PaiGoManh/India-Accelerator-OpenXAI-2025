import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
title: 'VibeCheck AI — Real‑Time Comment Sentiment Analysis',
description:
'Classify comments as positive, negative, or neutral in real time. Improve moderation, protect your brand, and understand community mood.',
icons: {
icon: [
{ url: '/icon.svg', type: 'image/svg+xml' },
{ url: '/favicon.ico', sizes: 'any' }, 
],
apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 