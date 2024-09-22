import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PSTrack App',
  description: 'Track your problem-solving progress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // todo add theme provider from tailwind
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
