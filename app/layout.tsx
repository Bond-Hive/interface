import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BondHive Ltd.',
  description: 'Building secure blockchain-based solutions for the future of finance. Expert Web3 development and strategic advisory services.',
  keywords: 'blockchain, Web3, DeFi, smart contracts, cryptocurrency, decentralized finance, BondHive',
  authors: [{ name: 'BondHive Ltd.' }],
  creator: 'BondHive Ltd.',
  publisher: 'BondHive Ltd.',
  openGraph: {
    title: 'BondHive Ltd. - Decentralized Strategy, Centralized Vision',
    description: 'Building secure blockchain-based solutions for the future of finance. Expert Web3 development and strategic advisory services.',
    url: 'https://bondhive.xyz',
    siteName: 'BondHive',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BondHive Ltd. - Decentralized Strategy, Centralized Vision',
    description: 'Building secure blockchain-based solutions for the future of finance.',
    creator: '@bondhive',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ea580c" />
        <link rel="canonical" href="https://bondhive.xyz" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
