import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GreenHouse Inventory Tracker',
  description: 'Greenhouse products inventory and sales order tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};