import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import { Providers } from '@/components/Providers/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a modern Next.js app for creating, searching, and organizing notes in a clean, responsive interface.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col`}>
        <Providers>
          <TanStackProvider>
            <Header />

            <main className="flex flex-1 flex-col pb-4 items-center gap-4">
              {children}
              {modal}
            </main>

            <Footer />
          </TanStackProvider>
        </Providers>
      </body>
    </html>
  );
}
