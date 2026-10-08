import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GreenHouse Inventory Management',
  description: 'Web-based inventory and sales order tracking for greenhouse products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div>{children}</div>
      </body>
    </html>
  )
}