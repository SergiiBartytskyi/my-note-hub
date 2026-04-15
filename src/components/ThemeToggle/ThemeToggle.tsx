'use client';

import clsx from 'clsx';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const options: Theme[] = ['light', 'dark', 'system'];

const icons: Record<Theme, React.ReactNode> = {
  light: <Sun className="h-4 w-4" aria-hidden="true" />,
  dark: <Moon className="h-4 w-4" aria-hidden="true" />,
  system: <Monitor className="h-4 w-4" aria-hidden="true" />,
};

const labels: Record<Theme, string> = {
  light: 'Light theme',
  dark: 'Dark theme',
  system: 'System theme',
};

const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900 cursor-pointer">
      {options.map(option => {
        const isActive = theme === option;
        const isSystem = option === 'system';

        return (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            aria-label={labels[option]}
            aria-pressed={isActive}
            title={isSystem ? `${labels[option]} (${resolvedTheme})` : labels[option]}
            className={clsx(
              'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50',
              'dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950',
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            )}
          >
            {icons[option]}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
