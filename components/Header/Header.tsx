'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Container from '../Container/Container';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/notes/filter/all', label: 'Notes', prefetch: false },
  { href: '/profile', label: 'Profile', prefetch: false },
  { href: '/about', label: 'About' },
];

const navLinkClass =
  'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500';

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="pt-1 pb-4">
      <Container>
        <div className="flex items-center justify-center md:justify-between  rounded-2xl border border-border bg-surface p-4 shadow-sm backdrop-blur md:p-6">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center justify-center transition-transform active:scale-[0.98]"
          >
            <Image
              src="/BlackLogo.png"
              width={110}
              height={40}
              alt="NoteHub logo"
              priority
              className="h-auto w-27.5 dark:hidden"
            />
            <Image
              src="/WhiteLogo.png"
              width={110}
              height={40}
              alt="NoteHub logo"
              priority
              className="hidden h-auto w-27.5 dark:block"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="m-0 flex list-none items-center gap-2 p-0">
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={link.prefetch}
                    className={clsx(
                      navLinkClass,
                      isActive(link.href)
                        ? 'bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400'
                        : 'text-foreground hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Authentication navigation" className="hidden md:flex shrink-0">
            <ul className="m-0 flex list-none items-center gap-2 p-0">
              <AuthNavigation />
            </ul>
          </nav>
        </div>

        <nav aria-label="Authentication mobile navigation" className="mt-3 md:hidden">
          <ul className="flex gap-2">
            <AuthNavigation />
          </ul>
        </nav>

        <nav aria-label="Notes mobile navigation" className="mt-5 md:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={link.prefetch}
                  className={clsx(
                    'flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500',
                    isActive(link.href)
                      ? 'border-border bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400'
                      : 'border-border bg-surface-solid text-foreground hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
