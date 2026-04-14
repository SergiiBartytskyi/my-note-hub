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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <TanStackProvider>
            <Header />

            <main>{children}</main>

            <Footer></Footer>
          </TanStackProvider>
        </Providers>
      </body>
    </html>
  );
}
