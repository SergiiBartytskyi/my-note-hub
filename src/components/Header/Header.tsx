'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import ThemeToggle from '@/components/ThemeToggle/index';

const navLinkClass =
  'px-3 py-2 text-base hover:text-blue-700 no-underline transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#333] cursor-pointer';

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#333] text-white ">
      <Link
        href="/"
        aria-label="Home"
        className="text-2xl font-bold text-white no-underline transition-colors hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#333]"
      >
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className="flex items-center justify-start gap-4 list-none m-0 p-0">
          <li>
            <Link
              href="/"
              className={clsx(navLinkClass, isActive('/') ? 'text-blue-600' : 'text-white')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/notes"
              className={clsx(navLinkClass, isActive('/notes') ? 'text-blue-600' : 'text-white')}
            >
              Notes
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={clsx(navLinkClass, isActive('/profile') ? 'text-blue-600' : 'text-white')}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={clsx(navLinkClass, isActive('/about') ? 'text-blue-600' : 'text-white')}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </header>
  );
};

export default Header;
