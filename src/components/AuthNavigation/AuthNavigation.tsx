'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Button from '../Button/Button';

const links = [
  { href: '/sign-in', label: 'Sign In' },
  { href: '/sign-up', label: 'Sign Up' },
];

const AuthNavigation = () => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {};

  return isAuthenticated ? (
    <li className="w-full flex items-center justify-between gap-4">
      <p>{user?.email}</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </li>
  ) : (
    <>
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
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
    </>
  );
};

export default AuthNavigation;
