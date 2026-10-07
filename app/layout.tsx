import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GreenHouse Inventory Tracker',
  description: 'Greenhouse products inventory and sales order tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
File 4: app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        GreenHouse Inventory Management
      </h1>
      <p className="text-muted-foreground max-w-xl">
        Web-based inventory and sales order tracking for greenhouse products
      </p>
    </main>
  );
}