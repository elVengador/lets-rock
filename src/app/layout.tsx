/* eslint-disable quotes */
import './globals.css'

import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Fira_Code } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Let's rock`,
  description: 'Task manager app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
