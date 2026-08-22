import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { SpeedInsights } from "@vercel/speed-insights/next"
import SocialMediaBar from './components/SocialMediaBar'
import Script from 'next/script'

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
      <head>
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SocialMediaBar />
        <SpeedInsights />
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "weh25rpu6");
            `,
          }}
        />
      </body>
    </html>
  )
}