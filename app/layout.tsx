
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Samadhan GS - Your Companion for Competitive Exams',
  description: 'Read. Understand. Crack Exams. The ultimate Android app for government exam preparation with complete GS/GK content.',
  keywords: 'competitive exams, UPSC, SSC, government exams, general studies, GK, exam preparation',
  openGraph: {
    title: 'Samadhan GS - Your Companion for Competitive Exams',
    description: 'Read. Understand. Crack Exams. The ultimate Android app for government exam preparation.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
