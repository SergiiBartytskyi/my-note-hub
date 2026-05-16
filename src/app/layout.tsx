import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import { Providers } from '@/components/Providers/Providers';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://my-note-hub.vercel.app'),
  title: {
    default: 'Note Hub',
    template: '%s | Note Hub',
  },
  description:
    'Note Hub is a modern Next.js app for creating, searching, and organizing notes in a clean, responsive interface.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: `Note Hub - Organize Your Notes with Ease`,
    description: `Note Hub is a modern Next.js app for creating, searching, and organizing notes in a clean, responsive interface.`,
    url: `https://my-note-hub.vercel.app`,
    siteName: 'Note Hub',
    images: [
      {
        url: '/og_image_notehub_v2.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub preview image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Note Hub - Organize Your Notes with Ease`,
    description: `Note Hub is a modern Next.js app for creating, searching, and organizing notes in a clean, responsive interface.`,
    images: ['/og_image_notehub_v2.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body className={`min-h-dvh flex flex-col`}>
        <Providers>
          <TanStackProvider>
            <Header />

            <main className="flex flex-1 flex-col pb-4 items-stretch gap-4">
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
